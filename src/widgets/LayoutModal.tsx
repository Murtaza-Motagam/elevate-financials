import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import React, { SetStateAction } from 'react'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface LayoutModalProps {
    open: boolean;
    setOpen?: React.Dispatch<SetStateAction<boolean>>;
    children: React.ReactNode;
}

const LayoutModal: React.FC<LayoutModalProps> = ({ children, open, setOpen = () => { } }) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <VisuallyHidden>
                        <DialogTitle>Hidden Dialog Title</DialogTitle>
                    </VisuallyHidden>
                    <VisuallyHidden>
                        <DialogDescription>Hidden Dialog Title</DialogDescription>
                    </VisuallyHidden>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default LayoutModal
