
'use client'

import React, { useState } from "react";
import { useBlogContext } from "@/context/ContextProvider";


export default function AdminPanel() {
  const {
    filteredBlogs,
    addBlog,
    updateBlog,
    deleteBlog,
    loading,
    category,
    searchQuery,
    setSearchQuery,
  } = useBlogContext();

  const [form, setForm] = useState({ title: "", description: "", category: "" });
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim() || !form.description.trim() || !form.category.trim()) {
      alert("لطفاً همه فیلدها را پر کنید");
      return;
    }

    if (editId) {
      updateBlog(editId, form);
      setEditId(null);
    } else {
      addBlog({ ...form, image: "/images/data/default.png" });
    }

    setForm({ title: "", description: "", category: "" });
  };

  const handleEdit = (blog) => {
    setForm({
      title: blog.title,
      description: blog.description,
      category: blog.category,
    });
    setEditId(blog.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* عنوان + دکمه خروج */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold">مدیریت بلاگ‌ها</h1>
        
      </div>

      {/* فرم افزودن / ویرایش */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-4 mb-6 space-y-3"
      >
        <input
          type="text"
          placeholder="عنوان"
          className="border p-2 w-full rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <textarea
          placeholder="توضیحات"
          className="border p-2 w-full rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
        <select
          className="border p-2 w-full rounded"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          <option value="">انتخاب دسته‌بندی</option>
          {category
            .filter((c) => c !== "همه")
            .map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
        >
          {editId ? "ویرایش بلاگ" : "افزودن بلاگ"}
        </button>
      </form>

      {/* فیلد جستجو */}
      <input
        type="text"
        placeholder="جستجو در بلاگ‌ها..."
        className="border p-2 w-full rounded mb-4"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {/* لیست بلاگ‌ها */}
      {loading ? (
        <p className="text-center text-gray-500">در حال بارگذاری...</p>
      ) : filteredBlogs.length === 0 ? (
        <p className="text-center text-gray-500">هیچ بلاگی موجود نیست.</p>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow rounded-lg p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{blog.title}</h3>
                <p className="text-gray-600">{blog.description}</p>
                <span className="text-sm text-gray-500">
                  دسته‌بندی: {blog.category}
                </span>
              </div>

              <div className="flex gap-2 mt-3 sm:mt-0">
                <button
                  onClick={() => handleEdit(blog)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  ویرایش
                </button>
                <button
                  onClick={() => deleteBlog(blog.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  حذف
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
