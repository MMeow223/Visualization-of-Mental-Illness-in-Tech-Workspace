window.onerror = function(msg, url) {
    var url = "dataset/Project.csv"
    var msg = "The csv file \"" + url + " \" failed to load";
    alert("Error message: " + msg);
    return false;
};

function chart() {
    /////////////////////////////
    //// Initialize data Start Here
    ////////////////////////////
    //// tooltip
    var tooltip = d3.select("body").append("div").attr("class", "toolTip");
    //// Before 2016 and after 2016
    var set = "a";
    //// Family History
    var w = 300;
    var h = 250;
    var padding = 50;
    var svg = d3.select("#history")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {
        svg.append("text")
            .attr("x", 20)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Family history of mental illness");

        var xScale = d3.scaleBand()
            .range([padding, w - padding])
            .padding(0.2)
            .paddingInner(0.4);

        var yScale = d3.scaleLinear()
            .range([h - padding, padding]);


        xScale.domain(data.map(function(d) { return d.ResponseFamilyHistory; }));
        yScale.domain([0, d3.max(data, function(d) { return d.BeforeFamilyHistory; })]);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) {
                return xScale(d.ResponseFamilyHistory);
            })
            .attr("y", function(d) {
                return yScale(d.BeforeFamilyHistory);
            })
            .attr("width", xScale.bandwidth())
            .attr("height", function(d) {
                return h - yScale(d.BeforeFamilyHistory) - padding;
            })
            .attr("fill", function(d) {

                return "#c08d1f";
            });

        svg.append("g")
            .attr("id", "x-axis")
            .attr("transform", "translate(0," + (h - padding) + ")")
            .call(d3.axisBottom(xScale).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("y", h - 215)
            .attr("x", 160)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Responses");

        svg.append("g")
            .attr("id", "y-axis")
            .attr("transform", "translate(" + padding + ",0)")
            .call(d3.axisLeft(yScale).tickFormat(function(d) {
                return d;
            }).ticks(5))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", -60)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Number of Employees");

        svg.selectAll("rect")
            .on("mouseover", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.ResponseFamilyHistory) + "</br>" + (d.BeforeFamilyHistory));

                svg.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");

            })
            .on("mouseout", function() {
                tooltip.style("display", "none");

                svg.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");

            });

        var sortOrder = false;
        svg.on("click", function() {
            sortOrder = !sortOrder;
            if (set == "a") {
                data.sort(function(a, b) {
                    if (sortOrder) {
                        return d3.ascending(a.BeforeFamilyHistory, b.BeforeFamilyHistory);
                    } else {
                        return d3.descending(a.BeforeFamilyHistory, b.BeforeFamilyHistory);
                    }
                })

                xScale.domain(data.map(function(d) { return d.ResponseFamilyHistory; }));
                yScale.domain([0, d3.max(data, function(d) { return d.BeforeFamilyHistory; })]);

                svg.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return xScale(d.ResponseFamilyHistory);
                    })
                    .attr("y", function(d) {
                        return yScale(d.BeforeFamilyHistory);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                        return h - yScale(d.BeforeFamilyHistory) - padding;
                    })
                    .attr("fill", function(d) {

                        return "#c08d1f";
                    });


                svg.select("#x-axis")
                    .call(d3.axisBottom(xScale).tickFormat(function(d) {
                        return d;
                    }).ticks(10))

                svg.select("#y-axis")
                    .call(d3.axisLeft(yScale).tickFormat(function(d) {
                        return d;
                    }).ticks(5))

            } else if (set == "b") {
                data.sort(function(a, b) {
                    if (sortOrder) {
                        return d3.ascending(a.AfterFamilyHistory, b.AfterFamilyHistory);
                    } else {
                        return d3.descending(a.AfterFamilyHistory, b.AfterFamilyHistory);
                    }
                })

                xScale.domain(data.map(function(d) { return d.ResponseFamilyHistory; }));
                yScale.domain([0, d3.max(data, function(d) { return d.AfterFamilyHistory; })]);

                svg.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return xScale(d.ResponseFamilyHistory);
                    })
                    .attr("y", function(d) {
                        return yScale(d.AfterFamilyHistory);
                    })
                    .attr("width", xScale.bandwidth())
                    .attr("height", function(d) {
                        return h - yScale(d.AfterFamilyHistory) - padding;
                    })
                    .attr("fill", function(d) {

                        return "#c08d1f";
                    });


                svg.select("#x-axis")
                    .call(d3.axisBottom(xScale).tickFormat(function(d) {
                        return d;
                    }).ticks(10))

                svg.select("#y-axis")
                    .call(d3.axisLeft(yScale).tickFormat(function(d) {
                        return d;
                    }).ticks(5))
            }
        });

    });

    //// Gender
    var w1 = 200;
    var h1 = 85;

    var svg1 = d3.select("#male")
        .append("svg")
        .attr("width", w1)
        .attr("height", h1)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    var svg2 = d3.select("#female")
        .append("svg")
        .attr("width", w1)
        .attr("height", h1)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {

        svg1.append("text")
            .attr("x", 70)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text(data[0].ResponseGender);

        svg1.append("text")
            .attr("id", "male")
            .attr("x", 45)
            .attr("y", 70)
            .attr("font-size", "60px")
            .attr("fill", "#c08d1f")
            .text(data[0].BeforeGender);

        svg2.append("text")
            .attr("x", 65)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text(data[1].ResponseGender);

        svg2.append("text")
            .attr("id", "female")
            .attr("x", 50)
            .attr("y", 70)
            .attr("font-size", "60px")
            .attr("fill", "#c08d1f")
            .text(data[1].BeforeGender);

    });

    //// Interview Physical
    var w2 = 300;
    var h2 = 250;
    var padding2 = 50;
    var svg3 = d3.select("#physical")
        .append("svg")
        .attr("width", w2)
        .attr("height", h2)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {
        svg3.append("text")
            .attr("x", 30)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Bring up physical health issue");

        var xScale2 = d3.scaleBand()
            .range([padding2, w2 - padding2])
            .padding(0.2)
            .paddingInner(0.4);

        var yScale2 = d3.scaleLinear()
            .range([h2 - padding2, padding2]);


        xScale2.domain(data.map(function(d) { return d.ResponseInterview; }));
        yScale2.domain([0, d3.max(data, function(d) { return d.BeforePhysicalHealth; })]);

        svg3.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) {
                return xScale2(d.ResponseInterview);
            })
            .attr("y", function(d) {
                return yScale2(d.BeforePhysicalHealth);
            })
            .attr("width", xScale2.bandwidth())
            .attr("height", function(d) {
                return h2 - yScale2(d.BeforePhysicalHealth) - padding2;
            })
            .attr("fill", function(d) {
                return "#c08d1f";
            });

        svg3.append("g")
            .attr("id", "x-axis2")
            .attr("transform", "translate(0," + (h2 - padding2) + ")")
            .call(d3.axisBottom(xScale2).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("y", h2 - 215)
            .attr("x", 160)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Responses");

        svg3.append("g")
            .attr("id", "y-axis2")
            .attr("transform", "translate(" + padding2 + ",0)")
            .call(d3.axisLeft(yScale2).tickFormat(function(d) {
                return d;
            }).ticks(5))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", -60)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Number of Employees");

        svg3.selectAll("rect")
            .on("mouseover", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.ResponseInterview) + "</br>" + (d.BeforePhysicalHealth));

                svg3.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");

            })
            .on("mouseout", function() {
                tooltip.style("display", "none");

                svg3.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");

            });

        var sortOrder1 = false;
        svg3.on("click", function() {
            sortOrder1 = !sortOrder1;
            if (set == "a") {
                data.sort(function(a, b) {
                    if (sortOrder1) {
                        return d3.ascending(a.BeforePhysicalHealth, b.BeforePhysicalHealth);
                    } else {
                        return d3.descending(a.BeforePhysicalHealth, b.BeforePhysicalHealth);
                    }
                })

                xScale2.domain(data.map(function(d) { return d.ResponseInterview; }));
                yScale2.domain([0, d3.max(data, function(d) { return d.BeforePhysicalHealth; })]);

                svg3.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return xScale2(d.ResponseInterview);
                    })
                    .attr("y", function(d) {
                        return yScale2(d.BeforePhysicalHealth);
                    })
                    .attr("width", xScale2.bandwidth())
                    .attr("height", function(d) {
                        return h2 - yScale2(d.BeforePhysicalHealth) - padding2;
                    })
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg3.select("#x-axis2")
                    .call(d3.axisBottom(xScale2).tickFormat(function(d) {
                        return d;
                    }).ticks(10))

                svg3.select("#y-axis2")
                    .call(d3.axisLeft(yScale2).tickFormat(function(d) {
                        return d;
                    }).ticks(5))

            } else if (set == "b") {
                data.sort(function(a, b) {
                    if (sortOrder1) {
                        return d3.ascending(a.AfterPhysicalHealth, b.AfterPhysicalHealth);
                    } else {
                        return d3.descending(a.AfterPhysicalHealth, b.AfterPhysicalHealth);
                    }
                })

                xScale2.domain(data.map(function(d) { return d.ResponseInterview; }));
                yScale2.domain([0, d3.max(data, function(d) { return d.AfterPhysicalHealth; })]);

                svg3.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return xScale2(d.ResponseInterview);
                    })
                    .attr("y", function(d) {
                        return yScale2(d.AfterPhysicalHealth);
                    })
                    .attr("width", xScale2.bandwidth())
                    .attr("height", function(d) {
                        return h2 - yScale2(d.AfterPhysicalHealth) - padding2;
                    })
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg3.select("#x-axis2")
                    .call(d3.axisBottom(xScale2).tickFormat(function(d) {
                        return d;
                    }).ticks(10))

                svg3.select("#y-axis2")
                    .call(d3.axisLeft(yScale2).tickFormat(function(d) {
                        return d;
                    }).ticks(5))
            }
        })
    });

    //// Interview Mental
    var w3 = 300;
    var h3 = 250;
    var padding3 = 50;
    var svg4 = d3.select("#mental")
        .append("svg")
        .attr("width", w3)
        .attr("height", h3)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {
        svg4.append("text")
            .attr("x", 30)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Bring up mental health issue");

        var xScale3 = d3.scaleBand()
            .range([padding3, w3 - padding3])
            .padding(0.2)
            .paddingInner(0.4);

        var yScale3 = d3.scaleLinear()
            .range([h3 - padding3, padding3]);


        xScale3.domain(data.map(function(d) { return d.ResponseInterview; }));
        yScale3.domain([0, d3.max(data, function(d) { return d.BeforeMentalHealth; })]);

        svg4.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", function(d) {
                return xScale3(d.ResponseInterview);
            })
            .attr("y", function(d) {
                return yScale3(d.BeforeMentalHealth);
            })
            .attr("width", xScale3.bandwidth())
            .attr("height", function(d) {
                return h3 - yScale3(d.BeforeMentalHealth) - padding3;
            })
            .attr("fill", function(d) {
                return "#c08d1f";
            });

        svg4.append("g")
            .attr("id", "x-axis3")
            .attr("transform", "translate(0," + (h3 - padding3) + ")")
            .call(d3.axisBottom(xScale3).tickFormat(function(d) {
                return d;
            }).ticks(10))
            .append("text")
            .attr("y", h3 - 215)
            .attr("x", 160)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Responses");

        svg4.append("g")
            .attr("id", "y-axis3")
            .attr("transform", "translate(" + padding3 + ",0)")
            .call(d3.axisLeft(yScale3).tickFormat(function(d) {
                return d;
            }).ticks(5))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 12)
            .attr("x", -60)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Number of Employees");

        svg4.selectAll("rect")
            .on("mouseover", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.ResponseInterview) + "</br>" + (d.BeforeMentalHealth));

                svg4.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");

            })
            .on("mouseout", function() {
                tooltip.style("display", "none");

                svg4.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");

            });

        var sortOrder2 = false;
        svg4.on("click", function() {
            sortOrder2 = !sortOrder2;
            if (set == "a") {
                data.sort(function(a, b) {
                    if (sortOrder2) {
                        return a.BeforeMentalHealth - b.BeforeMentalHealth;
                    } else {
                        return b.BeforeMentalHealth - a.BeforeMentalHealth;
                    }
                })

                xScale3.domain(data.map(function(d) { return d.ResponseInterview; }));
                yScale3.domain([0, d3.max(data, function(d) { return d.BeforeMentalHealth; })]);

                svg4.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return xScale3(d.ResponseInterview);
                    })
                    .attr("y", function(d) {
                        return yScale3(d.BeforeMentalHealth);
                    })
                    .attr("width", xScale3.bandwidth())
                    .attr("height", function(d) {
                        return h3 - yScale3(d.BeforeMentalHealth) - padding3;
                    })
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg4.select("#x-axis3")
                    .call(d3.axisBottom(xScale3).tickFormat(function(d) {
                        return d;
                    }).ticks(10))

                svg4.select("#y-axis3")
                    .call(d3.axisLeft(yScale3).tickFormat(function(d) {
                        return d;
                    }).ticks(5))

            } else if (set == "b") {
                data.sort(function(a, b) {
                    if (sortOrder2) {
                        return a.AfterMentalHealth - b.AfterMentalHealth;
                    } else {
                        return b.AfterMentalHealth - a.AfterMentalHealth;
                    }
                })

                xScale3.domain(data.map(function(d) { return d.ResponseInterview; }));
                yScale3.domain([0, d3.max(data, function(d) { return d.AfterMentalHealth; })]);

                svg4.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", function(d) {
                        return xScale3(d.ResponseInterview);
                    })
                    .attr("y", function(d) {
                        return yScale3(d.AfterMentalHealth);
                    })
                    .attr("width", xScale3.bandwidth())
                    .attr("height", function(d) {
                        return h3 - yScale3(d.AfterMentalHealth) - padding3;
                    })
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg4.select("#x-axis3")
                    .call(d3.axisBottom(xScale3).tickFormat(function(d) {
                        return d;
                    }).ticks(10))

                svg4.select("#y-axis3")
                    .call(d3.axisLeft(yScale3).tickFormat(function(d) {
                        return d;
                    }).ticks(5))

            }

        });

    });

    //// Age Group
    var w4 = 605;
    var h4 = 280;
    var padding4 = 52;
    var svg5 = d3.select("#age")
        .append("svg")
        .attr("width", w4)
        .attr("height", h4)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/ProjectAge.csv", function(data) {
        svg5.append("text")
            .attr("x", 250)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Age group");

        var xScale4 = d3.scaleLinear()
            .range([padding4, w4 - padding4]);

        var yScale4 = d3.scaleBand()
            .padding(0.2)
            .range([h4 - padding4, padding4]);

        xScale4.domain([0, 700]);
        yScale4.domain(data.map(function(d) { return d.BeforeAgeGroup; }));

        svg5.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", xScale4(0))
            .attr("y", function(d) {
                return yScale4(d.BeforeAgeGroup);
            })
            .attr("width", function(d) {
                return xScale4(d.BeforeAgeCount) - padding4;
            })
            .attr("height", yScale4.bandwidth())
            .attr("fill", function(d) {
                return "#c08d1f";
            });

        svg5.append("g")
            .attr("id", "x-axis4")
            .attr("transform", "translate(0," + (h4 - padding4) + ")")
            .call(d3.axisBottom(xScale4))
            .append("text")
            .attr("y", h4 - 246)
            .attr("x", 330)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Number of Employees");

        svg5.append("g")
            .attr("id", "y-axis4")
            .attr("transform", "translate(" + padding4 + ",0)")
            .call(d3.axisLeft(yScale4)).append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -100)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Age Group");

        svg5.selectAll("rect")
            .on("mousemove", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html("Age group (" + (d.BeforeAgeGroup) + ")</br>" + (d.BeforeAgeCount));

                svg5.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                svg5.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");
            });

        var sortOrder3 = false;
        svg5.on("click", function() {
            sortOrder3 = !sortOrder3;
            if (set == "a") {
                data.sort(function(a, b) {
                    if (sortOrder3) {
                        return a.BeforeAgeCount - b.BeforeAgeCount;
                    } else {
                        return b.BeforeAgeCount - a.BeforeAgeCount;
                    }
                })

                xScale4.domain([0, 700]);
                yScale4.domain(data.map(function(d) { return d.BeforeAgeGroup; }));

                svg5.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", xScale4(0))
                    .attr("y", function(d) {
                        return yScale4(d.BeforeAgeGroup);
                    })
                    .attr("width", function(d) {
                        return xScale4(d.BeforeAgeCount) - padding4;
                    })
                    .attr("height", yScale4.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg5.select("#x-axis4")
                    .call(d3.axisBottom(xScale4));

                svg5.select("#y-axis4")
                    .call(d3.axisLeft(yScale4))

            } else if (set == "b") {
                data.sort(function(a, b) {
                    if (sortOrder3) {
                        return a.AfterAgeCount - b.AfterAgeCount;
                    } else {
                        return b.AfterAgeCount - a.AfterAgeCount;
                    }
                })

                xScale4.domain([0, 700]);
                yScale4.domain(data.map(function(d) { return d.AfterAgeGroup; }));

                svg5.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", xScale4(0))
                    .attr("y", function(d) {
                        return yScale4(d.AfterAgeGroup);
                    })
                    .attr("width", function(d) {
                        return xScale4(d.AfterAgeCount) - padding4;
                    })
                    .attr("height", yScale4.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg5.select("#x-axis4")
                    .call(d3.axisBottom(xScale4));

                svg5.select("#y-axis4")
                    .call(d3.axisLeft(yScale4))
            }
        });
    });

    //// Past Issue
    var w5 = 245;
    var h5 = 85;

    var svg6 = d3.select("#past")
        .append("svg")
        .attr("width", w5)
        .attr("height", h5)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {

        svg6.append("text")
            .attr("x", 16)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Past Mental Health Issue");

        svg6.append("text")
            .attr("id", "pastissue")
            .attr("x", 70)
            .attr("y", 70)
            .attr("font-size", "60px")
            .attr("fill", "#c08d1f")
            .text(data[0].PastMentalIssue);

    });

    //// Current Issue
    var w6 = 250;
    var h6 = 85;

    var svg7 = d3.select("#current")
        .append("svg")
        .attr("width", w6)
        .attr("height", h6)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {

        svg7.append("text")
            .attr("x", 8)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Current Mental Health Issue");

        svg7.append("text")
            .attr("id", "currentissue")
            .attr("x", 70)
            .attr("y", 70)
            .attr("font-size", "60px")
            .attr("fill", "#c08d1f")
            .text(data[0].CurrentMentalIssue);

    });

    //// Treated
    w7 = 543;
    h7 = 289;
    margintop = 30;
    marginleft = 30;
    marginbottom = 20;
    marginright = 20;
    padding5 = 20;
    var svg8 = d3.select("#treated")
        .append("svg")
        .attr("width", w7 + marginleft + marginright)
        .attr("height", h7 + margintop + marginbottom)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    g = svg8.append("g").attr("transform", "translate(" + marginleft + "," + margintop + ")");

    var xScale5a = d3.scaleBand()
        .rangeRound([padding5, w7 - padding5 - 100])
        .padding(0.05);

    var xScale5b = d3.scaleBand()
        .padding(0.05);

    var yScale5 = d3.scaleLinear()
        .rangeRound([h7 - padding5, padding5]);

    var color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

    d3.csv("dataset/ProjectTreatedBefore.csv", function(d, i, columns) {
        for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
        return d;
    }, function(error, data) {
        if (error) throw error;

        var keys = data.columns.slice(1);

        xScale5a.domain(data.map(function(d) { return d.GroupTreated; }));
        xScale5b.domain(keys).rangeRound([0, xScale5a.bandwidth()]);
        yScale5.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();


        svg8.append("text")
            .attr("x", 100)
            .attr("y", 20)
            .attr("font-size", "20px")
            .text("Mental health issue interferes employees' work");

        g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
            .attr("class", "groups")
            .attr("transform", function(d) { return "translate(" + xScale5a(d.GroupTreated) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return { key: key, value: d[key] }; }); })
            .enter().append("rect")
            .attr("class", "rects")
            .attr("x", function(d) { return xScale5b(d.key); })
            .attr("y", function(d) { return yScale5(d.value); })
            .attr("width", xScale5b.bandwidth())
            .attr("height", function(d) { return h7 - yScale5(d.value) - padding5; })
            .attr("fill", function(d) { return color(d.key); });

        g.append("g")
            .attr("id", "x-axis5")
            .attr("transform", "translate(0," + (h7 - padding5) + ")")
            .call(d3.axisBottom(xScale5a))
            .append("text")
            .attr("y", h7 - 265)
            .attr("x", 245)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Responses");

        g.append("g")
            .attr("id", "y-axis5")
            .attr("transform", "translate(" + padding5 + ",0)")
            .call(d3.axisLeft(yScale5))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 16)
            .attr("x", -90)
            .attr("dy", "-5.1em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Number of Employees");

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", w7 - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", color);

        legend.append("text")
            .attr("x", w7 - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });


        svg8.selectAll(".rects")
            .on("mousemove", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.key) + "</br>" + (d.value));

                svg8.selectAll(".rects")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                svg8.selectAll(".rects")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");
            });


        var sortOrder5 = false;
        svg8.on("click", function() {
            sortOrder5 = !sortOrder5;
            if (set == "a") {
                var keys = data.columns.slice(1);
                data.forEach(function(d) {
                    d.threat = keys.map(function(key) { return { key: key, value: +d[key] }; });
                    d.threat.sort(function(a, b) {
                        if (sortOrder5) {
                            return d3.ascending(a.value, b.value);
                        } else {
                            return d3.descending(a.value, b.value);
                        }
                    })
                });

                var myGroups = data.map(function(d) { return d.GroupTreated; });
                myGroups.sort(function(a, b) {
                    if (sortOrder5) {
                        return d3.descending(a, b);
                    } else {
                        return d3.descending(a, b);
                    }
                })
                xScale5a.domain(myGroups);
                xScale5b.domain(d3.range(0, data[0].threat.length)).rangeRound([0, xScale5a.bandwidth()]);
                yScale5.domain([0, d3.max(data, function(d) { return d3.max(d.threat, function(d) { return d.value; }); })]);

                g.selectAll(".groups")
                    .data(data)
                    .attr("transform", function(d) { return "translate(" + xScale5a(d.GroupTreated) + ",0)"; })
                    .selectAll(".rects")
                    .data(function(d) { return d.threat; })
                    .transition()
                    .duration(1000)
                    .attr("x", function(d, i) { return xScale5b(i); })
                    .attr("y", function(d) { return yScale5(d.value); })
                    .attr("width", xScale5b.bandwidth())
                    .attr("height", function(d) { return h7 - yScale5(d.value) - padding5; })
                    .attr("fill", function(d) { return color(d.key); });

                g.select("#x-axis5")
                    .call(d3.axisBottom(xScale5a))

                g.select("#y-axis5")
                    .call(d3.axisLeft(yScale5))

            } else if (set == "b") {
                d3.csv("dataset/ProjectTreatedAfter.csv", function(d, i, columns) {
                    for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
                    return d;
                }, function(error, data) {
                    if (error) throw error;
                    var keys = data.columns.slice(1);
                    data.forEach(function(d) {
                        d.threat = keys.map(function(key) { return { key: key, value: +d[key] }; });
                        d.threat.sort(function(a, b) {
                            if (sortOrder5) {
                                return d3.ascending(a.value, b.value);
                            } else {
                                return d3.descending(a.value, b.value);
                            }
                        })
                    });

                    var myGroups = data.map(function(d) { return d.GroupTreated; });
                    myGroups.sort(function(a, b) {
                        if (sortOrder5) {
                            return d3.descending(a, b);
                        } else {
                            return d3.descending(a, b);
                        }
                    })
                    xScale5a.domain(myGroups);
                    xScale5b.domain(d3.range(0, data[0].threat.length)).rangeRound([0, xScale5a.bandwidth()]);
                    yScale5.domain([0, d3.max(data, function(d) { return d3.max(d.threat, function(d) { return d.value; }); })]);

                    g.selectAll(".groups")
                        .data(data)
                        .attr("transform", function(d) { return "translate(" + xScale5a(d.GroupTreated) + ",0)"; })
                        .selectAll(".rects")
                        .data(function(d) { return d.threat; })
                        .transition()
                        .duration(1000)
                        .attr("x", function(d, i) { return xScale5b(i); })
                        .attr("y", function(d) { return yScale5(d.value); })
                        .attr("width", xScale5b.bandwidth())
                        .attr("height", function(d) { return h7 - yScale5(d.value) - padding5; })
                        .attr("fill", function(d) { return color(d.key); });

                    g.select("#x-axis5")
                        .call(d3.axisBottom(xScale5a))

                    g.select("#y-axis5")
                        .call(d3.axisLeft(yScale5))
                });
            }
        });

    });

    //// Diagnosed
    var w8 = 300;
    var h8 = 280;
    var padding6 = 50;

    var outerRadius = w8 / 2;
    var innerRadius = 75;
    var arc = d3.arc()
        .outerRadius(outerRadius - padding6)
        .innerRadius(innerRadius);

    var pie = d3.pie().sort(null)
        .value(function(d) { return d.BeforeDiagnosed; });

    var svg9 = d3.select("#diagnosed")
        .append("svg")
        .attr("width", w8)
        .attr("height", h8)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/Project.csv", function(data) {
        svg9.append("text")
            .attr("x", 45)
            .attr("y", 20)
            .attr("dy", "0em")
            .attr("font-size", "18px")
            .text("Mental illness diagnosed by");

        svg9.append("text")
            .attr("x", 60)
            .attr("y", 20)
            .attr("dy", "1em")
            .attr("font-size", "18px")
            .text("a medical professional");

        var arcs = svg9.selectAll("g.arc")
            .data(pie(data))
            .enter()
            .append("g")
            .attr("class", "arc")
            .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

        var color2 = d3.scaleOrdinal(d3.schemeCategory10);

        arcs.append("path")
            .attr("fill", function(d, i) {
                return color2(i);
            })
            .attr("d", function(d, i) {
                return arc(d, i)
            });

        arcs.append("text")
            .text(function(d) {
                return d.data.ResponseDiagnosed;
            })
            .attr("transform", function(d) {
                var c = arc.centroid(d),
                    x = c[0],
                    y = c[1],
                    // pythagorean theorem for hypotenuse
                    h = Math.sqrt(x * x + y * y);
                return "translate(" + (x / h * 46) + ',' +
                    (y / h * 0) + ")";
            })
            .attr("dy", "0.75em")
            .attr("text-anchor", function(d) {
                // are we past the center?
                return (d.endAngle + d.startAngle) / 2 > Math.PI ?
                    "end" : "start";
            })
            .attr("fill", "black");

        svg9.selectAll("g.arc")
            .on("mousemove", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.data.ResponseDiagnosed) + "</br>" + (d.data.BeforeDiagnosed) +
                        " (" + (((d.data.BeforeDiagnosed) / 1291 * 100).toFixed(2)) + " %)");

                svg9.selectAll("g.arc")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                svg9.selectAll("g.arc")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");
            });

    });

    //// Handled
    var w9 = 593;
    var h9 = 280;
    var padding7 = 68;
    var moveleft = 45;
    var svg10 = d3.select("#handled")
        .append("svg")
        .attr("width", w9)
        .attr("height", h9)
        .style('margin-left', '5px')
        .style('padding', '5px')
        .style('background-color', 'rgba(255,255,255, 0.3)');

    d3.csv("dataset/ProjectHandled.csv", function(data) {
        svg10.append("text")
            .attr("x", 95)
            .attr("y", 20)
            .attr("font-size", "18px")
            .text("Unsupportive or badly handled response in workplace");

        var xScale6 = d3.scaleLinear()
            .range([padding7 + moveleft, w9 - padding7 + moveleft]);

        var yScale6 = d3.scaleBand()
            .padding(0.2)
            .range([h9 - padding7, padding7]);

        xScale6.domain([0, 600]);
        yScale6.domain(data.map(function(d) { return d.ResponseHandled; }));

        svg10.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", xScale6(0))
            .attr("y", function(d) {
                return yScale6(d.ResponseHandled);
            })
            .attr("width", function(d) {
                return xScale6(d.BeforeHandled) - padding7 - moveleft;
            })
            .attr("height", yScale6.bandwidth())
            .attr("fill", function(d) {
                return "#c08d1f";
            });

        svg10.append("g")
            .attr("id", "x-axis6")
            .attr("transform", "translate(0," + (h9 - padding7) + ")")
            .call(d3.axisBottom(xScale6))
            .append("text")
            .attr("y", h9 - 240)
            .attr("x", 350)
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Number of Employees");

        svg10.append("g")
            .attr("id", "y-axis6")
            .attr("transform", "translate(" + (padding7 + moveleft) + ",0)")
            .call(d3.axisLeft(yScale6)).append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 10)
            .attr("x", -100)
            .attr("dy", "-10.8em")
            .attr("text-anchor", "end")
            .attr("fill", "black")
            .text("Responses");

        svg10.selectAll("rect")
            .on("mousemove", function(d) {
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 70 + "px")
                    .style("display", "inline-block")
                    .html((d.ResponseHandled) + "</br>" + (d.BeforeHandled));

                svg10.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "0.2");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                svg10.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");
            });

        var sortOrder4 = false;
        svg10.on("click", function() {
            sortOrder4 = !sortOrder4;
            if (set == "a") {
                data.sort(function(a, b) {
                    if (sortOrder4) {
                        return a.BeforeHandled - b.BeforeHandled;
                    } else {
                        return b.BeforeHandled - a.BeforeHandled;
                    }
                })

                xScale6.domain([0, 600]);
                yScale6.domain(data.map(function(d) { return d.ResponseHandled; }));

                svg10.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", xScale6(0))
                    .attr("y", function(d) {
                        return yScale6(d.ResponseHandled);
                    })
                    .attr("width", function(d) {
                        return xScale6(d.BeforeHandled) - padding7 - moveleft;
                    })
                    .attr("height", yScale6.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg10.select("#x-axis6")
                    .call(d3.axisBottom(xScale6))

                svg10.select("#y-axis6")
                    .call(d3.axisLeft(yScale6))

            } else if (set == "b") {
                data.sort(function(a, b) {
                    if (sortOrder4) {
                        return a.AfterHandled - b.AfterHandled;
                    } else {
                        return b.AfterHandled - a.AfterHandled;
                    }
                })

                xScale6.domain([0, 600]);
                yScale6.domain(data.map(function(d) { return d.ResponseHandled; }));

                svg10.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(500)
                    .attr("x", xScale6(0))
                    .attr("y", function(d) {
                        return yScale6(d.ResponseHandled);
                    })
                    .attr("width", function(d) {
                        return xScale6(d.AfterHandled) - padding7 - moveleft;
                    })
                    .attr("height", yScale6.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg10.select("#x-axis6")
                    .call(d3.axisBottom(xScale6))

                svg10.select("#y-axis6")
                    .call(d3.axisLeft(yScale6))
            }
        });

    });

    /////////////////////////////
    //// Map Start Here
    ////////////////////////////
    var w10 = 1000;
    var h10 = 500;

    var svg11 = d3.select("#map")
        .attr("width", w10)
        .attr("height", h10)

    var projection = d3.geoMercator()
        .scale(150)
        .center([0, 20])

    var keys = [0, 1, 10, 100];
    var colors = ['#FFFFF', '#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'];
    var colorScale = d3.scaleThreshold()
        .domain(keys)
        .range(colors);

    d3.queue()
        .defer(d3.json, "map.json")
        .defer(d3.csv, "dataset/ProjectCountryBefore.csv", function(d) {
            return {
                code: d.code,
                live_in_no: d.live_in_no,
                work_in_no: d.work_in_no,
                self_emp_total: d.self_emp_total
            }

        })
        .await(ready);


    function ready(error, topo, dataset) {
        if (error) { throw error }

        var name_live_dict = {}
        var name_work_dict = {}
        var name_emp_dict = {}

        topo.features.forEach((itemd, d) => {
            dataset.forEach((item, i) => {
                if (itemd.id == dataset[i].code) {
                    console.log("ok")
                    name_live_dict[itemd.id] = dataset[i].live_in_no
                    name_work_dict[itemd.id] = dataset[i].work_in_no
                    name_emp_dict[itemd.id] = dataset[i].self_emp_total
                }
            });
        });
        console.log(name_live_dict)
        console.log(name_work_dict)
        console.log(name_emp_dict)

        // Draw the map
        svg11.append("g")
            .selectAll("path")
            .data(topo.features)
            .enter()
            .append("path")
            .attr("class", "geo")
            // draw each country
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            // set the color of each country
            .attr("fill", function(d, i) {

                weight = 0
                dataset.forEach((item, i) => {
                    if (d.id == dataset[i].code) {
                        weight = name_live_dict[d.id]
                    }
                });
                return colorScale(weight)

            })
            .style("stroke", "black")
            .style("stroke-width", "0.3 ")
            .attr("class", "Country")
            .style("opacity", 1)
            .on("mousemove", function(d) {
                live = name_live_dict[d.id]
                work = name_work_dict[d.id]
                emp = name_emp_dict[d.id]
                if (live == undefined) {
                    live = 0
                }
                if (work == undefined) {
                    work = 0
                }
                if (emp == undefined) {
                    emp = 0
                }
                console.log(d.properties)
                    // mouseOver
                tooltip
                    .style("left", d3.event.pageX - 50 + "px")
                    .style("top", d3.event.pageY - 120 + "px")
                    .style("display", "inline-block")
                    .html(function() {
                        var string = "<strong>" + (d.properties.name) + "</strong>" + "</br>Live In: " + (live) + "</br>Work In: " + (work) + "</br>Self-Employment In: " + (emp) + "/1291"
                        return string
                    });

                svg11.selectAll("rect")
                    .transition()
                    .duration(1000)
                    .attr("opacity", "1");

                d3.select(this)
                    .transition()
                    .duration(300)
                    .attr("opacity", "1")
                    .attr("cursor", "pointer");
            })
            .on("mouseout", function(d) {
                tooltip.style("display", "none");

                svg11.selectAll("rect")
                    .transition()
                    .duration(300)
                    .attr("opacity", "1");

            });

    }

    const zoom = d3.zoom()
        .scaleExtent([1, 8])
        .on('zoom', zoomed);

    svg11.call(zoom);

    function zoomed() {
        svg11.selectAll('path') // To prevent stroke width from scaling
            .attr('transform', d3.event.transform);
    }


    const svg12 = d3.select("#map-legend")
        .attr("width", w10)
        .attr("height", 50)
        // Add one dot in the legend for each name.
    var size = 30
    svg12.selectAll("legend")
        .data(keys)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return w10 / 2 + i * (size + 45)
        })
        .attr("y", 0)
        .attr("width", size * 2.5)
        .attr("height", size)
        .style("fill", function(d, i) {
            return colorScale(d)
        })
        .attr("transform", "translate(" + (-((size * 2.5 * 4) / 2)) + ",0)")

    // Add one dot in the legend for each name.
    svg12.selectAll("mylabels")
        .data(keys)
        .enter()
        .append("text")
        .attr("x", function(d, i) {
            return w10 / 2 + i * (size + 45) + (size / 2)
        })
        .attr("y", 15)
        .style("fill", "white")
        .text(function(d) {
            return d
        })
        .attr("text-anchor", "left")
        .style("alignment-baseline", "middle")
        .attr("transform", "translate(" + (-((size * 2.5 * 4) / 2)) + ",0)")
        /////////////////////////////
        //// Map End Here
        ////////////////////////////


    /////////////////////////////
    //// Initialize data End Here
    ////////////////////////////

    /////////////////////////////
    //// Update data Start Here
    ////////////////////////////
    d3.csv("dataset/Project.csv", function(data) {
        //// Family History
        var xScale = d3.scaleBand()
            .range([padding, w - padding])
            .padding(0.2)
            .paddingInner(0.4);

        var yScale = d3.scaleLinear()
            .range([h - padding, padding]);

        //// Interview Physical
        var xScale2 = d3.scaleBand()
            .range([padding2, w2 - padding2])
            .padding(0.2)
            .paddingInner(0.4);

        var yScale2 = d3.scaleLinear()
            .range([h2 - padding2, padding2]);


        //// Interview Mental
        var xScale3 = d3.scaleBand()
            .range([padding3, w3 - padding3])
            .padding(0.2)
            .paddingInner(0.4);

        var yScale3 = d3.scaleLinear()
            .range([h3 - padding3, padding3]);


        //// Age Group
        var xScale4 = d3.scaleLinear()
            .range([padding4, w4 - padding4])

        var yScale4 = d3.scaleBand()
            .padding(0.2)
            .range([h4 - padding4, padding4]);

        //// Treated
        var xScale5a = d3.scaleBand()
            .rangeRound([padding5, w7 - padding5 - 100])
            .padding(0.05);

        var xScale5b = d3.scaleBand()
            .padding(0.05);

        var yScale5 = d3.scaleLinear()
            .rangeRound([h7 - padding5, padding5]);

        var color = d3.scaleOrdinal()
            .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);

        //// Diagnosed


        //// Handled
        var xScale6 = d3.scaleLinear()
            .range([padding7 + moveleft, w9 - padding7 + moveleft]);

        var yScale6 = d3.scaleBand()
            .padding(0.2)
            .range([h9 - padding7, padding7]);

        //// Map       
        var keys = [0, 1, 10, 100];
        var colors = ['#FFFFF', '#fee5d9', '#fcae91', '#fb6a4a', '#cb181d'];
        var colorScale = d3.scaleThreshold()
            .domain(keys)
            .range(colors);

        ////tooltip
        var tooltip = d3.select("body").append("div").attr("class", "toolTip");

        //// Update Before 2016 data
        d3.select("#before").on("click", function() {
            updatebeforedata();
            set = "a";
        });

        function updatebeforedata() {
            //// Family History
            xScale.domain(data.map(function(d) { return d.ResponseFamilyHistory; }));
            yScale.domain([0, d3.max(data, function(d) { return d.BeforeFamilyHistory; })]);

            svg.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .attr("x", function(d) {
                    return xScale(d.ResponseFamilyHistory);
                })
                .attr("y", function(d) {
                    return yScale(d.BeforeFamilyHistory);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h - yScale(d.BeforeFamilyHistory) - padding;
                })

            svg.select("#x-axis")
                .call(d3.axisBottom(xScale).tickFormat(function(d) {
                    return d;
                }).ticks(10))

            svg.select("#y-axis")
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .call(d3.axisLeft(yScale).tickFormat(function(d) {
                    return d;
                }).ticks(5))

            svg.selectAll("rect")
                .on("mouseover", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.ResponseFamilyHistory) + "</br>" + (d.BeforeFamilyHistory));

                    svg.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");
                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");

                    svg.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");
                });

            //// Interview Physical
            xScale2.domain(data.map(function(d) { return d.ResponseInterview; }));
            yScale2.domain([0, d3.max(data, function(d) { return d.BeforePhysicalHealth; })]);

            svg3.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .attr("x", function(d) {
                    return xScale2(d.ResponseInterview);
                })
                .attr("y", function(d) {
                    return yScale2(d.BeforePhysicalHealth);
                })
                .attr("width", xScale2.bandwidth())
                .attr("height", function(d) {
                    return h2 - yScale2(d.BeforePhysicalHealth) - padding2;
                })

            svg3.select("#x-axis2")
                .call(d3.axisBottom(xScale2).tickFormat(function(d) {
                    return d;
                }).ticks(10))

            svg3.select("#y-axis2")
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .call(d3.axisLeft(yScale2).tickFormat(function(d) {
                    return d;
                }).ticks(5))

            svg3.selectAll("rect")
                .on("mouseover", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.ResponseInterview) + "</br>" + (d.BeforePhysicalHealth));

                    svg3.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");

                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");

                    svg3.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");

                });

            //// Interview Mental
            xScale3.domain(data.map(function(d) { return d.ResponseInterview; }));
            yScale3.domain([0, d3.max(data, function(d) { return d.BeforeMentalHealth; })]);

            svg4.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .attr("x", function(d) {
                    return xScale3(d.ResponseInterview);
                })
                .attr("y", function(d) {
                    return yScale3(d.BeforeMentalHealth);
                })
                .attr("width", xScale3.bandwidth())
                .attr("height", function(d) {
                    return h3 - yScale3(d.BeforeMentalHealth) - padding3;
                })

            svg4.select("#x-axis3")
                .call(d3.axisBottom(xScale3).tickFormat(function(d) {
                    return d;
                }).ticks(10))

            svg4.select("#y-axis3")
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .call(d3.axisLeft(yScale3).tickFormat(function(d) {
                    return d;
                }).ticks(5))

            svg4.selectAll("rect")
                .on("mouseover", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.ResponseInterview) + "</br>" + (d.BeforeMentalHealth));

                    svg4.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");

                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");

                    svg4.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");

                });

            //// Age Group
            d3.csv("dataset/ProjectAge.csv", function(data) {
                xScale4.domain([0, 700]);
                yScale4.domain(data.map(function(d) { return d.BeforeAgeGroup; }));

                svg5.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("x", xScale4(0))
                    .attr("y", function(d) {
                        return yScale4(d.BeforeAgeGroup);
                    })
                    .attr("width", function(d) {
                        return xScale4(d.BeforeAgeCount) - padding4;
                    })
                    .attr("height", yScale4.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg5.select("#x-axis4")
                    .attr("transform", "translate(0," + (h4 - padding4) + ")")
                    .call(d3.axisBottom(xScale4));


                svg5.select("#y-axis4")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("transform", "translate(" + padding4 + ",0)")
                    .call(d3.axisLeft(yScale4))

                svg5.selectAll("rect")
                    .on("mousemove", function(d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html("Age group (" + (d.BeforeAgeGroup) + ")</br>" + (d.BeforeAgeCount));

                        svg5.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "0.2");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg5.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");
                    });

            });

            //// Treated
            d3.csv("dataset/ProjectTreatedBefore.csv", function(d, i, columns) {
                for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
                return d;
            }, function(error, data) {
                if (error) throw error;

                var keys = data.columns.slice(1);

                xScale5a.domain(data.map(function(d) { return d.GroupTreated; }));
                xScale5b.domain(keys).rangeRound([0, xScale5a.bandwidth()]);
                yScale5.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

                g.selectAll(".groups")
                    .data(data)
                    .attr("transform", function(d) { return "translate(" + xScale5a(d.GroupTreated) + ",0)"; })
                    .selectAll(".rects")
                    .data(function(d) { return keys.map(function(key) { return { key: key, value: d[key] }; }); })
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("x", function(d) { return xScale5b(d.key); })
                    .attr("y", function(d) { return yScale5(d.value); })
                    .attr("width", xScale5b.bandwidth())
                    .attr("height", function(d) { return h7 - yScale5(d.value) - padding5; })
                    .attr("fill", function(d) { return color(d.key); });

                g.select("#x-axis5")
                    .attr("transform", "translate(0," + (h7 - padding5) + ")")
                    .call(d3.axisBottom(xScale5a));

                g.select("#y-axis5")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .call(d3.axisLeft(yScale5))

                svg8.selectAll(".rects")
                    .on("mousemove", function(d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html((d.key) + "</br>" + (d.value));

                        svg8.selectAll(".rects")
                            .transition()
                            .duration(300)
                            .attr("opacity", "0.2");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg8.selectAll(".rects")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");
                    });
            });

            /// Diagnosed
            var pie = d3.pie().sort(null)
                .value(function(d) { return d.BeforeDiagnosed; });

            var arcs = svg9.selectAll("g.arc")
                .data(pie(data))
                .attr("class", "arc")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

            var color2 = d3.scaleOrdinal(d3.schemeCategory10);

            arcs.select("path")
                .attr("fill", function(d, i) {
                    return color2(i);
                })
                .transition()
                .ease(d3.easeBounceOut)
                .duration(2000)
                .attrTween("d", tweenPie)
                .transition()
                .ease(d3.easeCircleIn)
                .delay(function(d, i) { return 2000 + i * 50; })
                .duration(750)
                .attrTween("d", tweenDonut);

            function tweenPie(b) {
                b.innerRadius = 0;
                var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
                return function(t) { return arc(i(t)); };
            }

            function tweenDonut(b) {
                b.innerRadius = outerRadius * .6;
                var i = d3.interpolate({ innerRadius: 0 }, b);
                return function(t) { return arc(i(t)); };
            }

            arcs.select("text")
                .text(function(d) {
                    return d.data.ResponseDiagnosed;
                })
                .attr("transform", function(d) {
                    var c = arc.centroid(d),
                        x = c[0],
                        y = c[1],
                        // pythagorean theorem for hypotenuse
                        h = Math.sqrt(x * x + y * y);
                    return "translate(" + (x / h * 46) + ',' +
                        (y / h * 0) + ")";
                })
                .attr("dy", "0.75em")
                .attr("text-anchor", function(d) {
                    // are we past the center?
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ?
                        "end" : "start";
                })
                .attr("fill", "black");

            svg9.selectAll("g.arc")
                .on("mousemove", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.data.ResponseDiagnosed) + "</br>" + (d.data.BeforeDiagnosed) +
                            " (" + (((d.data.BeforeDiagnosed) / 1291 * 100).toFixed(2)) + " %)");

                    svg9.selectAll("g.arc")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");

                    svg9.selectAll("g.arc")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");
                });

            /// Handled
            d3.csv("dataset/ProjectHandled.csv", function(data) {
                xScale6.domain([0, 600]);
                yScale6.domain(data.map(function(d) { return d.ResponseHandled; }));

                svg10.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("x", xScale6(0))
                    .attr("y", function(d) {
                        return yScale6(d.ResponseHandled);
                    })
                    .attr("width", function(d) {
                        return xScale6(d.BeforeHandled) - padding7 - moveleft;
                    })
                    .attr("height", yScale6.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg10.select("#x-axis6")
                    .attr("transform", "translate(0," + (h9 - padding7) + ")")
                    .call(d3.axisBottom(xScale6));

                svg10.select("#y-axis6")
                    .attr("transform", "translate(" + (padding7 + moveleft) + ",0)")
                    .call(d3.axisLeft(yScale6));

                svg10.selectAll("rect")
                    .on("mousemove", function(d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html((d.ResponseHandled) + "</br>" + (d.BeforeHandled));

                        svg10.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "0.2");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg10.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");
                    });

            });

            //// Gender
            svg1.select("#male")
                .attr("x", 45)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[0].BeforeGender);

            svg2.select("#female")
                .attr("x", 50)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[1].BeforeGender);

            //// Past Issue
            svg6.select("#pastissue")
                .attr("x", 70)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[0].PastMentalIssue);

            //// Current Issue
            svg7.select("#currentissue")
                .attr("x", 70)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[0].CurrentMentalIssue);

            //// Map
            d3.queue()
                .defer(d3.json, "map.json")
                .defer(d3.csv, "dataset/ProjectCountryBefore.csv", function(d) {
                    return {
                        code: d.code,
                        live_in_no: d.live_in_no,
                        work_in_no: d.work_in_no,
                        self_emp_total: d.self_emp_total
                    }

                })
                .await(ready);


            function ready(error, topo, dataset) {
                if (error) { throw error }

                var name_live_dict = {}
                var name_work_dict = {}
                var name_emp_dict = {}

                topo.features.forEach((itemd, d) => {
                    dataset.forEach((item, i) => {
                        if (itemd.id == dataset[i].code) {
                            console.log("ok")
                            name_live_dict[itemd.id] = dataset[i].live_in_no
                            name_work_dict[itemd.id] = dataset[i].work_in_no
                            name_emp_dict[itemd.id] = dataset[i].self_emp_total
                        }
                    });
                });
                console.log(name_live_dict)
                console.log(name_work_dict)
                console.log(name_emp_dict)

                // Draw the map
                svg11.selectAll(".Country")
                    // draw each country
                    .attr("d", d3.geoPath()
                        .projection(projection)
                    )
                    // set the color of each country
                    .attr("fill", function(d, i) {

                        weight = 0
                        dataset.forEach((item, i) => {
                            if (d.id == dataset[i].code) {
                                weight = name_live_dict[d.id]
                            }
                        });
                        return colorScale(weight)

                    })
                    .style("stroke", "black")
                    .style("stroke-width", "0.3 ")
                    .style("opacity", 1)
                    .on("mousemove", function(d) {
                        live = name_live_dict[d.id]
                        work = name_work_dict[d.id]
                        emp = name_emp_dict[d.id]
                        if (live == undefined) {
                            live = 0
                        }
                        if (work == undefined) {
                            work = 0
                        }
                        if (emp == undefined) {
                            emp = 0
                        }
                        console.log(d.properties)
                            // mouseOver
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 120 + "px")
                            .style("display", "inline-block")
                            .html(function() {
                                var string = "<strong>" + (d.properties.name) + "</strong>" + "</br>Live In: " + (live) + "</br>Work In: " + (work) + "</br>Self-Employment In: " + (emp) + "/1291"
                                return string
                            });

                        svg11.selectAll("rect")
                            .transition()
                            .duration(1000)
                            .attr("opacity", "1");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg11.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");

                    });

            }

        }

        //// Update After 2016 data
        d3.select("#after").on("click", function() {
            updateafterdata();
            set = "b";
        });

        function updateafterdata() {
            //// Family History
            xScale.domain(data.map(function(d) { return d.ResponseFamilyHistory; }));
            yScale.domain([0, d3.max(data, function(d) { return d.AfterFamilyHistory; })]);

            svg.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .attr("x", function(d) {
                    return xScale(d.ResponseFamilyHistory);
                })
                .attr("y", function(d) {
                    return yScale(d.AfterFamilyHistory);
                })
                .attr("width", xScale.bandwidth())
                .attr("height", function(d) {
                    return h - yScale(d.AfterFamilyHistory) - padding;
                })

            svg.select("#x-axis")
                .call(d3.axisBottom(xScale).tickFormat(function(d) {
                    return d;
                }).ticks(10))

            svg.select("#y-axis")
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .call(d3.axisLeft(yScale).tickFormat(function(d) {
                    return d;
                }).ticks(5))

            svg.selectAll("rect")
                .on("mouseover", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.ResponseFamilyHistory) + "</br>" + (d.AfterFamilyHistory));

                    svg.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");
                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");

                    svg.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");
                });

            //// Interview Physical
            xScale2.domain(data.map(function(d) { return d.ResponseInterview; }));
            yScale2.domain([0, d3.max(data, function(d) { return d.AfterPhysicalHealth; })]);

            svg3.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .attr("x", function(d) {
                    return xScale2(d.ResponseInterview);
                })
                .attr("y", function(d) {
                    return yScale2(d.AfterPhysicalHealth);
                })
                .attr("width", xScale2.bandwidth())
                .attr("height", function(d) {
                    return h2 - yScale2(d.AfterPhysicalHealth) - padding2;
                })

            svg3.select("#x-axis2")
                .call(d3.axisBottom(xScale2).tickFormat(function(d) {
                    return d;
                }).ticks(10))

            svg3.select("#y-axis2")
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .call(d3.axisLeft(yScale2).tickFormat(function(d) {
                    return d;
                }).ticks(5))

            svg3.selectAll("rect")
                .on("mouseover", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.ResponseInterview) + "</br>" + (d.AfterPhysicalHealth));

                    svg3.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");

                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");

                    svg3.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");

                });

            //// Interview Mental
            xScale3.domain(data.map(function(d) { return d.ResponseInterview; }));
            yScale3.domain([0, d3.max(data, function(d) { return d.AfterMentalHealth; })]);

            svg4.selectAll("rect")
                .data(data)
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .attr("x", function(d) {
                    return xScale3(d.ResponseInterview);
                })
                .attr("y", function(d) {
                    return yScale3(d.AfterMentalHealth);
                })
                .attr("width", xScale3.bandwidth())
                .attr("height", function(d) {
                    return h3 - yScale3(d.AfterMentalHealth) - padding3;
                })

            svg4.select("#x-axis3")
                .call(d3.axisBottom(xScale3).tickFormat(function(d) {
                    return d;
                }).ticks(10))

            svg4.select("#y-axis3")
                .transition()
                .duration(1000)
                .ease(d3.easeCubicIn)
                .call(d3.axisLeft(yScale3).tickFormat(function(d) {
                    return d;
                }).ticks(5))

            svg4.selectAll("rect")
                .on("mouseover", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.ResponseInterview) + "</br>" + (d.AfterMentalHealth));

                    svg4.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");

                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");

                    svg4.selectAll("rect")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");

                });

            //// Age Group
            d3.csv("dataset/ProjectAge.csv", function(data) {
                xScale4.domain([0, 700]);
                yScale4.domain(data.map(function(d) { return d.AfterAgeGroup; }));

                svg5.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("x", xScale4(0))
                    .attr("y", function(d) {
                        return yScale4(d.AfterAgeGroup);
                    })
                    .attr("width", function(d) {
                        return xScale4(d.AfterAgeCount) - padding4;
                    })
                    .attr("height", yScale4.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });


                svg5.select("#x-axis4")
                    .attr("transform", "translate(0," + (h4 - padding4) + ")")
                    .call(d3.axisBottom(xScale4));


                svg5.select("#y-axis4")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("transform", "translate(" + padding4 + ",0)")
                    .call(d3.axisLeft(yScale4))

                svg5.selectAll("rect")
                    .on("mousemove", function(d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html("Age group (" + (d.AfterAgeGroup) + ")</br>" + (d.AfterAgeCount));

                        svg5.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "0.2");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg5.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");
                    });

            });

            //// Treated
            d3.csv("dataset/ProjectTreatedAfter.csv", function(d, i, columns) {
                for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
                return d;
            }, function(error, data) {
                if (error) throw error;

                var keys = data.columns.slice(1);

                xScale5a.domain(data.map(function(d) { return d.GroupTreated; }));
                xScale5b.domain(keys).rangeRound([0, xScale5a.bandwidth()]);
                yScale5.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

                g.selectAll(".groups")
                    .data(data)
                    .attr("transform", function(d) { return "translate(" + xScale5a(d.GroupTreated) + ",0)"; })
                    .selectAll(".rects")
                    .data(function(d) { return keys.map(function(key) { return { key: key, value: d[key] }; }); })
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("x", function(d) { return xScale5b(d.key); })
                    .attr("y", function(d) { return yScale5(d.value); })
                    .attr("width", xScale5b.bandwidth())
                    .attr("height", function(d) { return h7 - yScale5(d.value) - padding5; })
                    .attr("fill", function(d) { return color(d.key); });

                g.select("#x-axis5")
                    .attr("transform", "translate(0," + (h7 - padding5) + ")")
                    .call(d3.axisBottom(xScale5a));

                g.select("#y-axis5")
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .call(d3.axisLeft(yScale5))

                svg8.selectAll(".rects")
                    .on("mousemove", function(d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html((d.key) + "</br>" + (d.value));

                        svg8.selectAll(".rects")
                            .transition()
                            .duration(300)
                            .attr("opacity", "0.2");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg8.selectAll(".rects")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");
                    });
            });

            /// Diagnosed
            var pie = d3.pie().sort(null)
                .value(function(d) { return d.AfterDiagnosed; });

            var arcs = svg9.selectAll("g.arc")
                .data(pie(data))
                .attr("class", "arc")
                .attr("transform", "translate(" + outerRadius + "," + outerRadius + ")");

            var color2 = d3.scaleOrdinal(d3.schemeCategory10);

            arcs.select("path")
                .attr("fill", function(d, i) {
                    return color2(i);
                })
                .transition()
                .ease(d3.easeBounceOut)
                .duration(2000)
                .attrTween("d", tweenPie)
                .transition()
                .ease(d3.easeCircleIn)
                .delay(function(d, i) { return 2000 + i * 50; })
                .duration(750)
                .attrTween("d", tweenDonut);

            function tweenPie(b) {
                b.innerRadius = 0;
                var i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b);
                return function(t) { return arc(i(t)); };
            }

            function tweenDonut(b) {
                b.innerRadius = outerRadius * .6;
                var i = d3.interpolate({ innerRadius: 0 }, b);
                return function(t) { return arc(i(t)); };
            }

            arcs.select("text")
                .text(function(d) {
                    return d.data.ResponseDiagnosed;
                })
                .attr("transform", function(d) {
                    var c = arc.centroid(d),
                        x = c[0],
                        y = c[1],
                        // pythagorean theorem for hypotenuse
                        h = Math.sqrt(x * x + y * y);
                    return "translate(" + (x / h * 46) + ',' +
                        (y / h * 0) + ")";
                })
                .attr("dy", "0.75em")
                .attr("text-anchor", function(d) {
                    // are we past the center?
                    return (d.endAngle + d.startAngle) / 2 > Math.PI ?
                        "end" : "start";
                })
                .attr("fill", "black");

            svg9.selectAll("g.arc")
                .on("mousemove", function(d) {
                    tooltip
                        .style("left", d3.event.pageX - 50 + "px")
                        .style("top", d3.event.pageY - 70 + "px")
                        .style("display", "inline-block")
                        .html((d.data.ResponseDiagnosed) + "</br>" + (d.data.AfterDiagnosed) +
                            " (" + (((d.data.AfterDiagnosed) / 1291 * 100).toFixed(2)) + " %)");

                    svg9.selectAll("g.arc")
                        .transition()
                        .duration(300)
                        .attr("opacity", "0.2");

                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("opacity", "1")
                        .attr("cursor", "pointer");
                })
                .on("mouseout", function(d) {
                    tooltip.style("display", "none");

                    svg9.selectAll("g.arc")
                        .transition()
                        .duration(300)
                        .attr("opacity", "1");
                });

            /// Handled
            d3.csv("dataset/ProjectHandled.csv", function(data) {
                xScale6.domain([0, 600]);
                yScale6.domain(data.map(function(d) { return d.ResponseHandled; }));

                svg10.selectAll("rect")
                    .data(data)
                    .transition()
                    .duration(1000)
                    .ease(d3.easeCubicIn)
                    .attr("x", xScale6(0))
                    .attr("y", function(d) {
                        return yScale6(d.ResponseHandled);
                    })
                    .attr("width", function(d) {
                        return xScale6(d.AfterHandled) - padding7 - moveleft;
                    })
                    .attr("height", yScale6.bandwidth())
                    .attr("fill", function(d) {
                        return "#c08d1f";
                    });

                svg10.select("#x-axis6")
                    .attr("transform", "translate(0," + (h9 - padding7) + ")")
                    .call(d3.axisBottom(xScale6));

                svg10.select("#y-axis6")
                    .attr("transform", "translate(" + (padding7 + moveleft) + ",0)")
                    .call(d3.axisLeft(yScale6));

                svg10.selectAll("rect")
                    .on("mousemove", function(d) {
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 70 + "px")
                            .style("display", "inline-block")
                            .html((d.ResponseHandled) + "</br>" + (d.AfterHandled));

                        svg10.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "0.2");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg10.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");
                    });

            });

            //// Gender
            svg1.select("#male")
                .attr("x", 45)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[0].AfterGender);

            svg2.select("#female")
                .attr("x", 50)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[1].AfterGender);

            //// Past Issue
            svg6.select("#pastissue")
                .attr("x", 70)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[1].PastMentalIssue);

            //// Current Issue
            svg7.select("#currentissue")
                .attr("x", 70)
                .attr("y", 70)
                .attr("font-size", "60px")
                .attr("fill", "#c08d1f")
                .text(data[1].CurrentMentalIssue);


            //// Map
            d3.queue()
                .defer(d3.json, "map.json")
                .defer(d3.csv, "dataset/ProjectCountryAfter.csv", function(d) {
                    return {
                        code: d.code,
                        live_in_no: d.live_in_no,
                        work_in_no: d.work_in_no,
                        self_emp_total: d.self_emp_total
                    }

                })
                .await(ready);


            function ready(error, topo, dataset) {
                if (error) { throw error }

                var name_live_dict = {}
                var name_work_dict = {}
                var name_emp_dict = {}

                topo.features.forEach((itemd, d) => {
                    dataset.forEach((item, i) => {
                        if (itemd.id == dataset[i].code) {
                            console.log("ok")
                            name_live_dict[itemd.id] = dataset[i].live_in_no
                            name_work_dict[itemd.id] = dataset[i].work_in_no
                            name_emp_dict[itemd.id] = dataset[i].self_emp_total
                        }
                    });
                });
                console.log(name_live_dict)
                console.log(name_work_dict)
                console.log(name_emp_dict)

                // Draw the map
                svg11.selectAll(".Country")
                    .data(topo.features)
                    // draw each country
                    .attr("d", d3.geoPath()
                        .projection(projection)
                    )
                    // set the color of each country
                    .attr("fill", function(d, i) {

                        weight = 0
                        dataset.forEach((item, i) => {
                            if (d.id == dataset[i].code) {
                                weight = name_live_dict[d.id]
                            }
                        });
                        return colorScale(weight)

                    })
                    .style("stroke", "black")
                    .style("stroke-width", "0.3 ")
                    .style("opacity", 1)
                    .on("mousemove", function(d) {
                        live = name_live_dict[d.id]
                        work = name_work_dict[d.id]
                        emp = name_emp_dict[d.id]
                        if (live == undefined) {
                            live = 0
                        }
                        if (work == undefined) {
                            work = 0
                        }
                        if (emp == undefined) {
                            emp = 0
                        }
                        console.log(d.properties)
                            // mouseOver
                        tooltip
                            .style("left", d3.event.pageX - 50 + "px")
                            .style("top", d3.event.pageY - 120 + "px")
                            .style("display", "inline-block")
                            .html(function() {
                                var string = "<strong>" + (d.properties.name) + "</strong>" + "</br>Live In: " + (live) + "</br>Work In: " + (work) + "</br>Self-Employment In: " + (emp) + "/1291"
                                return string
                            });

                        svg11.selectAll("rect")
                            .transition()
                            .duration(1000)
                            .attr("opacity", "1");

                        d3.select(this)
                            .transition()
                            .duration(300)
                            .attr("opacity", "1")
                            .attr("cursor", "pointer");
                    })
                    .on("mouseout", function(d) {
                        tooltip.style("display", "none");

                        svg11.selectAll("rect")
                            .transition()
                            .duration(300)
                            .attr("opacity", "1");

                    });

            }
        }

    });
    /////////////////////////////
    //// Update data End Here
    ////////////////////////////

};


function init() {
    chart();
}

window.onload = init;