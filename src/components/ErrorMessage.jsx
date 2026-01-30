export default function ErrorMessage({ message, onClear }) {
  if (!message) return null;

  return (
    <div className="fixed top-24 left-1/2 -translate-x-1/2 z-100 w-[90%] max-w-md animate-in fade-in slide-infrom-top-4 duration-300">
      <div className="bg-secondary border border-red-500/50 shadow-2xl rounded-2xl p-4 flex items-center gap-4">
        {/* Warning icon */}
        <div className="shrink-0 w-10 h-10 bg-red-500/50 text-red-500 rounded-full flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-text">
            Something went wrong.
          </p>
          <p className="text-xs opacity-70 text-text truncate">
            {message}
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onClear}
          className="shrink-0 ml-auto p-2 rounded-lg hover:bg-black/5 text-text opacity-50 hover:opacity-100 transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
