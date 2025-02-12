import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutWrapperType {
  children: React.ReactNode;
  parentClass?: string | undefined;
}

const LayoutWrapper: React.FC<LayoutWrapperType> = ({ children, parentClass = '' }) => {
  return (
    <div className={`w-full ${parentClass}`}>
      <Header />
      <div className='w-full min-h-[90vh]'>{children}</div>
      <Footer />
    </div>
  );
};

export default LayoutWrapper;
