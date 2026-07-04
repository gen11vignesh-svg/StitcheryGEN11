import { defineMcp } from "@lovable.dev/mcp-js";
import getServicesTool from "./tools/get-services";
import requestQuoteTool from "./tools/request-quote";

export default defineMcp({
  name: "stitchery-mcp",
  title: "Stitchery MCP",
  version: "0.1.0",
  instructions:
    "Tools for Stitchery — precision uniform tailoring. Use `get_services` to list offerings and `request_quote` to draft a quote request for a client.",
  tools: [getServicesTool, requestQuoteTool],
});
