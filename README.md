# Project_2 - COVID-19 and Unemployment

#### The project focuses on the impact COVID-19 had on Marion County. COVID-19 case data, unemployment claim data and resources available for families in need.

#### Sources
1. [Indiana Datahub: COVID-19 Cases by Zip](https://hub.mph.in.gov/dataset/covid-19-cases-by-zip)
2. [Zip Code Details](https://data.indy.gov/search?collection=Dataset&q=boundaries), from City of Indianapolis and Marion County – IndyGIS
3. [Unemployment claims data](http://www.hoosierdata.in.gov/dpage.asp?id=58&view_number=2&menu_level=&panel_number=2), initial and Continued claims for Marion County
4. [Indiana Datahub: Food pantry listings](https://hub.mph.in.gov/dataset/food-pantries-in-marion-county)
5. [Bus stop locations](https://data.indy.gov/search?collection=Dataset&q=transportation), from City of Indianapolis and Marion County - IndyGIS

#### Files
App.py creates the connection through flask to the database. The static folder inside the Indy directory includes all js and css files needed, and the templates folder includes the index.html. The live app is available to view the project at [Project Indy](https://projectindy.herokuapp.com/).

#### Visualizations

A leaflet map allows users to view info by zip code for count and percentage of population having tested positive for COVID-19  

The COVID-19 information can be searched in the filter  

The claims visualization analyzes weekly initial and continued unemployment claims over time  

The leaflet map at the bottom of the webpage identifies locations of bus stops and food resources











