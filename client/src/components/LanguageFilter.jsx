import FilterChips from "./FilterChips";
import { getLanguageMeta } from "../lib/languages";

/**
 * Language filter — a FilterChips group with a small language-color dot on
 * each chip. Same props/logic as before.
 */
function LanguageFilter({ languages, activeLanguage, setActiveLanguage }) {
  return (
    <FilterChips
      label="Language"
      groupId="language"
      items={languages}
      active={activeLanguage}
      onChange={setActiveLanguage}
      allLabel="All"
      leading={(lang) => {
        const { dot } = getLanguageMeta(lang);
        return (
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: dot }}
          />
        );
      }}
    />
  );
}

export default LanguageFilter;
