import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "../lib/toast";

export default function Toast() {
  const message = useToast();

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[90] flex justify-center px-4">
      <AnimatePresence>
        {message && (
          <motion.div
            key={message}
            className="rounded-full border border-line-strong bg-elev px-4 py-2 text-sm text-fg shadow-(--shadow)"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
