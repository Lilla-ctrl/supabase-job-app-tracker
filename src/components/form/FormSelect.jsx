export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs sm:text-sm font-semibold uppercase tracking-widest text-text/60 mb-1 ml-1"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="shadow-inner bg-primary/50 px-4 py-2 sm:py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
      >
        <option value="" className="bg-secondary text-text">
          Select {label.toLowerCase()}:
        </option>
        {options.map((opt) => (
          <option value={opt} key={opt} className="bg-secondary text-text">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
