"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Send, MessageCircle, XIcon } from "lucide-react";
import Link from "next/link";
import { LinkedInLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons";
import DefaultButton from "@/widgets/DefaultButton";

const ContactSupport = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            {/* Card Container */}
            <div className="w-full bg-white md:-mt-12 p-8 shadow-lg rounded-2xl">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">Contact Support</h2>
                    <p className="text-gray-600 mt-2">
                        Need help? Fill out the form below, or reach us via other channels.
                    </p>
                </div>

                {/* Contact Options */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <Link
                        href="mailto:support@yourwebsite.com"
                        className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <Mail className="h-8 w-8 text-blue-600" />
                        <p className="text-gray-700 font-semibold mt-2">Email Support</p>
                        <span className="text-sm text-gray-500">support@elevatefinancials.com</span>
                    </Link>
                    <Link
                        href="tel:+9123456789"
                        className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <Phone className="h-8 w-8 text-green-600" />
                        <p className="text-gray-700 font-semibold mt-2">Call Us</p>
                        <span className="text-sm text-gray-500">+91 234 567 89</span>
                    </Link>
                    <Link
                        href="/live-chat"
                        className="flex flex-col items-center justify-center bg-gray-50 p-4 rounded-xl shadow hover:shadow-md transition"
                    >
                        <MessageCircle className="h-8 w-8 text-purple-600" />
                        <p className="text-gray-700 font-semibold mt-2">Live Chat</p>
                        <span className="text-sm text-gray-500">Available 24/7</span>
                    </Link>
                </div>

                {/* Contact Form */}
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Full name</label>
                        <Input type="text" placeholder="Enter your name" className="mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <Input type="email" placeholder="john@example.com" className="mt-1" />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Your message</label>
                        <Textarea placeholder="Write your message here..." className="mt-1" />
                    </div>

                    {/* <Button className="w-full py-6">
                         
                    </Button> */}
                    <DefaultButton icon={<Send className="h-5 w-5" />} className="w-full py-5" title='Send message' />
                </form>

                {/* Quick Links */}
                <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-gray-600">
                    <Link href="/faq" className="hover:text-primary transition">FAQ</Link>
                    <Link href="/help-center" className="hover:text-primary transition">Help Center</Link>
                    <Link href="/privacy-policy" className="hover:text-primary transition">Privacy Policy</Link>
                </div>

                {/* Social Links */}
                <div className="flex justify-center gap-6 mt-6">
                    <Link href="https://twitter.com" target="_blank">
                        <TwitterLogoIcon className="h-6 w-6 text-primary" />
                    </Link>
                    <Link href="https://linkedin.com" target="_blank">
                        <LinkedInLogoIcon className="h-6 w-6 text-primary" />
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default ContactSupport