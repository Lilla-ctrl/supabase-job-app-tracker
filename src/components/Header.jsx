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
}) {
  const { user, logout } = useJobs();
  const firstName = user?.user_metadata?.first_name || "User";

  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-8">
      {/* Utility bar */}
      <div className="flex justify-start items-center gap-4 mb-8 text-sm">
        <span className="text-text/70 font-medium">Welcome, {firstName}!</span>
        <button
          onClick={logout}
          className="text-text/60 hover:text-text transition-colors border-l-2 border-jobcard-border pl-4 cursor-pointer"
        >
          Log out
        </button>
      </div>

      {/* Main header content */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div>
          <h1 className="text-text text-4xl sm:text-5xl tracking-tighter font-semibold">
            Job Application Tracker
          </h1>
          <p className="text-text/60 mt-2 font-medium">
            Your next big move starts here.
          </p>
        </div>

        {/* Action group */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="flex gap-2 w-full sm:w-auto">
            {/* Filter dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <select
                className="w-full appearance-none bg-secondary border border-jobcard-border text-text px-4 py-2 pr-10 rounded-xl shadow-sm hover:border-button transition-all cursor-pointer focus:ring-2 focus:ring-button/20 outline-none"
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
              {/* Custom arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text/40">
                ↓
              </div>
            </div>

            {/* Sort dropdown */}
            <div className="relative flex-1 sm:flex-none">
              <select
                className="w-full text-center appearance-none bg-secondary border border-jobcard-border text-text px-8 py-2 rounded-xl shadow-sm hover:border-button transition-all cursor-pointer focus:ring-2 focus:ring-button/20 outline-none"
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
              {/* Custom arrow */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text/40">
                ↕
              </div>
            </div>
          </div>

          {/* Primary action */}
          <button
            className="bg-button text-button-text font-semibold p-2 px-6 rounded-xl shadow-lg shadow-button/20 hover:bg-button-hover active:scale-[0.98] transition-all cursor-pointer sm:ml-2"
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

      {/* Divider */}
      <div className="h-px w-full bg-linear-to-r from-slate-500 via-slate-300 to-transparent mt-10"></div>
    </header>
  );
}
