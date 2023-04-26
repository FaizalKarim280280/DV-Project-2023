import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import * as d3 from 'd3';


const orderingSupportData = require('../data/ordering-support.json');
const orderingRestrictData = require('../data/ordering-restrict.json');

export default function OrderingSupport() {

    const [plot, setPlot] = useState("support");

    const svgRef3 = useRef();

    const width = 700;
    const height = 600;

    const margin = {
        top: 60,
        right: 30,
        bottom: 150,
        left: 200
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const renderHeatmap = (data) => {

        let groups = d3.map(data, d => d['group']);
        groups = Array.from(new Set(groups));

        // console.log(groups);

        const svg = d3.select(svgRef3.current)
            .attr('width', width)
            .attr('height', height);

        svg.selectAll('g').remove();

        const subgroups = ['Strongly disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly agree'];


        var xScale = d3.scaleBand()
            .range([0, innerWidth])
            .domain(subgroups)
            .padding(0.01);

        var yScale = d3.scaleBand()
            .range([innerHeight, 0])
            .domain(groups)
            .padding(0.05);

        const xAxis = d3.axisBottom(xScale)
        // .tickSize(-10);

        const yAxis = d3.axisLeft(yScale);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xAxisG = g.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${innerHeight})`)
        // .append('text')
        // .attr('y', 50)
        // .attr('x', innerWidth / 2)
        // .text('Race')
        // .attr('fill', 'black');

        const yAxisG = g.append('g')
            .call(yAxis)
        // .attr('transform', `translate(0, ${50})`)
        // .append('text')
        // .attr('transform', 'rotate(-90)')
        // .attr('x', -innerHeight / 2)
        // .attr('y', -50)
        // .text('Percentage')
        // .attr('fill', 'black');

        var myColor = d3.scaleLinear()
            .range(["#E0F2F1", "#00695C"])
            .domain([1, 40])


        g.selectAll()
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function (d) { return xScale(d['variable']) })
            .attr("y", function (d) { return yScale(d['group']) })
            .transition()
            .duration(500)
            .attr("width", xScale.bandwidth())
            .attr("height", yScale.bandwidth())
            .style("fill", function (d) { return myColor(+d['value']) })
            .delay(function (d, i) { return 20 * i });

    }

    const handleRadioOnChange = (event) => {
        setPlot(event.target.value);
    }


    useEffect(() => {

        plot === "support" ? renderHeatmap(orderingSupportData) :
            renderHeatmap(orderingRestrictData)

    })

    return (
        <>

            <div className='gray-bg my-5 p-5'>

                <div className='row'>
                    <div className="col-md-5" style={{ "padding": "4% 0 0 5%" }}>
                        {plot == "support" ?
                            <div>
                                <h3 className='display-5 my-4 fw-bold'>Ease, Quality, and Choice Reign Supreme in Online Food Delivery Preferences</h3>

                                <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}> The data shows that consumers are most influenced by factors related to the actual experience of ordering and receiving food, such as convenience, food quality, and restaurant variety.</p>
                                
                                <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}>Meanwhile, factors that might seem important to companies, such as discounts and tracking systems, don't appear to make much of a difference to consumers.</p>
                            </div> :

                            <div>
                                <h3 className='display-5 my-4 fw-bold'>Health Matters: Late Deliveries Aren't the Only Reason People Avoid Ordering Food Online</h3>

                                <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}> It has been found that people's health concerns are a significant factor in their decision-making process for ordering food online. Additionally, the report highlights that late deliveries also deter customers from ordering food online.</p>

                                <p className='fs-5 mt-4' style={{ "textAlign": "justify", "textJustify": "inter-word" }}> Surprisingly, the affordability of food and past bad experiences with online food delivery services are not as significant in people's decision-making process. </p>
                            </div>}
                        <hr className='hr hr-blurry mt-5' />
                    </div>

                    <div className="col-md-6" style={{ "paddingLeft": "10%" }}>
                        <div className='ms-5'>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" defaultChecked value="support" onChange={handleRadioOnChange} />
                                <label className="form-check-label" htmlFor="inlineRadio1">Order Support</label>
                            </div>

                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" value="restrict" onChange={handleRadioOnChange} />
                                <label className="form-check-label" htmlFor="inlineRadio2">Order Restrict</label>
                            </div>
                        </div>

                        <div className='svg-container-1'>
                            <svg ref={svgRef3}></svg>
                        </div>

                    </div>
                </div>

            </div>

        </>
    )
}
