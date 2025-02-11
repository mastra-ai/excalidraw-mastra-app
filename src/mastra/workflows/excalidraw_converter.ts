import { Step, Workflow } from "@mastra/core/workflows";
import { z } from "zod";
import { mastra } from "../index";

const outputSchema = z.object({
  filename: z.string(),
  contents: z.object({}).passthrough(), // Allow any object structure for Excalidraw contents
});

const convertImageStep = new Step({
  id: "convertImage",
  outputSchema,
  execute: async ({ context }) => {
    if (!context?.triggerData?.filename || !context?.triggerData?.file) {
      throw new Error("Missing required image data in machine context");
    }

    const excalidraw = mastra.getAgent("excalidrawConverterAgent");
    const response = await excalidraw.generate(
      [
        {
          role: "user",
          content: [
            {
              type: "image",
              image: context.triggerData.file,
            },
            {
              type: "text",
              text: `View this image and convert it into an Excalidraw diagram. Return only the JSON representation of the diagram in the contents property along with a filename that ends with .excalidraw. The original filename was ${machineContext.triggerData.filename}.`,
            },
          ],
        },
      ],
      {
        output: outputSchema,
      }
    );

    return response.object;
  },
});

// Create the workflow
export const excalidrawConverterWorkflow = new Workflow({
  name: "excalidraw-converter",
  triggerSchema: z.object({
    filename: z.string(),
    file: z.string(),
  }),
});

excalidrawConverterWorkflow.step(convertImageStep);
excalidrawConverterWorkflow.commit();
