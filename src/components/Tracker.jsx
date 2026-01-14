import { useState, useEffect } from "react";
import { supabase } from "../helpers/supabase-client";
import Jobcard from "./Jobcard";
import Modal from "./Modal";

export default function Tracker({ session }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    company: "",
    position: "",
    contact: "",
    notes: "",
    status: "",
  });
  const [jobs, setJobs] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();

    const { error } = await supabase.from("job_applications").insert(newJob);

    if (error) {
      console.error("Error adding job:", error.message);
      return;
    }

    setNewJob("");
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
      insertChannel.unsubscribe(), deleteChannel.unsubscribe();
    };
  }, [session]);

  return (
    <>
      <div>
        <button onClick={() => setIsModalOpen(true)}>Modal</button>
        <button onClick={logout}>Log out</button>
      </div>
      {isModalOpen && (
        <Modal
          newJob={newJob}
          handleSubmit={handleSubmit}
          isOpen={setIsModalOpen}
          setNewJob={setNewJob}
        />
      )}

      <Jobcard jobs={jobs} handleDelete={handleDelete} />
    </>
  );
}
