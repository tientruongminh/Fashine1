
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Upload from "./pages/Upload";
import Home from "./pages/Home";
import TryOn from "./pages/TryOn";
import NotFound from "./pages/NotFound";

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
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route 
              path="/upload" 
              element={<Upload />} 
            />
            <Route 
              path="/home" 
              element={<Home />}
            />
            <Route 
              path="/try-on" 
              element={<TryOn />}
            />
            {/* Redirect to login by default */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
