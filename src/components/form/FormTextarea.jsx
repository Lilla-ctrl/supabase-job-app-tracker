export default function FormTextarea({
  label,
  name,
  value,
  onChange,
  placeholder,
  maxLength = 500,
}) {
  const isOverLimit = value?.length > maxLength;

  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className="block mb-1 text-xs sm:text-sm font-semibold uppercase tracking-widest text-text/60 ml-1"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="3"
        className="placeholder:text-sm placeholder:text-text/30 resize-none mb-0 shadow-inner bg-primary/50 px-4 py-2 sm:py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
      ></textarea>

      <div className="flex justify-end pr-1.5 -mt-1 mb-2">
        <span
          className={`text-xs transition-colors ${
            isOverLimit ? "text-red-500 font-bold" : "text-text/40"
          }`}
        >
          {value?.length || 0} / {maxLength}
        </span>
      </div>
    </div>
  );
}
