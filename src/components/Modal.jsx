import { useEffect } from "react";

export default function Modal({
  isOpen,
  setIsOpen,
  isEditing,
  onSubmit,
  selectedJob,
  setFormData,
  onSave,
  emptyJob,
  theme,
}) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, setIsOpen]);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center min-h-screen z-50 transition-all duration-500 ${
        isOpen
          ? "opacity-100 backdrop-blur-sm pointer-events-auto"
          : "opacity-0 backdrop-blur-0 pointer-events-none"
      }`}
    >
      <div
        className="absolute inset-0 bg-black/40"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={`relative bg-secondary text-text sm:max-w-lg rounded-2xl shadow-2xl max-w-lg md:max-w-xl w-full border border-jobcard-border transition-all duration-500 ease-out-back rounded-t-4xl sm:rounded-2xl max-h-[90vh] flex flex-col
            ${
              isOpen
                ? "translate-y-0 scale-100 opacity-100 blur-none"
                : "translate-y-12 scale-95 opacity-0 blure-md"
            }
          `}
      >
        <div className="px-12 py-8 min-h-0">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            {isEditing ? "Edit application" : "New application"}
          </h2>
          <form
            className="space-y-3"
            onSubmit={(e) => {
              e.preventDefault();
              if (isEditing) {
                onSave(selectedJob);
              } else {
                onSubmit(selectedJob);
              }
            }}
          >
            {/* Company and position */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/70 mb-1 ml-1"
                >
                  Company
                </label>
                <input
                  value={selectedJob?.company || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }))
                  }
                  type="text"
                  name="company"
                  id="company"
                  required
                  className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all
"
                />
              </div>
              <div className="space-y-4">
                <label
                  htmlFor="position"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/70 mb-1 ml-1"
                >
                  Position
                </label>
                <input
                  value={selectedJob?.position || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }))
                  }
                  type="text"
                  name="position"
                  id="position"
                  required
                  className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all
"
                />
              </div>

              {/* Contact & Date */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-semibold uppercase tracking-widest text-text/60 mb-1 ml-1 "
                  >
                    Contact info
                  </label>
                  <input
                    value={selectedJob?.contact || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        contact: e.target.value,
                      }))
                    }
                    type="text"
                    name="contact"
                    id="contact"
                    className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all
"
                  />
                </div>
                <label
                  htmlFor="date"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/60 mb-1 ml-1 "
                >
                  Date applied
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  style={{ colorScheme: theme === "dark" ? "dark" : "light" }}
                  value={selectedJob?.applied_at || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      applied_at: e.target.value,
                    }))
                  }
                  className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all
"
                />
              </div>

              {/* Status dropdown */}
              <div>
                <label
                  htmlFor="status"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/60 mb-1 ml-1"
                >
                  Application Status
                </label>
                <select
                  value={selectedJob?.status || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  name="status"
                  id="status-select"
                  className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all
"
                >
                  <option value="" className="bg-secondary text-text">
                    Select status:
                  </option>
                  <option value="Applied" className="bg-secondary text-text">
                    Applied
                  </option>
                  <option
                    value="Interviewing"
                    className="bg-secondary text-text"
                  >
                    Interviewing
                  </option>
                  <option
                    value="Offer received"
                    className="bg-secondary text-text"
                  >
                    Offer received
                  </option>
                  <option value="Rejected" className="bg-secondary text-text">
                    Rejected
                  </option>
                  <option
                    value="Unsolicited"
                    className="bg-secondary text-text"
                  >
                    Unsolicited
                  </option>
                </select>
              </div>

              {/* Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/60 mb-1 ml-1"
                >
                  Notes
                </label>
              </div>
              <textarea
                name="notes"
                value={selectedJob?.notes || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, notes: e.target.value }))
                }
                id="notes"
                rows="4"
                placeholder="Add any notes here"
                className="resize-none shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all
"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(emptyJob);
                  setIsOpen(false);
                }}
                type="button"
                className="flex-1 border border-jobcard-border text-text font-semibold rounded-xl px-4 py-2 mt-5 hover:bg-modal-button-hover active:scale-95 cursor-pointer transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 bg-text/20 border border-jobcard-border text-text font-semibold rounded-xl px-4 py-2 mt-5 hover:bg-modal-button-hover active:scale-95 cursor-pointer transition-all shadow-md"
              >
                {isEditing ? "Save" : "+ Add"}
              </button>
            </div>
          </form>{" "}
        </div>
      </div>
    </div>
  );
}
