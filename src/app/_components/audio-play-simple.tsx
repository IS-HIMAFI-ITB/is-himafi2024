"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AudioPlaySimple({ audioSrc }: { audioSrc: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center relative justify-center p-4 my-24">
      <Button
        onClick={togglePlayPause}
        size="icon"
        className={`rounded-full hover:bg-sky-600/25 relative transition-all duration-1000 ease-in-out ${isPlaying ? "w-full h-24 bg-sky-600/50" : "w-24 h-24 bg-black/20"}`}
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="h-12 w-12" /> : <Play className="h-12 w-12" />}
      </Button>
      <audio ref={audioRef} src={audioSrc} onEnded={() => setIsPlaying(false)} />
      <AnimatePresence>
        {isPlaying && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-32 left-10 right-10 sm:left-32 sm:right-32 bg-none p-4 rounded-b-full -z-10 bg-sky-400/20 shadow-xl"
            >
              <p className="text-lg font-bold text-center">MARS HIMAFI</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: -190 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-32 left-10 right-10 sm:left-32 sm:right-32 bg-none p-4 rounded-t-full -z-10 bg-sky-400/20 shadow-xl"
            >
              <p className="text-lg font-bold text-center">Now Playing:</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
