import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UploadIcon, CameraIcon } from './Icons';

interface VideoProcessorProps {
  onNewHistoryItem: (name: string) => void;
}

type Mode = 'upload' | 'camera';

const VideoProcessor: React.FC<VideoProcessorProps> = ({ onNewHistoryItem }) => {
  const [mode, setMode] = useState<Mode>('upload');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const cleanupCamera = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (videoRef.current) {
        videoRef.current.srcObject = null;
    }
  }, []);

  useEffect(() => {
    if (mode === 'camera') {
      const getCameraStream = async () => {
        try {
          cleanupCamera(); // Ensure previous stream is stopped
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
          mediaStreamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(console.error);
          }
        } catch (err) {
          console.error("Error accessing camera:", err);
          alert("Could not access camera. Please check permissions.");
          setMode('upload');
        }
      };
      getCameraStream();
    } else {
      cleanupCamera();
    }

    return () => {
      cleanupCamera();
    };
  }, [mode, cleanupCamera]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoSrc(url);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = () => {
    if (!videoFile && mode === 'upload') {
        alert("Please upload a video first.");
        return;
    }
    if (!mediaStreamRef.current && mode === 'camera') {
        alert("Camera is not active.");
        return;
    }

    setIsLoading(true);
    const fileName = videoFile?.name || `capture-${new Date().toISOString()}.mp4`;
    
    // Simulate API call
    setTimeout(() => {
      console.log('Submitting video:', fileName);
      onNewHistoryItem(fileName);
      setIsLoading(false);
      setVideoFile(null);
      setVideoSrc(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
      // Don't switch mode, user might want to capture/upload another one
    }, 2000);
  };
  
  const hasVideo = !!videoSrc || (mode === 'camera' && !!mediaStreamRef.current);

  return (
    <div className="flex flex-col h-full bg-white/60 dark:bg-gray-800/40 rounded-xl p-4 md:p-6 shadow-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex-shrink-0 mb-4">
        <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg p-1 bg-gray-200 dark:bg-gray-900 max-w-xs mx-auto">
          <button
            onClick={() => setMode('upload')}
            className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${mode === 'upload' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
          >
            <UploadIcon className="inline-block w-5 h-5 mr-2" />
            Upload Video
          </button>
          <button
            onClick={() => setMode('camera')}
            className={`w-1/2 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${mode === 'camera' ? 'bg-indigo-600 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700'}`}
          >
            <CameraIcon className="inline-block w-5 h-5 mr-2" />
            Use Camera
          </button>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gray-100 dark:bg-black/50 rounded-lg border-2 border-dashed border-gray-400 dark:border-gray-600 overflow-hidden relative min-h-[200px] md:min-h-[400px]">
        <video
          ref={videoRef}
          src={videoSrc || ''}
          controls={mode === 'upload' && !!videoSrc}
          autoPlay={mode === 'camera'}
          muted={mode === 'camera'}
          className={`w-full h-full object-contain transition-opacity duration-300 ${hasVideo ? 'opacity-100' : 'opacity-0'}`}
        ></video>
        
        {!hasVideo && mode === 'upload' && (
            <div className="text-center text-gray-500 dark:text-gray-400 p-8">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"/>
                <p className="mt-2 text-lg font-semibold">Upload a video file</p>
                <p className="text-sm">Click the button below to select a video.</p>
                <button onClick={handleUploadClick} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Select File
                </button>
            </div>
        )}

        {!hasVideo && mode === 'camera' && (
             <div className="text-center text-gray-500 dark:text-gray-400">
                <CameraIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"/>
                <p className="mt-2 text-lg font-semibold">Camera Preview</p>
                <p className="text-sm">Your camera feed will appear here.</p>
            </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="video/*"
          className="hidden"
        />
      </div>

      <div className="flex-shrink-0 mt-6 text-center">
        <button
          onClick={handleSubmit}
          disabled={!hasVideo || isLoading}
          className="w-full max-w-md px-6 py-3 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 focus:ring-green-500 transition-all duration-200"
        >
          {isLoading ? 'Submitting...' : 'Submit Video'}
        </button>
      </div>
    </div>
  );
};

export default VideoProcessor;
