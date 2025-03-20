
import React from 'react';
import { Button } from '@/components/ui/button';
import { Google } from 'lucide-react';

interface SocialLoginButtonProps {
  provider: 'google' | 'facebook';
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ provider, onClick }) => {
  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={onClick}
    >
      {provider === 'google' ? (
        <><Google className="h-4 w-4" /> Đăng nhập bằng Google</>
      ) : (
        <>
          <svg className="h-4 w-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
          </svg>
          Đăng nhập bằng Facebook
        </>
      )}
    </Button>
  );
};

export default SocialLoginButton;
