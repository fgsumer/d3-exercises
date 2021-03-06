async function drawScatter() {
  // 1. Access data
  let dataset = await d3.json('./../data/my_weather_data.json');
  // console.table(dataset[0]);
  // debugger;

  const xAccessor = (d) => d.dewPoint;
  const yAccessor = (d) => d.humidity;
  const colorAccessor = (d) => d.cloudCover;

  // 2. Create chart dimensions
  const width = d3.min([window.innerWidth * 0.8, window.innerHeight * 0.8]);

  let dimensions = {
    width: width,
    height: width,
    margin: {
      top: 10,
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

  let xScale = d3.scaleLinear().domain(d3.extent(dataset, xAccessor)).range([0, 0]);

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.boundedHeight, 0])
    .nice();

  const colorScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, colorAccessor))
    .range(['skyblue', 'darkslategrey']);

  // 5. Draw data

  let dots = bounds
    .selectAll('circle')
    .data(dataset)
    .enter()
    .append('circle')
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .attr('r', 4)
    .attr('fill', (d) => colorScale(colorAccessor(d)))
    .attr('tabindex', '0');

  // 6. Draw peripherals

  let xAxisGenerator = d3.axisBottom().scale(xScale);

  const xAxis = bounds
    .append('g')
    .call(xAxisGenerator)
    .style('transform', `translateY(${dimensions.boundedHeight}px)`)
    .attr('class', 'myXaxis')
    .attr('opacity', '0');

  const xAxisLabel = xAxis
    .append('text')
    .attr('x', dimensions.boundedWidth / 2)
    .attr('y', dimensions.margin.bottom - 10)
    .attr('class', 'x-axislabel')
    .attr('opacity', '0')
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .html('Dew point (&deg;F)');

  let yAxisGenerator = d3.axisLeft().scale(yScale).ticks(4);

  const yAxis = bounds.append('g').call(yAxisGenerator);

  const yAxisLabel = yAxis
    .append('text')
    .attr('x', -dimensions.boundedHeight / 2)
    .attr('y', -dimensions.margin.left + 10)
    .attr('fill', 'black')
    .style('font-size', '1.4em')
    .text('Relative humidity')
    .style('transform', 'rotate(-90deg)')
    .style('text-anchor', 'middle');

  // new x axis and position
  xScale.range([0, dimensions.boundedWidth]);

  bounds
    .select('.myXaxis')
    .transition()
    .duration(2000)
    .ease(d3.easeLinear)
    .attr('opacity', '1')
    .call(xAxisGenerator);

  bounds
    .selectAll('circle')
    .transition()
    .delay((d, i) => i * 3)
    .duration(2000)
    .attr('cx', (d) => xScale(xAccessor(d)))
    .attr('cy', (d) => yScale(yAccessor(d)))
    .transition();
  // .delay((d, i) => i * 3)
  // .duration(2000)
  // .style('fill', 'red');

  bounds.select('.x-axislabel').transition().duration(3000).attr('opacity', '1');
}
drawScatter();
