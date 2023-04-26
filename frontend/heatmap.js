function heatMap(dataHeat) {
    console.log(dataHeat);
    d3.selectAll(".heatmap").remove();
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 130, left: 130 },
        width = 650 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3
        .select("#heatmapid")
        .append("svg")
        .attr("class", "heatmap")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "heatmap")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // Labels of row and columns
    var myGroups = [
        "Time saving",
        "More Offers and Discount",
        "Health Concern",
        "Poor Hygiene",
        "Delay of delivery person getting assigned",
        "Wrong order delivered",
    ];

    var myVars = [
        "Strongly disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly agree",
    ];

    var dataHeat2 = [];
    for (let i = 0; i < myGroups.length; i++) {
        for (let j = 0; j < myVars.length; j++) {
            let newObj = { group: myGroups[i], variable: myVars[j], value: 0 };
            dataHeat2.push(newObj);
        }
    }

    for (let i = 0; i < dataHeat.length; i++) {
        const elem = dataHeat[i];
        for (let j = 0; j < myGroups.length; j++) {
            for (let k = 0; k < dataHeat2.length; k++) {
                if (
                    dataHeat2[k].group === myGroups[j] &&
                    dataHeat2[k].variable === elem[myGroups[j]]
                ) {
                    dataHeat2[k].value += 1;
                }
            }
        }
    }

    const data = dataHeat2;

    // Build X scales and axis:
    var x = d3.scaleBand().range([0, width]).domain(myGroups).padding(0.01);
    svg
        .append("g")
        .attr("class", "heatmap")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

    // Build X scales and axis:
    var y = d3.scaleBand().range([height, 0]).domain(myVars).padding(0.01);
    svg.append("g").attr("class", "heatmap").call(d3.axisLeft(y));

    // Build color scale
    var myColor = d3.scaleLinear().range(["#E0F2F1", "#00695C"]).domain([1, 13]);

    // create a tooltip
    var tooltip = d3
        .select("#heatmap")
        .append("div")
        .attr("class", "heatmap")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px");

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        tooltip.style("opacity", 1);
    };
    var mousemove = function (e, d) {
        tooltip
            .html(d.value)
            .style("left", e.pageX + "px")
            .style("top", e.pageY + margin.top + "px");
    };
    var mouseleave = function (d) {
        tooltip.style("opacity", 0);
    };

    // add the squares
    svg
        .selectAll()
        .data(data, function (d) {
            return d.group + ":" + d.variable;
        })
        .enter()
        .append("rect")
        .attr("class", "heatmap")
        .attr("x", function (d) {
            return x(d.group);
        })
        .attr("y", function (d) {
            return y(d.variable);
        })
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .transition()
        .duration(500)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) {
            return myColor(+d["value"]);
        })
        .delay(function (d, i) {
            return 20 * i;
        });
}
