import { useState } from "react";
import Jobcard from "./Jobcard";
import Modal from "./Modal";
import { filterJobsByStatus, sortJobs } from "../helpers/jobUtils";
import { useJobs } from "../hooks/useJobs";

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

  const { jobs, deleteJob, addJob, updateJob, logout, loading, error } =
    useJobs();

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

  /* Filtering and sorting */
  const filteredJobs = filterJobsByStatus(jobs, statusForFilter);
  const sortedJobs = sortJobs(filteredJobs, sortingOption);

  /* Render */
  return (
    <>
      <div>
        <button
          onClick={() => {
            setIsEditing(false);
            setNewJob({
              company: "",
              position: "",
              contact: "",
              notes: "",
              status: "",
              applied_at: "",
            });
            setIsModalOpen(true);
          }}
        >
          Modal
        </button>
        <select
          className="border border-teal-500 rounded-md hover:bg-amber-50"
          name="filter"
          id="filter"
          value={statusForFilter || ""}
          onChange={(e) => setStatusForFilter(e.target.value)}
        >
          <option value="">Filter by status </option>
          <option value="All">All (no filter)</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer received">Offer received</option>
          <option value="Rejected">Rejected</option>
          <option value="Unsolicited">Unsolicited</option>
        </select>
        <select
          className="border border-teal-500 rounded-md hover:bg-amber-50"
          name="sort"
          id="sort"
          value={sortingOption || ""}
          onChange={(e) => setSortingOption(e.target.value)}
        >
          <option value="">Sort by:</option>
          <option value="date-newest">Date (newest)</option>
          <option value="date-oldest">Date (oldest)</option>
          <option value="company-az">Company (a-z)</option>
          <option value="company-za">Company (z-a)</option>
          <option value="position-az">Position (a-z)</option>
          <option value="position-za">Position (z-a)</option>
        </select>
        <button onClick={logout}>Log out</button>
      </div>
      {isModalOpen && (
        <Modal
          onSubmit={handleAddJob}
          isOpen={setIsModalOpen}
          isEditing={isEditing}
          selectedJob={newJob}
          setFormData={setNewJob}
          onSave={handleUpdateJob}
        />
      )}

      <Jobcard jobs={sortedJobs} onDelete={deleteJob} handleEditClick={handleEditClick} />
    </>
  );
}
