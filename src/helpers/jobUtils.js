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

export function formatDateApplied(dateString) {
  if (!dateString) return "";

  const now = new Date();
  const appliedDate = new Date(dateString);
  const diffMs = now - appliedDate;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks === 1) return "1 week ago";
  if (diffWeeks < 4) return `${diffWeeks} weeks ago`;

  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return "1 month ago";
  return `${diffMonths} months ago`;
}

export function searchJobs(searchTerm, jobs) {
  if (!Array.isArray(jobs)) return [];

  if (!searchTerm) return jobs;

  const searchableFields = [
    "company",
    "position",
    "contact",
    "applied_at",
    "status",
    "notes",
  ];

  return jobs.filter((job) =>

    searchableFields.some((field) =>
      String(job[field] || "").toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
}
