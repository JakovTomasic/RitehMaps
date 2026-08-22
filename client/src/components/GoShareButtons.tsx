import React from "react";
import ShareIcon from "./ShareIcon";
import ShareWindow from "./ShareWindow";
import ExitXIcon from "./ExitXIcon";
import { Link } from "wouter";
import { createNavigationUrl, NavigationMode } from "../pages/navigation";
import { createHomeUrl } from "../pages";

type GoButtonProps = {
  startNodeId: string;
  destinationNodeId: string;
  startText: string;
  destinationText: string;
  handleShare: () => void;
  showShareDiv: boolean;
  clickable: boolean;
  defaultStartNodeId: string;
};

const GoShareButtons: React.FC<GoButtonProps> = (props) => {
  if (props.clickable) {

    const startNodeId = props.startNodeId != null ? props.startNodeId : props.defaultStartNodeId;
    const startText = props.startText != null ? props.startText : undefined;
   
    return (
      <div className="flex w-full items-center justify-center">
        <GoButton text="Quick" href={createNavigationUrl(startNodeId, props.destinationNodeId, props.destinationText, NavigationMode.FloorByFloor)} enabled={true} />
        <GoButton text="Detailed" href={createNavigationUrl(startNodeId, props.destinationNodeId, props.destinationText, NavigationMode.StepByStep)} enabled={true} />

        <Link
          href={createHomeUrl(startNodeId, startText, props.destinationNodeId, props.destinationText)}
        >
          <button
            className="mx-auto py-2 px-2 rounded-md flex items-center justify-center ml-1 mr-0
                       bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-10
                        text-white text-sm font-bold"
            type="button"
            onClick={props.handleShare}
          >
            <ShareIcon />
          </button>
        </Link>

        {props.showShareDiv && 
          <div className="absolute flex flex-col items-center justify-center inset-0 z-20">
          <ShareWindow />
          <div className="absolute top-0 right-10 z-40">
            <ExitXIcon onClick={props.handleShare} />
          </div>
        </div>
        }
      </div>
    );
  } else {
    return (
      <div className="flex w-full items-center justify-center"> 
        <button
          className="mx-auto py-2 px-2 rounded-md flex items-center justify-center mr-1 
                       bg-gray-500 cursor-not-allowed w-10
                        text-white text-sm font-bold"
          type="button"
        >
          Go
        </button>

        <button
          className="mx-auto py-2 px-2 rounded-md flex items-center justify-center ml-1
                       bg-gray-500 cursor-not-allowed w-10
                        text-white text-sm font-bold"
          type="button"
        >
          <ShareIcon />
        </button>
      </div>
    );
  }
};

export default GoShareButtons;


function GoButton(props: { href: string, text: string, enabled: boolean}) {
  let commonClassName = `
    mx-auto py-2 px-2 rounded-md flex items-center justify-center mr-1 
    text-white text-sm font-bold
    inline-block w-fit
    ml-1 mr-1 
  `
  let enabledClassName = commonClassName + `bg-cyan-600 focus:bg-cyan-700 transition duration-300`;
  let disabledClassName = commonClassName + `bg-gray-500 cursor-not-allowed`;
  return (
    <Link href={props.href}>
      <button
        className={props.enabled ? enabledClassName : disabledClassName}
        type="button">
        {props.text}
      </button>
    </Link>
  )
}
