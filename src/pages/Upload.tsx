
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Image, Camera } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/components/ui/use-toast';

const Upload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file: File) => {
    if (!file.type.match('image.*')) {
      toast({
        title: "Lỗi",
        description: "Vui lòng chọn file hình ảnh",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImage(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleContinue = () => {
    if (!image) {
      toast({
        title: "Lỗi",
        description: "Vui lòng tải lên ảnh của bạn trước khi tiếp tục",
        variant: "destructive",
      });
      return;
    }
    
    // Store the image in localStorage for demo purposes
    localStorage.setItem('userImage', image);
    
    toast({
      title: "Thành công",
      description: "Ảnh của bạn đã được tải lên thành công!",
    });
    
    navigate('/home');
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const captureImage = () => {
    toast({
      title: "Chụp ảnh",
      description: "Tính năng này sẽ sớm được triển khai",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="mb-8">
        <Logo />
      </div>
      
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Tải lên ảnh của bạn</h1>
          
          <p className="text-gray-600 text-center mb-8">
            Để cung cấp trải nghiệm thử đồ ảo tốt nhất, chúng tôi cần một ảnh chân dung của bạn
          </p>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
              isDragging ? 'border-fashine-purple bg-fashine-purple/10' : 'border-gray-300'
            } ${image ? 'p-4' : 'p-8'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {image ? (
              <div className="flex flex-col items-center">
                <img 
                  src={image} 
                  alt="Uploaded" 
                  className="max-h-60 rounded-md mb-4 object-contain" 
                />
                <Button 
                  variant="outline" 
                  onClick={triggerFileInput}
                  className="text-sm"
                >
                  Chọn ảnh khác
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="bg-fashine-purple/10 p-4 rounded-full mb-4">
                  <Upload className="h-8 w-8 text-fashine-purple" />
                </div>
                <p className="mb-4 text-gray-600">Kéo và thả ảnh vào đây, hoặc</p>
                <div className="flex gap-3">
                  <Button 
                    className="bg-fashine-purple hover:bg-fashine-purple-dark"
                    onClick={triggerFileInput}
                  >
                    <Image className="h-4 w-4 mr-2" />
                    Chọn ảnh
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={captureImage}
                  >
                    <Camera className="h-4 w-4 mr-2" />
                    Chụp ảnh
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          
          <Button 
            className="w-full bg-fashine-purple hover:bg-fashine-purple-dark"
            onClick={handleContinue}
            disabled={!image}
          >
            Tiếp tục
          </Button>
        </CardContent>
      </Card>
      
      <p className="mt-6 text-sm text-gray-500 text-center max-w-md">
        Chúng tôi chỉ sử dụng ảnh của bạn để hiển thị mô phỏng quần áo và sẽ không lưu trữ hoặc chia sẻ với bên thứ ba.
      </p>
    </div>
  );
};

export default Upload;
