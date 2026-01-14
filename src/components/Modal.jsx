export default function Modal({
  isOpen,
  isEditing,
  onSubmit,
  selectedJob,
  setFormData,
  onSave,
}) {
  function handleClose() {
    setFormData({
      company: "",
      position: "",
      contact: "",
      notes: "",
      status: "",
      applied_at: null,
    });
    isOpen(false);
  }

  return (
    <div className="bg-black/60 fixed inset-0 flex items-center justify-center min-h-screen ">
      <div className="bg-amber-50 p-6 rounded shadow-lg max-w-lg md:max-w-xl w-full ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (isEditing) {
              onSave(selectedJob);
            } else {
              onSubmit(selectedJob);
            }
          }}
        >
          <div>
            <div className="space-y-4">
              <label htmlFor="company" className="text-gray-500 text-lg">
                Company
              </label>
              <input
                value={selectedJob?.company || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                type="text"
                name="company"
                id="company"
                required
                className="shadow-inner p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-amber-400
"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="position" className="text-gray-500 text-lg">
                Position
              </label>
              <input
                value={selectedJob?.position || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, position: e.target.value }))
                }
                type="text"
                name="position"
                id="position"
                required
                className="shadow-inner p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-amber-400
"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="contact" className="text-gray-500 text-lg">
                Contact info
              </label>
              <input
                value={selectedJob?.contact || ""}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, contact: e.target.value }))
                }
                type="text"
                name="contact"
                id="contact"
                className="shadow-inner p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-amber-400
"
              />
            </div>
            <label htmlFor="date" className="text-gray-500 text-lg mr-2">
              Date of application
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={selectedJob?.applied_at || undefined}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, applied_at: e.target.value }))
              }
            />
            <textarea
              name="notes"
              value={selectedJob?.notes || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              id="notes"
              rows="4"
              placeholder=" Add any notes here"
              className="border mt-4 mb-2 w-full rounded-md border-gray-300 shadow-sm focus:border-teal-600 focus:ring-teal-600 sm:text-md"
            ></textarea>
            <select
              value={selectedJob?.status || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              name="status"
              id="status-select"
              className="shadow-inner p-2 border border-gray-300 rounded-md w-full text-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="">Application status</option>
              <option value="Applied">Applied</option>
              <option value="Interviewing">Interviewing</option>
              <option value="Offer received">Offer received</option>
              <option value="Rejected">Rejected</option>
              <option value="Unsolicited">Unsolicited</option>
            </select>
          </div>

          <button
            type="submit"
            className="border border-gray-300 text-gray-500 rounded-md px-3 py-1 mt-5 hover:bg-gray-300 cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={handleClose}
            className="border border-gray-300 text-gray-500 rounded-md px-3 py-1 mt-5 hover:bg-gray-300 cursor-pointer ml-2"
          >
            Cancel
          </button>
        </form>{" "}
      </div>
    </div>
  );
}
