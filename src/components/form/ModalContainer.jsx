export default function ModalContainer({isOpen, onClose, children}) {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center min-h-dvh z-50 transition-all duration-500 ${
        isOpen
          ? "opacity-100 backdrop-blur-sm pointer-events-auto"
          : "opacity-0 backdrop-blur-0 pointer-events-none"
      }`}
    >
      {/* Clickable backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Animated card wrapper */}
      <div
        className={`relative mx-4 my-auto px-6 py-3 sm:px-12 sm:py-8 sm:mx-0 bg-secondary text-text sm:max-w-lg rounded-2xl shadow-2xl max-w-lg md:max-w-xl w-full border border-jobcard-border transition-all duration-500 ease-out-back rounded-t-4xl sm:rounded-2xl max-h-[90vh] flex flex-col
                  ${
                    isOpen
                      ? "translate-y-0 scale-100 opacity-100 blur-none"
                      : "translate-y-12 scale-95 opacity-0 blur-md"
                  }
                `}
      >
        {children}
      </div>
    </div>
  );
}
