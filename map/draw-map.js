async function drawMap() {
  // 1. Access data
  let json = await d3.json('./us-states.json');
  let dataset = await d3.csv('./zipcodes_1000.csv');

  //console.log(json);
  //console.log(dataset);

  // // 2. Create chart dimensions
  // const width = d3.min([window.innerWidth * 0.8, window.innerHeight * 0.8]);

  // let dimensions = {
  //   width: width,
  //   height: width,
  //   margin: {
  //     top: 10,
  //     right: 10,
  //     bottom: 50,
  //     left: 50,
  //   },
  // };
  // dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  // dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  const projection = d3
    .geoAlbersUsa()
    .scale(1200)
    .translate([960 / 1.8, 600 / 2]);

  const path = d3.geoPath().projection(projection);

  const svg = d3.select('#wrapper').append('svg').attr('width', 960).attr('height', 600);

  const mapp = svg
    .selectAll('path')
    .data(json.features)
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', '#ccc')
    .attr('stroke', 'white')
    .attr('stroke-linejoin', 'round');

  const bubbles = svg
    .append('g')
    .selectAll('circles')
    .data(dataset)
    .enter()
    .append('circle')
    // .attr('cx', (d) => projection([d['lon'], d['lat']]))
    .attr('cy', (d) => {
      console.log(+d.lon, +d.lat);
      let coords = projection([+d.lon, +d.lat]);
      console.log(coords);
      return coords[1];
    })
    .attr('cx', (d) => {
      console.log(+d.lon, +d.lat);
      let coords = projection([+d.lon, +d.lat]);
      console.log(coords);
      return coords[0];
    })
    .attr('r', 5);
}

drawMap();
