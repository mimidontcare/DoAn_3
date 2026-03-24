import Link from "next/link";

export default function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={className}>
      <div className="h-16 flex items-center px-4 font-bold text-lg border-b">
        ADMIN
      </div>

      <nav className="p-3 space-y-2">
        <Link href="/dashboard" className="block hover:bg-gray-100 p-2 rounded">
          Dashboard
        </Link>

        <Link href="/users" className="block hover:bg-gray-100 p-2 rounded">
          Users
        </Link>

        <Link href="/settings" className="block hover:bg-gray-100 p-2 rounded">
          Settings
        </Link>
      </nav>
    </aside>
  );
}
