import { range } from 'ramda'
import {
  F, T, T0, N,
} from './config'
import { DELTA_CHART_OPTIONS, FUNCTION_CHART_OPTIONS } from './chartConfig'
import drawChart from './drawChart'
import { rk4 } from './math'

// Определяем длину шага
const h = (T-T0) / N

// Определяем функций
const rk4Track = rk4({ f: F, T0, T, N })
const simpleTrack = range(0, N).map(i => [i * h, F(i * h)])

console.log(rk4Track)

// Объединяем два графика 
const functionTrack = [
  ['y', 'simple', 'rk4'],
  ...simpleTrack.map(( _, index) => [
    simpleTrack[index][0],
    simpleTrack[index][1],
    rk4Track[index][1]
  ])
]

// Дастаем Эпсилон
const deltaTrack = [
  ['', 'E'],
  ...rk4Track.map(([t, _, e]) => [t, e])
]

// Рисуем графики
google.charts.load('current', {'packages':['corechart']})
google.charts.setOnLoadCallback(() => {
  drawChart(
    document.getElementById('function_chart'),
    functionTrack,
    FUNCTION_CHART_OPTIONS,
  )
  drawChart(
    document.getElementById('delta_chart'),
    deltaTrack,
    DELTA_CHART_OPTIONS,
  )
})
