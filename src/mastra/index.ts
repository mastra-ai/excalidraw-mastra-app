import { createLogger, Mastra } from "@mastra/core";
import { excalidrawConverterAgent } from "./agents";
import { excalidrawConverterWorkflow } from "./workflows";

export const mastra = new Mastra({
  agents: { excalidrawConverterAgent },
  workflows: { excalidrawConverterWorkflow },
  logger: createLogger({
    name: "Whiteboard Excalidraw Converter",
    level: "debug",
  }),
});
