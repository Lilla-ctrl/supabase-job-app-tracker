import { Calendar, User, Briefcase, Trash2 } from "lucide-react";
import { formatDateApplied } from "../helpers/jobUtils";

export default function Jobcard({ job, onDeleteRequest, handleEditClick }) {
  const statusColors = {
    Applied: "bg-blue-500/10 text-blue-500 border border-blue-500/20",
    Interviewing:
      "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20",
    "Offer received":
      "bg-amber-500/10 text-amber-600 border border-amber-500/20",
    Rejected: "bg-rose-500/10 text-rose-600 border border-rose-500/20",
    Unsolicited: "bg-slate-500/10 text-slate-500 border border-slate-500/20",
  };

  return (
    <div className="w-full max-w-sm mx-auto h-full min-h-75 bg-secondary p-5 rounded-2xl shadow-sm border border-jobcard-border/5 backdrop-blur-sm flex flex-col gap-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      {/* Header */}
      <div>
        <div className="flex justify-between items-start">
          <h2 className="text-xl text-text mb-2 tracking-tight font-bold truncate pr-2">
            {job.company}
          </h2>
          {job.status && (
            <span
              className={`px-2.5 py-1.5 rounded-full text-xs font-bold border ${
                statusColors[job.status]
              }`}
            >
              {job.status.toUpperCase()}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Briefcase className="w-3.5 h-3.5 text-text" />
          <p className="text-text">{job.position}</p>
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-2 text-xs text-text/770 border-y border-jobcard-border py-3">
        
        {/* Date */}
        <div className="flex items-center gap-2 min-w-0" title={job.applied_at}>
          <Calendar className="w-3.5 h-3.5 text-text/40 shrink-0" />
          <div className="flex flex-col truncate">
            <span className="text-text font-medium truncate">
              {formatDateApplied(job.applied_at)}
            </span>
            <span className="text-text/50 text-[10px] leading-tight">
              {job.applied_at}
            </span>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-center gap-2 min-w-0">
          <User className="w-3.5 h-3.5 text-text/40 shrink-0" />
          <span className="text-text font-medium truncate" title={job.contact}>
            {job.contact}
          </span>
        </div>
      </div>

      {/* Notes */}
      <div className="grow mb-2">
        {job.notes ? (
        <div className="h-24 overflow-y-auto bg-text/5 p-3 rounded-lg border border-jobcard-border/30 italic text-sm text-text/80 relative overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1 bg-amber-400/50" />
          <p className="whitespace-pre-line leading-relaxed wrap-break-word">
            {job.notes}
          </p>
        </div>
      ) : (
        <div className="h-24"></div>
      )}
      </div>
      

      {/* Buttons */}
      <div className="flex gap-2 mt-auto pt-2">
        <button
          onClick={() => handleEditClick(job.id)}
          className="flex-1 flex items-center justify-center gap-2 border border-jobcard-border text-text text-sm font-medium transition-colors rounded-lg py-2 cursor-pointer hover:bg-jobcard-button-hover active:scale-95"
        >
          Edit
        </button>
        <button
          onClick={() => onDeleteRequest(job)}
          className="flex-1 flex items-center justify-center gap-2 border border-rose-500/20 text-rose-600 text-sm font-medium transition-colors rounded-lg py-2 cursor-pointer hover:bg-rose-500/10 active:scale-95"
        >
          <Trash2 className="w-4 h-5" />
          Delete
        </button>
      </div>
    </div>
  );
}
