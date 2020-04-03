export default function drawChart(elem, track, options) {
  const functionChart = new google.visualization.LineChart(elem)
  const functionDataTable = google.visualization.arrayToDataTable(track)
  functionChart.draw(functionDataTable, options)
}