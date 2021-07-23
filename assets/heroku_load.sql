-- Drop table if exists
DROP TABLE bus_clean;
DROP TABLE covid_clean;
DROP TABLE food_clean;
DROP TABLE neighborhoods_clean;
DROP TABLE unemploy_clean;
DROP TABLE zip_clean;

-- Create tables
CREATE TABLE bus_clean (
	objectid VARCHAR Primary Key,
	description VARCHAR,
	identifier VARCHAR,
	latitude FLOAT,
	longitude FLOAT
);

Select *
From bus_clean

CREATE TABLE covid_clean (
	zipcode VARCHAR Primary Key,
	shapearea FLOAT,
	shapelen FLOAT,
	patient_count FLOAT,
	population FLOAT,
	percentage FLOAT,
	lat FLOAT,
	lng Float
);

Select *
From covid_clean

CREATE TABLE food_clean (
	site_name VARCHAR Primary Key,
	hours VARCHAR,
	zip VARCHAR,
	latitude FLOAT,
	longitude FLOAT
);

Select *
From food_clean

CREATE TABLE neighborhoods_clean (
	name VARCHAR Primary Key,
	globalid VARCHAR,
	shapearea FLOAT,
	shapelen FLOAT
);

Select *
From neighborhoods_clean

CREATE TABLE unemploy_clean (
	index INT Primary Key,
	year INT,
	month VARCHAR,
	timeframe varchar,
	month_code varchar,
	week INT,
	continued_claims float,
	cont_pct_change_same_wk_last_year varchar,
	init_claims	float,
	init_pct_change_same_wk_last_year varchar
);

Select *
From unemploy_clean

CREATE TABLE zip_clean (
	objectid VARCHAR Primary Key,
	zipcode VARCHAR,
	LAT float,
	LNG float
);

Select *
From zip_clean
