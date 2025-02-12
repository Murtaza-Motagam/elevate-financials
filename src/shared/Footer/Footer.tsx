import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Landmark } from 'lucide-react';

const Footer = () => {
  return (
    <footer className='border-t-2 bg-gray-50 dark:bg-transparent py-10'>
      <div className='container mx-auto px-6 lg:px-16'>
        {/* Grid Layout */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {/* Logo and Description */}
          <div className='flex flex-col items-start'>
            <h1 className='text-lg md:text-xl font-bold text-primary dark:text-white flex items-center gap-x-2'>
              <Landmark />
              <span>Elevate Financials</span>
            </h1>
            <p className='dark:text-gray-400 mt-3'>
              Secure and reliable banking solutions for your financial needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className='flex flex-wrap items-center gap-x-20 gap-y-10'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
              <ul className='dark:text-gray-400 space-y-2'>
                <li>
                  <a href='#' className='hover:text-white'>
                    Home
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Services
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    About Us
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Contact our officials
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Customer Support</h3>
              <ul className='dark:text-gray-400 space-y-2'>
                <li>
                  <a href='#' className='hover:text-white'>
                    Help Center
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    FAQs
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Report an Issue
                  </a>
                </li>
                <li>
                  <a href='#' className='hover:text-white'>
                    Security & Privacy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Social Media */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Follow Us</h3>
            <div className='flex space-x-4'>
              <a href='#' className='hover:text-white'>
                <Facebook size={24} />
              </a>
              <a href='#' className='hover:text-white'>
                <Twitter size={24} />
              </a>
              <a href='#' className='hover:text-white'>
                <Linkedin size={24} />
              </a>
              <a href='#' className='hover:text-white'>
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className='border-t border-gray-700 mt-8 pt-4 text-center dark:text-gray-400'>
          © Copyright {new Date().getFullYear()} elevate-financials. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
