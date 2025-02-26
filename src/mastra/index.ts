import { createLogger, Mastra } from "@mastra/core";
import { excalidrawConverterWorkflow } from "./workflows";
import {
  csvToExcalidrawAgent,
  imageToCsvAgent,
  excalidrawValidatorAgent,
} from "./agents";

export const mastra = new Mastra({
  agents: { csvToExcalidrawAgent, imageToCsvAgent, excalidrawValidatorAgent },
  workflows: { excalidrawConverterWorkflow },
  logger: createLogger({
    name: "Whiteboard Excalidraw Converter",
    level: "debug",
  }),
});
