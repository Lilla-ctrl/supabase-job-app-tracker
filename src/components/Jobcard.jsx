import { StickyNote } from "lucide-react";

export default function Jobcard({ job, onDeleteRequest, handleEditClick }) {
  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interviewing: "bg-green-200 text-green-900",
    "Offer received": "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Unsolicited: "bg-gray-200 text-gray-600",
  };

  return (
    <div className="w-75 bg-secondary p-4 rounded-xl shadow-md border border-jobcard-border flex flex-col justify-between">
      <h2 className="text-2xl text-text mb-2 tracking-tight font-semibold">
        {job.company}
      </h2>
      <div className="text-text flex flex-wrap justify-between">
        <h3>{job.position}</h3>
        <h3>{job.applied_at}</h3>
      </div>
      <h3 className="text-text">{job.contact}</h3>
      <div>
        {job.notes && (
          <div className="flex items-start gap-2 mt-3 py-1 bg-yellow-50 border border-yellow-400 text-black text-md rounded-md">
            <StickyNote className="w-5 h-5 mt-1 ml-1 text-yellow-500" />
            <p className="whitespace-pre-line wrap-anywhere">{job.notes}</p>
          </div>
        )}
      </div>
      <h3
        className={`w-fit tracking-wide mt-2 px-3 py-1 rounded text-sm font-medium ${
          statusColors[job.status]
        }`}
      >
        {job.status}
      </h3>
      <div className="flex flex-wrap gap-3 justify-end mt-auto">
        <button
          onClick={() => handleEditClick(job.id)}
          className="border border-jobcard-border text-text rounded-md px-3 py-1 cursor-pointer hover:bg-jobcard-button-hover"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteRequest(job)}
          className="border border-jobcard-border text-text rounded-md px-3 cursor-pointer hover:bg-jobcard-button-hover"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
