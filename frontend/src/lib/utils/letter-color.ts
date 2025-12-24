const letterColors: Record<string, string> = {
  A: "#E63946", // tamnija crvena
  B: "#1B9AAA", // tamnija tirkiz
  C: "#264653", // tamnija plava
  D: "#F4A261", // toplija narandžasta
  E: "#9B5DE5", // purple
  F: "#6A0572", // tamnija ljubičasta
  G: "#007F5F", // tamnija zelena
  H: "#F08A5D", // topla narandžasta
  I: "#FF6B6B", // umjereno crvena
  J: "#6C5B7B", // tamnija ljubičasta
  K: "#2C3E50", // tamno plava
  L: "#D62828", // tamnija crvena
  M: "#023047", // tamna plava
  N: "#8D99AE", // tamno siva/plava
  O: "#6A0572", // purple
  P: "#05668D", // tamnija plava
  Q: "#9A031E", // tamnija crvena
  R: "#370617", // tamna burgundy
  S: "#1B262C", // vrlo tamna plava
  T: "#FF7F50", // koral boja
  U: "#720026", // tamnija ljubičasta/crvena
  V: "#264653", // tamnija plava
  W: "#BC6C25", // tamnija narandžasta
  X: "#5E548E", // purple
  Y: "#3D348B", // tamnija plava/lila
  Z: "#1A1A1D", // skoro crna
};

export function getColorForLetter(letter: string): string {
  const upper = letter.toUpperCase();
  return letterColors[upper] || "#CCCCCC";
}
