export default function NotFound() {
return (
<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
<h1 className="text-6xl font-bold text-red-600 mb-4">۴۰۴</h1>
<h2 className="text-2xl font-semibold text-gray-800 mb-2">صفحه پیدا نشد</h2>
<p className="text-gray-600 mb-6">
متأسفیم، صفحه‌ای که دنبال آن بودید وجود ندارد.
</p>
<a
href="/"
className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
>
بازگشت به صفحه اصلی
</a>
</div>
);
}