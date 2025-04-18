import { X } from 'lucide-react';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useDropzone, Accept } from 'react-dropzone';
import LazyLoadImg from './LazyLoadImg';
import Cropper from 'react-cropper';
import { showToast } from '@/lib/common';
import 'cropperjs/dist/cropper.css'; // Import Cropper styles
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'; // ShadCN Modal components
import axios from 'axios';
import { backendUrlUpload } from '@/lib/constant';
import { FieldValues, UseFormClearErrors, UseFormSetError, Path } from 'react-hook-form';
import DefaultButton from './DefaultButton';
import RollLoader from '@/shared/Loaders/RollLoader';

interface FileUploadProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  className?: string;
  img: string | null; // Image URL from watch('profileImg') or null
  setImg: (url: string | null) => void; // Function to set img state
  clearErrors: UseFormClearErrors<T>; // Function to clear errors
  setError: UseFormSetError<T>;
  mandatory?: boolean;
  accept?: Accept;
  maxSize?: number;
}

const Uploader = <T extends FieldValues>({
  name,
  label,
  className,
  img,
  setImg,
  clearErrors,
  setError,
  mandatory,
  accept = { 'image/*': [] },
  maxSize = 15 * 1024 * 1024, // 15 MB limit
}: FileUploadProps<T>) => {
  const [preview, setPreview] = useState<string | null>(img); // Image preview state
  const [uploading, setUploading] = useState<boolean>(false); // Uploading state
  const [error, setErrorState] = useState<string | null>(null); // Error state
  const [showCropperModal, setShowCropperModal] = useState<boolean>(false); // Modal visibility state
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cropperRef = useRef<HTMLImageElement | null | any>(null); // Reference for the Cropper

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Show image in cropper
      setShowCropperModal(true); // Open Cropper Modal
      setErrorState(null); // Clear any previous errors
    }
  }, []);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept,
    onDrop: handleDrop,
    maxSize,
    multiple: false,
  });

  const handleCrop = async () => {
    setUploading(true); // Start uploading
    if (cropperRef.current) {
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImage = croppedCanvas.toDataURL('image/png');
        setPreview(croppedImage); // Update preview with cropped image
        setShowCropperModal(false); // Close Modal

        // Upload cropped image
        try {
          const blob = await (await fetch(croppedImage)).blob(); // Convert Base64 to Blob
          const formData = new FormData();
          formData.append('image', blob, 'cropped-image.png');

          const response = await axios({
            url: backendUrlUpload,
            data: formData,
            method: 'post',
          });
          const resData = response.data;
          if (resData?.success) {
            setImg(resData?.imageUrl); // Update img state with the uploaded file path
            clearErrors(name); // Clear any errors for this field
          } else {
            showToast(resData?.message, 'error');
            setError(name, {
              type: 'manual',
              message: 'Failed to upload the image. Please try again.',
            });
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          setError(name, {
            type: 'manual',
            message: 'Error uploading file. Please try again.',
          });
        } finally {
          setUploading(false); // Reset uploading state
        }
      }
    }
  };

  const handleRemove = () => {
    setPreview(null); // Clear preview
    setImg(''); // Reset img state in parent
    setErrorState(null); // Reset error state
  };

  useEffect(() => {
    if (img) {
      setPreview(img); // Update preview when img prop changes
    }
  }, [img]);

  // Handle file rejection to prevent infinite toast loop
  useEffect(() => {
    if (fileRejections.length > 0) {
      showToast('File is too large or not a valid type.', 'error');
    }
    if (error) {
      showToast(error, 'error');
    }
  }, [fileRejections, error]);

  return (
    <div className='space-y-2'>
      <Label className='dark:text-gray-300'>
        {label}
        {mandatory && <span className='text-red-600 ml-1'>*</span>}
      </Label>

      <div
        {...getRootProps()}
        className={`flex items-center justify-center border border-dashed border-blue-400 rounded-md text-center relative cursor-pointer text-xs focus:outline-none transition-all ${className} ${!img && 'p-6'}`}
      >
        <input {...getInputProps()} />
        {!img && !preview && !uploading && (
          <div>
            <p className='text-gray-400'>Drag and drop a file here, or click to select one</p>
          </div>
        )}

        {/* Image Preview */}
        {preview && !showCropperModal && !uploading && (
          <div className='mt-4 relative pb-5'>
            <LazyLoadImg
              src={preview}
              alt='Preview'
              className='mx-auto h-32 w-32 object-cover rounded-md border'
            />
            <button
              type='button'
              onClick={handleRemove}
              className='absolute top-0 right-0 -mt-2 -mr-2 dark:bg-red-500 dark:hover:bg-red-600 text-white rounded-full p-1 shadow-md hover:bg-gray-100'
            >
              <X className='h-3 w-3' />
            </button>
          </div>
        )}

        {uploading && (
          <p className='text-blue-600 font-semibold text-base uppercase'>Uploading...</p>
        )}
      </div>

      {/* ShadCN Modal for Cropping */}
      <Dialog open={showCropperModal} onOpenChange={setShowCropperModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          {preview && (
            <Cropper
              src={preview}
              style={{ height: 400, width: '100%' }}
              initialAspectRatio={1}
              aspectRatio={1} // Square aspect ratio
              guides={true}
              ref={cropperRef}
            />
          )}
          <DefaultButton
            onClick={handleCrop}
            loading={uploading}
            icon={uploading && <RollLoader />}
            title={uploading ? 'Uploading...' : 'Crop & upload'}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Uploader;
