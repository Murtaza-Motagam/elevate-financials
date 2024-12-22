import LayoutSheet from '@/widgets/LayoutSheet'
import React, { SetStateAction } from 'react'

interface AddTransactionProps {
    open: boolean;
    setOpen?: React.Dispatch<SetStateAction<boolean>>;
}

const AddTransaction: React.FC<AddTransactionProps> = ({ open, setOpen = () => { } }) => {
    return (
        <LayoutSheet open={open} setOpen={setOpen}>
            Hi
        </LayoutSheet>
    )
}

export default AddTransaction
