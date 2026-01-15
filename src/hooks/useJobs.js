import { useState, useEffect } from "react";
import { supabase } from "../helpers/supabase-client";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);

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

  async function addJob(payload) {
    const { error } = await supabase.from("job_applications").insert(payload);

    if (error) {
      console.error("Error adding job:", error.message);
      throw error;
    }
  }

  async function deleteJob(id) {
    try {
      const { error } = await supabase
        .from("job_applications")
        .delete()
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.error("Error deleting job:", error.message);
      throw err;
    }
  }

  async function updateJob(job) {
    try {
      const { error } = await supabase
        .from("job_applications")
        .update({
          company: job.company,
          position: job.position,
          contact: job.contact,
          notes: job.notes,
          status: job.status,
          applied_at: job.applied_at || null,
        })
        .eq("id", job.id);

      if (error) throw error;
    } catch (err) {
      console.error("Error updateing job:", err.message);
      throw err;
    }
  }

  async function logout() {
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error logging out:", err.message);
      throw err;
    }
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
          setJobs((prev) => prev.filter((job) => job.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      insertChannel.unsubscribe();
      updateChannel.unsubscribe();
      deleteChannel.unsubscribe();
    };
  }, []);

  return {
    jobs,
    deleteJob,
    addJob,
    updateJob,
    logout,
    loading,
    error,
  };
}
