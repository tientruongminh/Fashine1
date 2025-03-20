
import React from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Illustration */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-fashine-purple/10 to-fashine-purple/30 p-10 items-center justify-center relative">
        <div className="max-w-md">
          <img 
            src="/lovable-uploads/ad362752-2f6a-4b74-9639-6c6384099194.png" 
            alt="Login Illustration" 
            className="w-full h-auto"
          />
        </div>
      </div>
      
      {/* Right side - Auth form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5 md:p-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6">
              <Logo />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
