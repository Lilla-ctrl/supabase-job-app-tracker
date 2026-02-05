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
    <div>
      <label
        htmlFor={name}
        className="block text-xs sm:text-sm font-semibold uppercase tracking-widest text-text/70 mb-1 ml-1"
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
        className="placeholder:text-sm placeholder:text-text/30 shadow-inner bg-primary/50 px-4 py-2 sm:py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
      />
    </div>
  );
}
