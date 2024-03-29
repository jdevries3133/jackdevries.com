import type { ValidSlug } from "./types";
import { moduleNameMapping } from "./collections";
import { json } from "@remix-run/node";

export const isSlugValid = (slug: string | undefined): boolean => {
  return slug !== undefined && slug in moduleNameMapping;
};

export const validateSlug = (slug: string | undefined): ValidSlug => {
  if (isSlugValid(slug)) {
    return slug as ValidSlug;
  }
  throw json("slug is not valid", { status: 404, statusText: "Not Found" });
};
