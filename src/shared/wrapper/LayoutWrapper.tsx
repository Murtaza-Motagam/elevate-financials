import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

interface LayoutWrapperType {
  children: React.ReactNode;
  parentClass?: string | undefined;
  childClass?: string | undefined;
  showFooter?: boolean;
}

const LayoutWrapper = ({
  children,
  parentClass = '',
  childClass = '',
  showFooter = true,
}: LayoutWrapperType) => {
  return (
    <div className={`w-full ${parentClass}`}>
      <Header />
      <div className={`w-full min-h-[90vh] ${childClass}`}>{children}</div>
      {showFooter && <Footer />}
    </div>
  );
};

export default LayoutWrapper;
