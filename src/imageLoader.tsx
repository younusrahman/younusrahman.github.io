// src/components/StaticImage.tsx
"use client";
// const _imageLoader = {
//   "project-1": new URL(
//     "/src/assets/images/portfolio/thumb/project-1.png",
//     import.meta.url
//   ).href,
//   "project-2": new URL(
//     "/src/assets/images/portfolio/thumb/project-2.png",
//     import.meta.url
//   ).href,
//   // Add more images as needed
// };

// export const ImageLoader = _imageLoader;
// export type PortfolioImageKey = keyof typeof _imageLoader;

// interface StaticImageProps {
//   name: PortfolioImageKey;
//   alt?: string;
//   className?: string;
// }

// export default function ImageElementLoader({
//   name,
//   alt,
//   className,
// }: StaticImageProps) {
//   const src = _imageLoader[name];

//   if (!src) {
//     console.error(`Image "${name}" not found`);
//     return <div className={className}>Image not found</div>;
//   }

//   return <img src={src} alt={alt} className={className} />;
// }

export const imageModules = import.meta.glob(
  "/src/assets/images/**/*.{png,jpg,jpeg,svg}",
  {
    eager: true,
    query: "?url",
  }
);

export const imagePaths = Object.keys(imageModules).reduce<Record<string, string>>((acc, path) => {
  const key = path.replace("/src/assets/images/", "");
  acc[key] = (imageModules[path] as { default: string }).default; // The URL is pre-resolved by Vite
  return acc;
}, {});