export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isDeleting,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-end sm:items-center justify-center min-h-screen z-50 transition-all duration-500 p-0 sm:p-4 ${
        isOpen
          ? "opacity-100 backdrop-blur-sm pointer-events-auto"
          : "opacity-0 backdrop-blur-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div
        className={`relative bg-secondary text-text sm:max-w-lg p-8 rounded-2xl shadow-2xl max-w-lg md:max-w-xl w-full border border-jobcard-border transition-all duration-500 ease-out-back rounded-t-4xl sm:rounded-2xl max-h-[90vh] flex flex-col
            ${
              isOpen
                ? "translate-y-0 scale-100 opacity-100 blur-none"
                : "translate-y-12 scale-95 opacity-0 blure-md"
            }
          `}
      >
        <h2>Delete {title}?</h2>
        <div>
          <button onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
          <button onClick={onClose} disabled={isDeleting}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
