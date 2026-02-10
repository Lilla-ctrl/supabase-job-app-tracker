export default function EmptyTracker({ setIsModalOpen }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 p-8 border-2 border-dashed border-text/10 rounded-3xl mx-auto max-w-sm">
      <div className="bg-text/5 p-4 rounded-full mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 text-text/40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </div>
      <p className="text-xl text-text font-semibold">Start your tracker</p>
      <p className="text-sm text-center text-transparent bg-clip-text bg-linear-to-r from-text to-text/60 mb-6">
        You haven't added any applications yet.
        <br />
        Let's change that!
      </p>
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-6 py-2 bg-text/5 text-text rounded-xl font-semibold hover:cursor-pointer hover:scale-105 transition-transform"
      >
        Add your first job
      </button>
    </div>
  );
}
