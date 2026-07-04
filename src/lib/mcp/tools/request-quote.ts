import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "request_quote",
  title: "Request a Quote",
  description:
    "Draft a Stitchery uniform quote request. Returns a formatted summary the caller can send to the Stitchery team.",
  inputSchema: {
    organization: z.string().min(1).describe("Organization or client name."),
    category: z.string().min(1).describe("Uniform category, e.g. School, Corporate, Hospital."),
    quantity: z.number().int().positive().describe("Approximate number of uniforms needed."),
    deadline: z.string().optional().describe("Target delivery date (ISO or free text)."),
    notes: z.string().optional().describe("Fabric, color, sizing, or design notes."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ organization, category, quantity, deadline, notes }) => {
    const summary = [
      `Quote Request — ${organization}`,
      `Category: ${category}`,
      `Quantity: ${quantity}`,
      deadline ? `Deadline: ${deadline}` : null,
      notes ? `Notes: ${notes}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    return {
      content: [{ type: "text", text: summary }],
      structuredContent: { organization, category, quantity, deadline, notes },
    };
  },
});
