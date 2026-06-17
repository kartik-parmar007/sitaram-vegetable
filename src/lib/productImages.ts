import potato from "@/assets/potato.jpg";
import onion from "@/assets/onion.jpg";
import garlic from "@/assets/garlic.jpg";
import tomato from "@/assets/tomato.jpg";
import carrot from "@/assets/carrot.jpg";
import broccoli from "@/assets/broccoli.jpg";
import capsicum from "@/assets/capsicum.jpg";

export const IMAGE_MAP: Record<string, string> = {
  potato, onion, garlic, tomato, carrot, broccoli, capsicum,
};

export const IMAGE_KEYS = Object.keys(IMAGE_MAP);

export const resolveImage = (key: string): string => {
  if (!key) return IMAGE_MAP.potato;
  if (key.startsWith("http") || key.startsWith("/") || key.startsWith("data:")) return key;
  return IMAGE_MAP[key] ?? IMAGE_MAP.potato;
};
