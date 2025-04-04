import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import { Shirt, MessageCircle, ChevronDown, Eye, History } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Draggable from 'react-draggable';

const TryOn = () => {
 const navigate = useNavigate();
 const [chatOpen, setChatOpen] = useState(true);
 const [activeOutfit, setActiveOutfit] = useState<string | null>(null);
 const [userImage, setUserImage] = useState<string | null>(localStorage.getItem('userImage'));
 const [chatBounds, setChatBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
 const chatRef = useRef<HTMLDivElement>(null);
 // Lịch sử thử đồ
 const [tryOnHistory, setTryOnHistory] = useState<Array<any>>([]);

 // Danh sách quần áo, bao gồm giá thành và lượng mua
 const [shopItems, setShopItems] = useState([
   { id: "item1", name: "Áo Thun Cổ Tròn", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?ixlib=rb-4.0.3&auto=format&fit=crop&w=687&q=80", price: 150000, purchases: 120 },
   { id: "item2", name: "Áo Sơ Mi Trắng", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&auto=format&fit=crop&w=725&q=80", price: 300000, purchases: 80 },
   { id: "item3", name: "Quần Jeans", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=726&q=80", price: 450000, purchases: 200 },
   { id: "item4", name: "Đầm Dài", image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=783&q=80", price: 600000, purchases: 50 },
   { id: "item5", name: "Áo Khoác Bomber", image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=736&q=80", price: 700000, purchases: 90 },
   { id: "item6", name: "Vest Nam", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80", price: 1200000, purchases: 30 },
 ]);

 const updateChatBounds = () => {
   if (chatRef.current) {
     const chatWidth = chatRef.current.offsetWidth;
     const chatHeight = chatRef.current.offsetHeight;
     const windowWidth = window.innerWidth;
     const windowHeight = window.innerHeight;

     setChatBounds({
       left: 0,
       top: 0,
       right: windowWidth - chatWidth,
       bottom: windowHeight - chatHeight,
     });
   }
 };

 useEffect(() => {
   updateChatBounds();
   window.addEventListener('resize', updateChatBounds);

   return () => {
     window.removeEventListener('resize', updateChatBounds);
   };
 }, [chatOpen]);

 // Load history from localStorage
 useEffect(() => {
   const savedHistory = localStorage.getItem('tryOnHistory');
   if (savedHistory) {
     setTryOnHistory(JSON.parse(savedHistory));
   }
 }, []);

 // Save history to localStorage whenever it changes
 useEffect(() => {
   localStorage.setItem('tryOnHistory', JSON.stringify(tryOnHistory));
 }, [tryOnHistory]);

 const toggleChat = () => {
   setChatOpen(!chatOpen);
 };

 const handleTryOn = (item: any) => {
   setActiveOutfit(item.id);
   
   // Add to history
   const newHistory = [item, ...tryOnHistory.filter(i => i.id !== item.id)].slice(0, 5);
   setTryOnHistory(newHistory);
 };

 const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
   const file = event.target.files?.[0];
   if (file) {
     const reader = new FileReader();
     reader.onloadend = () => {
       const imageUrl = reader.result as string;
       localStorage.setItem('userImage', imageUrl);
       setUserImage(imageUrl);
     };
     reader.readAsDataURL(file);
   }
 };

 const handleRemoveImage = () => {
   localStorage.removeItem('userImage');
   setUserImage(null);
 };

 const handleRemoveFromHistory = (index: number, e: React.MouseEvent) => {
  e.stopPropagation(); // Ngăn sự kiện click lan tỏa đến phần tử cha
  setTryOnHistory(prevHistory => {
    const newHistory = [...prevHistory];
    newHistory.splice(index, 1); // Xóa phần tử tại vị trí index
    return newHistory;
  });
};

 // Hàm để thêm quần áo mới từ trang upload
 const addNewItem = (newItem: { id: string; name: string; image: string; price: number; purchases: number }) => {
   setShopItems((prevItems) => [...prevItems, newItem]);
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
         <Button
           onClick={() => navigate('/upload-clothing')}
           className="mt-4 bg-fashine-purple hover:bg-fashine-purple-dark text-white"
         >
           Thêm Quần Áo Mới
         </Button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="bg-white p-6 rounded-lg shadow-md">
           <h2 className="text-xl font-semibold mb-6 flex items-center">
             <Shirt className="h-5 w-5 mr-2 text-fashine-purple" />
             Bộ Sưu Tập Quần Áo
           </h2>

           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {shopItems.map((item) => (
               <TooltipProvider key={item.id}>
                 <Tooltip>
                   <TooltipTrigger asChild>
                     <div 
                       className="border rounded-lg p-2 cursor-pointer hover:border-fashine-purple transition-all relative group"
                     >
                       <img 
                         src={item.image} 
                         alt={item.name} 
                         className="w-full h-40 object-cover rounded mb-2"
                       />
                       <p className="text-sm font-medium text-center">{item.name}</p>
                       <p className="text-xs text-gray-500 text-center">Giá: {item.price.toLocaleString()} VNĐ</p>
                       <p className="text-xs text-gray-500 text-center">Lượt mua: {item.purchases}</p>
                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                         <Button 
                           onClick={(e) => {
                             e.stopPropagation();
                             handleTryOn(item);
                           }}
                           className="bg-fashine-purple hover:bg-fashine-purple-dark"
                           size="sm"
                         >
                           <Eye className="h-4 w-4 mr-1" />
                           Thử đồ
                         </Button>
                       </div>
                     </div>
                   </TooltipTrigger>
                   <TooltipContent>
                     <p>Thử đồ ngay</p>
                   </TooltipContent>
                 </Tooltip>
               </TooltipProvider>
             ))}
           </div>
         </div>

         <div className="bg-white p-6 rounded-lg shadow-md h-full">
           <h2 className="text-xl font-semibold mb-4 flex items-center">
             <Shirt className="h-5 w-5 mr-2 text-fashine-purple" />
             Khu Vực Thử Đồ
           </h2>

           <div className="border rounded-lg p-4 h-96 bg-gray-50 flex items-center justify-center mb-4">
             {userImage ? (
               <div className="relative w-full h-full flex items-center justify-center">
                 <img 
                   src={userImage} 
                   alt="Your uploaded image" 
                   className="max-h-full max-w-full object-contain"
                   onError={() => setUserImage(null)}
                 />
                 {activeOutfit && (
                   <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none">
                     <img 
                       src={shopItems.find(o => o.id === activeOutfit)?.image} 
                       alt="Virtual outfit" 
                       className="max-h-full max-w-full object-contain opacity-80"
                     />
                   </div>
                 )}
                 <Button
                   variant="destructive"
                   size="sm"
                   className="absolute top-2 right-2"
                   onClick={handleRemoveImage}
                 >
                   Xóa ảnh
                 </Button>
               </div>
             ) : (
               <div className="text-center">
                 <Button
                   variant="outline"
                   className="border-fashine-purple text-fashine-purple"
                   asChild
                 >
                   <label htmlFor="image-upload">
                     Tải ảnh lên
                     <input 
                       type="file" 
                       id="image-upload" 
                       accept="image/*" 
                       className="hidden" 
                       onChange={handleImageUpload}
                     />
                   </label>
                 </Button>
               </div>
             )}
           </div>
             
           {activeOutfit && userImage && (
             <div className="text-center mb-6">
               <p className="text-sm text-gray-600 mb-2">Đang thử: {shopItems.find(o => o.id === activeOutfit)?.name}</p>
               <Button 
                 variant="outline" 
                 size="sm" 
                 className="text-fashine-purple border-fashine-purple"
               >
                 Chụp ảnh
               </Button>
             </div>
           )}

           {/* Thêm phần lịch sử thử đồ */}
           <div className="mt-4">
             <h3 className="text-md font-semibold mb-3 flex items-center">
               <History className="h-4 w-4 mr-2 text-fashine-purple" />
               Lịch Sử Thử Đồ
             </h3>
             
             {tryOnHistory.length > 0 ? (
               <div className="flex space-x-2 overflow-x-auto py-2">
                 {tryOnHistory.map((item, index) => (
                   <div 
                     key={`${item.id}-${index}`} 
                     className="flex-shrink-0 w-20 cursor-pointer group"
                     onClick={() => handleTryOn(item)}
                   >
                     <div className="relative">
                       <img 
                         src={item.image} 
                         alt={item.name} 
                         className="w-20 h-20 object-cover rounded border border-gray-200 group-hover:border-fashine-purple"
                       />
                       {/* Nút xóa ở góc trên bên phải */}
                       <button
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={(e) => handleRemoveFromHistory(index, e)}
                            aria-label="Xóa khỏi lịch sử"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all">
                         <Button 
                           className="opacity-0 group-hover:opacity-100 bg-fashine-purple hover:bg-fashine-purple-dark"
                           size="sm"
                           variant="secondary"
                           onClick={(e) => {
                             e.stopPropagation();
                             handleTryOn(item);
                           }}
                         >
                           <Eye className="h-3 w-3" />
                         </Button>
                       </div>
                     </div>
                     <p className="text-xs text-center mt-1 truncate">{item.name}</p>
                   </div>
                 ))}
               </div>
             ) : (
               <p className="text-sm text-gray-500 italic">Chưa có lịch sử thử đồ</p>
             )}
           </div>
         </div>

         <Draggable
           defaultPosition={{ x: 0, y: 0 }}
           bounds={chatBounds}
         >
           <div
             ref={chatRef}
             className={`fixed bottom-4 left-4 z-10 ${chatOpen ? 'w-full md:w-1/3 max-w-md' : 'w-auto'}`}
           >
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
                   <ScrollArea className="h-[380px] p-4">
                     <div className="space-y-4">
                       <div className="bg-fashine-purple/10 p-3 rounded-lg max-w-[85%]">
                         <p className="text-gray-800">
                           Xin chào! Tôi là trợ lý thời trang AI của Fashine. Tôi có thể giúp gì cho bạn hôm nay?
                         </p>
                       </div>
                       <div className="text-right">
                         <div className="bg-fashine-purple text-white p-3 rounded-lg inline-block max-w-[85%]">
                           <p>Tôi đang tìm một bộ đồ cho buổi tiệc tối nay.</p>
                         </div>
                       </div>
                       <div className="bg-fashine-purple/10 p-3 rounded-lg max-w-[85%]">
                         <p className="text-gray-800">
                           Tuyệt vời! Tôi gợi ý bạn thử chiếc đầm dài này nhé, rất thanh lịch và phù hợp cho buổi tiệc tối.
                         </p>
                         <img
                           src="https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=783&q=80"
                           alt="Đầm Dài gợi ý"
                           className="mt-2 rounded-lg max-w-full"
                         />
                       </div>
                       <div className="text-right">
                         <div className="bg-fashine-purple text-white p-3 rounded-lg inline-block max-w-[85%]">
                           <p>Nhìn đẹp đấy! Tôi muốn thử thêm một bộ nữa, có gì năng động hơn không?</p>
                         </div>
                       </div>
                       <div className="bg-fashine-purple/10 p-3 rounded-lg max-w-[85%]">
                         <p className="text-gray-800">
                           Chắc chắn rồi! Bạn có thể thử bộ này, áo thun kết hợp với quần jeans, rất năng động và trẻ trung.
                         </p>
                         <img
                           src="https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&auto=format&fit=crop&w=726&q=80"
                           alt="Quần Jeans gợi ý"
                           className="mt-2 rounded-lg max-w-full"
                         />
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
                 </CardContent>
               </Card>
             ) : (
               <Button 
                 size="icon" 
                 onClick={toggleChat} 
                 className="bg-fashine-purple text-white rounded-full shadow-lg"
               >
                 <MessageCircle className="h-5 w-5" />
               </Button>
             )}
           </div>
         </Draggable>
       </div>
     </div>
   </div>
 );
};

export default TryOn;