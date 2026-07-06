/* ============================================================
   PIXEL ICONS — hand-drawn 8x8 bitmap icons rendered as CSS grids.
   No emoji, no icon fonts, no images: every icon here is a literal
   grid of <i> blocks colored on/off from a bitmap string array.
   ============================================================ */

const PIXEL_ICONS = {
  shield: [
    "00111100",
    "01111110",
    "11111111",
    "11122111",
    "11122111",
    "01111110",
    "00111100",
    "00011000",
  ],
  gamepad: [
    "00111100",
    "01111110",
    "11122111",
    "11211121",
    "11211121",
    "11122111",
    "01111110",
    "00111100",
  ],
  chip: [
    "01011010",
    "00111100",
    "01122210",
    "01211210",
    "01211210",
    "01222110",
    "00111100",
    "01011010",
  ],
  camera: [
    "00011000",
    "01111110",
    "11111111",
    "10122101",
    "10211201",
    "10122101",
    "11111111",
    "01111110",
  ],
  terminal: [
    "11111111",
    "10000001",
    "10200001",
    "10220001",
    "10200001",
    "10000001",
    "10011101",
    "11111111",
  ],
  globe: [
    "00111100",
    "01111110",
    "11212121",
    "11111111",
    "11111111",
    "11212121",
    "01111110",
    "00111100",
  ],
  mail: [
    "11111111",
    "10000001",
    "11200021",
    "10122101",
    "10011001",
    "10000001",
    "10000001",
    "11111111",
  ],
  github: [
    "00111100",
    "01111110",
    "11111111",
    "11211121",
    "11111111",
    "01111110",
    "01000010",
    "10000001",
  ],
  link: [
    "00000000",
    "01110000",
    "10001100",
    "10001010",
    "01010001",
    "00110001",
    "00000111",
    "00000000",
  ],
  bolt: [
    "00001110",
    "00011100",
    "00111000",
    "01111111",
    "00011110",
    "00011100",
    "00111000",
    "01110000",
  ],
};

/* 0 = transparent, 1 = ink (border color), 2 = accent color */
function renderPixelIcon(name, { size = 40, ink = "#111111", accent = "var(--accent)" } = {}) {
  const bitmap = PIXEL_ICONS[name];
  if (!bitmap) return document.createElement("span");

  const cell = size / 8;
  const wrap = document.createElement("div");
  wrap.className = "pxl-icon";
  wrap.style.width = size + "px";
  wrap.style.height = size + "px";
  wrap.style.gridTemplateColumns = `repeat(8, ${cell}px)`;
  wrap.style.gridTemplateRows = `repeat(8, ${cell}px)`;
  wrap.setAttribute("aria-hidden", "true");

  bitmap.forEach((row) => {
    row.split("").forEach((bit) => {
      const px = document.createElement("i");
      if (bit === "1") px.style.background = ink;
      else if (bit === "2") px.style.background = accent;
      else px.style.background = "transparent";
      wrap.appendChild(px);
    });
  });

  return wrap;
}

/* Auto-mount: <span data-pixel-icon="shield" data-size="48"></span> */
function mountPixelIcons(root = document) {
  root.querySelectorAll("[data-pixel-icon]").forEach((el) => {
    const name = el.getAttribute("data-pixel-icon");
    const size = parseInt(el.getAttribute("data-size") || "40", 10);
    const icon = renderPixelIcon(name, { size });
    el.replaceWith(icon);
  });
}

document.addEventListener("DOMContentLoaded", () => mountPixelIcons());
