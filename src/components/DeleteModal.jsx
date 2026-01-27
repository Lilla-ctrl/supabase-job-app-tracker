export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isDeleting,
}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center min-h-screen z-50 transition-all duration-500 p-0 sm:p-4 ${
        isOpen
          ? "opacity-100 backdrop-blur-sm pointer-events-auto"
          : "opacity-0 backdrop-blur-0 pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-black/60" />
      <div
        className={`relative bg-secondary text-text sm:max-w-lg p-8 rounded-2xl shadow-2xl max-w-lg md:max-w-xl border border-jobcard-border transition-all duration-500 ease-out-back rounded-t-4xl sm:rounded-2xl max-h-[90vh] flex flex-col
            ${
              isOpen
                ? "translate-y-0 scale-100 opacity-100 blur-none"
                : "translate-y-12 scale-95 opacity-0 blure-md"
            }
          `}
      >
        <div className="text-center">
          <h2 className="tracking-tight text-text text-lg">
            Are you sure about deleting <strong>{title}</strong>?
          </h2>
          <p className="text-sm text-text/60 leading-relaxed">
            This action <strong>cannot be undone</strong>.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 mt-4">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 order-2 sm:order-1 border mr-3 border-jobcard-border text-text font-semibold rounded-xl px-4 py-2 mt-5 hover:bg-modal-button-hover active:scale-95 cursor-pointer transition-all shadow-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex-1 order-2 sm:order-1 border mr-3 border-red-300 bg-red-500/20 text-red-700 font-semibold rounded-xl px-4 py-2 mt-5 hover:bg-red-500/70 active:scale-95 cursor-pointer transition-all shadow-md"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
