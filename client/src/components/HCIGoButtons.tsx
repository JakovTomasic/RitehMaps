import React from "react";
import Link from "next/link";

type HCIGoButtonProps = {
  startNodeId: string;
  destinationNodeId: string;
  startText: string;
  destinationText: string;
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
    "mx-2 p-3 rounded-md flex items-center justify-center mr-1" +
    " bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-100" +
    " text-white text-sm font-bold";

  const disabledButtonStyle: string =
    "mx-2 p-3 rounded-md flex items-center justify-center mr-1" +
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
                  props.startNodeId != null
                    ? props.startNodeId
                    : props.defaultStartNodeId,
                endNodeId: props.destinationNodeId,
                destinationName: props.destinationText,
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