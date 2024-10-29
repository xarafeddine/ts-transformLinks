/**
 * Type alias representing possible link types.
 */
type LinkType = "external" | "internal" | "download";

/**
 * Interface for external link metadata.
 */
export interface ExternalLinkMetadata {
  lastChecked: Date;
}

/**
 * Interface for download link metadata.
 */
export interface DownloadLinkMetadata {
  fileSize: number;
}

/**
 * Main interface for a Link.
 */
export interface Link {
  url: string;
  text: string;
  type: LinkType;
  metadata?: ExternalLinkMetadata | DownloadLinkMetadata;
}

/**
 * Function to transform a list of links based on specific rules.
 * @param links - An array of links to transform.
 * @returns A new array of transformed links.
 */
export function transformLinks(links: Link[]): Link[] {
  return links.map((link) => {
    // Clone the link to avoid mutation of the original input.
    const transformedLink: Link = { ...link };

    // Check for type-specific transformations.
    switch (link.type) {
      case "external":
        transformedLink.url = link.url.replace(
          "wikipedia.org",
          "m-wikipedia.org"
        );
        transformedLink.text = `(Externe) ${link.text}`;

        if (link.metadata && "lastChecked" in link.metadata) {
          transformedLink.metadata = {
            ...link.metadata,
            lastChecked: new Date(), // Update lastChecked to the current date.
          };
        }
        break;

      case "internal":
        transformedLink.text = `(Interne) ${link.text}`;
        break;

      case "download":
        if (
          link.metadata &&
          "fileSize" in link.metadata &&
          link.metadata.fileSize > 10
        ) {
          transformedLink.text = `(Large File) ${link.text}`;
        }
        break;
    }

    return transformedLink;
  });
}
