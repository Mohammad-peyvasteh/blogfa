// import NavBar from "../header/NavBar";
// import Icons from "../icon/Icons";


// const Header = () => {
//   return (
//     <header className=" py-8 bg-white">
//       <div className=" flex justify-between items-center  mx-auto container">
//         <div className=" ">
//           <NavBar />
//         </div>
//         <div>
//           <Icons/>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;


"use client";

import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import NavBar from "../header/NavBar";
import Icons from "../icon/Icons";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-md py-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* لوگو و NavBar دسکتاپ */}
        <div className="hidden md:flex items-center gap-6">
          <NavBar />
        </div>

        {/* آیکون‌ها دسکتاپ */}
        <div className="hidden md:flex">
          <Icons />
        </div>

        {/* دکمه منوی موبایل */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-4 p-4">
          <NavBar isMobile />
          <Icons isMobile />
        </div>
      )}
    </header>
  );
};

export default Header;
