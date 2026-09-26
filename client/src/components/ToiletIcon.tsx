export type ToiletGender = "men" | "women";

/** Mars / Venus glyph, the sign the doors themselves carry. */
function ToiletIcon(props: { gender: ToiletGender }) {
  return (

    <svg
      className="h-4 w-4 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {props.gender === "men" ? (
        <>
          <circle cx="10" cy="14" r="6" />
          <line x1="14.5" y1="9.5" x2="21" y2="3" />
          <polyline points="15,3 21,3 21,9" />
        </>
      ) : (
        <>
          <circle cx="12" cy="9" r="6" />
          <line x1="12" y1="15" x2="12" y2="22" />
          <line x1="8.5" y1="19" x2="15.5" y2="19" />
        </>
      )}
    </svg>

  );
}

export default ToiletIcon;
