'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Tabs = ({ data }) => {
  const [activeTab, setActiveTab] = useState(Object.keys(data)[0] ?? '');

  useEffect(() => {
    // Set the initial active tab to the current day
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const currentDayIndex = new Date().getDay();
    const currentDay = daysOfWeek[currentDayIndex];
    setActiveTab(currentDay);
  }, []);

  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="">
      <div className="mb-4 ">
        {Object.keys(data).map((day) => (
          <button
            key={day}
            className={`space-y-8 p-2 pr-2 font-semibold focus:outline-none ${
              activeTab === day ? 'border-b-2 border-amber-300 p-2' : ''
            }`}
            onClick={() => handleClick(day)}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {data[activeTab].map((show) => (
          <Link
            href={`/shows/${show.show.slug}`}
            key={show.id}
            className="group block space-y-1.5 rounded-lg bg-gray-900 px-5 py-3 hover:bg-gray-800"
          >
            <div className="... flex flex-row">
              <div className="pr-3">
                {' '}
                <Image
                  src={show.show.avatar_url}
                  className=" rounded-lg  lg:block"
                  alt=""
                  height={50}
                  width={50}
                  placeholder="blur"
                  blurDataURL="logo.png"
                />
              </div>
              <div>
                <div className="font-medium text-gray-200 group-hover:text-gray-50">
                  {show.show.name}
                </div>

                <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300">
                  {show.start} - {show.end}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
