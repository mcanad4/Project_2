// =====================
// Unemployment Claims Chart
// =====================

// Define dimensions and append to svg for unemployment chart
var svgWidth = parseFloat(d3.select('.chart').style('width')) *.95;
// console.log('test: ',svgWidth);
var svgHeight = .55*svgWidth;
var svg = d3.select('.chart')
    .append('svg')
    .style('width',svgWidth)
    .style('height',svgHeight);
var margin = {
    top: 10,
    right: 40,
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
        console.log(test)
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
        console.log(claimsData);
       
        var x = d3.scalePoint()
            .domain([" ","Apr-2018", "Jul-2018", "Oct-2018", "Jan-2019", "Apr-2019", "Jul-2019", "Oct-2019", 
            "Jan-2020", "Apr-2020", "Jul-2020", "Oct-2020", "Jan-2021", "Apr-2021", "Jul-2021"])
            .range([0, width]);

        var yLinearScaleCont = d3.scaleLinear().range([height, 0]);
        
        xLinearScaleCont.domain([0, xMax + 5]);
        yLinearScaleCont.domain([0, yMax + 20]);

        // var bottomAxis = d3.axisBottom(xLinearScaleCont);
        var bottomAxis = d3.axisBottom(x);
        var leftAxis = d3.axisLeft(yLinearScaleCont);
    
        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .style("font", "14px times")
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
        .style("font", "20px times")
        .style("font-family", "Segoe UI")
        .attr("text.anchor", "middle")
        .text("Claims per Week")
        .style("fill", "#0575E6");   
        
        // Create a rectangle and legend to sit in it
        legendGroup = svg.append("g")
        claimsLegend = legendGroup.append("rect") 
            .attr("x", 240)
            .attr("y", 70)
            .attr("rx", "8px")
            .attr("width", 280)
            .attr("height", 80)
            .attr("fill", "#ffe9c0")
            .attr("opacity", "0.8");

        legendGroup.append("text")
            .attr("x", 250)
            .attr("y", 100)
            .style("fill", "orange")
            .text("Weekly Initial Claims")
            .style("font-size", "20px")
            .style("font-weight", "bold");

        legendGroup.append("text")
            .attr("x", 250)
            .attr("y", 130)
            .style("fill", "teal")
            .text("Weekly Continued Claims")
            .style("font-size", "20px")
            .style("font-weight", "bold");
        
       
        
       
      
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
        d3.select('select').append('options').text(unique);
        //d3.select('select' or SelDatase)?
        
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

// Define the function that will impact gauges
// function renderData() {
    // var seeMe = d3.select('select').node()
    // console.log(seeMe)
    
    // Save the selected ID number to use for filtering 
    // var sel = d3.select('select').node().value;
    // console.log(`ID Number Selection: ${sel}`);
    // console.log(typeof sel);

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



// =====================
// Bus Map
// =====================




// function createMap(indyBus) {

//     /* data route */
//     const url = "/api/bus";
//     d3.json(url).then(function(busData) {

//         busData.forEach(function(data) {          
//             data.objectid = +data.objectid;
//             // data.description = +data.description;
//             data.identifier = +data.identifier;
//             data.latitude = +data.latitude;
//             data.longitude = +data.longitude;
//         });

//     console.log(busData);

// })
// Create a leaflet map with Indianapolis at the center
    // Create a map object
//   var map = L.map("map", {
//     center: [39.76853, -86.15799],
//     zoom: 11,
//     layers: [lightmap, indyBus]
//     });

//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//     collapsed: false
//     }).addTo(map);

// })   
    
   
//   var overlayMaps = {
//     "IndyGo Bus Stops": indyBus
//   };

// function createMarkers(response) {

        //     // Pull the "stations" property off of response.data
        //     var buses = busData.;


    

//START OF MAP COPY IN//
 // Create a map object
var myMap = L.map("map", {
    center: [39.76853, -86.15799],
    zoom: 11
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // Define a markerSize function that will give each city a different radius based on its population
  function markerSize(population) {
    return Math.sqrt(population) / 40;
  }
  
  // Each city object contains the city's name, location and population
  var cities = [
    {
      name: "New York",
      location: [40.7128, -74.0059],
      population: 8550405
    },
    {
      name: "Chicago",
      location: [41.8781, -87.6298],
      population: 2720546
    },
    {
      name: "Houston",
      location: [29.7604, -95.3698],
      population: 2296224
    },
    {
      name: "Los Angeles",
      location: [34.0522, -118.2437],
      population: 3971883
    },
    {
      name: "Indiana",
      location: [39.76853, -86.15799],
      population: 6700000
    }
  ];
  
  // Loop through the cities array and create one marker for each city object
  for (var i = 0; i < cities.length; i++) {
    L.circleMarker(cities[i].location, {
      fillOpacity: 0.75,
      color: "white",
      fillColor: "lightblue",
      // Setting our circle's radius equal to the output of our markerSize function
      // This will make our marker's size proportionate to its population
      radius: markerSize(cities[i].population)
    }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
  }
  
  //END OF COPY IN//

//createMap(indyBus);




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


