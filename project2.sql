-- Drop table if exists
-- DROP TABLE indy_neighborhoods;
-- DROP TABLE zip_code_boundry;
-- DROP TABLE indyggo_bus_stops;
-- DROP TABLE marion_county_food_pantries_sites;
-- DROP TABLE covid_count_per_zip_all;
-- DROP TABLE marion_county_zips;
-- Drop TABLE unempl_claims;

-- Create tables
CREATE TABLE unempl_claims (
	index VARCHAR Primary Key,
	year VARCHAR,
	month VARCHAR,
	timeframe VARCHAR,
	month_code VARCHAR,
	week VARCHAR,
	continued_claims int,
	cont_pct_change_same_wk_last_year VARCHAR,	
	init_claims	int,
	init_pct_change_same_wk_last_year VARCHAR
);

CREATE TABLE marion_county_zips (
	Zip_Code VARCHAR Primary Key,
	County VARCHAR
);

CREATE TABLE covid_count_per_zip_all (
	ZIP_CD VARCHAR Primary Key,
	PATIENT_COUNT VARCHAR,
	POPULATION VARCHAR,
	PERCENTAGE VARCHAR
);

CREATE TABLE indy_neighborhoods (
	OBJECTID VARCHAR Primary Key,
	NAME VARCHAR,
	GLOBALID VARCHAR,
	SHAPEAREA FLOAT,
	SHAPELEN FLOAT
);

CREATE TABLE zip_code_boundry (
	OBJECTID VARCHAR Primary Key,
	ZIPCODE VARCHAR,
	SHAPEAREA VARCHAR,
	SHAPELEN VARCHAR
);

CREATE TABLE indyggo_bus_stops (
	X VARCHAR,
	Y VARCHAR,
	OBJECTID VARCHAR,
	DESCRIPTION VARCHAR,
	IDENTIFIER VARCHAR,	
	LATITUDE VARCHAR,	
	LONGITUDE VARCHAR
);

CREATE TABLE marion_county_food_pantries_sites (
	SiteSystem_Name VARCHAR,
	SiteSystem_Description VARCHAR,
	SiteSystem_HoursOfOperation VARCHAR,
	SiteAddressus_SiteAddressus_address_1 VARCHAR,
	SiteAddressus_SiteAddressus_address_2 VARCHAR,	
	SiteAddressus_SiteAddressus_city VARCHAR,	
	SiteAddressus_SiteAddressus_county VARCHAR,
	SiteAddressus_SiteAddressus_state VARCHAR,
	SiteAddressus_SiteAddressus_zip VARCHAR,
	SiteAddressus_SiteAddressus_country VARCHAR,
	SiteAddressus_SiteAddressus_notes VARCHAR,
	SiteAddressus_SiteAddressus_latitude VARCHAR,
	SiteAddressus_SiteAddressus_longitude VARCHAR,
	SiteSystem_Websiteurl VARCHAR,
	SiteCustom_Phone1 VARCHAR,
	SiteCustom_Phone1Type VARCHAR
);

-- Create views
Select *
from indy_neighborhoods

Create view neighborhoods as
Select distinct
name, 
globalid, 
cast (shapearea as float), 
cast (shapelen as float)
From indy_neighborhoods

Select *
from indyggo_bus_stops

Create view bus_stops as
Select distinct
objectid, 
description, 
identifier, 
cast (latitude as float), 
cast (longitude as float)
From indyggo_bus_stops

Select *
from zip_code_boundry

Create view zip_code_boundaries as
Select distinct
objectid, 
zipcode, 
cast (shapearea as float), 
cast (shapelen as float)
From zip_code_boundry

Select *
from marion_county_food_pantries_sites

Create view food_pantries as
Select distinct
sitesystem_name as site_name, 
SiteSystem_HoursOfOperation as hours, 
cast (siteaddressus_siteaddressus_zip as int) as zip, 
cast (SiteAddressus_SiteAddressus_latitude as float) as latitude, 
cast (SiteAddressus_SiteAddressus_longitude as float) as longitude
From marion_county_food_pantries_sites

Select *
from covid_count_per_zip_all

Create view covid_count as
Select distinct
zip_cd, 
PATIENT_COUNT, 
population, 
percentage
From covid_count_per_zip_all

Select *
from marion_county_zips

Create view marion_county as
Select distinct
zip_code, 
county
From marion_county_zips

Select 
from unempl_claims
limit 10;

Create view unemploy as
Select distinct
index,
year,
month,
timeframe,
month_code,
week,
continued_claims,
cont_pct_change_same_wk_last_year,	
init_claims,
init_pct_change_same_wk_last_year
From unempl_claims

Create view covid_marion_county as
Select 
a.zipcode, 
a.shapearea,
a.shapelen,
b.patient_count,
b.population,
b.percentage
From zip_code_boundaries as a left join
covid_count as b on (a.zipcode = b. zip_cd)



