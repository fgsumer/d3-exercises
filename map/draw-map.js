async function drawMap() {
  // 1. Access data
  let json = await d3.json('./us-states.json');
  let dataset = await d3.csv('./zipcodes_all.csv');

  //console.log(json);
  //console.log(dataset);

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
    margin: {
      top: 20,
      left: 20,
    },
  };
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left * 2;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top;

  const projection = d3
    .geoAlbersUsa()
    .scale(1300)
    .translate([dimensions.boundedWidth / 2, dimensions.boundedHeight / 2]);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight)
    .attr('viewbox', `0, 0, ${dimensions.width}, ${dimensions.height}`);

  // const mapp = svg
  //   .selectAll('path')
  //   .data(json.features)
  //   .enter()
  //   .append('path')
  //   .attr('d', path)
  //   .attr('stroke', 'white')
  //   .attr('stroke-linejoin', 'round');

  const g = svg.append('g');

  g.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cy', (d) => projection([-d.lon, +d.lat])[1])
    .attr('cx', (d) => projection([-d.lon, +d.lat])[0])
    .attr('r', 1.3)
    .style('opacity', 0.3)
    .style('fill', '#88CEC4');

  svg.call(
    d3
      .zoom()
      .extent([
        [0, 0],
        [dimensions.boundedWidth, dimensions.boundedHeight],
      ])
      .scaleExtent([1, 30])
      .on('zoom', () => {
        g.attr('transform', d3.event.transform);
      }),
  );
}

drawMap();
