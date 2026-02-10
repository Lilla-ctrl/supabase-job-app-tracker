export default function ModalHeader({ isEditing }) {
  return (
    <h2 className="text-md sm:text-2xl md:text-lg lg:text-2xl text-center uppercase font-semibold tracking-tight mb-6 md:mb-1 lg:mb-6 lg:mt-4">
      {isEditing ? "Edit application" : "New application"}
    </h2>
  );
}
