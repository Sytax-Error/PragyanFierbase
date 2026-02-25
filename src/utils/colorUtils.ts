
// src/utils/colorUtils.ts

/**
 * Generates a vibrant, light pastel color from a string.
 * This function is kept for legacy purposes but is not used in the modern dashboard.
 *
 * @param str The input string (e.g., dashboard name)
 * @returns A pastel color in HSL format
 */
export const generatePastelColor = (str: string): string => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const hue = hash % 360;
  const saturation = 75;
  const lightness = 80;

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
};

/**
 * Generates a sophisticated and modern color from a curated, hand-picked palette.
 * This function ensures every color is stylish, professional, and cohesive with the modern design.
 *
 * @param str The input string (e.g., dashboard name)
 * @returns An object with hue, saturation, lightness, and the full HSL string.
 */
export const generateModernColor = (str: string): { h: number; s: number; l: number; hsl: string } => {
  // A curated list of hand-picked, modern and professional hues.
  const curatedHues = [
    210, // Cool, professional blue
    260, // Rich, elegant purple
    180, // Modern, clean teal
    330, // Vibrant, stylish magenta
    25,  // Soft, warm orange
    300, // Deep, luxurious pink
    195, // A different shade of blue/cyan
    280, // A nice indigo
  ];

  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash; // Ensure the hash is a 32bit integer
  }

  // Use the hash to deterministically pick a hue from our curated list.
  const h = curatedHues[Math.abs(hash) % curatedHues.length];
  
  // Use the refined saturation and lightness for a consistent, premium feel.
  const s = 65;
  const l = 60;

  return {
    h,
    s,
    l,
    hsl: `hsl(${h}, ${s}%, ${l}%)`,
  };
};
