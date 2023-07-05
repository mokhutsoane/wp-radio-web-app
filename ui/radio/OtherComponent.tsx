'use client';

import React from 'react';
import { usePlayerContext } from './player';

export default  function OtherComponent() {
  const { playing, handlePlay, handlePause } = usePlayerContext();

  return (
    <div>
      {playing ? (
        <div onClick={handlePause} className="group mb-0 block  ">
          <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
            <button className="rounded-full bg-white p-2"></button>
            <button className="rounded-full bg-white p-2"></button>
            <button className="rounded-full bg-white p-2"></button>
          </div>
        </div>
      ) : (
        <div onClick={handlePlay} className="group mb-0 block  ">
          <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
            <button className="rounded-full bg-red-500 p-2"></button>
            <button className="rounded-full bg-red-500 p-2"></button>
            <button className="rounded-full bg-red-500 p-2"></button>
          </div>
        </div>
      )}
     
    </div>
  );
}
