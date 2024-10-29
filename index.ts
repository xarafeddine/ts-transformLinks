import { transformLinks, type Link } from "./transformLinks";

// Sample test cases to demonstrate functionality.
const testLinks: Link[] = [
  {
    url: "https://wikipedia.org/wiki/OpenAI",
    text: "OpenAI",
    type: "external",
    metadata: { lastChecked: new Date("2024-01-01") },
  },
  {
    url: "/local-page",
    text: "Local Page",
    type: "internal",
  },
  {
    url: "/download/file.zip",
    text: "Download File",
    type: "download",
    metadata: { fileSize: 15 },
  },
];

console.log(transformLinks(testLinks));
