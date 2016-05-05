
page('/', homeController.index, indexView.initAutocomplete, indexView.geolocate);
page('/map', mapController.index);
page('/map/lat/:lat/lng/:lng', mapController.findSchools, mapController.index, mapController.renderSchools);
page('/about', aboutController.index);
page();
