/* eslint-disable @chloeglowy/restrict-imports/restrict-import-folders */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no types for this module
import unicodeSubstring from 'unicode-substring';
/* eslint-enable @chloeglowy/restrict-imports/restrict-import-folders */

// Adapted from https://stackoverflow.com/a/65730622/2089738
export default function searchPrefixes(original: string): string {
  return original
    .split(' ')
    .reduce((ngrams: string[], token: string): string[] => {
      for (let i = 1; i <= token.length; i++) {
        const next = unicodeSubstring(token, 0, i);
        if (next === ngrams[ngrams.length - 1]) {
          // We're past the end of the string
          break;
        } else {
          ngrams.push(next);
        }
      }
      return ngrams;
    }, [])
    .join(' ');
}
