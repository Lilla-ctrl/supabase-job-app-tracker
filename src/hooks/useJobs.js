import { useState, useEffect } from "react";
import { supabase } from "../helpers/supabase-client";
import toast from "react-hot-toast";

export function useJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState([]);
  const [user, setUser] = useState(null);

  async function fetchUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    setUser(user);
  }

  async function fetchJobs() {
    try {
      setLoading(true);
      const { error, data } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setJobs(data);
    } catch (error) {
      console.error("Error reading job:", error.message);
      toast.error("Failed to load applications. Please refresh.");
    } finally {
      setLoading(false);
    }
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
      setError(null);
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
      console.error("Error updating job:", err.message);
      setError(err.message)
      throw err;
    }
  }

  async function logout() {
    try {
      const name = user?.user_metadata?.first_name || "there";
      toast(`Bye ${name}, have a great day!`, {
        icon: "👋",
      });
      await supabase.auth.signOut();
    } catch (err) {
      console.error("Error logging out:", err.message);
      toast.error("Logout failed. Please try again.")
    }
  }

  useEffect(() => {
    fetchJobs();
    fetchUser();
  }, []);

  useEffect(() => {
    if (!user) return;

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
  }, [user]);

  return {
    jobs,
    user,
    deleteJob,
    addJob,
    updateJob,
    logout,
    loading,
    error,
    setError
  };
}
