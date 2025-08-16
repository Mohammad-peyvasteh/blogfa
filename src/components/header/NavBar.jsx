
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavBar = ({ isMobile }) => {
  const router = usePathname();
  const linkClass = (path) =>
    `hover:text-blue-400 transition ${
      router === path ? "text-blue-400" : ""
    }`;

  return (
    <div
      className={`flex ${
        isMobile ? "flex-col items-center gap-4" : "justify-around items-center gap-5"
      }`}
    >
      <Image src="/images/logo.png" width={100} height={40} alt="Logo" />
      <Link href="/" className={linkClass("/")}>
        صفحه اصلی
      </Link>
      <Link href="/blogs" className={linkClass("/blogs")}>
        مشاهده بلاگ‌ها
      </Link>
    </div>
  );
};

export default NavBar;
