import type { Metadata } from "next";

/** Keeps demo, sample and unpublished pages out of search indexes. */
export function noIndexUnless(isPublic: boolean): Pick<Metadata, "robots"> {
  return isPublic ? {} : { robots: { index: false, follow: false } };
}
