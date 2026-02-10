export default function EmptyFilter({ onClear, message }) {
  return (
    <div className="flex flex-col items-center justify-center mt-20 space-y-4">
      <p className="text-lg text-text/70">{`No jobs match the ${message}.`}</p>
      <button
        onClick={onClear}
        className="px-5 py-2 bg-text/5 border border-text/10 text-text rounded-lg hover:bg-text/10 transition-colors text-sm font-medium hover:cursor-pointer"
      >
        {`Clear ${message}`}
      </button>
    </div>
  );
}
