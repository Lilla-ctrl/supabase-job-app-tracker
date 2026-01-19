export default function Modal({
  isOpen,
  isEditing,
  onSubmit,
  selectedJob,
  setFormData,
  onSave,
  emptyJob,
}) {
  return (
    <div className="bg-black/60 fixed inset-0 flex items-center justify-center min-h-screen ">
      <div className="bg-primary text-text p-6 rounded shadow-lg max-w-lg md:max-w-xl w-full ">
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
              <label htmlFor="company" className="text-text text-lg">
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
                className="shadow-inner p-2 border border-jobcard-border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-modal-ring
"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="position" className="text-text text-lg">
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
                className="shadow-inner p-2 border border-jobcard-border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-modal-ring
"
              />
            </div>
            <div className="space-y-4">
              <label htmlFor="contact" className="text-text text-lg">
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
                className="shadow-inner p-2 border border-jobcard-border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-modal-ring
"
              />
            </div>
            <label htmlFor="date" className="text-text text-lg mr-2">
              Date of application
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={selectedJob?.applied_at || ""}
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
              className="border mt-4 mb-2 w-full rounded-md border-jobcard-border shadow-sm focus:outline-none focus:ring-2 focus:ring-modal-ring sm:text-md"
            ></textarea>
            <select
              value={selectedJob?.status || ""}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, status: e.target.value }))
              }
              name="status"
              id="status-select"
              className="bg-primary shadow-inner p-2 border border-jobcard-border rounded-md w-full text-text focus:outline-none focus:ring-2 focus:ring-modal-ring"
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
            className="border border-jobcard-border text-text rounded-md px-3 py-1 mt-5 hover:bg-modal-button-hover cursor-pointer"
          >
            Save
          </button>
          <button
            onClick={() => {
              setFormData(emptyJob);
              isOpen(false);
            }}
            type="button"
            className="border border-jobcard-border text-text rounded-md px-3 py-1 mt-5 hover:bg-modal-button-hover cursor-pointer ml-2"
          >
            Cancel
          </button>
        </form>{" "}
      </div>
    </div>
  );
}
