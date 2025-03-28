import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UploadClothing = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [purchases, setPurchases] = useState('');
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !purchases || !image) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }

    const newItem = {
      id: `item${Date.now()}`, // Tạo ID duy nhất dựa trên timestamp
      name,
      image,
      price: parseInt(price),
      purchases: parseInt(purchases),
    };

    // Lưu vào localStorage để TryOn có thể truy cập
    const existingItems = JSON.parse(localStorage.getItem('shopItems') || '[]');
    localStorage.setItem('shopItems', JSON.stringify([...existingItems, newItem]));

    alert('Thêm quần áo thành công!');
    navigate('/try-on'); // Quay lại trang TryOn
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Thêm Quần Áo Mới</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Tên Quần Áo
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nhập tên quần áo"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Giá Thành (VNĐ)
              </label>
              <Input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Nhập giá thành"
                required
              />
            </div>

            <div>
              <label htmlFor="purchases" className="block text-sm font-medium text-gray-700">
                Lượng Mua
              </label>
              <Input
                id="purchases"
                type="number"
                value={purchases}
                onChange={(e) => setPurchases(e.target.value)}
                placeholder="Nhập lượng mua"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Ảnh Quần Áo
              </label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                required
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-2 w-full h-40 object-cover rounded"
                />
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-fashine-purple hover:bg-fashine-purple-dark text-white"
            >
              Thêm Quần Áo
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full mt-2"
              onClick={() => navigate('/try-on')}
            >
              Quay Lại
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadClothing;