import React, { useState } from "react";
import CopyToClipboardIcon from "./CopyToClipboardIcon";
import { Link } from "wouter";
import { createNavigationUrl, NavigationMode } from "../pages/navigation";
import { createHomeUrl } from "../pages";

type GoButtonProps = {
  startNodeId?: string;
  destinationNodeId?: string;
  startText?: string;
  destinationText?: string;
  clickable: boolean;
  defaultStartNodeId: string;
};

const GoShareButtons: React.FC<GoButtonProps> = (props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const startNodeId = props.startNodeId != null ? props.startNodeId : props.defaultStartNodeId;
    const startText = props.startText != null ? props.startText : undefined;
    const url = `${window.location.origin}${createHomeUrl(startNodeId, startText, props.destinationNodeId, props.destinationText)}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

  if (props.clickable && props.destinationNodeId !== undefined && props.destinationText !== undefined && props.destinationText.length > 0) {
    const startNodeId = props.startNodeId != null ? props.startNodeId : props.defaultStartNodeId;

    return (
      <div className="relative flex w-full items-center justify-center gap-1.5">
        <GoButton text="Quick" href={createNavigationUrl(startNodeId, props.destinationNodeId, props.destinationText, NavigationMode.Quick)} enabled={true} />
        <GoButton text="Detailed" href={createNavigationUrl(startNodeId, props.destinationNodeId, props.destinationText, NavigationMode.Detailed)} enabled={true} />

        <button
          className="py-[0.55rem] px-[0.7rem] rounded-lg flex items-center justify-center
                     bg-cyan-500 border border-cyan-600 hover:bg-cyan-600 hover:border-transparent
                     transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          type="button"
          onClick={handleCopy}
          aria-label="Copy link to this route"
        >
          <CopyToClipboardIcon />
        </button>

        {copied && (
          <span className="absolute -top-8 right-8 text-xs font-semibold text-white
                            bg-gray-800 px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
            Copied!
          </span>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex w-full items-center justify-center gap-1.5">
        <GoButton text="Quick" enabled={false} />
        <GoButton text="Detailed" enabled={false} />
      </div>
    );
  }
};

export default GoShareButtons;


function GoButton(props: { href?: string, text: string, enabled: boolean }) {
  if (!props.enabled) {
    return (
      <button
        type="button"
        disabled
        className="py-[0.55rem] px-[1.15rem] bg-zinc-100 text-zinc-400 font-semibold border
                   border-zinc-200 rounded-lg cursor-not-allowed"
      >
        {props.text}
      </button>
    );
  }

  return (
    <Link href={props.href!!}>
      <button
        className="py-[0.55rem] px-[1.15rem] font-semibold border rounded-lg
                   bg-cyan-500 text-white border-cyan-600 hover:bg-cyan-600 hover:border-transparent
                   transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
        type="button">
        {props.text}
      </button>
    </Link>
  )
}
