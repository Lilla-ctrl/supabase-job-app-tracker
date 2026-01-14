import { useState, useEffect } from "react";
import { supabase } from "../helpers/supabase-client";
import Jobcard from "./Jobcard";
import Modal from "./Modal";

export default function Tracker({ session }) {
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
  const [jobs, setJobs] = useState([]);

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

  async function handleDelete(id) {
    const { error } = await supabase
      .from("job_applications")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("Error deleting job:", error.message);
      return;
    }
  }

  async function logout() {
    await supabase.auth.signOut();
  }

  async function fetchJobs() {
    const { error, data } = await supabase
      .from("job_applications")
      .select("*")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error reading job:", error.message);
      return;
    }

    setJobs(data);
  }

  useEffect(() => {
    fetchJobs();
  }, []);

  /* Supabase actions */
  useEffect(() => {
    const session = supabase.auth.getSession();

    if (!session) return;

    const insertChannel = supabase.channel("jobs-insert-channel");
    insertChannel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "job_applications" },
        (payload) => {
          console.log("Insert:", payload);
          setJobs((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    const updateChannel = supabase.channel("jobs-update-channel");
    updateChannel
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "job_applications" },
        (payload) => {
          console.log("Update:", payload);
          setJobs((prev) =>
            prev.map((job) => (job.id === payload.new.id ? payload.new : job))
          );
        }
      )
      .subscribe();

    const deleteChannel = supabase.channel("jobs-delete-channel");
    deleteChannel
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "job_applications" },
        (payload) => {
          console.log("Delete:", payload);
          setJobs((prev) => prev.filter((job) => job.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      insertChannel.unsubscribe();
      updateChannel.unsubscribe();
      deleteChannel.unsubscribe();
    };
  }, [session]);

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
        jobs={jobs}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
      />
    </>
  );
}
