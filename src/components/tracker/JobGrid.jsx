import Jobcard from "../Jobcard";
import { motion, AnimatePresence } from "framer-motion";

export default function JobGrid({ jobs, onDeleteRequest, onEditClick }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="flex flex-wrap justify-center gap-6">
        <AnimatePresence mode="popLayout">
          {jobs.map((job) => (
            <motion.div
              key={job.id}
              layout
              transition={{ delay: job.id * 0.003 }}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{
                opacity: 0,
                scale: 0.5,
                transition: { duration: 0.2 },
              }}
            >
              <Jobcard
                key={job.id}
                job={job}
                onDeleteRequest={onDeleteRequest}
                handleEditClick={onEditClick}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
