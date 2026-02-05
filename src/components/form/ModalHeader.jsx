export default function ModalHeader({ isEditing }) {
  return (
    <h2 className="text-md sm:text-2xl text-center uppercase font-semibold tracking-tight sm:mb-6">
      {isEditing ? "Edit application" : "New application"}
    </h2>
  );
}
