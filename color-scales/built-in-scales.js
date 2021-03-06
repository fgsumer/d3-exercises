// These default D3 scales have been designed to have enough contrast between colors for us
const d3ColorScales = [
  {
    title: 'Categorical',
    scales: [
      'schemeCategory10',
      'schemeAccent',
      'schemeDark2',
      'schemePaired',
      'schemePastel1',
      'schemePastel2',
      'schemeSet1',
      'schemeSet2',
      'schemeSet3',
    ],
  },
  {
    title: 'Sequential (Single Hue)',
    scales: [
      'interpolateBlues',
      'interpolateGreens',
      'interpolateGreys',
      'interpolateOranges',
      'interpolatePurples',
      'interpolateReds',
    ],
  },
  {
    title: 'Sequential (Multi-Hue)',
    scales: [
      'interpolateBuGn',
      'interpolateBuPu',
      'interpolateGnBu',
      'interpolateOrRd',
      'interpolatePuBuGn',
      'interpolatePuBu',
      'interpolatePuRd',
      'interpolateRdPu',
      'interpolateYlGnBu',
      'interpolateYlGn',
      'interpolateYlOrBr',
      'interpolateYlOrRd',
    ],
  },
  {
    title: 'Diverging',
    scales: [
      'interpolateBrBG',
      'interpolatePRGn',
      'interpolatePiYG',
      'interpolatePuOr',
      'interpolateRdBu',
      'interpolateRdGy',
      'interpolateRdYlBu',
      'interpolateRdYlGn',
      'interpolateSpectral',
    ],
  },
  {
    title: 'Cyclical',
    scales: ['interpolateRainbow', 'interpolateSinebow'],
  },
];
