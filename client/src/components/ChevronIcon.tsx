/** Points down when collapsed, turns to point up while the section it opens is open. */
function ChevronIcon(props: { expanded: boolean }) {
  return (

    <svg
      className={`h-3.5 w-3.5 shrink-0 transition-transform duration-200
                  ${props.expanded ? "rotate-180" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>

  );
}

export default ChevronIcon;
