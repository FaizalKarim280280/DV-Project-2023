import React, { useEffect } from 'react'
import { useRef } from 'react';
import * as d3Sankey from 'd3-sankey';
import * as d3 from 'd3';
const sankeyData = require('../data/sankey-data.json');

export default function Sankey() {

    const svgRef = useRef();

    const width = 1200;
    const height = 1000;

    const margin = {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10
    };

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;


    const renderSankeyPlot = () => {

        console.log(sankeyData);

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var color = d3.scaleOrdinal(d3.schemeTableau10);

        var sankey = d3Sankey.sankey()
            .nodeWidth(36)
            .nodePadding(290)
            .size([innerWidth, innerHeight]);

        var sankey2 = d3Sankey.sankey()
            .nodeWidth(20)
            .nodePadding(90)
            .size([innerWidth, innerHeight]);

        sankey2
            .nodes(sankeyData.nodes)
            .links(sankeyData.links)
        // .layout(1);

        var link = svg.append("g")
            .selectAll(".link")
            .data(sankeyData.links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", d3Sankey.sankeyLinkHorizontal())
            .style("stroke-width", function (d) { return Math.max(1, d.dy); })
            .sort(function (a, b) { return b.dy - a.dy; });

        var node = svg.append("g")
            .selectAll(".node")
            .data(sankeyData.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; })
            .call(d3.drag()
                .subject(function (d) { return d; })
                .on("start", function () { this.parentNode.appendChild(this); }));
        // .on("drag", dragmove));


        node
            .append("rect")
            .attr("height", function (d) { return d.dy; })
            .attr("width", sankey.nodeWidth())
            .style("fill", function (d) { return d.color = color(d.name.replace(/ .*/, "")); })
            .style("stroke", function (d) { return d3.rgb(d.color).darker(2); })
            // Add hover text
            .append("title")
            .text(function (d) { return d.name + "\n" + "There is " + d.value + " stuff in this node"; });


        node
            .append("text")
            .attr("x", -6)
            .attr("y", function (d) { return d.dy / 2; })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function (d) { return d.name; })
            .filter(function (d) { return d.x < width / 2; })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");


        // function dragmove(d) {
        //     d3.select(this)
        //         .attr("transform",
        //             "translate("
        //             + d.x + ","
        //             + (d.y = Math.max(
        //                 0, Math.min(height - d.dy, d3.event.y))
        //             ) + ")");
        //     sankey.relayout();
        //     link.attr("d", sankey.link());
        // }


    }

    useEffect(() => {
        renderSankeyPlot();
    })

    return (
        <>

            <div className="row" style={{ "padding": "5% 5% 6% 5%" }}>

                <svg ref={svgRef} id='svg3'></svg>

            </div>
        </>
    )
}
