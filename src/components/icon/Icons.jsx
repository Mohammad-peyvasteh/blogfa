"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdLogin, MdLogout } from "react-icons/md";

const Icons = ({ isMobile }) => {
   const router=usePathname()
  const { data: session, status } = useSession();

  if (status === "loading") return null;

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className={`flex ${isMobile ? "flex-col gap-3" : "items-center gap-3"}`}>
      {session ? (
        <>
          <Link
            href="/products"
            className={router === "/products" ? "text-blue-400" : "" }
          >
            پروفایل
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-1  "
          >
            <MdLogout /> خروج
          </button>
        </>
      ) : (
        <Link href="/signin" className="flex items-center gap-1  hover:text-blue-600 transition">
          <MdLogin /> ورود
        </Link>
      )}
    </div>
  );
};

export default Icons;

