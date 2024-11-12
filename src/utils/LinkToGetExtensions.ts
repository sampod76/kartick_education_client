type IExtension = '.ppt' | '.pptx' | '.doc' | '.docx' | '.pdf';

interface LinkInfo {
  type: string;
  link: string;
}

const extensionTypes: Record<IExtension, string> = {
  '.ppt': 'powerPoint',
  '.pptx': 'powerPoint',
  '.doc': 'document',
  '.docx': 'document',
  '.pdf': 'pdf',
};

export const LinkToGetExtensions = (
  link: string,
  extensions: IExtension[],
): LinkInfo | null => {
  const match = link?.match(/\.\w+$/); // Matches .extension only at the end of the string

  if (match && extensions.includes(match[0] as IExtension)) {
    const type = extensionTypes[match[0] as IExtension];

    return { type, link };
  }

  return null; // Return null if no valid extension is found
};
