

// =====================
// Unemployment Claims Chart
// =====================

// Define dimensions and append to svg for unemployment chart
var svgWidth = parseFloat(d3.select('.chart').style('width'));
var svgHeight = .66*svgWidth;
var svg = d3.select('.chart')
    .append('svg')
    .style('width',svgWidth)
    .style('height',svgHeight);
var margin = {
    top: 10,
    right: 80,
    bottom: 20,
    left: 80
}

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);   

// Read in the data for unemployment
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

    console.log(response);


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
    .call(bottomAxis);

    chartGroup.append("g").call(leftAxis);
      
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
        .attr("transform", `translate(${-60}, ${height / 2})`);
    
    labelsGroup.append("text")
       .attr("transform", "rotate(-90)")
       .attr("text.anchor", "middle")
       .text("Claims per Week");   
  
    // var totalLine = d3.line()    
    //     .x(d => xLinearScaleCont(d.index))
    //     .y(d => yLinearScaleCont(d.init_claims + d.continued_claims));

    // chartGroup
    //     .append("path")
    //     .attr("d", totalLine(claimsData))
    //     .classed("line purple", true);

    // Print the data
    console.log(claimsData);
});

// =====================================
// Unemployment - Initial Claims Gauge
// =====================================

// Also wrap this in the function for the time series chart
// d3.json("/assets/Clean/unemploy_clean2.json").then(({timeframe}) => {
//     timeframe.forEach(time => {
//         d3.select("select").append("option").text(time);
//     });
//     renderData();
// });

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
                ['#ff9966', '#ff5e62'], 
                ['#22E4AC', '#0575E6'],
                ['#e1eec3', '#FFB302']
                
                // ['#ff9966', '#ff5e62'],
                // ['#00F260', '#0575E6'],
                // ['#e1eec3', '#f05053']
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


// Create a leaflet map with Indianapolis at the center
// set Lat and Longitude 39.76853 -86.15799
// var indyMap = L.map('map', {
//   center: [39.76853, -86.15799],
//   zoom: 8
// });

// // Adding a tile layer (the background map image) to our map
// // We use the addTo method to add objects to our map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(indyMap);


//**********FROM PET PALS EXAMPLE */
// function buildbusPlot() {

//     /* data route */
  const url = "/api/bus";
  d3.json(url).then(function(busData) {

    busData.forEach(function(data) {          
        data.objectid = +data.objectid;
        data.description = +data.description;
        data.identifier = +data.identifier;
        data.latitude = +data.latitude;
        data.longitude = +data.longitude;
    });

    console.log(response);


//     const data = response;

//     const layout = {
//       scope: "usa",
//       title: "Pet Pals",
//       showlegend: false,
//       height: 600,
//             // width: 980,
//       geo: {
//         scope: "usa",
//         projection: {
//           type: "albers usa"
//         },
//         showland: true,
//         landcolor: "rgb(217, 217, 217)",
//         subunitwidth: 1,
//         countrywidth: 1,
//         subunitcolor: "rgb(255,255,255)",
//         countrycolor: "rgb(255,255,255)"
//       }
//     };

//     Plotly.newPlot("plot", data, layout);
//   });
// }

// buildPlot();


// =====================
// Covid Map
// =====================


// =====================
// Food Pantry Map
// =====================

// Create a leaflet map with Indianapolis at the center
// set Lat and Longitude 39.76853 -86.15799
// var indyMap = L.map('map', {
//   center: [39.76853, -86.15799],
//   zoom: 8
// });

// // Adding a tile layer (the background map image) to our map
// // We use the addTo method to add objects to our map
// L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//   attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//   tileSize: 512,
//   maxZoom: 18,
//   zoomOffset: -1,
//   id: "mapbox/streets-v11",
//   accessToken: API_KEY
// }).addTo(indyMap);


