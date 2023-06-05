import React from 'react';
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  RedditShareButton,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'next-share';
import CopyToClipboardIcon from './CopyToClipboardIcon';

export default function ShareWindow() {

const shareUrl = window.location.href;

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        console.log('URL copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy URL to clipboard:', error);
      });
  };

  return (
    <div className="absolute isite-0 z-30 flex items-center justify-center pb-4 pt-6 px-7 mx-auto
                    bg-gray-400 rounded-md  " >
      
      <FacebookShareButton url={shareUrl}>
        <FacebookIcon size={32} round className="ml-1 mr-1 focus:ring focus:ring-gray-300"/>
      </FacebookShareButton>
      <PinterestShareButton url={shareUrl} media={'hehe'}>
        <PinterestIcon size={32} round className="ml-1 mr-1 focus:ring focus:ring-gray-300"/>
      </PinterestShareButton>
      <RedditShareButton url={shareUrl}>
        <RedditIcon size={32} round className="ml-1 mr-1 focus:ring focus:ring-gray-300"/>
      </RedditShareButton>
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={32} round className="ml-1 mr-1 focus:ring focus:ring-gray-300"/>
      </WhatsappShareButton>
      <LinkedinShareButton url={shareUrl}>
        <LinkedinIcon size={32} round className="ml-1 mr-1 focus:ring focus:ring-gray-300"/>
      </LinkedinShareButton>

      <button type="button" className="ml-1 mr-1 focus:ring focus:ring-gray-300"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          backgroundColor: '#ccc',
        }}
        onClick={handleCopyToClipboard}
      >
        <CopyToClipboardIcon/>
      </button>
    </div>
  );
};

