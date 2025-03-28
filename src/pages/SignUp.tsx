
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import SocialLoginButton from '@/components/SocialLoginButton';
import { useToast } from '@/components/ui/use-toast';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ email hợp lệ",
        variant: "destructive",
      });
      return;
    }
    
    if (!password || password.length < 6) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu phải có ít nhất 6 ký tự",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Lỗi",
        description: "Mật khẩu xác nhận không khớp",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful registration
    toast({
      title: "Đăng ký thành công",
      description: "Chào mừng bạn đến với Fashine",
    });
    
    navigate('/home');
  };

  const handleSocialSignUp = (provider: 'google' | 'facebook') => {
    toast({
      title: `Đăng ký bằng ${provider === 'google' ? 'Google' : 'Facebook'}`,
      description: "Tính năng này sẽ sớm được triển khai",
    });
  };

  return (
    <AuthLayout title="Tạo tài khoản mới">
      <form onSubmit={handleSignUp} className="space-y-4 w-full">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Mật khẩu</Label>
          <div className="relative">
            <Input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={isConfirmPasswordVisible ? "text" : "password"}
              placeholder="••••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
            >
              {isConfirmPasswordVisible ? (
                <EyeOffIcon className="h-4 w-4" />
              ) : (
                <EyeIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-fashine-purple hover:bg-fashine-purple-dark"
        >
          Đăng ký
        </Button>
        
        <div className="relative flex items-center justify-center my-6">
          <div className="absolute border-t border-gray-300 w-full"></div>
          <span className="relative bg-white px-4 text-sm text-gray-500">
            hoặc
          </span>
        </div>
        
        <div className="space-y-3">
          <SocialLoginButton provider="google" onClick={() => handleSocialSignUp('google')} />
        </div>
        
        <p className="text-center text-sm text-gray-600 mt-6">
          Bạn đã có tài khoản?{' '}
          <Link to="/login" className="text-fashine-purple hover:underline font-medium">
            Đăng nhập
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
