export function filterJobsByStatus(jobs, status) {
  if (!status) return jobs;

  return status === "All" ? jobs : jobs.filter((job) => status === job.status);
}

export function sortJobs(jobs, sortOption) {
  if (!sortOption) return jobs;

  const sortedJobs = [...jobs];

  switch (sortOption) {
    case "date-newest":
      sortedJobs.sort(
        (a, b) => new Date(b.applied_at) - new Date(a.applied_at)
      );
      break;
    case "date-oldest":
      sortedJobs.sort(
        (a, b) => new Date(a.applied_at) - new Date(b.applied_at)
      );
      break;
    case "company-az":
      sortedJobs.sort((a, b) => a.company.localeCompare(b.company));
      break;
    case "company-za":
      sortedJobs.sort((a, b) => b.company.localeCompare(a.company));
      break;
    case "position-az":
      sortedJobs.sort((a, b) => a.position.localeCompare(b.position));
      break;
    case "position-za":
      sortedJobs.sort((a, b) => b.position.localeCompare(a.position));
  }

  return sortedJobs;
}
