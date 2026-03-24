export default function MyButton({ label }: { label: string }) {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white text-base font-bold py-1 px-3 rounded">
      {label}
    </button>
  );
}
