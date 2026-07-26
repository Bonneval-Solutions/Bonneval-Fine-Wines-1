import {
  createClient as baseCreateClient,
  ClientConfig,
  Route,
} from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";
import sm from "../prismic.config.json";

/**
 * The project's Prismic repository name.
 */
export const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_ENVIRONMENT || sm.repositoryName;

/**
 * The project's Prismic route resolvers. This list determines a Prismic document's URL.
 */
const routes: Route[] = [
  { type: "page", uid: "home", path: "/:lang" },
  { type: "page", uid: "domaines", path: "/:lang/domaines" },
  { type: "page", path: "/:lang/:uid" },
  { type: "domaine", path: "/:lang/domaines/:uid" },
];

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export function createClient(config: ClientConfig = {}) {
  const client = baseCreateClient(
    (sm as { apiEndpoint?: string }).apiEndpoint || repositoryName,
    {
      routes,
      accessToken: process.env.PRISMIC_ACCESS_TOKEN,
      fetchOptions:
        process.env.NODE_ENV === "production"
          ? { next: { tags: ["prismic"] }, cache: "force-cache" }
          : { next: { revalidate: 5 } },
      ...config,
    },
  );

  enableAutoPreviews({ client });

  return client;
}
