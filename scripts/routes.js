
page('/', homeController.index, indexView.initAutocomplete, indexView.geolocate);
page('/map', mapController.index, mapController.findSchools, mapController.renderSchools);
page('/map/lat/:lat/lng/:lng', mapController.findSchools, mapController.index, mapController.renderSchools);
page();
