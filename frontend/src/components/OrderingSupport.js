import React, { useEffect } from 'react'
import { useRef } from 'react';
import * as d3 from 'd3';


const orderingSupportData = require('../data/ordering-support.json')

export default function OrderingSupport() {

    const svgRef = useRef();

    const width = 800;
    const height = 600;

    const margin = {
        top: 60,
        right: 30,
        bottom: 150,
        left: 90
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const renderStackedBarPlot = (data) => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);


        const groups = ["Ease and convenient", "Time saving", "More restaurant choices", "Good Food quality", "Easy Payment option",
            "More Offers and Discount", "Good Tracking system"];

        const subgroups = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree']

        const yScale = d3.scaleLinear()
            .domain([0, 100])
            .range([innerHeight, 0]);
            
        const xScale = d3.scaleBand()
            .domain(groups)
            .range([0, innerWidth])
            .padding(0.2);

        const xAxis = d3.axisBottom(xScale)
            .tickSize(-10);

        const yAxis = d3.axisLeft(yScale);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xAxisG = g.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight + 50})`)
            .selectAll('text')
            .attr('transform', 'rotate(-25)')
            .attr("text-anchor", "end")
            .append('text')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .text('Race')
            .attr('fill', 'black');

        const yAxisG = g.append('g')
            .call(yAxis)
            .attr('transform', `translate(0, ${50})`)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -50)
            .text('Percentage')
            .attr('fill', 'black');

        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(["#fee391", "#fec44f", "#fe9929", "#d95f0e", "#993404"]);

        g.append('text')
            .classed('h4', true)
            .attr("x", innerWidth / 2)
            .attr("y", -40)
            .text(`Factors supporting online ordering`)
            .attr('text-anchor', 'middle')


        var stackedData = d3.stack()
            .keys(subgroups)
            (data);

        g.append('g')
            .attr('transform', `translate(0, 50)`)
            .selectAll('g')
            .data(stackedData)
            .enter()
            .append('g')
            .attr('fill', function (d) { return color(d.key) })
            .selectAll('rect')
            .data(function (d) { return d; })
            .enter()
            .append('rect')
            .attr('y', yScale(1))
            .attr('x', function (d) { return xScale(d.data.group); })
            .attr('width', xScale.bandwidth())
            .attr('opacity', 0)
            .transition()
            .duration(800)
            .attr('x', function (d) { return xScale(d.data.group); })
            .attr('y', function (d) { return yScale(d[1]) - 10; })
            .attr('height', function (d) { return yScale(d[0]) - yScale(d[1]); })
            .attr('width', xScale.bandwidth())
            .attr('opacity', 1)
            .delay(function (d, i) {
                return i * 200;
            })

        g.selectAll('my-dots')
            .data(subgroups)
            .enter()
            .append('circle')
            .attr('cx', innerWidth + 20)
            .attr('cy', function (d, i) { return  i * 30 })
            .transition()
            .duration(400)
            .attr('r', 7)
            .style('fill', function (d, i) { return color(d) })
            .delay(function (d, i) { return (i * 300) });

        g.selectAll('my-labels')
            .data(subgroups)
            .enter()
            .append('text')
            .attr('x', innerWidth + 40)
            .attr('y', function (d, i) { return 7 + i * 30 })
            .attr('opacity', 0.3)
            .transition()
            .duration(400)
            .text(function (d) { return d })
            .delay(function (d, i) { return i * 300 })
            .attr('opacity', 1);    


    }

    useEffect(() => {
        renderStackedBarPlot(orderingSupportData)
    })

    return (
        <>

            <div className='gray-bg'>

                <div className='row' style={{ "padding": "5% 5% 6% 5%" }}>
                    <svg ref={svgRef}></svg>
                </div>

            </div>

        </>
    )
}
