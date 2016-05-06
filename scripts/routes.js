
page('/', homeController.index, indexView.initAutocomplete, indexView.geolocate);
page('/map', mapController.findSchools, mapController.index, mapController.renderSchools, mapView.initAutocomplete);
page('/map/lat/:lat/lng/:lng', mapController.findSchools, mapController.index, mapController.renderSchools, mapView.initAutocomplete);
page('/about', aboutController.index);
page();
