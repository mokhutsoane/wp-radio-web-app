'use client';

import React from 'react';
import { usePlayerContext } from './player';
import { PlayCircleIcon, PauseCircleIcon } from '@heroicons/react/24/outline';

export default  function PlayButton() {
  const { playing, handlePlay, handlePause } = usePlayerContext();

  return (
    <div>
      {playing ? (
        <div onClick={handlePause} className="group mb-0 block  ">
          <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
           <PauseCircleIcon  className="block w-6"/>
          </div>
        </div>
      ) : (
        <div onClick={handlePlay} className="group mb-0 block  ">
          <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
               <PlayCircleIcon  className="block w-6"/>

          </div>
        </div>
      )}
     
    </div>
  );
}
