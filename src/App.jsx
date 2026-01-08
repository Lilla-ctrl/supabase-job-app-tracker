import { useEffect, useState } from "react";
import "./App.css";
import { supabase } from "./helpers/supabase-client";
import Modal from "./components/Modal";
import Jobcard from "./components/Jobcard";

function App() {
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

      
      {/* <div>Jobs:</div>
      {jobs.map((job, key) => (
        <div key={key}>
          <div>
            <h2>Company: {job.company}</h2>
            <h3>Position: {job.position}</h3>
            <h3>Status: {job.status}</h3>
          </div>
          <div>
            <button>Edit</button>
          </div>
          <div>
            <button onClick={() => handleDelete(job.id)}>Delete</button>
          </div>
        </div>
      ))} */}
    </>
  );
}

export default App;
