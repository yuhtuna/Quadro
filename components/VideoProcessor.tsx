import React, { useState, useRef, useEffect, useCallback } from 'react';
import { UploadIcon, CameraIcon } from './Icons';
import videoService from '../services/videoService';

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
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  const cleanupCamera = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
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

  const handleStartRecording = () => {
    if (mediaStreamRef.current) {
      const recordedChunks: Blob[] = [];
      mediaRecorderRef.current = new MediaRecorder(mediaStreamRef.current);
      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunks.push(event.data);
        }
      };
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, { type: 'video/mp4' });
        const url = URL.createObjectURL(blob);
        setVideoFile(new File([blob], `capture-${new Date().toISOString()}.mp4`, { type: 'video/mp4' }));
        setVideoSrc(url);
      };
      mediaRecorderRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleSubmit = async () => {
    if (!videoFile) {
      alert("Please upload or record a video first.");
      return;
    }

    setIsLoading(true);
    const fileName = videoFile.name;

    try {
      await videoService.processVideo(videoFile);
      onNewHistoryItem(fileName);
    } catch (error) {
      console.error('Error processing video:', error);
      alert('Error processing video. Please try again.');
    } finally {
      setIsLoading(false);
      setVideoFile(null);
      setVideoSrc(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    }
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
          controls={!!videoSrc}
          autoPlay={mode === 'camera'}
          muted={mode === 'camera'}
          className={`w-full h-full object-contain transition-opacity duration-300 ${hasVideo ? 'opacity-100' : 'opacity-0'}`}
        ></video>
        
        {!hasVideo && mode === 'upload' && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-gray-500 dark:text-gray-400 p-8">
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
                {!isRecording && <button onClick={handleStartRecording} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                    Start Recording
                </button>}
                {isRecording && <button onClick={handleStopRecording} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors">
                    Stop Recording
                </button>}
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
          disabled={!videoFile || isLoading}
          className="w-full max-w-md px-6 py-3 text-base font-semibold text-white bg-green-600 rounded-lg shadow-md hover:bg-green-700 disabled:bg-gray-400 dark:disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 focus:ring-green-500 transition-all duration-200"
        >
          {isLoading ? 'Submitting...' : 'Submit Video'}
        </button>
      </div>
    </div>
  );
};

export default VideoProcessor;
