# import necessary libraries
import os
from flask import (
    Flask,
    render_template,
    jsonify,
    request,
    redirect)

import psycopg2
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
# from config import username, password, dbhost, dbport, dbname 

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Database Setup
#################################################
db_connection_str = os.environ.get('DATABASE_URL', '') #or f"postgresql://{username}:{password}@{dbhost}:{dbport}/{dbname}"

engine = create_engine(db_connection_str)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# print(Base.classes.keys())
# Save reference to the table (update this to new table names)
Bus = Base.classes.bus_clean
Covid = Base.classes.covid_clean
Food = Base.classes.food_clean
# Neighborhoods = Base.classes.neighborhoods_clean
Unemploy = Base.classes.unemploy_clean
Zip = Base.classes.zip_clean

# Create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

# Create route that renders all the data brought in from postgres
@app.route("/api/bus")
def bus():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data in the table 
    results = session.query(Bus.objectid, Bus.description, Bus.identifier, Bus.latitude,  Bus.longitude).all()

    new_results = [r._asdict() for r in results]
    session.close()
    return jsonify(new_results)

# Create route that renders all the data brought in from postgres
@app.route("/api/food")
def food():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data in the table 
    results = session.query(Food.site_name, Food.hours, Food.zip, Food.latitude, Food.longitude).all()

    new_results = [r._asdict() for r in results]
    session.close()
    return jsonify(new_results)

# Create route that renders all the data brought in from postgres
@app.route("/api/unemploy")
def unemploy():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    # Query all data in the table 
    results = session.query(Unemploy.index, Unemploy.year, Unemploy.month, Unemploy.timeframe, Unemploy.month_code, Unemploy.week, Unemploy.continued_claims, Unemploy.cont_pct_change_same_wk_last_year, Unemploy.init_claims, Unemploy.init_pct_change_same_wk_last_year).all()

    new_results = [r._asdict() for r in results]
    session.close()

    return jsonify(new_results)

# Create route that renders all the data brought in from postgres
@app.route("/api/covid")
def covid():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    # Query all data in the table 
    results = session.query(Covid.zipcode, Covid.shapearea, Covid.shapelen, Covid.patient_count, Covid.population, Covid.percentage, Covid.lat, Covid.lng).all()


    new_results = [r._asdict() for r in results]
    session.close()
    return jsonify(new_results) 

if __name__ == "__main__":
    app.run(debug=True)

# Create route that renders all the data brought in from postgres
@app.route("/api/zip")
def zip():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    
    # Query all data in the table 
    results = session.query(Zip.objectid, Zip.zipcode, Zip.LAT, Zip.LNG).all()


    new_results = [r._asdict() for r in results]
    session.close()
    return jsonify(new_results) 

if __name__ == "__main__":
    app.run(debug=True)

# /////////
# Routes like this didn't connect to data / need to be like above


# Create route that renders all the data brought in from postgres
# @app.route("/api/neighborhoods")
# def neighborhoods():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all data in the table 
#     results = session.query(Neighborhoods).all()
#     session.close()
#     return jsonify(results)
# 
# Create route that renders all the data brought in from postgres
# @app.route("/api/zip")
# def zip():
#     # Create our session (link) from Python to the DB
#     session = Session(engine)

#     # Query all data in the table 
#     results = session.query(Zip).all()
#     session.close()
#     return jsonify(results)

