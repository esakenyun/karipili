import { motion } from "framer-motion";
export default function WaveAnimation({ title }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        borderRadius: ["20%", "50%", "20%"],
      }}
      transition={{
        duration: 2,
        repeat: 0,
        ease: "easeInOut",
      }}
      style={{
        display: "inline-block",
      }}>
      {title}
    </motion.div>
  );
}
