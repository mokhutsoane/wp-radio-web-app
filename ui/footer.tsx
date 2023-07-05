'use client';

import Link from "next/link";

export default function Footer({
  nextVersion,
}: {
  nextVersion: string;
}) {
  return (
    <div className="col-start-2 col-end-4 mt-28 flex items-center justify-between">
      <style jsx>
        {`
          .power-by {
            color: rgb(82 82 91);
            display: inline-flex;
            align-items: center;
          }
          .power-by-text {
            margin-right: 0.25rem;
          }
        `}
      </style>
<Link href={"https://famcast.co.za/home/portfolios"}>

<span className="power-by">
        <span className="power-by-text">Powered by</span>
       Famcast
      </span></Link>
      

      <div className="flex gap-x-2 text-sm text-gray-600">
        <div>Made With</div>
        <div>Next: {nextVersion}</div>
      </div>
    </div>
  );
}
