var svgWidth = 960;
var svgHeight = 780;

var margin = {
    top:40,
    right:40,
    bottom:400,
    left:100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

//svg wrapper, group that holds chart
var chart = d3.select("#scatter")
    .append("div")
    .classed("chart", true);

var svg = chart.append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "ENFJ";

//function for scaleLinear for x-axis
function xScale(typeData, chosenXAxis) {
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(typeData, d => d[chosenXAxis]) * 0.8,
        d3.max(typeData, d => d[chosenXAxis]) * 1.2
    ])
        .range([0, width]);
    return xLinearScale;
}

//function for axis rendering
function renderAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    
    return xAxis;
}

function renderCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
        .duration(1000)
        .attr("cx", d => newXScale(d[chosenXAxis]));

    return circlesGroup;
}

//function for updating toolTip base on the selected x axis
function updateToolTip(chosenXAxis, circlesGroup) {

    var label;

    if (chosenXAxis === "ENFJ") {
        label = "ENFJ count: ";
    }
    else if (chosenXAxis === "ENFP") {
        label = "ENFP count: ";
    }
    else if (chosenXAxis === "ENTJ") {
        label = "ENTJ count: ";
    }
    else if (chosenXAxis === "ENTP") {
        label = "ENTP count: ";
    }
    else if (chosenXAxis === "ESFJ") {
        label = "ESFJ count: ";
    }
    else if (chosenXAxis === "ESFP") {
        label = "ESFP count: ";
    }
    else if (chosenXAxis === "ESTJ") {
        label = "ESTJ count: ";
    }
    else if (chosenXAxis === "ESTP") {
        label = "ESTP count: ";
    }
    else if (chosenXAxis === "INFJ") {
        label = "INFJ count: ";
    }
    else if (chosenXAxis === "INFP") {
        label = "INFP count: ";
    }
    else if (chosenXAxis === "INTJ") {
        label = "INTJ count: ";
    }
    else {
        label = "INTP count: ";
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-19, 0])
        .html(function(d) {
            return(`${d.word}<br>${label} ${d[chosenXAxis]}`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", toolTip.show).on("mouseout", toolTip.hide);
    
    return circlesGroup;
}

//load csv and execute all functions

d3.csv("combined_df.csv").then(function (typeData, err) {
    if (err) throw err;
    //log data
    console.log(typeData);

    //parse data
    typeData.forEach(function(data) {
        data.ENFJ = +data.ENFJ;
        data.ENFP = +data.ENFP;
        data.ENTJ = +data.ENTJ;
        data.ENTP = +data.ENTP;
        data.ESFJ = +data.ESFJ;
        data.ESFP = +data.ESFP;
        data.ESTJ = +data.ESTJ;
        data.ESTP = +data.ESTP;
        data.INFJ = +data.INFJ;
        data.INFP = +data.INFP;
        data.INTJ = +data.INTJ;
        data.INTP = +data.INTP;
        data.ISFJ = +data.ISFJ;
        data.ISFP = +data.ISFP;
        data.ISTJ = +data.ISTJ;
        data.ISTP = +data.ISTP;
    });

    //create xlinearScale with xScale fucntion
    var xLinearScale = xScale(typeData, chosenXAxis);

    //create yLinearScale
    var yLinearScale = d3.scaleLinear()
        .domain([0, 2000])
        .range([height, 0]);
    
    //intial axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    //append x axis
    var xAxis = chartGroup.append("g")
        .classed("x-axis", true)
        .attr("transform",  `translate(0, ${height})`)
        .call(bottomAxis);

    //append y axis
    chartGroup.append("g")
        .call(leftAxis);

    //append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(typeData)
        .enter()
        .append("circle")
        .classed("typeCircle", true)
        .attr("cx", d => xLinearScale(d[chosenXAxis]))
        .attr("cy", d => yLinearScale(d[chosenXAxis]))
        .attr("r", 14)
        //.attr("fill", "blue")
        .attr("opacity", ".5");


    //create group for  x-axis labels
    var labelsGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 10 + margin.top})`);

    var enfjCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 20)
        .attr("value", "ENFJ")
        .classed("active", true)
        .text("ENFJ type");

    var enfpCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 40)
        .attr("value", "ENFP")
        .classed("inactive", true)
        .text("ENFP type");
    
    var entjCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 60)
        .attr("value", "ENTJ")
        .classed("inactive", true)
        .text("ENTJ type");

    var entpCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 80)
        .attr("value", "ENTP")
        .classed("inactive", true)
        .text("ENTP type");

    var esfjCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 100)
        .attr("value", "ESFJ")
        .classed("inactive", true)
        .text("ESFJ type");

    var esfpCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 120)
        .attr("value", "ESFP")
        .classed("inactive", true)
        .text("ESFP type");
    
    var estjCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 140)
        .attr("value", "ESTJ")
        .classed("inactive", true)
        .text("ESTJ type");

    var estpCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 160)
        .attr("value", "ESTP")
        .classed("inactive", true)
        .text("ESTP type");

    var infjCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 180)
        .attr("value", "INFJ")
        .classed("inactive", true)
        .text("INFJ type");

    var infpCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 200)
        .attr("value", "INFP")
        .classed("inactive", true)
        .text("INFP type");
    
    var intjCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 220)
        .attr("value", "INTJ")
        .classed("inactive", true)
        .text("INTJ type");

    var intpCount = labelsGroup.append("text")
        .attr("x", 0)
        .attr("y", 240)
        .attr("value", "INTP")
        .classed("inactive", true)
        .text("INTP type");

    //append y-axis label
    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .classed("axis-text", true);

    //add tooltip to cirles
    var circlesGroup = updateToolTip(chosenXAxis, circlesGroup);

    //create event listener on "click" events on text elements(labels)
    labelsGroup.selectAll("text")
        .on("click", function() {

            //get value of selection
            var value = d3.select(this).attr("value");

            if (value != chosenXAxis){

                //replace chosenXAxis w/ value
                chosenXAxis = value;

                //create new scale for x-axis
                xLinearScale = xScale(typeData, chosenXAxis);

                //update x-axis with transition
                xAxis = renderAxes(xLinearScale, xAxis);

                //update circles with new values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis);

                //update tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, circlesGroup);


                //change classes to change bold text
                if (chosenXAxis === "ENFJ") {
                    enfjCount
                        .classed("active", true)
                        .classed("inactive", false);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ENFP") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", true)
                        .classed("inactive", false);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ENTJ") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", true)
                        .classed("inactive", false);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ENTP") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", true)
                        .classed("inactive", false);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ESFJ") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", true)
                        .classed("inactive", false);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ESFP") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", true)
                        .classed("inactive", false);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ESTJ") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", true)
                        .classed("inactive", false);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "ESTP") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", true)
                        .classed("inactive", false);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "INFJ") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", true)
                        .classed("inactive", false);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "INFP") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", true)
                        .classed("inactive", false);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else if (chosenXAxis === "INTJ") {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", true)
                        .classed("inactive", false);
                    intpCount
                        .classed("active", false)
                        .classed("inactive", true);
                }
                else {
                    enfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    enfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    entpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    esfpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    estpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    infpCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intjCount
                        .classed("active", false)
                        .classed("inactive", true);
                    intpCount
                        .classed("active", true)
                        .classed("inactive", false);
                }
            }

        });

}).catch(function (error) {
    console.log(error);
});