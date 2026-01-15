export default function Header({
  isEditing,
  newJob,
  isModalOpen,
  emptyJob,
  filterStatus,
  setFilterStatus,
  sortOrder,
  setSortOrder,
  logout
}) {
  return (
    <>
      <div>
        <button onClick={logout}>Log out</button>
      </div>
      <div>
        <h1 className="text-gray-800 text-4xl font-medium text-center mt-3">
          Job Application Tracker
        </h1>
      </div>
      <div className="flex flex-wrap gap-3 justify-center my-4">
        <button
          className="bg-teal-500 text-white font-medium p-1 px-3 rounded-md hover:bg-teal-600 cursor-pointer"
          onClick={() => {
            isEditing(false);
            newJob(emptyJob);
            isModalOpen(true);
          }}
        >
          + New Application
        </button>
        <select
          className="border border-teal-500 rounded-md hover:bg-amber-50"
          name="filter"
          id="filter"
          value={filterStatus || ""}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">Filter by status </option>
          <option value="All">All (no filter)</option>
          <option value="Applied">Applied</option>
          <option value="Interviewing">Interviewing</option>
          <option value="Offer received">Offer received</option>
          <option value="Rejected">Rejected</option>
          <option value="Unsolicited">Unsolicited</option>
        </select>
        <select
          className="border border-teal-500 rounded-md hover:bg-amber-50"
          name="sort"
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
    </>
  );
}
