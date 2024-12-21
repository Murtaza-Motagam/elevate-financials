import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';
import React, { SetStateAction } from 'react'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"
import { Switch } from "@/components/ui/switch"
import DefaultButton from '@/widgets/DefaultButton';

interface SettingModalProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: any;
    open: boolean;
    setOpen?: React.Dispatch<SetStateAction<boolean>>;
}
const SettingModal: React.FC<SettingModalProps> = ({ open, setOpen = () => { }, user }) => {
    console.log('user: ', user);

    const handleSave = () => {
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <VisuallyHidden>
                <DialogTitle>Hidden Dialog Title</DialogTitle>
            </VisuallyHidden>
            <VisuallyHidden>
                <DialogDescription>Hidden Dialog Title</DialogDescription>
            </VisuallyHidden>
            <DialogContent>
                <div className="w-full space-y-6">
                    <div>
                        <h3 className="mb-4 text-lg font-medium">Notifications</h3>
                        <div className="space-y-4">

                            {/* Emails */}
                            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <label className="font-medium">Email Notification</label>
                                    <p className="text-sm text-gray-600">
                                        Receive emails about new products, features, and more.
                                    </p>
                                </div>
                                <Switch checked={user?.preferences?.notification?.emailNotifications} />
                            </div>

                            {/* In-website */}
                            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <label className="font-medium">In-Website Notifications</label>
                                    <p className="text-sm text-gray-600">
                                        Stay informed with updates and alerts directly on the website
                                    </p>
                                </div>
                                <Switch />
                            </div>

                            {/* Push */}
                            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <label className="font-medium">Push Notifications</label>
                                    <p className="text-sm text-gray-600">
                                        Get real-time notifications directly on your device.
                                    </p>
                                </div>
                                <Switch checked={user?.preferences?.notification?.pushNotifications} />
                            </div>

                            {/* SMS */}
                            <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                <div className="space-y-0.5">
                                    <label className="font-medium">SMS Notifications</label>
                                    <p className="text-sm text-gray-600">
                                        Receive alerts and updates via text messages.
                                    </p>
                                </div>
                                <Switch checked={user?.preferences?.notification?.smsNotifications} />
                            </div>

                        </div>
                    </div>
                    <DefaultButton onClick={handleSave} className='w-full' title='Save' />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SettingModal
