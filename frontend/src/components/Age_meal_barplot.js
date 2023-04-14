import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3';
const ageMealData = require("../data/age-meal.json");
const incomeMealData = require('../data/income-meal.json');

export default function Age_meal_barplot() {

    const svgRef = useRef();
    const svgRef2 = useRef();

    const width = 900;
    const height = 600;

    const margin = {
        top: 70,
        right: 30,
        bottom: 60,
        left: 90
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const renderPlot1 = () => {
        const svg = d3.select(svgRef.current)
            .attr('width', width)
            .attr('height', height);

        const subgroups = [
            "Breakfast", "Lunch", "Dinner", "Snacks"
        ];

        var groups = ["18-20", "21-23", "24-26", "27-29", "30-32"]
        const colors = ['#7B1FA2', '#9C27B0', '#BA68C8', '#E1BEE7'];

        renderGroupedBarPlot(ageMealData, subgroups, groups, svg, 60, colors,
             "Meal Consumption by Age Group: A Stacked Bar Char", "Age Groups", "Count");

    }

    const renderPlot2 = () => {
        const svg = d3.select(svgRef2.current)
            .attr('width', width)
            .attr('height', height);

        const subgroups = [
            "Breakfast", "Lunch", "Dinner", "Snacks"
        ];

        var groups = ['No Income', "Below Rs 10000", "More than 50000",
            "10001 to 25000", "25001 to 25000"];

        const colors = ['#0277BD', '#0277BD', '#4FC3F7', '#81D4FA'];

        renderGroupedBarPlot(incomeMealData, subgroups, groups, svg, 60, colors, 
            "Meal Consumption by Income level: A Stacked Bar Char", "Income level", "Count");
    }

    useEffect(() => {

        renderPlot1();
        renderPlot2();

    }, [])



    const renderGroupedBarPlot = (data, subgroups, groups, svg, max, colors, title, xlabel, ylabel) => {

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);


        var x = d3.scaleBand()
            .domain(groups)
            .range([0, innerWidth])
            .padding([0.2]);

        const xAxis = d3.axisBottom(x).tickSize(10);

        const xAxisG = g.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
            .append('text')
            .attr('y', 50)
            .attr('x', innerWidth / 2)
            .text(xlabel)
            .attr('fill', 'black')
            .style('font-size', '20px');


        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, max])
            .range([innerHeight, 0])

        const yAxis = d3.axisLeft(y);

        const yAxisG = g.append('g')
            .call(yAxis)
            .append('text')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -50)
            .text(ylabel)
            .attr('fill', 'black')
            .style('font-size', '20px');

        g.append('text')
            .classed('h4', true)
            .attr("x", innerWidth / 2)
            .attr("y", -40)
            .text(title)
            .attr("text-anchor", "middle");


        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.1])

        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(colors);


        g.selectAll('my-dots')
            .data(subgroups)
            .enter()
            .append('circle')
            .attr('cx', innerWidth / 1.2)
            .attr('cy', function (d, i) { return 10 + i * 30 })
            .transition()
            .duration(400)
            .attr('r', 7)
            .style('fill', function (d, i) { return color(d) })
            .delay(function (d, i) { return (i * 300) });

        g.selectAll('my-labels')
            .data(subgroups)
            .enter()
            .append('text')
            .attr('x', innerWidth / 1.2 + 20)
            .attr('y', function (d, i) { return 17 + i * 30 })
            .attr('opacity', 0.3)
            .transition()
            .duration(400)
            .text(function (d) { return d })
            .delay(function (d, i) { return i * 300 })
            .attr('opacity', 1);

        // Show the bars
        g.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(data)
            .enter()
            .append("g")

            .attr("transform", function (d) {
                return "translate(" + x(d.group) + ",0)";
            })

            .selectAll("rect")
            .data(function (d) {
                return subgroups.map(function (key) {
                    return { key: key, value: d[key] };
                });
            })

            .enter()
            .append("rect")
            .attr("x", function (d) {
                return xSubgroup(d.key);
            })
            .attr('y', y(1))
            .attr("width", xSubgroup.bandwidth())
            .transition()
            .duration(1000)
            .attr("y", function (d) {
                return y(d.value) - 10;
            })
            .attr("height", function (d) {
                return innerHeight - y(d.value);
            })
            .attr("fill", function (d) {
                return color(d.key);
            })
            .attr('rx', 5)
            .delay(function (d, i) { return (i * 300) });

    }




    return (
        <>

            <div className='img-div'>

                <img className='img-fluid cover-image' src={require('../cover-image.jpg')}></img>

            </div>

            <div className='container container-fluid heading-div' style={{ "marginTop": "5%", "height": "700px" }}>

                <div className="row">

                    <div className="col-7">

                        <div className="heading">
                            <h3 className='display-2 fw-bold'>Exploring Bangalore's Appetite</h3>

                            <p className='display-6 my-5'>
                                An Analysis of Food Ordering Habits, Delivery Preferences,
                                and Customer Satisfaction in the Silicon Valley of
                                India.</p>
                            <hr></hr>
                            
                            <p className='mt-5 mb-1'>Team: Insight Imagers</p>
                            <p>Date: 15th April 2023</p>
                            
                            {/* <p>Data: <span><a href='#'>Online Food Delivery Preferences....</a></span></p> */}
                        </div>
                    </div>

                    <div className="col-5" style={{"paddingLeft" : "10%"}}>

                        <img className = 'img-fluid' src={require('../food_delivery.gif')}></img>
                    </div>
                </div>


            </div>

            <div style={{ "backgroundColor": '#f5f5f5' }}>

                <div className="row" style={{ "padding": "5% 5% 6% 5%" }}>
                    <div className="col-6">
                        <div className='svg-container-1'>
                            <svg ref={svgRef} id='svg1'></svg>
                        </div>
                    </div>

                    <div className="col-6">
                        {/* <p>Hello world</p> */}
                    </div>

                </div>

            </div>

            <div>

                <div className="row" style={{ "padding": "5% 5% 6% 5%" }}>
                    <div className="col-6">

                    </div>

                    <div className="col-6">
                        <div className='svg-container-1'>
                            <svg ref={svgRef2} id='svg2'></svg>
                        </div>
                    </div>

                </div>
            </div>


            <div style={{ "backgroundColor": '#f5f5f5' }}>

                <div className="row" style={{ "padding": "5% 5% 6% 5%" }}>
                    <div className="col-6">

                    </div>

                    <div className="col-6">
                        {/* <p>Hello world</p> */}
                    </div>

                </div>

            </div>

            <footer className="bg-dark text-white">

                <div className="container py-4">

                    <div className="row">

                        <div className="col-6">
                            <h3> DV Project 2023</h3>
                        </div>


                        <div className="col-3">
                            <h3>Team Members</h3>

                            <div className='my-4'>
                                <p className='m-2'>Nirmala Kadali</p>
                                <p className='m-2'>Manohar Naga</p>
                                <p className='m-2'>Md Faizal Karim</p>
                            </div>
                        </div>

                    </div>

                </div>
            </footer>


        </>
    )
}
