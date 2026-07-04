import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

const SERVICES = [
  "School Uniforms",
  "Corporate Uniforms",
  "Defense & Security Uniforms",
  "Hospital & Medical Uniforms",
  "Hospitality Uniforms",
  "Sports & Team Kits",
  "Chef & Kitchen Wear",
  "Industrial Workwear",
  "Aviation Uniforms",
  "Bespoke Tailoring",
];

export default defineTool({
  name: "get_services",
  title: "Get Stitchery Services",
  description: "List the uniform and tailoring services Stitchery offers.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text", text: SERVICES.join("\n") }],
    structuredContent: { services: SERVICES },
  }),
});
