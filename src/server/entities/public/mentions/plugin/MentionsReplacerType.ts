export interface MentionsReplacerType {
  updateStringWithMentionsUsingCurrentNames(
    originalString: string,
    getCurrentName: (id: string) => Promise<string>,
  ): Promise<string>;
}
