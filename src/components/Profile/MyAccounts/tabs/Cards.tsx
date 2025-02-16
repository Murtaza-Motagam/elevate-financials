import { Card } from '@/components/ui/card'
import { CreditCard } from 'lucide-react'
import React from 'react'
import { AccountTabsProps } from '../AccountTabs'

const Cards = ({ accInfo }: AccountTabsProps) => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Credit & Debit Cards</h2>
            <Card className="p-4 flex justify-between items-center  rounded-xl">
                <div>
                    <p className="dark:text-gray-300">Platinum Credit Card</p>
                    <h3 className="text-lg font-bold">**** **** **** 1234</h3>
                    <p className="text-sm text-gray-500">Exp: 09/27</p>
                </div>
                <CreditCard className="w-8 h-8 text-gray-700" />
            </Card>
        </div>
    )
}

export default Cards
