
function PinIcon(props) {
  const color = props.color === "start" ? "text-gray-500" : "text-cyan-600";

  return (

    <svg
      className={`h-6 w-6 justify-center ${color}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
    
  );
}

export default PinIcon;
