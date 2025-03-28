
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import TryOn from "./pages/TryOn";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import UploadClothing from './pages/UploadClothing';
const queryClient = new QueryClient();

const App = () => {
  // This would normally check a real authentication state
  const hasUserImage = localStorage.getItem('userImage') !== null;

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
          <Route 
              path="/home" 
              element={<Home />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
           
            <Route 
              path="/try-on" 
              element={<TryOn />}
            />
            <Route path="/upload-clothing" element={<UploadClothing />} />
            <Route 
              path="/profile" 
              element={<Profile />}
            />
            {/* Redirect to login by default */}
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;