// Define dimensions and append to svg for unemployment chart
var width = parseFloat(d3.select('.chart').style('width'));
var height = .66*width;
var svg = d3.select('.chart')
    .append('svg')
    .style('width',width)
    .style('height',height);
var margin = {
    top: 10,
    right: 20,
    bottom: 20,
    left: 20
}


var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);   

// Read in the data for unemployment
d3.csv("assets/jobless_claims/unempl_claims.csv").then(function(claimsData) {
 
    //index,year,month,timeframe,month_code,week,
    //continued_claims,cont_pct_change_same_wk_last_year,init_claims,init_pct_change_same_wk_last_year    
    
    claimsData.forEach(function(data) {
        data.index = +data.index
        data.year = +data.year;
        // data.month = +data.month;
        // data.timeframe = +data.timeframe;
        // data.month_code = +data.monthcode;
        data.week = +data.week;
        data.continued_claims = +data.continued_claims;
        data.init_claims = +data.init_claims;
       // data.cont_pct_change_same_wk_last_year = +data.cont_pct_change_same_wk_last_year; 
       // data.init_pct_change_same_wk_last_year = +data.init_pct_change_same_wk_last_year;

    });
    
    // var dates = `${data.year}-${data.month}(week ${data.week})`
    // var xLinearScale = xScale(claimsData, dates)
    
    // Print the data
    console.log(claimsData);




});


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
