"use client";
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