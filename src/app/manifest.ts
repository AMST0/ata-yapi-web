import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ata Yapı | Giyotin Cam, Cam Balkon, Sineklik & Tente Sistemleri",
    short_name: "Ata Yapı",
    description:
      "Motorlu giyotin cam sistemleri, ısıcamlı cam balkon, plise & kedi sinekliği ve kasetli tente üreticisi.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f19",
    theme_color: "#0b0f19",
    lang: "tr",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "32x32",
        type: "image/x-icon",
      },
    ],
  };
}

