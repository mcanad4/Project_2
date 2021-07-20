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



// =====================
// Unemployment Claims Chart
// =====================

// For live deployment, wrap unemployment chart in a function
// function buildClaimPlot() {

//     /* data route */
//   const url = "/api/unemploy";
//   d3.json(url).then(function(response) {

//     console.log(response);


//   }

// Define dimensions and append to svg for unemployment chart
var svgWidth = parseFloat(d3.select('.chart').style('width'));
var svgHeight = .66*svgWidth;
var svg = d3.select('.chart')
    .append('svg')
    .style('width',svgWidth)
    .style('height',svgHeight);
var margin = {
    top: 10,
    right: 40,
    bottom: 20,
    left: 40
}

var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);   

// Read in the data for unemployment
d3.csv("/assets/Clean/unemploy_clean2.csv").then(function(claimsData) {
  
    // Parse and format the data

    //index,year,month,timeframe,month_code,week,continued_claims,
    //cont_pct_change_same_wk_last_year,init_claims,
    //init_pct_change_same_wk_last_year    
    
    claimsData.forEach(function(data) {          
        data.index = +data.index;
        data.year = +data.year;
        data.week = +data.week;
        data.continued_claims = +data.continued_claims;
        data.init_claims = +data.init_claims;
        data.timeframe = data.timeframe;
        // These result in NaN if use the unary + operator
        // data.month = +data.month;
        // data.month_code = +data.monthcode;
        // data.cont_pct_change_same_wk_last_year = +data.cont_pct_change_same_wk_last_year; 
        // data.init_pct_change_same_wk_last_year = +data.init_pct_change_same_wk_last_year;
    });

    // Create the area for the plot and define the x and y maximums
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var xMax = d3.max(claimsData, d => d.index);
    console.log(xMax);
    
    var contMax = d3.max(claimsData, d => d.continued_claims);
    var initMax = d3.max(claimsData, d => d.init_claims);

    var yMax = 46000;
    
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

    console.log(contMax)
    console.log(initMax)
    console.log(yMax)
    
    // Create the initLine and the totalLine (using same x and y scale as the continued claims)
    var initLine = d3.line()    
        .x(d => xLinearScaleCont(d.index))
        .y(d => yLinearScaleCont(d.init_claims));

    chartGroup
        .append("path")
        .attr("d", initLine(claimsData))
        .classed("line orange", true);

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

//d3.json(url).then(({timeframe}) => {
//     timeframe.forEach(period => {
//         d3.select("select").append("option").text(period);
//     });
//     renderData();
// });

// Define the function that will display demographics and impact other charts
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
// function buildPlot() {

//     /* data route */
//   const url = "/api/pals";
//   d3.json(url).then(function(response) {

//     console.log(response);

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
