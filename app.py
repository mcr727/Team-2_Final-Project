import os
import datetime as dt
import pandas as pd
from flask import Flask, render_template, redirect
import numpy as np
import json
from flask import Flask, jsonify  

app = Flask(__name__)



@app.route("/")
def IndexRoute():
    return render_template("index.html")

    # webpage = render_template("index.html")
    # return webpage

if __name__ == '__main__':
    app.run(debug=True)   
