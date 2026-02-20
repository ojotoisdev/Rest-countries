
"use client";

import ThemeToggle from "../Theme/ThemeToggle";


const Navbar = () => {
  return (
    <nav className=" px-6 py-4   border-b border-gray-300 dark:border-gray-700 shadow-sm dark:shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center w-full max-w-360 mx-auto px-4 md:px-6 lg:px-8">
      <div>
        <h1 className="text-lightText dark:text-darkText text-xl font-bold"> Where in the world?</h1>
      </div>
      
      <div className="flex items-center gap-4">
        
        <ThemeToggle/>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
