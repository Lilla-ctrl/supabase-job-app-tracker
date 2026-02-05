export default function FormError({ message }) {
  if (!message) return null;
  return (
    <div className="absolute top-0 left-0 right-0 w-full z-20 mb-2 p-4 bg-red-500/80 backdrop-blur-md border-red-500 rounded-lg shadow-xl">
      <div className="flex items-center gap-3">
        <span className="text-white font-bold text-lg">!</span>
        <p className="text-white text-xs font-semibold leading-tight">
          {message}
        </p>
      </div>
    </div>
  );
}
