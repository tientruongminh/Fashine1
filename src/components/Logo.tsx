
import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/3e461e4c-59a4-4394-8d66-2bda4af3dce5.png" 
        alt="Fashine Logo" 
        className="h-8 w-auto"
      />
      <span className="text-xl font-bold">
        <span className="text-fashine-purple">fa</span>
        <span className="text-fashine-pink">sh</span>
        <span className="text-fashine-blue">i</span>
        <span className="text-fashine-purple">ne</span>
        <span className="text-gray-600">.ai</span>
      </span>
    </div>
  );
};

export default Logo;
