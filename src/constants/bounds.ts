
export const JAPAN_BOUNDS: maplibregl.LngLatBoundsLike = [
  [122.93457, 20.42596],
  [153.98667, 45.55148]
];

export const CHIBA_BOUNDS: maplibregl.LngLatBoundsLike = [
  [139.50, 34.70],   // Southwest (slightly lower to include southern tip)
  [141.00, 36.20]    // Northeast (higher to include full northern edge)
];


export const NAGAKUTE_BOUNDS: maplibregl.LngLatBoundsLike = [
  // Nagakute City (Aichi) approx bounds
  [137.00, 35.15],
  [137.12, 35.23]
];

// Approximate bounding box for Aichi Prefecture
// Southwest corner to Northeast corner (covers Nagoya and surrounding area)
export const AICHI_BOUNDS: maplibregl.LngLatBoundsLike = [
  [136.60, 34.55],
  [137.85, 35.45]
];
