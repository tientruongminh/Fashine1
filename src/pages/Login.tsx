
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import AuthLayout from '@/components/AuthLayout';
import SocialLoginButton from '@/components/SocialLoginButton';
import { useToast } from '@/components/ui/use-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [step, setStep] = useState<'email' | 'password'>('email');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập địa chỉ email hợp lệ",
        variant: "destructive",
      });
      return;
    }
    setStep('password');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      toast({
        title: "Lỗi",
        description: "Vui lòng nhập mật khẩu",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful login
    toast({
      title: "Đăng nhập thành công",
      description: "Chào mừng bạn đến với Fashine",
    });
    
    navigate('/upload');
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    toast({
      title: `Đăng nhập bằng ${provider === 'google' ? 'Google' : 'Facebook'}`,
      description: "Tính năng này sẽ sớm được triển khai",
    });
  };

  return (
    <AuthLayout title="Chào mừng trở lại">
      {step === 'email' ? (
        <form onSubmit={handleEmailSubmit} className="space-y-4 w-full">
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
          <Button 
            type="submit" 
            className="w-full bg-fashine-purple hover:bg-fashine-purple-dark"
          >
            Tiếp tục
          </Button>
          
          <div className="relative flex items-center justify-center my-8">
            <div className="absolute border-t border-gray-300 w-full"></div>
            <span className="relative bg-white px-4 text-sm text-gray-500">
              hoặc
            </span>
          </div>
          
          <div className="space-y-3">
            <SocialLoginButton provider="google" onClick={() => handleSocialLogin('google')} />
            <SocialLoginButton provider="facebook" onClick={() => handleSocialLogin('facebook')} />
          </div>
          
          <p className="text-center text-sm text-gray-600 mt-6">
            Bạn chưa có tài khoản?{' '}
            <Link to="/signup" className="text-fashine-purple hover:underline font-medium">
              Đăng ký
            </Link>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4 w-full">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Mật khẩu</Label>
              <button 
                type="button" 
                className="text-xs text-fashine-purple hover:underline" 
                onClick={() => toast({
                  title: "Khôi phục mật khẩu",
                  description: "Tính năng này sẽ sớm được triển khai",
                })}
              >
                Quên mật khẩu?
              </button>
            </div>
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
          
          <Button 
            type="submit" 
            className="w-full bg-fashine-purple hover:bg-fashine-purple-dark"
          >
            Đăng nhập
          </Button>
          
          <button 
            type="button" 
            className="text-sm text-fashine-purple hover:underline w-full text-center mt-4"
            onClick={() => setStep('email')}
          >
            Quay lại
          </button>
        </form>
      )}
    </AuthLayout>
  );
};

export default Login;
