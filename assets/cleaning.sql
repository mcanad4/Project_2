-- Drop table if exists
-- DROP TABLE bus_clean;
-- DROP TABLE covid_clean;
-- DROP TABLE food_clean;
-- DROP TABLE neighborhoods_clean;
-- DROP TABLE unemploy_clean;
-- DROP TABLE zip_clean;

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
	zipcode VARCHAR,
	shapearea FLOAT,
	shapelen FLOAT,
	patient_count FLOAT,
	population FLOAT,
	percentage FLOAT
);

Select *
From covid_clean

CREATE TABLE food_clean (
	site_name VARCHAR,
	hours VARCHAR,
	zip VARCHAR,
	latitude FLOAT,
	longitude FLOAT
);

Select *
From food_clean

CREATE TABLE neighborhoods_clean (
	name VARCHAR,
	globalid VARCHAR,
	shapearea FLOAT,
	shapelen FLOAT
);

Select *
From neighborhoods_clean

CREATE TABLE unemploy_clean (
	index VARCHAR,
	year VARCHAR,
	month VARCHAR,
	timeframe varchar,
	month_code varchar,
	week varchar,
	continued_claims float,
	cont_pct_change_same_wk_last_year varchar,
	init_claims	float,
	init_pct_change_same_wk_last_year varchar
);

Select *
From unemploy_clean

CREATE TABLE zip_clean (
	objectid VARCHAR,
	zipcode VARCHAR,
	shapearea float,
	shapelen float
);

Select *
From zip_clean
