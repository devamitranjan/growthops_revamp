"use client";

import { NextStudio } from "next-sanity/studio";

import config from "@/cms/sanity/sanity.config";

/**
 * The Studio config has to be imported behind a client boundary.
 *
 * It holds functions (the structure resolver, validation rules), so it cannot
 * be serialized and passed down from a Server Component. Importing it from the
 * page directly would also pull the whole `sanity` package into the RSC graph,
 * where `swr` resolves to its `react-server` build and the default export it
 * needs does not exist — that fails the build outright.
 */
export default function Studio() {
  return <NextStudio config={config} />;
}
