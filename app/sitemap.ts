import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com";
  const pages = ["", "/#rooms", "/#gallery", "/#features", "/#inquiry"].map((p) => (p || "/"));
  return pages.map((p) => ({ url: base + p, lastModified: new Date() }));
}
