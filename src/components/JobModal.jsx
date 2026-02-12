import { useEffect, useState } from "react";
import ModalContainer from "./form/ModalContainer";
import ModalHeader from "./form/ModalHeader";
import FormError from "./form/FormError";
import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";
import FormTextarea from "./form/FormTextarea";
import FormActions from "./form/FormActions";

export default function JobModal({
  isOpen,
  setIsOpen,
  isEditing,
  onSubmit,
  selectedJob,
  setFormData,
  onSave,
  emptyJob,
}) {
  const [validationError, setValidationError] = useState("");

  const STATUS_OPTIONS = [
    "Applied",
    "Interviewing",
    "Offer received",
    "Rejected",
    "Unsolicited",
  ];

  function handleCancel() {
    setFormData(emptyJob);
    setIsOpen(false);
    setValidationError("");
  }

  function handleChange(e) {
    const { name, value } = e.target;

    const updatedData = {
      ...selectedJob,
      [name]: value,
    };

    setFormData(updatedData);

    if (validationError) {
      const error = validate(updatedData);
      setValidationError(error || "");
    }
  }

  function validate(data = selectedJob) {
    if (!data.company?.trim() || !data.position?.trim()) {
      return "Company and Position are required fields.";
    }

    if (data.notes?.length > 500) {
      return "Notes are too long (maximum 500 characters).";
    }

    if (data.applied_at) {
      const todayString = new Date().toISOString().split("T")[0];

      if (data.applied_at > todayString) {
        return "The application date cannot be in the future.";
      }
    }
    return null;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const error = validate();

    if (error) {
      setValidationError(error);
      return;
    }

    isEditing ? onSave(selectedJob) : onSubmit(selectedJob);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") handleCancel();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <ModalContainer isOpen={isOpen} onClose={handleCancel}>
      <div className="overflow-scroll sm:overflow-hidden min-h-0">
        <ModalHeader isEditing={isEditing} />
        <form className="space-y-2 sm:space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-3 sm:gap-4">
            {/* Error message */}
            <FormError message={validationError} />

            {/* Company and position */}
            <div>
              <FormInput
                label="Company"
                name="company"
                value={selectedJob?.company || ""}
                placeholder="Required field"
                required={true}
                onChange={handleChange}
              />
            </div>
            <div>
              <FormInput
                label="Position"
                name="position"
                value={selectedJob?.position || ""}
                placeholder="Required field"
                required={true}
                onChange={handleChange}
              />
            </div>

            {/* Contact & Date */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <FormInput
                  label="Contact"
                  name="contact"
                  value={selectedJob?.contact || ""}
                  placeholder=""
                  required={false}
                  onChange={handleChange}
                />
              </div>
              <div>
                <FormInput
                  label="Date applied"
                  name="applied_at"
                  value={selectedJob?.applied_at || ""}
                  placeholder=""
                  type="date"
                  required={false}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Status dropdown */}
            <div>
              <FormSelect
                label="Status"
                name="status"
                value={selectedJob.status}
                options={STATUS_OPTIONS}
                onChange={handleChange}
              />
            </div>

            {/* Notes */}
            <div>
              <FormTextarea
                label="Notes"
                name="notes"
                value={selectedJob.notes || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Buttons */}
          <FormActions onCancel={handleCancel} isEditing={isEditing} />
        </form>{" "}
      </div>
    </ModalContainer>
  );
}
