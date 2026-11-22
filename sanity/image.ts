import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/**
 * Build a Sanity CDN URL for an image field, respecting its hotspot/crop.
 *
 * @example
 * urlFor(project.mainImage).width(1200).height(630).url()
 */
export function urlFor(source: SanityImageSource) {
  // Serve WebP/AVIF to browsers that support it.
  return builder.image(source).auto("format");
}
