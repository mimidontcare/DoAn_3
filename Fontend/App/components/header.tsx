export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 border-b bg-white">
      <h1 className="font-semibold text-lg">Admin Panel</h1>

      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-300" />
        <span>Admin</span>
      </div>
    </header>
  );
}
