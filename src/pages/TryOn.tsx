
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Tshirt, MessageCircle } from 'lucide-react';

const TryOn = () => {
  const navigate = useNavigate();
  const userImage = localStorage.getItem('userImage');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto py-12 px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-4">Thử Đồ Ảo</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hãy thử các bộ trang phục khác nhau trên ảnh của bạn
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-fashine-purple" />
              Chatbot Gợi Ý
            </h2>
            <div className="border rounded-lg p-4 h-96 bg-gray-50 mb-4 overflow-y-auto">
              <div className="bg-fashine-purple/10 p-3 rounded-lg mb-3 inline-block">
                <p className="text-gray-800">
                  Xin chào! Tôi là trợ lý thời trang AI của Fashine. Tôi có thể giúp gì cho bạn hôm nay?
                </p>
              </div>
              
              <div className="text-right">
                <div className="bg-fashine-purple text-white p-3 rounded-lg mb-3 inline-block">
                  <p>Tôi đang tìm một bộ đồ cho buổi tiệc cuối tuần này.</p>
                </div>
              </div>
              
              <div className="bg-fashine-purple/10 p-3 rounded-lg mb-3 inline-block">
                <p className="text-gray-800">
                  Tuyệt vời! Bạn có thể cho tôi biết thêm về phong cách bạn yêu thích không? Bạn thích trang phục thanh lịch, năng động hay cá tính?
                </p>
              </div>
            </div>
            
            <div className="flex">
              <input 
                type="text" 
                placeholder="Nhập tin nhắn..." 
                className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-fashine-purple"
              />
              <Button 
                className="rounded-l-none bg-fashine-purple hover:bg-fashine-purple-dark"
              >
                Gửi
              </Button>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Tshirt className="h-5 w-5 mr-2 text-fashine-purple" />
                Khu Vực Thử Đồ
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 h-96 bg-gray-50 flex items-center justify-center">
                  {userImage ? (
                    <img 
                      src={userImage} 
                      alt="Your uploaded image" 
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-gray-500 mb-2">Bạn chưa tải lên ảnh</p>
                      <Button 
                        variant="outline" 
                        className="border-fashine-purple text-fashine-purple"
                        onClick={() => navigate('/upload')}
                      >
                        Tải ảnh lên
                      </Button>
                    </div>
                  )}
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium">Chọn bộ trang phục:</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-fashine-purple">
                      <img 
                        src="https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                        alt="Outfit 1" 
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">Casual Summer</p>
                    </div>
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-fashine-purple">
                      <img 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
                        alt="Outfit 2" 
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">Elegant Evening</p>
                    </div>
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-fashine-purple">
                      <img 
                        src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
                        alt="Outfit 3" 
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">Business Casual</p>
                    </div>
                    <div className="border rounded-lg p-2 cursor-pointer hover:border-fashine-purple">
                      <img 
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80" 
                        alt="Outfit 4" 
                        className="w-full h-40 object-cover rounded mb-2"
                      />
                      <p className="text-sm font-medium">Street Style</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-fashine-purple hover:bg-fashine-purple-dark mt-4">
                    Áp dụng trang phục
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;
