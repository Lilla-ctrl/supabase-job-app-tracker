import { useState } from "react";
import { useJobs } from "../hooks/useJobs";

export default function Header({
  isEditing,
  newJob,
  isModalOpen,
  emptyJob,
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
  jobs,
}) {
  const { user, logout } = useJobs();
  const firstName = user?.user_metadata?.first_name;

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Hero section */}

      {/* Welcome + Login */}
      <div>
        <div className="flex justify-start items-center gap-4 mb-8 text-sm">
          <span className="text-text/70 font-medium">
            {firstName ? `Welcome, ${firstName}!` : "Welcome!"}
          </span>
          <button
            onClick={logout}
            className="text-text/60 hover:text-text transition-colors border-l-2 border-jobcard-border pl-4 cursor-pointer"
          >
            Log out
          </button>
        </div>

        {/* Headline */}
        <h1 className="text-text text-5xl sm:text-6xl tracking-tighter font-bold mb-1">
          Job Application Tracker
        </h1>
        <p className="text-text/60 text-lg font-medium">
          Your next big move starts here.
        </p>
      </div>

      {/* Top divider */}
      <div className="h-px w-full bg-linear-to-r from-slate-500 via-slate-300 to-transparent mt-2" />

      {/* Toolbar section */}
      {jobs.length > 0 && (
        <>
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 lg:gap-8 py-8">
            {/* Left side - search bar */}
            <div className="relative w-full md:w-80 group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-text/50 group-focus-within:text-button transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </span>
              <input
                type="text"
                id="keyword-search"
                placeholder="Search by keyword"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full h-10 bg-secondary border border-jobcard-border text-text pl-12 py-2 rounded-xl shadow-sm hover:border-button/50 focus:ring-2 focus:ring-button/20 outline-none transition-all"
              />
            </div>

            {/* Right side: filter & sort & add */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto md:w-80">
              {/* Filter and sort */}
              <div className="flex gap-2 w-full sm:w-auto">
                {/* Filter dropdown */}
                <select
                  className="h-10 w-1/2 appearance-none text-center bg-secondary border border-jobcard-border text-text px-4 py-2 rounded-xl shadow-sm hover:border-button transition-all cursor-pointer focus:ring-2 focus:ring-button/20 outline-none"
                  name="filter"
                  id="filter"
                  value={filterStatus || ""}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="">Filter by status: </option>
                  <option value="All">All (no filter)</option>
                  <option value="Applied">Applied</option>
                  <option value="Interviewing">Interviewing</option>
                  <option value="Offer received">Offer received</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Unsolicited">Unsolicited</option>
                </select>

                {/* Sort dropdown */}
                <select
                  className="h-10 w-1/2 text-center appearance-none bg-secondary border border-jobcard-border text-text px-8 py-2 rounded-xl shadow-sm hover:border-button transition-all cursor-pointer focus:ring-2 focus:ring-button/20 outline-none"
                  id="sort"
                  value={sortOrder || ""}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="">Sort by:</option>
                  <option value="date-newest">Date (newest)</option>
                  <option value="date-oldest">Date (oldest)</option>
                  <option value="company-az">Company (a-z)</option>
                  <option value="company-za">Company (z-a)</option>
                  <option value="position-az">Position (a-z)</option>
                  <option value="position-za">Position (z-a)</option>
                </select>
              </div>

              {/* Add button */}
              <button
                className="h-10 bg-button text-button-text font-semibold py-2 px-6 rounded-xl shadow-lg shadow-button/20 hover:bg-button-hover active:scale-[0.98] transition-all cursor-pointer sm:ml-2 whitespace-nowrap"
                onClick={() => {
                  isEditing(false);
                  newJob(emptyJob);
                  isModalOpen(true);
                }}
              >
                + New Application
              </button>
            </div>
          </div>

          {/* Bottom divider */}
          <div className="h-px w-full bg-linear-to-r from-slate-500 via-slate-300 to-transparent" />
        </>
      )}
    </header>
  );
}
