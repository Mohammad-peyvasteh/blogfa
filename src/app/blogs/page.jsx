"use client";
import { useBlogContext } from "@/context/ContextProvider";
import Image from "next/image";
import React, { useState } from "react";

const BlogsPage = () => {
    const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // تعداد آیتم‌ها در هر صفحه
  const {filteredBlogs, category,searchQuery, setSearchQuery,selectedCategory, setSelectedCategory } = useBlogContext();
 
  // محاسبه pagination
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // اسکرول به بالا وقتی صفحه تغییر می‌کند
  };
  return (
   <section className="mx-auto container p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* دسته‌بندی */}
        <div className="flex flex-wrap gap-2 lg:flex-col">
          {category.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded ${
                selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
            >
              {cat}
            </button>
          ))}
          
        </div>

        {/* بخش بلاگ‌ها */}
        <div className="flex-1">
          {/* سرچ */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="جستجو ... "
              className="border p-2 rounded w-full"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
            />
          </div>

          {/* بلاگ‌ها */}
          {currentBlogs.length === 0 ? (
            <p className="text-center text-gray-500 mt-4">هیچ آیتمی وجود ندارد.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
              {currentBlogs.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border p-2 flex flex-col items-center justify-between"
                >
                  <div className="w-full h-[150px] relative">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded"
                    />
                  </div>
                  <p className="mt-2 font-bold text-center">{item.title}</p>
                  <p className="text-gray-500 text-center">{item.category}</p>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => goToPage(currentPage - 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
                disabled={currentPage === 1}
              >
                قبلی
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => goToPage(page)}
                  className={`px-3 py-1 border rounded ${currentPage === page ? "bg-blue-500 text-white" : "bg-white"}`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => goToPage(currentPage + 1)}
                className="px-3 py-1 border rounded disabled:opacity-50"
                disabled={currentPage === totalPages}
              >
                بعدی
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogsPage;
