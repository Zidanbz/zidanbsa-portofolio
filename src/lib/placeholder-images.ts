import data from './placeholder-images.json';

export type ImageFit = "cover" | "contain";

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  objectFit?: ImageFit;
  objectPosition?: string;
};

function resolveImageUrl(rawValue: string): string {
  const value = rawValue.trim();
  if (value.startsWith("http://") || value.startsWith("https://") || value.startsWith("/")) {
    return value;
  }

  // Local filename in assets/images, served by API route.
  return `/api/images/${encodeURIComponent(value)}`;
}

function normalizeImageFit(rawValue: unknown): ImageFit | undefined {
  if (rawValue === "cover" || rawValue === "contain") {
    return rawValue;
  }

  return undefined;
}

export const PlaceHolderImages: ImagePlaceholder[] = data.placeholderImages.map((item) => ({
  ...item,
  imageUrl: resolveImageUrl(item.imageUrl),
  objectFit: normalizeImageFit(item.objectFit),
}));
