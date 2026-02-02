import { useEffect, useState } from "react";

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
  const [validationError, setValidationError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    /* Company and Position required */
    if (!selectedJob.company.trim() || !selectedJob.position.trim()) {
      setValidationError("Company and Position are required fields.");
      return;
    }

    /* Notes too long */
    if (selectedJob.notes && selectedJob.notes.length > 500) {
      setValidationError("Notes are too long (maximum 500 characters).");
      return;
    }

    /* Future date */
    const selectedDate = new Date(selectedJob.applied_at);
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (selectedJob.applied_at && selectedDate > today) {
      setValidationError("The application date cannot be in the future.");
      return;
    }

    setValidationError("");

    if (isEditing) {
      onSave(selectedJob);
    } else {
      onSubmit(selectedJob);
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
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
        className={`relative mx-4 px-6 py-6 sm:mx-0 bg-secondary text-text sm:max-w-lg rounded-2xl shadow-2xl max-w-lg md:max-w-xl w-full border border-jobcard-border transition-all duration-500 ease-out-back rounded-t-4xl sm:rounded-2xl max-h-[90vh] flex flex-col
            ${
              isOpen
                ? "translate-y-0 scale-100 opacity-100 blur-none"
                : "translate-y-12 scale-95 opacity-0 blure-md"
            }
          `}
      >
        <div className="overflow-scroll sm:overflow-hidden min-h-0">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            {isEditing ? "Edit application" : "New application"}
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4">
              {/* Error message */}
              <div className="relative">
                {validationError && (
                  <div className="absolute top-0 left-0 w-full z-10 -translate-y-full mb-2 p-3 bg-red-500/80 backdrop-blur-md border-red-500 rounded-lg shadow-xl">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-bold text-lg">!</span>
                      <p className="text-white text-xs font-semibold leading-tight">
                        {validationError}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Company and position */}
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/70 mb-1 ml-1"
                >
                  Company*
                </label>
                <input
                  value={selectedJob?.company || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      company: e.target.value,
                    }));
                    if (validationError) setValidationError("");
                  }}
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Required field"
                  className="placeholder:text-sm placeholder:text-text/30 shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
                />
              </div>
              <div className="space-y-4">
                <label
                  htmlFor="position"
                  className="block text-sm font-semibold uppercase tracking-widest text-text/70 mb-1 ml-1"
                >
                  Position*
                </label>
                <input
                  value={selectedJob?.position || ""}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }));
                    if (validationError) setValidationError("");
                  }}
                  type="text"
                  name="position"
                  id="position"
                  placeholder="Required field"
                  className="placeholder:text-sm placeholder:text-text/30 shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
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
                    className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
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
                  onChange={(e) => {
                    const newDateValue = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      applied_at: newDateValue,
                    }));

                    if (validationError) {
                      const todayString = new Date()
                        .toISOString()
                        .split("T")[0];

                      if (newDateValue <= todayString) {
                        setValidationError("");
                      }
                    }
                  }}
                  className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
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
                  className="shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
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
                  className="block text-sm font-semibold uppercase tracking-widest text-text/60 ml-1"
                >
                  Notes
                </label>
              </div>
              <div className="space-y-1">
                <textarea
                  name="notes"
                  value={selectedJob?.notes || ""}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  id="notes"
                  rows="4"
                  placeholder="Add any notes here"
                  className="placeholder:text-sm placeholder:text-text/30 resize-none mb-0 shadow-inner bg-primary/50 px-4 py-3 border border-text/10 text-text rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-text/20 outline-none transition-all"
                ></textarea>
                <div className="flex justify-end pr-1.5 -mt-1.5">
                  <span
                    className={`text-[10px] ${
                      selectedJob.notes?.length > 500
                        ? "text-red-500 font-bold"
                        : "text-text/40"
                    }`}
                  >
                    {selectedJob.notes?.length || 0} / 500
                  </span>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setFormData(emptyJob);
                  setIsOpen(false);
                }}
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
          </form>{" "}
        </div>
      </div>
    </div>
  );
}
