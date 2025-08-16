"use client";


import { useEffect, useState, useContext, createContext } from "react";

const ContextApi = createContext();
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const ContextProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("همه");

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL);
        const data = await res.json();
        setBlogs(data);
        setCategory(["همه", ...new Set(data.map((blog) => blog.category))]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  
const addBlog = async (newBlog) => {
  try {
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBlog),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`خطای سرور: ${res.status} - ${text}`);
    }

    const data = await res.json(); 
    setBlogs((prev) => [...prev, data]); 
  } catch (err) {
    console.error("خطا در افزودن بلاگ:", err);
  }
};

const updateBlog = async (id, updatedBlog) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBlog),
    });

    const data = await res.json();
    setBlogs((prev) => prev.map((b) => (b.id === id ? data : b)));
  } catch (err) {
    console.error(err);
  }
};


const deleteBlog = async (id) => {
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${id}`, { method: "DELETE" });

    setBlogs((prev) => prev.filter((b) => b.id !== id));
  } catch (err) {
    console.error(err);
  }
};

  const filteredBlogs = blogs
    .filter((item) =>
      selectedCategory === "همه" ? true : item.category === selectedCategory
    )
    .filter((item) =>
      searchQuery === ""
        ? true
        : item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <ContextApi.Provider
      value={{
        addBlog,
        updateBlog,
        deleteBlog,
        filteredBlogs,
        category,
        loading,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </ContextApi.Provider>
  );
};

export const useBlogContext = () => useContext(ContextApi);
