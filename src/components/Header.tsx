
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Logo from './Logo';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Logo />
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/home" className="text-gray-700 hover:text-fashine-purple font-medium">
            Trang chủ
          </Link>
          <Link to="/try-on" className="text-gray-700 hover:text-fashine-purple font-medium">
            Thử đồ ảo
          </Link>
          <Link to="#" className="text-gray-700 hover:text-fashine-purple font-medium">
            Về chúng tôi
          </Link>
        </nav>
        
        <div className="flex items-center">
          <Button
            className="bg-fashine-purple hover:bg-fashine-purple-dark text-white"
          >
            Hồ sơ cá nhân
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
