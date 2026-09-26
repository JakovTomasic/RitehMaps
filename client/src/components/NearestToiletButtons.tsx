import { useState } from "react";
import {
  findSpecialSearchResult,
  isSpecialSearchResultId,
  NEAREST_MEN_TOILET_ID,
  NEAREST_WOMEN_TOILET_ID,
} from "../data/SpecialSearchResults";
import { SearchNodeSuggestion } from "../types/roomsearch/SearchNodeSuggestion";
import ChevronIcon from "./ChevronIcon";
import ToiletIcon, { ToiletGender } from "./ToiletIcon";
import { useTranslations } from "../i18n";
import { Translations } from "../i18n/en";

const TOILET_SHORTCUTS: { id: string, gender: ToiletGender, label: (t: Translations) => string }[] = [
  { id: NEAREST_MEN_TOILET_ID, gender: "men", label: t => t.search.men },
  { id: NEAREST_WOMEN_TOILET_ID, gender: "women", label: t => t.search.women },
];

type Props = {
  /** The destination currently in the form, so a shortcut that is already picked shows as picked. */
  selectedDestinationId?: string;
  enabled: boolean;
  /**
   * Padding that lines the "nearest toilet" toggle up with whatever it hangs off - the form knows
   * the width of its own columns, this doesn't. The buttons under it ignore it and take the
   * full width.
   */
  headingIndentClassName?: string;
  /** Called with null when the picked shortcut is tapped again - same as clearing the field. */
  onPick: (destination: SearchNodeSuggestion | null) => void;
};

/**
 * Shortcut to the two "nearest toilet" searches, which are otherwise only reachable by typing their
 * name. They stay ordinary destinations: picking one only fills the destination field above, so the
 * route is started the same way as any other and nothing moves under the user.
 */
function NearestToiletButtons({ selectedDestinationId, enabled, headingIndentClassName, onPick }: Props) {
  const t = useTranslations();
  // Open on arrival only when a toilet is already the destination (a shared link, or coming back
  // from a route): the picked button has to be visible next to the name in the field.
  const [expanded, setExpanded] = useState(() => isSpecialSearchResultId(selectedDestinationId));

  const somethingPicked = isSpecialSearchResultId(selectedDestinationId);

  return (

    <div className="w-full">

      <div className={headingIndentClassName}>
        <button
          type="button"
          aria-expanded={expanded}
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-1 -ml-0.5 px-0.5 py-1 text-sm font-medium transition
                      ${somethingPicked ? "text-cyan-700" : "text-gray-400 hover:text-gray-600"}`}
        >
          {t.search.nearestToilet}
          <ChevronIcon expanded={expanded} />
        </button>
      </div>

      {expanded && (
        <div className="flex w-full flex-wrap items-center justify-center gap-1.5 pt-1">
          {TOILET_SHORTCUTS.map((shortcut) => {
            // Name and id come from the search data itself, so the field reads exactly like it
            // would after typing the name. A shortcut whose search entry is gone is not offered.
            const specialSearchResult = findSpecialSearchResult(shortcut.id);
            if (specialSearchResult == undefined) {
              return null;
            }

            const selected = selectedDestinationId === specialSearchResult.id;
            const name = specialSearchResult.name(t);

            return (
              <ToiletButton
                key={shortcut.id}
                gender={shortcut.gender}
                label={shortcut.label(t)}
                name={name}
                selected={selected}
                enabled={enabled}
                onClick={() => onPick(
                  selected ? null : new SearchNodeSuggestion(specialSearchResult.id, name)
                )}
              />
            );
          })}
        </div>
      )}

    </div>

  );
}

export default NearestToiletButtons;

type ToiletButtonProps = {
  gender: ToiletGender;
  label: string;
  /** Full search name ("Nearest men toilet"); the visible label is shortened by the row's heading. */
  name: string;
  selected: boolean;
  enabled: boolean;
  onClick: () => void;
};

function ToiletButton(props: ToiletButtonProps) {
  let colors: string;
  if (!props.enabled) {
    colors = "bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed";
  } else if (props.selected) {
    colors = "bg-cyan-500 text-white border-cyan-600";
  } else {
    colors = "bg-white text-gray-600 border-gray-300 hover:border-cyan-600 hover:text-cyan-700";
  }

  return (
    <button
      type="button"
      // Left pressable rather than disabled: the whole card ignores clicks while a suggestion
      // dropdown is open (it would be closed by this very click), and a dead button gives no hint.
      aria-label={props.name}
      aria-pressed={props.selected}
      onClick={() => {
        if (props.enabled) {
          props.onClick();
        }
      }}
      // `basis-28` is what makes the row wrap: the buttons share the width while both fit next to
      // each other, and drop onto a line each (still full width) once they don't - a long label in
      // some language, or a narrow phone.
      className={`flex flex-1 basis-28 items-center justify-center gap-1.5 py-1.5 px-3 text-sm
                  font-semibold border rounded-lg transition ease-in duration-200 ${colors}`}
    >
      <ToiletIcon gender={props.gender} />
      {props.label}
    </button>
  );
}
