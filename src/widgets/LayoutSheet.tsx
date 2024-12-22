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
    children: React.ReactNode
}

const LayoutSheet: React.FC<LayoutModalProps> = ({ children, open, setOpen = () => { } }) => {
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
                <div>
                    {children}
                </div>
            </SheetContent>
        </Sheet>
    )
}

export default LayoutSheet
