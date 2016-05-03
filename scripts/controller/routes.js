
page('/map/lat/:lat/lng/:lng', mapController.findSchools, mapController.index, mapController.renderSchools);
page('/', homeController.index, indexView);
page();
