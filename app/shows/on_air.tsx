import React from 'react';
import Image from 'next/image';
import TimeLeft from './timeleft';
import OtherComponent from '../../ui/radio/OtherComponent';

export default function OnAir({ data }:{ data: any }) {
    const newEnd = data?.broadcast?.current_show?.end === '00:00' ? '23:59' : data?.broadcast?.current_show?.end;

  return (
    <div>
      {' '}
      <div className="flex">
        <div className="w-40 flex-none rounded-lg bg-gray-700 px-4">
          <Image
            src={data.broadcast?.current_show?.show?.avatar_url ?? '/home/logo.png'}
            className=" rounded-b-lg  lg:block"
            alt=""
            height={0}
            width={0}
            placeholder="blur"
            blurDataURL="logo.png"
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
          />
          <div className="py-5">
            <div className="text-center font-medium text-gray-100 group-hover:text-gray-50">
              {data?.broadcast?.current_show ? (
                <TimeLeft end={newEnd} />
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </div>
        <div className="ml-5 grid  grow content-end	gap-4 rounded-lg bg-gray-900	px-5 py-5 hover:bg-gray-800">
          <div className="group block space-y-2.5 ">
            <div className="pt-15 mb-15">
              <div className="mb-4 text-2xl font-medium text-gray-100	 group-hover:text-gray-50 lg:text-4xl">
                {data.broadcast?.current_show?.show?.name ?? 'Live'}
              </div>
              <div className="line-clamp-3 text-sm text-gray-400 group-hover:text-gray-300 lg:text-2xl">
                {data.broadcast?.current_show?.start ?? ''} -{' '}
                {newEnd ?? ''}
              </div>
            </div>
      <OtherComponent/>

          </div>
        </div>
      </div>
    </div>
  );
}
