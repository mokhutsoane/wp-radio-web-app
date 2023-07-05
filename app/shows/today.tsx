'use client';

import React from 'react';
import moment from 'moment';
import Link from 'next/link';

interface ScheduleItem {
  id: number;
  day: string;
  start: string;
  end: string;
  show: {
    name: string;
    slug: string;

  };
}

interface Schedule {
  Saturday: ScheduleItem[];
  Sunday: ScheduleItem[];
  Monday: ScheduleItem[];
  Tuesday: ScheduleItem[];
  Wednesday: ScheduleItem[];
  Thursday: ScheduleItem[];
  Friday: ScheduleItem[];
}

interface TodayScheduleProps {
  schedule: Schedule;
}

const TodaySchedule: React.FC<TodayScheduleProps> = ({ schedule }) => {
  const dayOfWeek = moment().format('dddd');

  const scheduleDay = (day: ScheduleItem[]) => {
    return (
      <div>
        <p className="text-light">
          {day[0] ? day[0].day : moment().format('dddd')}
        </p>

        <div className="px-5 pb-5">
          <ol className="border-l border-neutral-300 dark:border-neutral-500">
            {day.map((item) => (
              <li key={item.id}>
                <div className=" hover:bg-gray-800 flex">
                  <Link className="h-15 grow  " href={`/shows/${item.show.slug}`}>
                    <div className="flex-start flex items-center pt-3">
                      <div className="-ml-[5px] mr-3 h-[9px] w-[9px] rounded-full bg-neutral-300 dark:bg-neutral-500"></div>
                      <p className="text-sm text-neutral-400 dark:text-neutral-300">
                        {item.start} - {item.end}
                      </p>
                    </div>
                    <div className="mb-6 ml-4 mt-2">
                      <h4 className="text-m mb-1.5 font-semibold">
                        {item.show.name.toUpperCase()}
                      </h4>
                    </div>
                  </Link>
                  <Link className="... h-14 grow-0"         href={`/shows/${item.show.slug}`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5"
                      />
                    </svg>
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  };

  return (
    <div>
      {(() => {
        switch (dayOfWeek) {
          case 'Saturday':
            return scheduleDay(schedule.Saturday);
          case 'Sunday':
            return scheduleDay(schedule.Sunday);
          case 'Monday':
            return scheduleDay(schedule.Monday);
          case 'Tuesday':
            return scheduleDay(schedule.Tuesday);
          case 'Wednesday':
            return scheduleDay(schedule.Wednesday);
          case 'Thursday':
            return scheduleDay(schedule.Thursday);
          case 'Friday':
            return scheduleDay(schedule.Friday);
          default:
            return null;
        }
      })()}
    </div>
  );
};

export default TodaySchedule;
