# Project Inoculation  
Final Project for Code 301d3  
Explore immunization data for schools in the state of Washington    

## Developers  
Aliza Pilisuk  
Dustin McBride  
Adam Palmer  
Drew Ferris  
Victor Benavente  

## User Stories  
-  As a user, on the homepage I want to see a short blurb with the mission of our website  
-  As a user, on the homage I want to type in an address with autocomplete to search for nearby schools  
-  As a user, after searching I want to be redirected to the map page with the results  
-  As a user, on the map page I want to see a map with a marker for the location of my search, as well as markers for all nearby schools  
-  As a user, I want to click on school markers to learn stats for the that particular school  
-  As a user, after clicking on a marker I want to see the school name, vaccine completion rates, exemption rates, total enrollment, and a chart to visually display the data  
-  As a user, I want to be able to zoom and scroll through the map  
-  As a user, I want to be able to make new search for a a new location  
-  As a user, on the about page I want to learn about all of the developers  

## Developer Stories  
-  As developers, we want to make an AJAX call for all WA state school vaccine data  
-  As developers, we want to save the data to Firebase  
-  As developers, we want the search query to integrate with Google Maps autocomplete  
-  As developers, we want to make sure input address is in WA state  
-  If the address is in WA, we want to redirect the user to map page and store address input in a ctx object  
-  If the address is not in WA, we want to tell the user that data is not available  
-  As developers, we want to run the input address through Google maps and place a marker on map that show a zoomed in area around the marker  
-  As developers, we want to filter through our data based on the input address  
-  As developers, we want to set markers for nearby schools  
-  As developers, on each click of school marker we want a filter to grab vaccine rates specific to that school  
-  As developers, we want to append data to page in a presentable manner  
-  As developers, we want to use chart.js to display charts of the data  
-  As developers, we want to make sure code passes eslint  

## Resources  
-  WA State K-12 Vaccination Rates: https://data.wa.gov/Health/All-students-kindergarten-through-12th-grade-immun/ie96-cgrn  
-  Google Maps API: https://developers.google.com/maps/  
-  Firebase: https://www.firebase.com/  
-  Chart.js: http://www.chartjs.org/  
-  Normalize.css: https://necolas.github.io/normalize.css/  
-  Foundation.js: http://foundation.zurb.com/  
-  jQuery: http://jquery.com/  
-  Icomoon: https://icomoon.io/  
-  Page.js: https://visionmedia.github.io/page.js/  
