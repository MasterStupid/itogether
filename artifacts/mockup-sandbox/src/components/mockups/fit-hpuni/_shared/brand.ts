/**
 * FIT-HPUni brand facts shared by every shirt concept.
 * These are fixed constraints from the faculty, not design choices.
 */
export const BRAND = {
  /** Navy pixel-sampled from the logo's inner disc */
  navy: "#35526F",
  /** White of the logo artwork and outer ring */
  white: "#FFFFFF",

  /** Official logo, original artwork with transparent corners (948 px raster) */
  logo: "/__mockup/images/fit-logo.png",
  /** Untouched original upload (474 px, white corners) */
  logoOriginal: "/__mockup/images/fit-logo-original.webp",

  slogan: "You can do IT, we are ready to accompany",
  sloganLead: "You can do IT",
  sloganTail: "we are ready to accompany",

  facultyVi: "Khoa Công nghệ Thông tin",
  facultyViUpper: "KHOA CÔNG NGHỆ THÔNG TIN",
  facultyEn: "Faculty of Information Technology",
  universityVi: "Trường Đại học Hải Phòng",
  universityEn: "Hai Phong University",
  short: "FIT-HPUni",
} as const;

/**
 * Shared colour system. Every concept uses the core colours plus ONLY its
 * own accent(s); tints/shades of these are fine, new hues are not.
 * Pantone codes are references only — final colours are approved on a lab dip.
 */
export const PALETTE = {
  navy: { hex: "#35526F", name: "Xanh FIT (lấy từ logo)", pantone: "PANTONE 19-4035 TCX Dark Blue (tham khảo)" },
  navyDeep: { hex: "#1F3349", name: "Xanh than đậm" },
  white: { hex: "#FFFFFF", name: "Trắng" },
  /** Concept A · Dấu Ấn */
  silver: { hex: "#C9D1D9", name: "Xám bạc" },
  /** Concept B · do IT */
  terminal: { hex: "#34D399", name: "Xanh Terminal" },
  /** Concept C · Phượng Số */
  phuong: { hex: "#E2322B", name: "Đỏ Phượng", pantone: "PANTONE 17-1664 TCX Poppy Red (tham khảo)" },
  nhuy: { hex: "#F4C542", name: "Vàng nhụy" },
  /** Concept D · Cảng Khởi Hành */
  cang: { hex: "#F26B21", name: "Cam Cảng" },
} as const;
