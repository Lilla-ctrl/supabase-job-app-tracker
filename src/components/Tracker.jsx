import { useState } from "react";
import Jobcard from "./Jobcard";
import Modal from "./Modal";
import Header from "./Header";
import { filterJobsByStatus, sortJobs } from "../helpers/jobUtils";
import { useJobs } from "../hooks/useJobs";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";

export default function Tracker() {
  const empty_job = {
    company: "",
    position: "",
    contact: "",
    notes: "",
    status: "",
    applied_at: "",
  };

  /* State handlers */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newJob, setNewJob] = useState(empty_job);
  const [statusForFilter, setStatusForFilter] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    jobs,
    deleteJob,
    addJob,
    updateJob,
    loading,
    error,
    setError,
    getFriendlyMessage,
  } = useJobs();

  /* Functions */
  async function handleAddJob(job) {
    const payload = {
      ...job,
      applied_at: job.applied_at || null,
    };

    try {
      await addJob(payload);
      setError(null);
      setIsModalOpen(false);
      setNewJob(empty_job);
    } catch (err) {
      setError(getFriendlyMessage(err));
    }
  }

  function handleEditClick(id) {
    const selectedJob = jobs.find((job) => job.id === id);
    setIsEditing(true);
    setNewJob(selectedJob);
    setIsModalOpen(true);
  }

  async function handleUpdateJob(job) {
    try {
      await updateJob(job);
      setError(null);
      setIsModalOpen(false);
      setNewJob(empty_job);
      setIsEditing(false);
    } catch {}
  }

  function handleSelectForDeletion(job) {
    setItemToDelete(job);
  }

  async function handleConfirmDelete() {
    setIsDeleting(true);
    try {
      await deleteJob(itemToDelete.id);
      setError(null);
      toast.success(`${itemToDelete.company} succesfully deleted.`);
    } catch (err) {
      console.error("Operation failed:", err);
      setError(getFriendlyMessage(err));
    } finally {
      setIsDeleting(false);
      setItemToDelete(null);
    }
  }

  /* Filtering and sorting */
  const filteredJobs = filterJobsByStatus(jobs, statusForFilter);
  const sortedJobs = sortJobs(filteredJobs, sortingOption);

  /* Render */
  return (
    <div className="bg-primary transition-colors duration-500 flex-1">
      {isModalOpen && (
        <Modal
          onSubmit={handleAddJob}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          isEditing={isEditing}
          selectedJob={newJob}
          setFormData={setNewJob}
          onSave={handleUpdateJob}
          emptyJob={empty_job}
        />
      )}
      {itemToDelete && (
        <DeleteModal
          isOpen={!!itemToDelete}
          title={itemToDelete?.company}
          onClose={() => setItemToDelete(null)}
          onConfirm={handleConfirmDelete}
          isDeleting={isDeleting}
        />
      )}

      <Header
        isEditing={setIsEditing}
        newJob={setNewJob}
        isModalOpen={setIsModalOpen}
        emptyJob={empty_job}
        filterStatus={statusForFilter}
        setFilterStatus={setStatusForFilter}
        sortOrder={sortingOption}
        setSortOrder={setSortingOption}
      />

      <ErrorMessage message={error} onClear={() => setError(null)} />

      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 p-8 border-2 border-dashed border-text/10 rounded-3xl mx-auto max-w-sm">
          <div className="bg-text/5 p-4 rounded-full mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-text/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <p className="text-xl text-text font-semibold">
            Start your tracker
          </p>
          <p className="text-sm text-text/60 text-center mb-6">
            You haven't added any applications yet Let's change that!
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-text/5 text-text rounded-xl font-semibold hover:cursor-pointer hover:scale-105 transition-transform"
          >
            Add your first job
          </button>
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center mt-20 space-y-4">
          <p className="text-lg text-text/70">
            No jobs match this filter.
          </p>
          <button
            onClick={() => setStatusForFilter(null)}
            className="px-5 py-2 bg-text/5 border border-text/10 text-text rounded-lg hover:bg-text/10 transition-colors text-sm font-medium hover:cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6">
          {sortedJobs.map((job) => (
            <Jobcard
              key={job.id}
              job={job}
              onDeleteRequest={handleSelectForDeletion}
              handleEditClick={handleEditClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}
