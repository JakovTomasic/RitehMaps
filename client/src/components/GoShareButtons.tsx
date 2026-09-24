import React, { useState } from "react";
import CopyToClipboardIcon from "./CopyToClipboardIcon";
import { Link } from "wouter";
import { createNavigationUrl, NavigationMode, NavigationRoute } from "../pages/navigation";
import { createHomeUrl } from "../pages";
import { useTranslations } from "../i18n";

type GoButtonProps = {
  startNodeId?: string;
  destinationNodeId?: string;
  startText?: string;
  destinationText?: string;
  clickable: boolean;
  defaultStartNodeId: string;
  defaultStartText?: string;
};

const GoShareButtons: React.FC<GoButtonProps> = (props) => {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    // The default start is never shared, neither its id nor its name: an empty start box means
    // "wherever the entrance is", so the link leaves it empty too and the other client fills it
    // in with its own default, in *their* language.
    const url = `${window.location.origin}${createHomeUrl({
      startNodeId: props.startNodeId,
      startText: props.startText,
      destinationNodeId: props.destinationNodeId,
      destinationText: props.destinationText,
    })}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL to clipboard:", error);
    }
  };

  if (props.clickable && props.destinationNodeId !== undefined && props.destinationText !== undefined && props.destinationText.length > 0) {
    /** The start the route is built with: the form's, or the default one when it was left empty. */
    const start = props.startNodeId != null
      ? { nodeId: props.startNodeId, text: props.startText }
      : { nodeId: props.defaultStartNodeId, text: props.defaultStartText };

    const route: NavigationRoute = {
      startNodeId: start.nodeId,
      startName: start.text,
      destinationId: props.destinationNodeId,
      destinationName: props.destinationText,
    };

    return (
      <div className="relative flex w-full items-center justify-center gap-1.5">
        <GoButton text={t.search.quick} href={createNavigationUrl(route, NavigationMode.Quick)} enabled={true} />
        <GoButton text={t.search.detailed} href={createNavigationUrl(route, NavigationMode.Detailed)} enabled={true} />

        <button
          className="py-[0.55rem] px-[0.7rem] rounded-lg flex items-center justify-center
                     bg-cyan-500 border border-cyan-600 hover:bg-cyan-600 hover:border-transparent
                     transition ease-in duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
          type="button"
          onClick={handleCopy}
          aria-label={t.search.copyLink}
        >
          <CopyToClipboardIcon />
        </button>

        {copied && (
          <span className="absolute -top-8 right-8 text-xs font-semibold text-white
                            bg-gray-800 px-2.5 py-1 rounded-md shadow-md whitespace-nowrap">
            {t.search.linkCopied}
          </span>
        )}
      </div>
    );
  } else {
    return (
      <div className="flex w-full items-center justify-center gap-1.5">
        <GoButton text={t.search.quick} enabled={false} />
        <GoButton text={t.search.detailed} enabled={false} />
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
