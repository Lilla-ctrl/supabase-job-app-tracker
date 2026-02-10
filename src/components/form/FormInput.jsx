export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <label
        htmlFor={name}
        className="block sm:w-24 shrink-0 text-xs lg:text-sm font-semibold uppercase tracking-widest text-text/70 ml-1"
      >
        {label}
        {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="placeholder:text-sm placeholder:text-text/30 shadow-inner bg-primary/50 px-4 py-2 sm:py-3 md:py-1 lg:py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
      />
    </div>
  );
}
