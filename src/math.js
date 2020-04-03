import { range } from "ramda"

const dirivative = (f, t, h) => {
  return (f(t + h) - f(t)) / h
}

const K1 = (f, t, h) => dirivative(f, t, h)
const K2 = (f, t, h) => dirivative(f, t + (h/2), h) + (h/2)*dirivative(t => K1(f, t, h), t + (h/2), h)
const K3 = (f, t, h) => dirivative(f, t + (h/2), h) + (h/2)*dirivative(t => K2(f, t, h), t + (h/2), h)
const K4 = (f, t, h) => dirivative(f, t + h, h) + h*dirivative(t => K3(f, t, h), t, h)

const xNext = (f, x, t, h) => {
  const a = 1
  const b = 2
  const c = 2
  const d = 1
  return x + (h/6)*(a*K1(f, t, h) + b*K2(f, t, h) + c*K3(f, t, h) + d*K4(f, t, h))
}

// const dirivative = (f, t, h) => {
//   return (f(t + h) - f(t)) / h
// }

// const K1 = (f, t, h) => dirivative(f, t, h)
// const K2 = (f, t, h) => dirivative(f, t + (h/2), h) + (h/2)*dirivative(t => K1(f, t, h), t + (h/2), h)
// const K3 = (f, t, h) => dirivative(f, t + (h/2), h) + (3*h/2)*dirivative(t => K2(f, t, h), t + (h/2), h)
// const K4 = (f, t, h) => dirivative(f, t + h, h) - h*dirivative(t => K3(f, t, h), t, h)

// const xNext = (f, x, t, h) => {
//   const a = 1
//   const b = 4
//   const c = 0
//   const d = 1
//   return x + (h/6)*(a*K1(f, t, h) + b*K2(f, t, h) + c*K3(f, t, h) + d*K4(f, t, h))
// }

const P = 2
const eps = (f, x, t, h) => {
  return Math.abs(xNext(f, x, t, h/2) - xNext(f, x, t, h)) * 2**P / (2**P - 1) 
}

export const rk4 = ({
  f, T0, T, N
}) => {
  const h = (T-T0) / N
  return range(0, N)
    .reduce(res => {
      let [t, x] = res[res.length - 1]
      res.push([t+h, xNext(f, x, t, h), eps(f, x, t, h)])
      return res
    }, [[T0, dirivative(f, T0, h), 0]])
}