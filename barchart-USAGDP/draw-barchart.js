async function drawLineChart() {
  // 1. Access data
  let getdata = await d3.json(
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json',
  );

  let dataset = getdata.data;
  //console.table(dataset[0]);

  const yAccessor = (d) => d[1];
  const dateParser = d3.timeParse('%Y-%m-%d'); //string to date
  const xAccessor = (d) => dateParser(d[0]);

  const formatYear = d3.timeFormat('%Y');
  const YearAccessor = (d) => formatYear(xAccessor(d));

  const formatMonth = d3.timeFormat('%B');
  const quarter = (d) => {
    if (formatMonth(xAccessor(d)) == 'January') {
      return 1;
    } else if (formatMonth(xAccessor(d)) == 'April') {
      return 2;
    } else if (formatMonth(xAccessor(d)) == 'July') {
      return 3;
    } else if (formatMonth(xAccessor(d)) == 'October') {
      return 4;
    }
  };

  // 2. Create chart dimensions

  let dimensions = {
    width: window.innerWidth * 0.7,
    height: 600,
    margin: {
      top: 50,
      right: 15,
      bottom: 50,
      left: 60,
    },
  };
  dimensions.innerWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
  dimensions.innerHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

  //debugger;

  // 3. Draw canvas

  const wrapper = d3
    .select('#wrapper')
    .append('svg')
    .attr('width', dimensions.width)
    .attr('height', dimensions.height)
    .attr('class', 'boundry');

  const bounds = wrapper
    .append('g')
    .style('transform', `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`);

  // 4. Create scales

  const yScale = d3
    .scaleLinear()
    .domain(d3.extent(dataset, yAccessor))
    .range([dimensions.innerHeight, 0])
    .nice();
  // console.log(yScale(18064.7));
  // console.log(d3.extent(dataset, yAccessor));

  const xScale = d3
    .scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.innerWidth]);
  // .nice();
  // console.log(d3.extent(dataset, xAccessor));

  const bars = d3.select('g').selectAll('g').data(dataset).enter().append('g');
  const seebars = bars
    .append('rect')
    .attr('x', (d, i) => i * (dimensions.innerWidth / dataset.length))
    .attr('y', (d) => yScale(yAccessor(d)))
    .attr('width', dimensions.innerWidth / dataset.length - 0.3)
    .attr('height', (d) => dimensions.innerHeight - yScale(yAccessor(d)))
    .attr('fill', '#457b9d')
    .on('mouseover', function (d) {
      //Get this bar's x/y values, then augment for the tooltip
      let xPosition = parseFloat(d3.select(this).attr('x')) + dimensions.innerHeight / 1.7;
      let yPosition = parseFloat(d3.select(this).attr('y')) / 2 + dimensions.height / 2;
      //Update the tooltip position and value
      let tooltip = d3
        .select('#tooltip')
        .style('left', xPosition + 'px')
        .style('top', yPosition + 'px')
        .select('#value')
        .text(yAccessor(d));

      d3.select('#year').text(YearAccessor(d));
      d3.select('#quarter').text(quarter(d));

      //Show the tooltip
      d3.select('#tooltip').classed('hidden', false);
    })
    .on('mouseout', function (d) {
      d3.select('#tooltip').classed('hidden', true);
    });

  // 6. Draw peripherals

  const xAxisGenerator = d3.axisBottom().scale(xScale);
  const yAxisGenerator = d3.axisLeft().scale(yScale);

  // const yAxisTopGenerator = d3.axistTop().scale(xScale);

  const xAxis = bounds
    .append('g')
    .style('transform', `translate(0,${dimensions.innerHeight}px)`)
    .call(xAxisGenerator);

  const yAxis = bounds.append('g').call(yAxisGenerator);

  const additionalInfo = xAxis
    .append('text')
    .attr('x', dimensions.innerWidth / 1.3)
    .attr('y', dimensions.margin.bottom - 5)
    .attr('fill', '#042f66')
    .style('font-size', '1.4em')
    .text('More Information : http://www.bea.gov/national/pdf/nipaguid.pdf');

  const title = wrapper
    .append('text')
    .attr('x', dimensions.innerWidth / 2.3)
    .attr('y', 35)
    .attr('fill', '#042f66')
    .style('font-size', '1.4em')
    .text('UNITED STATES GDP');

  const yAxisLabel = yAxis
    .append('text')
    .attr('x', -30)
    .attr('y', 25)
    .attr('fill', '#042f66')
    .style('font-size', '1.4em')
    .style('transform', 'rotate(270deg)')
    .text('Gross Domestic Product');
}

drawLineChart();
