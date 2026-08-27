import { motion } from 'framer-motion';

export default function WhatsAppButton() {
  const phone = '919316688014';
  const message = encodeURIComponent("Hi Optenary! I'd like to discuss a project with you.");
  const url = `https://wa.me/${phone}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full shadow-2xl"
      style={{ background: '#25d366' }}
    >
      {/* Pulse ring */}
      <span className="absolute inset-0 rounded-full bg-[#25d366] animate-ping opacity-30" />

      {/* WhatsApp SVG icon */}
      <svg viewBox="0 0 32 32" className="w-8 h-8 relative z-10" fill="white">
        <path d="M16.003 3C9.376 3 4 8.376 4 15.003c0 2.215.643 4.275 1.755 6.01L4 29l8.226-1.727A12.006 12.006 0 0016.003 27c6.627 0 12.003-5.376 12.003-12.003S22.63 3 16.003 3zm6.07 16.714c-.26.73-1.51 1.396-2.083 1.486-.547.087-1.23.123-1.983-.124-.457-.147-1.043-.344-1.794-.673-3.16-1.364-5.224-4.54-5.38-4.75-.157-.21-1.277-1.697-1.277-3.237 0-1.54.808-2.298 1.094-2.613.286-.314.624-.393.833-.393l.598.011c.192.009.45-.073.703.536.26.625.883 2.165.96 2.321.078.157.13.34.026.547-.103.207-.156.336-.31.517-.157.18-.33.403-.47.54-.156.154-.319.322-.137.63.182.31.808 1.33 1.734 2.154 1.192 1.063 2.197 1.392 2.507 1.548.31.156.49.13.673-.077.183-.206.782-.913 1.01-1.226.225-.314.45-.26.758-.157.31.103 1.97.93 2.31 1.1.34.173.567.26.65.404.082.14.082.808-.178 1.54z" />
      </svg>
    </motion.a>
  );
}
