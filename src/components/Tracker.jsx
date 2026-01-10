import { useState, useEffect } from "react";
import { supabase } from "../helpers/supabase-client";
import Jobcard from "./Jobcard";
import Modal from "./Modal";

export default function Tracker() {
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

      <Jobcard jobs={jobs} />
    </>
  );
}
