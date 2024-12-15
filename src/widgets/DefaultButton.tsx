import { Button } from '@/components/ui/button'
import React from 'react'

interface DefaultBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string | undefined;
    loading?: boolean;
    className?: string;
    icon?: React.ReactNode;
    iconAlign?: string;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null | undefined;
}

const DefaultButton: React.FC<DefaultBtnProps> = ({ title = '', className = '', variant, icon, iconAlign, loading, ...rest }) => {
    return (
        <Button variant={variant} className={`text-center ${loading && 'opacity-60'} ${icon && 'flex items-center gap-x-1'} ${className}`} {...rest}>
            {iconAlign === 'right' ? (
                <>
                    {title}
                    {icon}
                </>
            ) : (
                <>
                    {icon}
                    {title}
                </>
            )}
        </Button>
    )
}

export default DefaultButton
