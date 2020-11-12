async function drawMap() {
  // 1. Access data
  //let json = await d3.json('./us-states.json');
  let dataset = await d3.csv('./zipcodes_all.csv');

  //console.log(json);
  //console.log(dataset);

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.9,
    height: window.innerHeight * 0.9,
    margin: {
      top: 0,
      left: 20,
    },
  };
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left * 2;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top;

  const projection = d3
    .geoAlbersUsa()
    .scale(1300)
    .translate([dimensions.boundedWidth / 2, dimensions.boundedHeight / 2.3]);

  const path = d3.geoPath().projection(projection);

  const svg = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight)
    .attr('viewbox', `0, 0, ${dimensions.boundedWidth}, ${dimensions.boundedHeight}`);

  // const map = svg
  //   .selectAll('path')
  //   .data(json.features)
  //   .enter()
  //   .append('path')
  //   .attr('d', path)
  //   .attr('stroke', 'null')
  //   .attr('stroke-width', 'null')
  //   .attr('stroke-linejoin', 'round')
  //   .on('mouseover', function () {
  //     d3.select(this).attr('stroke-width', '1').attr('stroke', '#88CEC4');
  //   })
  //   .on('mouseout', function (d) {
  //     d3.select(this).attr('stroke-width', 'null').attr('stroke', 'null');
  //   });

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

  // const myColor = d3
  //   .scaleLinear()
  //   .domain([1, 12, 23, 34, 45, 56, 57])
  //   .range(['#85C3CE', '#324376', '#F5DD90', '#FCA10C', '#FE0014', '#7F008A']);

  const myColor = d3.scaleSequential().domain([1, 58]).interpolator(d3.interpolateBrBG);

  const svg2 = d3
    .select('.main')
    .append('svg')
    .attr('width', dimensions.boundedWidth)
    .attr('height', dimensions.boundedHeight)
    .attr('viewbox', `0, 0, ${dimensions.boundedWidth}, ${dimensions.boundedHeight}`);

  const g2 = svg2.append('g');

  g2.selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cy', (d) => projection([-d.lon, +d.lat])[1])
    .attr('cx', (d) => projection([-d.lon, +d.lat])[0])
    .attr('r', 1.8)
    .style('opacity', 0.8)
    .style('fill', (d) => myColor(+d.index));

  const title = svg2
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', 22)
    .attr('fill', '19223B')
    .style('font-size', '2em')
    .attr('text-anchor', 'middle')
    .text('USA map of ZIP codes by states');
}

drawMap();
