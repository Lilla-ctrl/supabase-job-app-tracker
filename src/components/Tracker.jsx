import { useMemo, useState } from "react";
import JobModal from "./JobModal";
import Header from "./Header";
import { filterJobsByStatus, sortJobs, searchJobs } from "../helpers/jobUtils";
import { useJobs } from "../hooks/useJobs";
import DeleteModal from "./DeleteModal";
import EmptyTracker from "./tracker/EmptyTracker";
import toast from "react-hot-toast";
import ErrorMessage from "./ErrorMessage";
import LoadingSpinner from "./tracker/LoadingSpinner";
import NoMatch from "./tracker/NoMatch";
import JobGrid from "./tracker/JobGrid";

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
  const [searchTerm, setSearchTerm] = useState("");

  const {
    jobs,
    deleteJob,
    addJob,
    updateJob,
    loading,
    error,
    setError,
    getFriendlyMessage,
    fetchJobs,
  } = useJobs();

  /* Functions */
  async function handleAddJob(job) {
    const payload = {
      ...job,
      applied_at: job.applied_at || null,
    };

    try {
      await addJob(payload);
      await fetchJobs(true);
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
      await fetchJobs(true);
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
      await fetchJobs(true);
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

  /* Filtering, sorting, and searching */
  const { filteredJobs, searchedJobs, sortedJobs } = useMemo(() => {
    const filtered = filterJobsByStatus(jobs, statusForFilter);
    const searched = searchJobs(filtered, searchTerm);
    const sorted = sortJobs(searched, sortingOption);

    return {
      filteredJobs: filtered,
      searchedJobs: searched,
      sortedJobs: sorted,
    };
  }, [jobs, statusForFilter, searchTerm, sortingOption]);

  /* Render */
  return (
    <div className="bg-primary transition-colors duration-500 flex-1">
      {isModalOpen && (
        <JobModal
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
        jobs={jobs}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ErrorMessage message={error} onClear={() => setError(null)} />

      {loading ? (
        <LoadingSpinner />
      ) : jobs.length === 0 ? (
        <EmptyTracker setIsModalOpen={setIsModalOpen} />
      ) : filteredJobs.length === 0 ? (
        <NoMatch message="filter" onClear={() => setStatusForFilter(null)} />
      ) : searchedJobs.length === 0 ? (
        <NoMatch message="search" onClear={() => setSearchTerm("")} />
      ) : (
        <JobGrid
          jobs={sortedJobs}
          onDeleteRequest={handleSelectForDeletion}
          onEditClick={handleEditClick}
        />
      )}
    </div>
  );
}
