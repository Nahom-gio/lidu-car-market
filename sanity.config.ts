import {defineConfig} from "sanity";
import {deskTool} from "sanity/desk";
import {visionTool} from "@sanity/vision";

import {schemaTypes} from "@/sanity/schemaTypes";
import {singletonPluginConfig, structure} from "@/sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "woekaf2m";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "product";

export default defineConfig({
  name: "default",
  title: "LIDU car market",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [deskTool({structure}), visionTool()],
  ...singletonPluginConfig,
  schema: {
    types: schemaTypes,
  },
});
