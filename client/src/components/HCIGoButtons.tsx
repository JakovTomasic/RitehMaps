import React from "react";
import Link from "next/link";

type HCIGoButtonProps = {
  startNodeId: String;
  destinationNodeId: String;
  startText: String;
  destinationText: String;
  clickable: boolean;
  defaultStartNodeId: string;
};

const HCIGoButtons: React.FC<HCIGoButtonProps> = (props) => {
  const buttonConfigs = [
    { label: "Floors", path: "/navigation-floor-by-floor" },
    { label: "Steps", path: "/navigation-step-by-step" },
    { label: "Steps Forward", path: "/navigation-step-by-step-forward" },
    { label: "Compass", path: "/navigation-compass" },
  ];

  const enabledButtonStyle: string =
    "mx-auto py-2 px-2 rounded-md flex items-center justify-center mx-1" +
    " bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-100" +
    " text-white text-sm font-bold";

  const disabledButtonStyle: string =
    "mx-auto py-2 px-2 rounded-md flex items-center justify-center mx-1" +
    " bg-gray-500 cursor-not-allowed w-100" +
    " text-white text-sm font-bold";

  return (
    <div className="flex w-fit items-center justify-center">
      {buttonConfigs.map((config, index) =>
        props.clickable ? (
          <Link
            key={index}
            href={{
              pathname: config.path,
              query: {
                startNodeId:
                  (props.startNodeId as string) != null
                    ? (props.startNodeId as string)
                    : props.defaultStartNodeId,
                endNodeId: props.destinationNodeId as string,
              },
            }}
            style={{display: 'contents'}}
          >
            <button className={enabledButtonStyle} type="button">
              {config.label}
            </button>
          </Link>
        ) : (
          <button key={index} className={disabledButtonStyle} type="button" disabled>
            {config.label}
          </button>
        )
      )}
    </div>
  );
};

export default HCIGoButtons;