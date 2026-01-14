export function filterJobsByStatus(jobs, status) {
  if (!status) return jobs;

  return status === "All" ? jobs : jobs.filter((job) => status === job.status);
}
