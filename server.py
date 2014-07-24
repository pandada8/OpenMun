#!/usr/bin/python
from flask import Flask
import os

app = Flask(__name__)

@app.route("/")
def index():
    with open("index.html") as fp:
        return fp.read()

@app.route("/<path:p>")
def default(p):
    if os.path.exists(p):
        with open(p) as fp:
            return fp.read()
    else:
        with open("index.html") as fp:
            return fp.read()

if __name__ == '__main__':
    app.run()
