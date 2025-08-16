'use client'

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container mx-auto px-4 flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl text-blue-500 font-bold">
          بلاگفا
        </h1>
        <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
          یک ابزار قدرتمند برای ساخت و مدیریت وبلاگ است. بلاگفا به شما کمک می‌کند تا
          با سرعت و سهولت اطلاعات، مطالب و مقالات خود را در اینترنت منتشر کنید.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
          <button
            onClick={() => router.push("blogs")}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition"
          >
            بلاگ‌ها
          </button>
          <button
            onClick={() => router.push("products")}
            className="border border-gray-300 py-2 px-6 rounded-md hover:bg-gray-100 transition"
          >
            ورود به بخش مدیریت
          </button>
        </div>
      </div>
    </div>
  );
}


