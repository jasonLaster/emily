import React from 'react';
import YouTube from 'react-youtube';

export default function ({id}) {
  return <YouTube
   videoId={id}
   opts={{
     height: '312',
     width: '500',
   }}
 />
}
