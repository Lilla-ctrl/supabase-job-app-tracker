import { useState } from "react";
import Jobcard from "./Jobcard";
import Modal from "./Modal";
import Header from "./Header";
import { filterJobsByStatus, sortJobs } from "../helpers/jobUtils";
import { useJobs } from "../hooks/useJobs";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";

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

  const { jobs, deleteJob, addJob, updateJob, loading, error } = useJobs();

  /* Functions */
  async function handleAddJob(job) {
    const payload = {
      ...job,
      applied_at: job.applied_at || null,
    };

    try {
      await addJob(payload);
      setIsModalOpen(false);
      setNewJob(empty_job);
    } catch {}
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
      toast.success(`${itemToDelete.company} succesfully deleted.`);
    } catch {
      toast.error(`Failed to delete job.`);
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
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-4">
          {error}
        </div>
      )}
      {loading ? (
        <div className="flex justify-center mt-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text" />
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-center text-2xl text-text mt-6">
          No applications yet.
        </p>
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
