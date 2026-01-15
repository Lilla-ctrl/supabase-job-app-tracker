import { useState } from "react";
import { supabase } from "../helpers/supabase-client";
import Jobcard from "./Jobcard";
import Modal from "./Modal";
import { filterJobsByStatus, sortJobs } from "../helpers/jobUtils";
import { useJobs } from "../hooks/useJobs";

export default function Tracker() {
  /* State handlers */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    contact: "",
    notes: "",
    status: "",
    applied_at: "",
  });
  const [statusForFilter, setStatusForFilter] = useState(null);
  const [sortingOption, setSortingOption] = useState(null);

  const {jobs, handleDelete, loading, error} = useJobs();

  /* Functions */
  async function handleSubmit(job) {
    const payload = {
      ...job,
      applied_at: job.applied_at === "" ? null : job.applied_at,
    };

    const { error } = await supabase.from("job_applications").insert(payload);

    if (error) {
      console.error("Error adding job:", error.message);
      return;
    }

    setIsModalOpen(false);
    setNewJob({
      company: "",
      position: "",
      contact: "",
      notes: "",
      status: "",
      applied_at: "",
    });
  }

  function handleEdit(id) {
    const selectedJob = jobs.find((job) => job.id === id);
    setIsEditing(true);
    setNewJob(selectedJob);
    setIsModalOpen(true);
  }

  async function handleSave(job) {
    const payload = {
      company: job.company,
      position: job.position,
      contact: job.contact,
      notes: job.notes,
      status: job.status,
      applied_at: job.applied_at === "" ? null : job.applied_at,
    };

    const { error } = await supabase
      .from("job_applications")
      .update(payload)
      .eq("id", job.id);

    if (error) {
      console.error("Error updating job:", error.message);
      return;
    }

    setIsModalOpen(false);
  }

  

  async function logout() {
    await supabase.auth.signOut();
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
          onSubmit={handleSubmit}
          isOpen={setIsModalOpen}
          isEditing={isEditing}
          selectedJob={newJob}
          setFormData={setNewJob}
          onSave={handleSave}
        />
      )}

      <Jobcard
        jobs={sortedJobs}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}
