// var schoolName = 'Rainier Beach';
// var firebaseData = [1, 2, 1, 96];

function displayChart(schoolName, firebaseData){
  var findChartDisplay = $('#chart-display');
  var ctx = $('#chart-canvas');
  var data = {
    labels: ['Percent Personal Exemption', 'Percent Religious Exemption', 'Percent Medical Exemption', 'Percent Completed Immunization'],
    datasets: [
      {
        data: firebaseData,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          'blue',
        ],
        hoverBackgroundColor: [
          '#36A2EB',
          '#FF6384',
          'blue',
          '#FFCE56'
        ]
      }]
  };

  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
  });
};
