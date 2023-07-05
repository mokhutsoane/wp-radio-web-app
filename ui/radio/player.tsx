'use client';
import React, { useState, createContext, useContext } from 'react';
import ReactHowler from 'react-howler';
import { MEDIA_URL } from '#/lib/config';

interface PlayerContextProps {
  playing: boolean;
  handlePlay: () => void;
  handlePause: () => void;
}

const PlayerContext = createContext<PlayerContextProps>({
  playing: false,
  handlePlay: () => {},
  handlePause: () => {},
});

export const PlayerContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [playing, setPlaying] = useState(false);
  const [errorPlaying, setErrorPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const handleOnLoad = () => {
    setLoading(false);
  };

  const handlePlay = () => {
    setPlaying(true);
    setErrorPlaying(false);
  };

  const handlePause = () => {
    setPlaying(false);
  };

  return (
    <PlayerContext.Provider value={{ playing, handlePlay, handlePause }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => useContext(PlayerContext);

export default function Player({ className }: { className: string }) {
  const { playing, handlePlay, handlePause } = usePlayerContext();
  const [loading, setLoading] = useState(true);

  const mediaurl = MEDIA_URL;

  const handleOnLoad = () => {
    setLoading(false);
  };

  const handleError = () => {
    setLoading(false);
    setErrorPlaying(true);
  };

  return (
    <div
      className={`${className} bg-vc-border-gradient inset-x-0 bottom-3 mx-3 rounded-lg p-px shadow-lg shadow-black/20 sm:w-60`}
    >
      {playing ? (
        // Player is playing
        <div
          className="flex flex-row justify-between rounded-lg bg-black p-3.5 lg:px-5"
          onClick={handlePause}
        >
          {/* Pause button */}

          {loading ? (
            // Loading state
            <div className="grow">
              <span className="px-2 py-7 text-red-500">Loading...</span>
            </div>
          ) : (
            // Streaming state
            <div className="flex flex-row">
              <div className="h-6 w-6 grow-0">
                {/* Pause icon */}
                <span className="relative inline-block overflow-hidden rounded-full p-[1px]">
                  <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                  <div className="cursor-pointer items-center justify-center rounded-full bg-slate-950/90 text-sm font-medium text-white">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                      onClick={handlePause}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                      />
                    </svg>
                  </div>
                </span>
              </div>
              <div className="grow">
                <span className="px-2 py-7 text-center text-white">
                  Streaming Live
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        // Player is not playing
        <div
          className="flex flex-row justify-between rounded-lg bg-black p-3.5 lg:px-5"
          onClick={handlePlay}
        >
          {/* Play button */}
          <div className="h-6 w-6 grow-0">
            {/* Play icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
              onClick={handlePlay}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
              />
            </svg>
          </div>
          <div className="grow">
            <span className="px-2 py-7 text-white">Listen Live</span>
          </div>
        </div>
      )}

      <ReactHowler
        src={mediaurl}
        html5={true}
        onEnd={handlePause}
        onStop={handlePause}
        onPlay={handlePlay}
        onLoad={handleOnLoad}
        onPlayError={handleError}
        playing={playing}
      />
    </div>
  );
}

function setErrorPlaying(arg0: boolean) {
  throw new Error('Function not implemented.');
}
