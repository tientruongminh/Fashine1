import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, ChevronDown } from 'lucide-react'; // Sử dụng UserIcon
import Logo from './Logo';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Kiểm tra trạng thái đăng nhập
  const [userAvatar, setUserAvatar] = useState<string | null>(null);

  useEffect(() => {
    // Kiểm tra nếu có ảnh người dùng trong localStorage
    const userImage = localStorage.getItem('userImage');
    if (userImage) {
      setIsAuthenticated(true);
      setUserAvatar(userImage); // Lấy avatar từ localStorage
    } else {
      const defaultAvatar = "https://tintuc.dienthoaigiakho.vn/wp-content/uploads/2024/01/anh-avatar-trang-nam-11.jpg"; // Hình ảnh mặc định (avatar người)
      setUserAvatar(defaultAvatar); // Đặt avatar mặc định
      // Lưu hình ảnh mặc định vào localStorage nếu chưa có
      localStorage.setItem('userImage', defaultAvatar);
    }
  }, []);
  

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    // Xóa thông tin người dùng khi đăng xuất
    localStorage.removeItem('userImage');
    setIsAuthenticated(false); // Đánh dấu người dùng đã đăng xuất
    setUserAvatar(null); // Xóa avatar
    setIsMenuOpen(false); // Đóng menu
  };

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

          {/* Bộ sưu tập */}
          <div className="relative group" onMouseEnter={() => setIsMenuOpen(true)} onMouseLeave={() => setIsMenuOpen(false)}>
            <button className="flex items-center text-gray-700 hover:text-fashine-purple font-medium">
              Bộ sưu tập
              <ChevronDown className="w-4 h-4 ml-1 group-hover:rotate-180 transition-transform" />
            </button>
            <div
              className={`absolute bg-white border border-gray-200 shadow-lg mt-2 rounded-lg w-48 left-0 z-10 ${
                isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'
              } group-hover:visible group-hover:opacity-100 transition-all duration-300 ease-in-out`}
            >
              <ul className="py-2">
                <li>
                  <Link to="/collection/seasonal" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-fashine-purple">
                    Theo mùa
                  </Link>
                </li>
                <li>
                  <Link to="/collection/personality" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-fashine-purple">
                    Theo cá tính
                  </Link>
                </li>
                <li>
                  <Link to="/collection/monthly" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-fashine-purple">
                    Theo tháng
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Link to="#" className="text-gray-700 hover:text-fashine-purple font-medium">
            Về chúng tôi
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {/* Giỏ hàng Icon */}
          <Link to="/cart" className="text-gray-700 hover:text-fashine-purple">
            <ShoppingCart className="w-6 h-6" />
          </Link>

          {/* Avatar hoặc Đăng nhập */}
          {isAuthenticated && userAvatar ? (
            <div className="relative">
              <button
                onClick={handleMenuToggle}
                className="flex items-center text-gray-700 hover:text-fashine-purple"
              >
                      <img src="https://tintuc.dienthoaigiakho.vn/wp-content/uploads/2024/01/anh-avatar-trang-nam-11.jpg" alt="User Avatar" className="w-10 h-10 rounded-full" />
              </button>

              {/* Dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-48">
                  <ul className="py-2">
                    <li>
                      <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-fashine-purple">
                        Hồ sơ
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-fashine-purple">
                        Đơn mua
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-fashine-purple w-full text-left"
                      >
                        Đăng xuất
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-fashine-purple hover:bg-fashine-purple/10 px-2">
                <User className="w-5 h-5 mr-1" />
                Đăng nhập
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
