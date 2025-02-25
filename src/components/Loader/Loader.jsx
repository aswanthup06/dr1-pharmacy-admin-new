import React from "react";

export const Loader = () => {
  return (
    <>   
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
       <span className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></span>
     </div>
    </>
  );
};
