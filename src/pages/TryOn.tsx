
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Shirt, MessageCircle, X, ChevronDown, ChevronUp } from 'lucide-react';
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const TryOn = () => {
  const navigate = useNavigate();
  const userImage = localStorage.getItem('userImage');
  const [chatOpen, setChatOpen] = useState(true);
  const [activeOutfit, setActiveOutfit] = useState<string | null>(null);
  const tabsRef = useRef<HTMLButtonElement>(null);
  
  const outfits = [
    { 
      id: "outfit1", 
      name: "Casual Summer", 
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
    },
    { 
      id: "outfit2", 
      name: "Elegant Evening", 
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80" 
    },
    { 
      id: "outfit3", 
      name: "Business Casual", 
      image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
    },
    { 
      id: "outfit4", 
      name: "Street Style", 
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80" 
    }
  ];
  
  const shopItems = [
    { 
      id: "item1", 
      name: "Áo Thun Cổ Tròn", 
      image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" 
    },
    { 
      id: "item2", 
      name: "Áo Sơ Mi Trắng", 
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80" 
    },
    { 
      id: "item3", 
      name: "Quần Jeans", 
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=726&q=80" 
    },
    { 
      id: "item4", 
      name: "Đầm Dài", 
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=783&q=80" 
    },
    { 
      id: "item5", 
      name: "Áo Khoác Bomber", 
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80" 
    },
    { 
      id: "item6", 
      name: "Vest Nam", 
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80" 
    }
  ];
  
  const toggleChat = () => {
    setChatOpen(!chatOpen);
  };
  
  const applyOutfit = (outfitId: string) => {
    setActiveOutfit(outfitId);
  };
  
  const handleItemClick = (item: any) => {
    // First, make sure chat is open
    if (!chatOpen) {
      setChatOpen(true);
    }
    
    // Use setTimeout to ensure the tab click happens after the state update
    setTimeout(() => {
      // Programmatically click the outfits tab
      if (tabsRef.current) {
        tabsRef.current.click();
      } else {
        const outfitsTab = document.getElementById('outfits-tab');
        if (outfitsTab) {
          outfitsTab.click();
        }
      }
    }, 50);
  };

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
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {!chatOpen && (
            <div className="md:col-span-3 bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <Shirt className="h-5 w-5 mr-2 text-fashine-purple" />
                Bộ Sưu Tập Quần Áo
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {shopItems.map((item) => (
                  <div 
                    key={item.id}
                    className="border rounded-lg p-2 cursor-pointer hover:border-fashine-purple transition-all"
                    onClick={() => handleItemClick(item)}
                  >
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-40 object-cover rounded mb-2"
                    />
                    <p className="text-sm font-medium text-center">{item.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className={`${chatOpen ? 'md:col-span-2' : 'md:col-span-2'}`}>
            <div className="bg-white p-6 rounded-lg shadow-md h-full">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Shirt className="h-5 w-5 mr-2 text-fashine-purple" />
                Khu Vực Thử Đồ
              </h2>
              
              <div className="border rounded-lg p-4 h-96 bg-gray-50 flex items-center justify-center mb-4">
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
              
              {activeOutfit && (
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Đang thử: {outfits.find(o => o.id === activeOutfit)?.name}</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-fashine-purple border-fashine-purple"
                  >
                    Chụp ảnh
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Collapsible Chat UI */}
          <div className={`fixed bottom-4 right-4 z-10 ${chatOpen ? 'w-full md:w-1/3 max-w-md' : 'w-auto'}`}>
            {chatOpen ? (
              <Card className="shadow-xl border border-gray-200">
                <div className="flex items-center justify-between p-3 border-b">
                  <h3 className="font-medium flex items-center">
                    <MessageCircle className="h-5 w-5 mr-2 text-fashine-purple" />
                    Trợ lý thời trang Fashine
                  </h3>
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8" 
                      onClick={toggleChat}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <CardContent className="p-0">
                  <Tabs defaultValue="chat" className="w-full">
                    <TabsList className="w-full grid grid-cols-2">
                      <TabsTrigger value="chat">Chat Bot</TabsTrigger>
                      <TabsTrigger value="outfits" id="outfits-tab" ref={tabsRef}>Trang Phục</TabsTrigger>
                    </TabsList>
                    <TabsContent value="chat" className="p-0">
                      <ScrollArea className="h-[380px] p-4">
                        <div className="space-y-4">
                          <div className="bg-fashine-purple/10 p-3 rounded-lg max-w-[85%]">
                            <p className="text-gray-800">
                              Xin chào! Tôi là trợ lý thời trang AI của Fashine. Tôi có thể giúp gì cho bạn hôm nay?
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="bg-fashine-purple text-white p-3 rounded-lg inline-block max-w-[85%]">
                              <p>Tôi đang tìm một bộ đồ cho buổi tiệc cuối tuần này.</p>
                            </div>
                          </div>
                          
                          <div className="bg-fashine-purple/10 p-3 rounded-lg max-w-[85%]">
                            <p className="text-gray-800">
                              Tuyệt vời! Bạn có thể cho tôi biết thêm về phong cách bạn yêu thích không? Bạn thích trang phục thanh lịch, năng động hay cá tính?
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className="bg-fashine-purple text-white p-3 rounded-lg inline-block max-w-[85%]">
                              <p>Tôi thích phong cách thanh lịch nhưng không quá trang trọng.</p>
                            </div>
                          </div>
                          
                          <div className="bg-fashine-purple/10 p-3 rounded-lg max-w-[85%]">
                            <p className="text-gray-800">
                              Tôi hiểu rồi. Tôi gợi ý bạn nên thử "Elegant Evening" trong phần Trang Phục. Đó là sự kết hợp thanh lịch nhưng không quá trang trọng, phù hợp cho các buổi tiệc cuối tuần.
                            </p>
                          </div>
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <div className="flex">
                          <Input 
                            type="text" 
                            placeholder="Nhập tin nhắn..." 
                            className="flex-1 border rounded-l-lg focus:ring-fashine-purple"
                          />
                          <Button 
                            className="rounded-l-none bg-fashine-purple hover:bg-fashine-purple-dark"
                          >
                            Gửi
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="outfits" className="p-0">
                      <ScrollArea className="h-[380px] p-4">
                        <div className="grid grid-cols-2 gap-4">
                          {outfits.map((outfit) => (
                            <div 
                              key={outfit.id}
                              className={`border rounded-lg p-2 cursor-pointer hover:border-fashine-purple transition-all ${activeOutfit === outfit.id ? 'border-fashine-purple ring-2 ring-fashine-purple/30' : ''}`}
                              onClick={() => applyOutfit(outfit.id)}
                            >
                              <img 
                                src={outfit.image} 
                                alt={outfit.name} 
                                className="w-full h-40 object-cover rounded mb-2"
                              />
                              <p className="text-sm font-medium text-center">{outfit.name}</p>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t">
                        <Button 
                          className="w-full bg-fashine-purple hover:bg-fashine-purple-dark"
                          disabled={!activeOutfit}
                        >
                          Áp dụng trang phục
                        </Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Button 
                size="icon" 
                className="h-14 w-14 rounded-full bg-fashine-purple shadow-lg hover:bg-fashine-purple/90"
                onClick={toggleChat}
              >
                <MessageCircle className="h-6 w-6 text-white" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TryOn;

