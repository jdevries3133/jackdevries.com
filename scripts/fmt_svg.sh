#!/bin/bash

# For transforming an Excalidraw SVG into a "me" SVG, with the font and colors
# that match my site

cat $1 | sed 's/Virgil/Source Sans Pro, Virgil/g' > temp
cat temp > $1
rm temp

cat $1 | sed 's/fill="#ffffff"/fill="#fffdf7"/g' > temp
cat temp > $1
rm temp
