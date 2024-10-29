import { describe, it, expect } from "bun:test";
import {
  transformLinks,
  type ExternalLinkMetadata,
  type Link,
} from "./transformLinks"; // Adjust the import as needed

describe("transformLinks function", () => {
  it('should add "(Externe)" prefix and update URL for external links', () => {
    const input: Link[] = [
      {
        url: "https://wikipedia.org/wiki/OpenAI",
        text: "OpenAI",
        type: "external",
        metadata: { lastChecked: new Date("2024-01-01") },
      },
    ];
    const result = transformLinks(input);

    expect(result[0].url).toBe("https://m-wikipedia.org/wiki/OpenAI");
    expect(result[0].text).toBe("(Externe) OpenAI");
    expect(result[0].metadata).toHaveProperty("lastChecked");
    const resultMetadata = result[0].metadata as ExternalLinkMetadata;
    const inputMetadata = input[0].metadata as ExternalLinkMetadata;
    expect(resultMetadata?.lastChecked).not.toEqual(inputMetadata?.lastChecked);
  });

  it('should add "(Interne)" prefix for internal links', () => {
    const input: Link[] = [
      {
        url: "/local-page",
        text: "Local Page",
        type: "internal",
      },
    ];
    const result = transformLinks(input);

    expect(result[0].url).toBe("/local-page");
    expect(result[0].text).toBe("(Interne) Local Page");
  });

  it('should add "(Large File)" prefix for download links with fileSize > 10', () => {
    const input: Link[] = [
      {
        url: "/download/file.zip",
        text: "Download File",
        type: "download",
        metadata: { fileSize: 15 },
      },
    ];
    const result = transformLinks(input);

    expect(result[0].text).toBe("(Large File) Download File");
    expect(result[0].metadata).toEqual({ fileSize: 15 });
  });

  it('should not add "(Large File)" prefix for download links with fileSize <= 10', () => {
    const input: Link[] = [
      {
        url: "/download/file-small.zip",
        text: "Small Download File",
        type: "download",
        metadata: { fileSize: 8 },
      },
    ];
    const result = transformLinks(input);

    expect(result[0].text).toBe("Small Download File");
    expect(result[0].metadata).toEqual({ fileSize: 8 });
  });

  it("should handle an empty array of links", () => {
    const input: Link[] = [];
    const result = transformLinks(input);

    expect(result).toEqual([]);
  });
});
