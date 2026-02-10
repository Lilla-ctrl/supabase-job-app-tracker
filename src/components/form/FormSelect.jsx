export default function FormSelect({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
      <label
        htmlFor={name}
        className="block sm:w-24 text-xs lg:text-sm font-semibold uppercase tracking-widest text-text/70 ml-1 shrink-0"
      >
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`placeholder:text-sm appearance-none shadow-inner bg-primary/50 
                  px-4 py-2 sm:py-3 md:py-1 lg:py-3 border border-text/10
                  rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 
                  outline-none transition-all md:text-sm bg-no-repeat hover:cursor-poin
                  bg-position-[right_1rem_center] bg-size-[1em_1em] pr-10
                  ${!value ? "text-text/30" : "text-text"}`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='rgba(255,255,255,0.5)'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        }}
      >
        <option value="" disabled hidden>
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
