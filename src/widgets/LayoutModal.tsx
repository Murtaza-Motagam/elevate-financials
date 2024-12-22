import React, { SetStateAction } from 'react'
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

interface LayoutModalProps {
    open: boolean;
    setOpen?: React.Dispatch<SetStateAction<boolean>>;
}

const LayoutModal: React.FC<LayoutModalProps> = ({ open, setOpen = () => { } }) => {
    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <VisuallyHidden>
                        <SheetTitle>Hidden Dialog Title</SheetTitle>
                    </VisuallyHidden>
                    <VisuallyHidden>
                        <SheetDescription>Hidden Dialog Title</SheetDescription>
                    </VisuallyHidden>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    Hii
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default LayoutModal
