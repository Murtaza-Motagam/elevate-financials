import React from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import DefaultButton from '../DefaultButton';

interface SuccessModalProps {
    open: boolean;
    onOpenChange: () => void;
    title?: string;
    description?: string;
    details?: { label: string; value: string }[]; // For dynamic transaction details
    icon?: React.ReactNode; // Custom icon support
    buttonText?: string;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
    open,
    onOpenChange,
    title = "Success!",
    description = "",
    details = [],
    icon = <CheckCircle className="text-green-500 w-16 h-16" />,
    buttonText = "Close"
}) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="flex flex-col items-center text-center p-8 rounded-2xl shadow-lg w-full max-w-md">

                {/* Animated icon */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="bg-green-100 p-4 rounded-full"
                >
                    {icon}
                </motion.div>

                {/* Title */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <DialogTitle className="text-2xl font-bold mt-4">
                        {title}
                    </DialogTitle>
                </motion.div>

                {/* Description */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">
                        {description}
                    </DialogDescription>
                </motion.div>

                {/* Dynamic details section */}
                {details.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="bg-gray-100 dark:bg-slate-800 rounded-lg p-4 w-full mt-4"
                    >
                        {details.map((detail, index) => (
                            <div key={index} className="flex justify-between text-sm text-gray-700 dark:text-gray-100 mt-2">
                                <span>{detail.label}:</span>
                                <span className="font-medium">{detail.value}</span>
                            </div>
                        ))}
                    </motion.div>
                )}

                {/* Close button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.3 }}
                    className="w-full mt-6"
                >
                    <DefaultButton
                        title={buttonText}
                        className="w-full bg-transparent hover:bg-primary border border-primary text-primary hover:text-white dark:text-white py-2 rounded-lg shadow-md transition-all"
                        onClick={onOpenChange}
                    />
                </motion.div>
            </DialogContent>
        </Dialog>
    );
};

export default SuccessModal;
