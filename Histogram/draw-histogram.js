async function drawHistogram() {
  // 1. Access data
  let dataset = await d3.json('./../data/my_weather_data.json');
  // console.table(dataset[0]);
  const metricAccessor = (d) => d.humidity;
  const yAccessor = (d) => d.length;
  // debugger;

  // 2. Create chart dimensions

  const width = 700;
  let dimensions = {
    width: width,
    height: width * 0.7,
    margin: {
      top: 30,
      right: 10,
      bottom: 50,
      left: 50,
    },
  };

  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  // 3. Draw canvas
  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height);

  const bounds = wrapper
    .append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

  // 4. Create scales
  let xScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, metricAccessor))
    .range([0, dimensions.boundedWidth])
    .nice();

  // we need bin before yScale
  const binsGenerator = d3.histogram().domain(xScale.domain()).value(metricAccessor).thresholds(15);
  //.thresholds([0, 0.2, 0.4, 0.6, 0.8, 1]);

  const bins = binsGenerator(dataset);
  // console.log(bins);
  let yScale = d3
    .scaleLinear()
    .domain([0, d3.max(bins, yAccessor)])
    .range([dimensions.boundedHeight, 0])
    .nice();

  // 5. Draw data
  // it will create one new <g> element for each bin. We’re going to place our bars within this group.
  const binGroups = d3.select('g').selectAll('g').data(bins).enter().append('g');
  const barPadding = 1;
  const barRects = binGroups
    .append('rect')
    .attr('x', (d) => xScale(d.x0) + barPadding / 2)
    .attr('y', (d) => yScale(yAccessor(d)))
    .attr('width', (d) => d3.max([0, xScale(d.x1) - xScale(d.x0) - barPadding]))
    .attr('height', (d) => dimensions.boundedHeight - yScale(yAccessor(d)))
    .attr('fill', 'cornflowerblue');

  // 6. Draw peripherals

  const barTexts = binGroups
    //shorthand for d => yAccessor(d).
    .filter(yAccessor)
    .append('text')
    .attr('x', (d) => xScale(d.x0) + (xScale(d.x1) - xScale(d.x0)) / 2)
    .attr('y', (d) => yScale(yAccessor(d)) - 5)
    .text(yAccessor)
    .style('text-anchor', 'middle')
    .attr('fill', 'darkgrey')
    .style('font-size', '12px')
    .style('font-family', 'sans-serif');

  const mean = d3.mean(dataset, metricAccessor);
  const meanLine = bounds
    .append('line')
    .attr('x1', xScale(mean))
    .attr('x2', xScale(mean))
    .attr('y1', -15)
    .attr('y2', dimensions.boundedHeight)
    .attr('stroke', 'maroon')
    .attr('stroke-dasharray', '2px 4px');

  const meanLabel = bounds
    .append('text')
    .attr('x', xScale(mean))
    .attr('y', -20)
    .attr('fill', 'maroon')
    .text('mean')
    .style('font-size', '12px')
    .style('text-anchor', 'middle');

  // debugger;

  const xAxisGenerator = d3.axisBottom().scale(xScale);
  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`);

  const xAxisLabel = xAxis
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .text('Humidity');
}

drawHistogram();
