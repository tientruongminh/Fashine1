import React from 'react';
import Logo from './Logo';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-fashine-purple/10 to-fashine-purple/30">
      {/* Centered - Auth form with white background and rounded corners */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-5 md:p-10">
        <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-lg">
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
