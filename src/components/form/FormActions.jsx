export default function FormActions({ onCancel, isEditing }) {
  return (
    <div className="flex gap-3 sm:mt-6">
      <button
        onClick={onCancel}
        type="button"
        className="flex-1 border border-jobcard-border text-text font-semibold rounded-xl px-4 py-2  hover:bg-modal-button-hover active:scale-95 cursor-pointer transition-all shadow-md"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="flex-1 bg-text/20 border border-jobcard-border text-text font-semibold rounded-xl px-4 py-2 hover:bg-modal-button-hover active:scale-95 cursor-pointer transition-all shadow-md"
      >
        {isEditing ? "Save" : "+ Add"}
      </button>
    </div>
  );
}
