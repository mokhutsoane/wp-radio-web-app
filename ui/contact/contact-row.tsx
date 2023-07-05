
import React from 'react';
import { API_URL } from '#/lib/config';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPhone,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { faFacebook,faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

export default async function ContactRow() {
  const res = await fetch(`${API_URL}/wp/v2/contact`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  if (!data) {
    return (<div></div>);
  }
  const contact = data[0];
  const whatsapp = contact?.whatsapp ?? '';
  const facebook = contact?.facebook ?? '';
  const email = contact?.email_address ?? '';
  const phone = contact?.tel ?? '';

  return (
    <div>
      <div className="flex gap-3">
        {phone && (
          <Link className="flex items-center  rounded-full bg-gray-800 p-3" href={`tel:${phone}`}>
            <FontAwesomeIcon icon={faPhone} className="h-5 w-5" />
          </Link>
        )}
        {whatsapp && (
          <Link className="flex items-center  rounded-full bg-gray-800 p-3" href={`https://wa.me/${whatsapp}`}>
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="h-5 w-5"
            />
          </Link>
        )}
        {facebook && (
          <Link className="flex items-center  rounded-full bg-gray-800 p-3" href={facebook}>
            <FontAwesomeIcon icon={faFacebook} className=" h-5 w-5" />
          </Link>
        )}
        {email && (
          <Link className="flex items-center rounded-full bg-gray-800 p-3" href={`mailto:${email}`}>
            <FontAwesomeIcon icon={faEnvelope} className="h-5 w-5"/>
            
          </Link>
        )}
      </div>
    </div>
  );
}
