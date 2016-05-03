var schoolName = 'Rainier Beach';
var firebaseData = [1, 5, 15, 1.7, 9, 2];

function displayChart(){
  var findChartDisplay = $('#chart-display');
  var ctx = $('#chart-canvas');
  var data = {
    labels: ['Diphtheria Tetanus', 'Pertussis', 'Measles Mumps and Rubella', 'Polio', 'Hepatitis B', 'Varicella'],
    datasets: [
      {
        label: schoolName,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: firebaseData,
      }
    ]
  };
  var myBarChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }
  });
};
