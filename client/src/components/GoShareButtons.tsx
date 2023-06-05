import React from "react";
import Link from "next/link";
import ShareIcon from "./ShareIcon";
import ShareWindow from "./ShareWindow";
import ExitXIcon from "./ExitXIcon";

type GoButtonProps = {
  startNodeId: String;
  destinationNodeId: String;
  handleClick: () => void;
  showDiv: boolean;
  setShowDiv: React.Dispatch<React.SetStateAction<boolean>>;
};



const GoShareButtons: React.FC<GoButtonProps> = (props) => {
  if (props.destinationNodeId != undefined) {
   
    return (
      <div className="flex w-full items-center justify-center">
        <Link
          href={{
            pathname: "/navigation",
            query: {
              startNodeId: (props.startNodeId as string) != null 
                          ? (props.startNodeId as string) : "main_entrance",
              endNodeId: props.destinationNodeId as string,
            },
          }}
        >
          <button
            className="mx-auto py-2 px-2 rounded-md flex items-center justify-center mr-1 
                      bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-10
                        text-white text-sm font-bold"
            type="submit"
          >
            Go
          </button>
        </Link>

        <Link
          href={{
            pathname: "/",
            query: {
              startNodeId: (props.startNodeId as string) != null 
                          ? (props.startNodeId as string) : "main_entrance",
              endNodeId: props.destinationNodeId as string,
            },
          }}
        >
          <button
            className="mx-auto py-2 px-2 rounded-md flex items-center justify-center ml-1 mr-0
                       bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-10
                        text-white text-sm font-bold"
            type="button"
            onClick={props.handleClick}
          >
            <ShareIcon />
          </button>
        </Link>

        {props.showDiv && 
          <div className="absolute flex flex-col items-center justify-center inset-0 z-20">
          <ShareWindow />
          <div className="absolute top-0 right-10 z-40">
            <ExitXIcon onClick={() => props.setShowDiv(false)} />
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
                       bg-gray-500 cursor-not-allowed
                        text-white text-sm font-bold"
          type="submit"
        >
          Go
        </button>

        <button
          className="mx-auto py-2 px-2 rounded-md flex items-center justify-center ml-1
                       bg-gray-500 cursor-not-allowed
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
