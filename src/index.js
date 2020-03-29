import { rk4 } from './math'
import {
  F, T, T0, N,
} from './config'

// Определяем длину шага
const h = (T-T0) / N

// Определяем функций
const rk4Track = rk4({ f: F, T0, T, N, h })
const simpleTrack = new Array(N)
  .fill(0)
  .reduce(res => {
    let [t] = res[res.length - 1]
    res.push([t+h, F(t+h)])
    return res
  }, [[T0, F(T0)]])
console.log(rk4Track)
// Объединяем два графика 
const resultTrack = simpleTrack.reduce((res, _, index) => {
  res.push([
    simpleTrack[index][0],
    simpleTrack[index][1],
    rk4Track[index][1]
  ])
  return res
}, [['y', 'simple', 'rk4']])

// Дастаем Эпсилон
const deltaTrack = rk4Track.reduce((res, [t, _, e]) => {
  res.push([t, e])
  return res
}, [['', 'E']])

// Рисуем графики
google.charts.load('current', {'packages':['corechart']})
google.charts.setOnLoadCallback(drawChart)

function drawChart() {
  const chart1 = new google.visualization.LineChart(document.getElementById('curve_chart1'))
  
  const data1 = google.visualization.arrayToDataTable(resultTrack)
  const options1 = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'T'
    },
    vAxis: {
      title: 'X'
    },
  }
  chart1.draw(data1, options1)
  
  
  const chart2 = new google.visualization.LineChart(document.getElementById('curve_chart2'))
  
  const data2 = google.visualization.arrayToDataTable(deltaTrack)
  const options2 = {
    title: 'Company Performance',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'T'
    },
    vAxis: {
      title: 'E'
    },
  }
  chart2.draw(data2, options2)
}