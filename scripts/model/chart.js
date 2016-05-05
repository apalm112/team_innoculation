// var schoolName = 'Rainier Beach';
// var firebaseData = [1, 2, 1, 96];

function displayChart(schoolName, firebaseData){
  // var findChartDisplay = $('#chart-display');
  var ctx = $('#chart-canvas');
  var data = {
    labels: ['Percent Personal Exemption', 'Percent Religious Exemption', 'Percent Medical Exemption', 'Percent Completed Immunization'],
    datasets: [
      {
        data: firebaseData,
        backgroundColor: [
          '#FF9A0E',
          '#8B1DE8',
          '#FF0000',
          '#4510FF',
        ],
        hoverBackgroundColor: [
          '#FFBC67',
          '#C956E8',
          '#FF594E',
          '#1496FF'
        ]
      }]
  };

  var myPieChart = new Chart(ctx, {
    type: 'pie',
    data: data,
  });
};
