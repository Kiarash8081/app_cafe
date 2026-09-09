import React from 'react';
import { mapEmbedSrc } from '../../utils/siteContent';

export function PlaceMap({ site, title }) {
  const src = mapEmbedSrc(site);
  if (!src) return null;
  return (
    <div className="place-map">
      <iframe
        title={title}
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
}
