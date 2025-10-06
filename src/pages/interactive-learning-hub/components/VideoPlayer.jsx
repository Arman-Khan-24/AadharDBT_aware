import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ 
  videoUrl, 
  title, 
  description, 
  onProgress, 
  onComplete,
  subtitles = [],
  className = "" 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSubtitle, setSelectedSubtitle] = useState('none');
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  const playbackSpeeds = [0.5, 0.75, 1, 1.25, 1.5, 2];

  useEffect(() => {
    const video = videoRef?.current;
    if (!video) return;

    const handleLoadedData = () => {
      setIsLoading(false);
      setDuration(video?.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video?.currentTime);
      if (onProgress) {
        onProgress(video?.currentTime, video?.duration);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      if (onComplete) {
        onComplete();
      }
    };

    video?.addEventListener('loadeddata', handleLoadedData);
    video?.addEventListener('timeupdate', handleTimeUpdate);
    video?.addEventListener('ended', handleEnded);

    return () => {
      video?.removeEventListener('loadeddata', handleLoadedData);
      video?.removeEventListener('timeupdate', handleTimeUpdate);
      video?.removeEventListener('ended', handleEnded);
    };
  }, [onProgress, onComplete]);

  const togglePlay = () => {
    const video = videoRef?.current;
    if (video?.paused) {
      video?.play();
      setIsPlaying(true);
    } else {
      video?.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef?.current;
    const rect = e?.currentTarget?.getBoundingClientRect();
    const pos = (e?.clientX - rect?.left) / rect?.width;
    video.currentTime = pos * video?.duration;
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e?.target?.value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef?.current;
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const changePlaybackRate = (rate) => {
    videoRef.current.playbackRate = rate;
    setPlaybackRate(rate);
  };

  const toggleFullscreen = () => {
    const container = containerRef?.current;
    if (!document.fullscreenElement) {
      container?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds?.toString()?.padStart(2, '0')}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    clearTimeout(controlsTimeoutRef?.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div 
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full object-contain"
        onClick={togglePlay}
        onLoadStart={() => setIsLoading(true)}
      >
        <source src={videoUrl} type="video/mp4" />
        {subtitles?.map((subtitle) => (
          <track
            key={subtitle?.lang}
            kind="subtitles"
            src={subtitle?.src}
            srcLang={subtitle?.lang}
            label={subtitle?.label}
          />
        ))}
        Your browser does not support the video tag.
      </video>
      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className="text-white text-sm">Loading video...</span>
          </div>
        </div>
      )}
      {/* Play Button Overlay */}
      {!isPlaying && !isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="lg"
            onClick={togglePlay}
            className="bg-black/50 hover:bg-black/70 text-white rounded-full w-16 h-16"
          >
            <Icon name="Play" size={24} />
          </Button>
        </div>
      )}
      {/* Controls */}
      {showControls && !isLoading && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          {/* Progress Bar */}
          <div 
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-3"
            onClick={handleSeek}
          >
            <div 
              className="h-full bg-primary rounded-full transition-all duration-200"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>

          {/* Control Buttons */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePlay}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isPlaying ? "Pause" : "Play"} size={16} />
              </Button>

              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMute}
                  className="text-white hover:bg-white/20"
                >
                  <Icon name={isMuted ? "VolumeX" : "Volume2"} size={16} />
                </Button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-16 h-1 bg-white/30 rounded-full appearance-none slider"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Playback Speed */}
              <div className="relative group">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                >
                  {playbackRate}x
                </Button>
                <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="space-y-1">
                    {playbackSpeeds?.map((speed) => (
                      <button
                        key={speed}
                        onClick={() => changePlaybackRate(speed)}
                        className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white/20 ${
                          playbackRate === speed ? 'text-primary' : 'text-white'
                        }`}
                      >
                        {speed}x
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Subtitles */}
              {subtitles?.length > 0 && (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/20"
                  >
                    <Icon name="Subtitles" size={16} />
                  </Button>
                  <div className="absolute bottom-full right-0 mb-2 bg-black/90 rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    <div className="space-y-1 min-w-24">
                      <button
                        onClick={() => setSelectedSubtitle('none')}
                        className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white/20 ${
                          selectedSubtitle === 'none' ? 'text-primary' : 'text-white'
                        }`}
                      >
                        Off
                      </button>
                      {subtitles?.map((subtitle) => (
                        <button
                          key={subtitle?.lang}
                          onClick={() => setSelectedSubtitle(subtitle?.lang)}
                          className={`block w-full text-left px-2 py-1 text-sm rounded hover:bg-white/20 ${
                            selectedSubtitle === subtitle?.lang ? 'text-primary' : 'text-white'
                          }`}
                        >
                          {subtitle?.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFullscreen}
                className="text-white hover:bg-white/20"
              >
                <Icon name={isFullscreen ? "Minimize" : "Maximize"} size={16} />
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Video Info */}
      {title && (
        <div className="absolute top-4 left-4 right-4">
          <div className="bg-black/50 rounded-lg p-3">
            <h3 className="text-white font-medium text-sm mb-1">{title}</h3>
            {description && (
              <p className="text-white/80 text-xs">{description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;