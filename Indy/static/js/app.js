// =====================
// Unemployment Claims Chart
// =====================

// Define dimensions and append to svg for unemployment chart
displayChart();
//d3.select(window).on('resize', ()=> displayChart);

function displayChart() {
    
var svgWidth = parseFloat(d3.select('.chart').style('width')) *.90;
console.log('test: ',svgWidth);
var svgHeight = .55*svgWidth;
var svg = d3.select('.chart')
    .append('svg')
    .style('width',svgWidth)
    .style('height',svgHeight);
var margin = {
    top: 10,
    right: 80,
    bottom: 60,
    left: 160
}

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);   

// Read in the data for unemployment
function buildUnemplChart() {

    //     /* data route */
    const url = "/api/unemploy";
    d3.json(url).then(function(claimsData) {
        
        claimsData.forEach(function(data) {          
            data.index = +data.index;
            data.year = +data.year;
            data.week = +data.week;
            data.continued_claims = +data.continued_claims;
            data.init_claims = +data.init_claims;
            data.timeframe = data.timeframe;
            
        });

        // May be able to slice out certain time frames in the data using this type of code
        test = claimsData.map(obj=>obj.index).slice(52)

        // Create the area for the plot and define the x and y maximums
        var width = svgWidth - margin.left - margin.right;
        var height = svgHeight - margin.top - margin.bottom;
        
        var xMax = d3.max(claimsData, d => d.index);
        console.log(xMax);
        
        var contMax = d3.max(claimsData, d => d.continued_claims);
        var initMax = d3.max(claimsData, d => d.init_claims);

        var yMax = 40000;
        
        
        // Create the scales and line for continued claims
        var xLinearScaleCont = d3.scaleLinear()
          .domain(d3.extent(claimsData, d => d.index))
          .range([0, width]);

        var yLinearScaleCont = d3.scaleLinear().range([height, 0]);
        
        xLinearScaleCont.domain([0, xMax + 5]);
        yLinearScaleCont.domain([0, yMax + 20]);

        var bottomAxis = d3.axisBottom(xLinearScaleCont);
        var leftAxis = d3.axisLeft(yLinearScaleCont);
    
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .style("font", "24px times")
            .call(bottomAxis);

        chartGroup.append("g").call(leftAxis)
            .style("font", "24px times");
        
        var contLine = d3.line()    
            .x(d => xLinearScaleCont(d.index))
            .y(d => yLinearScaleCont(d.continued_claims));

        chartGroup
            .append("path")
            .attr("d", contLine(claimsData))
            .classed("line teal", true);

        console.log(`contMax: ${contMax}`)
        console.log(`initMax: ${initMax}`)

        
        // Create the initLine and the totalLine (using same x and y scale as the continued claims)
        var initLine = d3.line()    
            .x(d => xLinearScaleCont(d.index))
            .y(d => yLinearScaleCont(d.init_claims));

        chartGroup
            .append("path")
            .attr("d", initLine(claimsData))
            .classed("line orange", true);

        var labelsGroup = chartGroup.append("g")
            .attr("transform", `translate(${-120}, ${50 + height / 2})`);
        
        labelsGroup.append("text")
        .attr("transform", "rotate(-90)")
        .style("font", "30px times")
        .style("font-family", "Segoe UI")
        .attr("text.anchor", "middle")
        .text("Claims per Week")
        .style("fill", "#0575E6");   
        
        // Create a rectangle and legend to sit in it
        legendGroup = svg.append("g")
        claimsLegend = legendGroup.append("rect") 
            .attr("x", 280)
            .attr("y", 90)
            .attr("rx", "8px")
            .attr("width", 420)
            .attr("height", 140)
            .attr("fill", "#ffe9c0")
            .attr("opacity", "0.8");

        legendGroup.append("text")
            .attr("x", 310)
            .attr("y", 150)
            .style("fill", "orange")
            .text("Weekly Initial Claims")
            .style("font-size", "30px")
            .style("font-weight", "bold");

        legendGroup.append("text")
            .attr("x", 310)
            .attr("y", 190)
            .style("fill", "teal")
            .text("Weekly Continued Claims")
            .style("font-size", "30px")
            .style("font-weight", "bold");
        
        //     <svg class="svg-rect" width="50" height="40">
        //     <rect x="0" y="0" rx="3" ry="3" width="50" height="40" fill="#e7e7e7"></rect>
        //     <text x="50%" y="50%" text-anchor="middle" stroke="black" stroke-width="1px" dy=".3em">N/A</text>
        // </svg>
        
        // var legendKeys = ["Weekly Initial Claims", "Weekly Continued Claims"]

        // var lineLeg = svg.selectAll(".linelegend").data(legendKeys)
        //     .enter()
        //     .append("g")
        //     .attr("class", "lineLegend")
        //     .style("font-size", "12px")
        //     .text("value", );
            
        
        //lineLeg.append("text").text(`${legendKeys}`);
       
      
        // TOTAL CLAIMS (Init + Continued)
        // var totalLine = d3.line()    
        //     .x(d => xLinearScaleCont(d.index))
        //     .y(d => yLinearScaleCont(d.init_claims + d.continued_claims));

        // chartGroup
        //     .append("path")
        //     .attr("d", totalLine(claimsData))
        //     .classed("line purple", true);
        
        var timeframes = [];
        claimsData.forEach(function(data) {
            Object.entries(data).forEach(([key, value]) => {
                if (key === "timeframe") {
                    timeframes.push(value);
                }
            });
        })
        function uniqueValues(value, index, self) {
            return self.indexOf(value) === index;
            }
        var unique = timeframes.filter(uniqueValues);
        
        // TRYING TO GET UNIQUE TO SHOW UP AS DROPDOWN CHOICES:
        d3.select('SelDataset').append('options').text(unique);
        //d3.select('select')?
        
        // Print the data
        console.log(claimsData);
        })
}

buildUnemplChart();

// =====================================
// Unemployment - Initial Claims Gauge
// =====================================
function buildUnemplDropdown() {

 // d3.select("select").append("option").text(timeframeData);
}
buildUnemplDropdown();

// function renderData() {
//     var sel = d3.select('select').node().value;
//     console.log(`Timeframe Selection: ${sel}`);
// }


// function optionChanged() {
//     renderData();
// };


// =====================================
// JS Library Granim.js usage in footer
// =====================================

var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'diagonal',
    isPausedWhenNotInView: true,
    states : {
        "default-state": {
            gradients: [
                ['#22E4AC', '#0575E6'],
                ['#e1eec3', '#FFB302'],
                ['#e9e2ff', '#a171ff']
            ]
        }
    }
});



// Define the function that will impact gauges
// function renderData() {
    // var seeMe = d3.select('select').node()
    // console.log(seeMe)
    
    // Save the selected ID number to use for filtering 
    // var sel = d3.select('select').node().value;
    // console.log(`ID Number Selection: ${sel}`);
    // console.log(typeof sel);





// =====================
// Bus Map
// =====================

function buildBus() {

    /* data route */
  const url = "/api/bus";
  d3.json(url).then(function(busData) {

    busData.forEach(function(data) {          
        data.objectid = +data.objectid;
        // data.description = +data.description;
        data.identifier = +data.identifier;
        data.latitude = +data.latitude;
        data.longitude = +data.longitude;
    });

    console.log(busData);
})
}

buildBus();


// =====================
// Food Pantry Map
// =====================

function buildFood() {

    /* data route */
  const url = "/api/food";
  d3.json(url).then(function(foodData) {

    foodData.forEach(function(data) {          
        data.zip = parseInt(data.zip);
        data.latitude = +data.latitude;
        data.longitude = +data.longitude;
    });

    console.log(foodData);
})
}

buildFood();


//STRAT OF MAP COPY IN//

function createMap(indyBus) {

  /* data route */
  const url = "/api/bus";
  d3.json(url).then(function(busData) {

    busData.forEach(function(data) {          
        data.objectid = +data.objectid;
        // data.description = +data.description;
        data.identifier = +data.identifier;
        data.latitude = +data.latitude;
        data.longitude = +data.longitude;
    });

    console.log(busData);
})

// Create a leaflet map with Indianapolis at the center
// Create a map object
var myMap = L.map("map", {
    center: [39.76853, -86.15799],
    zoom: 11
  });
  
  // Add a tile layer
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // An array containing each city's name, location, and population
  var overelayMaps = {
    "IndyGo Bus Stops": indyBus
  };

  // Create the map object with options
  var map = L.map("map", {
        center: [39.76853, -86.15799],
        zoom: 11,
        layers: [lightmap, indyBus]
        });

        // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
        L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
        }).addTo(map);

        // function createMarkers(response) {

        //     // Pull the "stations" property off of response.data
        //     var buses = busData.;
  }
//END OF COPY IN//

// =====================
// Covid Map
// =====================

//***===========
// Example from pet pals of function
/* function buildPlot() {

    /* data route */

  /*const url = "/api/pals";
  d3.json(url).then(function(response) {

    console.log(response);

    const data = response;

    const layout = {
      scope: "usa",
      title: "Pet Pals",
      showlegend: false,
      height: 600,
            // width: 980,
      geo: {
        scope: "usa",
        projection: {
          type: "albers usa"
        },
        showland: true,
        landcolor: "rgb(217, 217, 217)",
        subunitwidth: 1,
        countrywidth: 1,
        subunitcolor: "rgb(255,255,255)",
        countrycolor: "rgb(255,255,255)"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot(); */

}
