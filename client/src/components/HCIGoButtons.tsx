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
    { label: "Mod 1", path: "/navigation-mod1" },
    { label: "Mod 2", path: "/navigation-mod2" },
    { label: "Mod 3", path: "/navigation-mod3" },
    { label: "Mod 4", path: "/navigation-mod4" },
  ];

  const enabledButtonStyle: string =
    "mx-auto py-2 px-2 rounded-md flex items-center justify-center mr-1 " +
    " bg-cyan-600 focus:bg-cyan-700 transition duration-300 w-15" +
    " text-white text-sm font-bold";

  const disabledButtonStyle: string =
    "mx-auto py-2 px-2 rounded-md flex items-center justify-center mr-1 " +
    " bg-gray-500 cursor-not-allowed w-15" +
    " text-white text-sm font-bold";

  return (
    <div className="flex w-full items-center justify-center">
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