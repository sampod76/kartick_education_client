import { motion, AnimatePresence } from "framer-motion";
import { ReactElement } from "react";

export const AnimatePresenceWrapper = ({ children ,delay=0.24  }: { children: React.ReactElement,delay?:number }) => (
  <AnimatePresence>
    {
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 15 }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    }
  </AnimatePresence>
);
