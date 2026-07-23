/**
 * Central Prism grammar registration.
 *
 * The base `prismjs` import only ships markup/css/clike/javascript, so
 * Python/TS/Go/etc. snippets were previously rendered without highlighting.
 * Importing the grammar components here (in dependency-safe order) makes
 * highlighting work across all the languages we map in languages.js.
 *
 * Import this once (from main.jsx) before rendering.
 */
import "prismjs";

// clike-based languages
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-java";

// javascript-derived (javascript is in core)
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

// standalone / markup-derived
import "prismjs/components/prism-python";
import "prismjs/components/prism-go";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-ruby";
// PHP depends on markup-templating — it MUST be imported first, otherwise
// PHP's global after-tokenize hook calls tokenizePlaceholders on `undefined`
// and crashes highlighting for every language.
import "prismjs/components/prism-markup-templating";
import "prismjs/components/prism-php";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-json";
import "prismjs/components/prism-yaml";
import "prismjs/components/prism-css";
