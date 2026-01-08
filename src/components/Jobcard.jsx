import { StickyNote } from "lucide-react";

export default function Jobcard({jobs}) {
  const statusColors = {
    Applied: "bg-blue-100 text-blue-800",
    Interviewing: "bg-green-200 text-green-900",
    "Offer received": "bg-yellow-100 text-yellow-800",
    Rejected: "bg-red-100 text-red-800",
    Unsolicited: "bg-gray-200 text-gray-600"
  };

  /* if (isLoaded && jobData.length === 0) {
    return <p className="text-center text-2xl mt-6">No applications yet.</p>;
  } */

  return (
    <div className="flex flex-wrap justify-center px-4 gap-6">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="w-75 bg-gray-50 p-4 rounded-xl shadow-md border border-gray-300 flex flex-col justify-between"
        >
          <h2 className="text-2xl mb-2">{job.company}</h2>
          <div className="flex flex-wrap justify-between">
            <h3>{job.position}</h3>
            <h3>{job.date}</h3>
          </div>
          <h3>{job.contact}</h3>
          <div>
            {job.notes && (
              <div className="flex items-start gap-2 mt-3 py-1 bg-yellow-50 border border-yellow-400 text-md text-gray-700 rounded-md">
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
              /* onClick={() => onEdit(index)} */
              className="border border-gray-300 rounded-md px-3 py-1 cursor-pointer hover:bg-gray-200"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(job.id)}
              className="border border-gray-300 rounded-md px-3 cursor-pointer hover:bg-gray-200"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}