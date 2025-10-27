// src/pages/CourseContent.jsx
import React, { useRef, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Local assets only


const demoCourseContent = {
  1: [
    { type: "video", src: ".../assets/videos/react.mp4" },
    { type: "image", src: ".../assets/images/react.png" },
  ],
  2: [
    { type: "video", src: ".../assets/videos/tailwind.mp4" },
    { type: "image", src: ".../assets/images/tailwind.png" },
  ],
  3: [
    { type: "video", src: ".../assets/videos/js.mp4" },
    { type: "image", src: ".../assets/images/react.png" },
  ],
};

const CourseContent = () => {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const contentList = demoCourseContent[id] || [];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const current = contentList[currentIndex];
      if (!current) return;

      if (current.type === "video" && videoRef.current) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      } else if (current.type === "image") {
        const img = new Image();
        img.src = current.src;
        img.onload = () => {
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, [currentIndex, contentList]);

  const handlePlayPause = () => {
    const current = contentList[currentIndex];
    if (current?.type === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % contentList.length);
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? contentList.length - 1 : prev - 1
    );
    setIsPlaying(false);
    if (videoRef.current) videoRef.current.pause();
  };

  return (
    <div className="max-w-4xl mx-auto my-16 p-6 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <h1 className="text-3xl font-bold mb-6">Course Content</h1>

      <canvas
        ref={canvasRef}
        width={800}
        height={450}
        className="border rounded-lg w-full"
      ></canvas>

      {/* Hidden video element for canvas */}
      {contentList[currentIndex]?.type === "video" && (
        <video
          ref={videoRef}
          src={contentList[currentIndex].src}
          style={{ display: "none" }}
          crossOrigin="anonymous"
        />
      )}

      <div className="flex justify-center mt-4 space-x-4">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Previous
        </button>
        {contentList[currentIndex]?.type === "video" && (
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {isPlaying ? "Pause" : "Play"}
          </button>
        )}
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
        >
          Next
        </button>
      </div>

      <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
        Showing content {currentIndex + 1} of {contentList.length}
      </p>
    </div>
  );
};

export { CourseContent };
