import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Lock } from 'lucide-react'
import React from 'react'

const ChangePassword = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">Security Settings</h2>
            <Card className="p-4 flex items-center gap-3">
                <Lock className="w-6 h-6 text-red-600" />
                <div className='flex items-center justify-between w-full'>
                    <p className="dark:text-gray-300">Change Password</p>
                    <Button variant="secondary" size="default">Update</Button>
                </div>
            </Card>
        </div>
    )
}

export default ChangePassword
