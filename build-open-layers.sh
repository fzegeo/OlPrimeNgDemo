#!/bin/bash

echo "Collecting namespace info..."
python write-ol-compile-json.py
echo "Compiling..."
cd node_modules/openlayers
node tasks/build.js build/ol-custom.json build/ol-custom.js
