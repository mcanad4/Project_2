/**************************
  Identify Filter Button and add event listener
***************************/

// Get a reference to the button that can be clicked to filter for a date
var filterButton = d3.select("#filter-btn");
var form = d3.select("form");
// Create the event handlers, for click of button and on enter in the input field
filterButton.on("click", handlClick);
form.on("submit", handlClick);


// =====================
// Unemployment Claims Chart
// =====================

// Define dimensions and append to svg for unemployment chart
var svgWidth = parseFloat(d3.select('.chart').style('width')) *.95;
// console.log('test: ',svgWidth);
var svgHeight = .52*svgWidth;
var svg = d3.select('.chart')
    .append('svg')
    .style('width',svgWidth)
    .style('height',svgHeight);
var margin = {
    top: 10,
    right: 60,
    bottom: 60,
    left: 100
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

    // Create the area for the plot and define the x and y maximums
      
      
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;
    
    var xMax = d3.max(claimsData, d => d.index);
        
    var contMax = d3.max(claimsData, d => d.continued_claims);
    var initMax = d3.max(claimsData, d => d.init_claims);

    var yMax = 40000;
         
    // Create the scales and line for continued claims
    var xLinearScaleCont = d3.scaleLinear()
      .domain(d3.extent(claimsData, d => d.index))
      .range([0, width]);
    
    console.log("Unemployment Claims")  
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
      .style("font", "16px times");
      
    var contLine = d3.line()    
      .x(d => xLinearScaleCont(d.index))
      .y(d => yLinearScaleCont(d.continued_claims));

    chartGroup
      .append("path")
      .attr("d", contLine(claimsData))
      .classed("line darkblue", true);

    console.log(`contMax: ${contMax}`);
    console.log(`initMax: ${initMax}`);

    
    // Create the initLine and the totalLine (using same x and y scale as the continued claims)
    var initLine = d3.line()    
      .x(d => xLinearScaleCont(d.index))
      .y(d => yLinearScaleCont(d.init_claims));

    chartGroup
      .append("path")
      .attr("d", initLine(claimsData))
      .classed("line orange", true);

    var labelsGroup = chartGroup.append("g")
      .attr("transform", `translate(${-80}, ${50 + height / 2})`);
    
    labelsGroup.append("text")
    .attr("transform", "rotate(-90)")
    .style("font", "18px times")
    .style("font-family", "Segoe UI")
    .attr("text.anchor", "middle")
    .text("Claims per Week")
    //.style("font-weight", "bold")
    .style("fill", "black");   
        
    // Create a rectangle and legend to sit in it
    legendGroup = svg.append("g")
    claimsLegend = legendGroup.append("rect") 
      .attr("x", 130)
      .attr("y", 22)
      .attr("rx", "8px")
      .attr("width", 280)
      .attr("height", 80)
      .attr("fill", "#ffe9c0")
      .attr("opacity", "0.8");

    legendGroup.append("text")
      .attr("x", 145)
      .attr("y", 50)
      .style("fill", "orange")
      .text("Weekly Initial Claims")
      .style("font-size", "20px")
      .style("font-weight", "bold");

    legendGroup.append("text")
      .attr("x", 145)
      .attr("y", 80)
      .style("fill", "darkblue")
      .text("Weekly Continued Claims")
      .style("font-size", "20px")
      .style("font-weight", "bold");
              

  // TOTAL CLAIMS (Init + Continued)
  // var totalLine = d3.line()    
    //  .x(d => xLinearScaleCont(d.index))
    //  .y(d => yLinearScaleCont(d.init_claims + d.continued_claims));

  // chartGroup
    //  .append("path")
    //  .attr("d", totalLine(claimsData))
    //  .classed("line teal", true);
      
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
                    
    });
    
 };

buildUnemplChart();
// End of Unemployment Analysis


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
  ]}
}
});


// =====================
// Covid Map
// =====================
function buildCovid(zip_code) {
    
  // Get a reference to the table body
  var tbody = d3.select('#covid-tbody');
  
  // Clear out the table displayed each time filter function is used
  tbody.html('');
  
  /* data route */
  const url = "/api/covid";

  d3.json(url).then(function(covidData) {
    
  var filteredData = covidData.filter(obj=>obj['zipcode'] == zip_code);

  filteredData.forEach(row => {

    zipcode = row['zipcode'];
    population = row['population'];
    patient_count = row['patient_count'];
    percentage = row['percentage'];
    
    var tr = tbody.append('tr');
    tr.append('td').text(zipcode); 
    tr.append('td').text(population);
    tr.append('td').text(patient_count);
    tr.append('td').text(percentage);
    
    })     
  });
}; // End of buildCovid();

// Establish a function to filter by datetime 
function handlClick(){

  d3.event.preventDefault()
  var zip_code = d3.select('#location').property("value");

  buildCovid(zip_code);  

};

// =====================
// Covid Case Data
// =====================

function buildCases() {

  /* data route */
const url = "/api/covid";
d3.json(url).then(function(caseData) {

  caseData.forEach(function(data) {          
    data.zipcode = parseInt(data.zipcode);
    data.patient_count = +data.patient_count;
    data.population = +data.population;
    data.percentage = +data.percentage;
    data.lat = +data.lat;
    data.lng = +data.lng;
});
console.log("Covid Case Data")
console.log(caseData);
})
}
buildCases();

// =====================
// Food Pantry Data
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

    console.log("Food Pantries")
    console.log(foodData);
})
}
buildFood();

// =====================
// Bus Data
// =====================

function buildBus() {

    /* data route */
    const url = "/api/bus";
    d3.json(url).then(function(busData) {

        busData.forEach(function(data) {          
            data.objectid = +data.objectid;
            data.description = +data.description;
            data.identifier = +data.identifier;
            data.latitude = +data.latitude;
            data.longitude = +data.longitude;
        });
    
    console.log("Bus Stops")    
    console.log(busData);
})
}
buildBus();


//*********  START of Resource Map  *************//

function createMap2() {
  
  baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var map = L.map("map2", {
    center: [39.76853, -86.15799],
    zoom: 11,
    layers: [baseMap]
  });

  //make a call to the API endpoint for food
  d3.json('/api/food').then(data => {

    //loop through each record from the endpoint
    data.forEach(geo => {

      //create variables based on the data from the endpoint
      var latitude = geo['latitude'];
      var longitude = geo['longitude'];
      var coordinates = [latitude, longitude];
      var site_name = geo['site_name'];
      var hours = geo['hours'];

      //create a marker for each record in the endpoint
      var marker = L.circleMarker(coordinates, {
          fillColor: 'red',
          color: 'red',
          radius: 6,
          weight: 1
          
        });

      //set up the pop up for the marker
      marker.bindPopup(`Location:${site_name}<br>Hours:${hours}`);

      //add the marker to our map
      marker.addTo(map);
    })
  });

  //make a call to the API endpoint for food
  d3.json('/api/bus').then(data => {

    //loop through each record from the endpoint for bus
    data.forEach(geo => {

      //create variables based on the data from the endpoint
      var latitude = geo['latitude'];
      var longitude = geo['longitude'];
      var coordinates = [latitude, longitude];
      var location = geo['description'];

      //create a marker for each record in the endpoint
      var marker = L.circleMarker(coordinates, {
          fillColor: 'blue',
          color: 'blue',
          radius: 2,
          weight: .7

        });

      //set up the pop up for the marker
      marker.bindPopup(`${location}`);

      //add the marker to our map
      marker.addTo(map);
    })
  });
}
createMap2();

//*********  START of Covid Map  *************//

function createMap() {
  
  baseMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  });

  var map = L.map("map", {
    center: [39.76853, -86.15799],
    zoom: 10,
    layers: [baseMap]
  });

  //make a call to the API endpoint for food
  d3.json('/api/covid').then(data => {

    //loop through each record from the endpoint
    data.forEach(geo => {

      //create variables based on the data from the endpoint
      var latitude = geo['lat'];
      var longitude = geo['lng'];
      var coordinates = [latitude, longitude];
      var zip = geo['zipcode'];
      var population = geo['population'];
      var patients = geo['patient_count'];        
      var percent = geo['percentage'];  

      //create a marker for each record in the endpoint
      var marker = L.circleMarker(coordinates, {
        fillColor: 'blue',
        color: 'blue',
        radius: 5,
        weight: 1.8
      });

      //set up the pop up for the marker
      marker.bindPopup(`Zip Code:${zip}<br>Population:${population}<br>Cases:${patients}<br>Percent:${percent}`);

      //add the marker to our map
      marker.addTo(map);
    })
  });
}
createMap();