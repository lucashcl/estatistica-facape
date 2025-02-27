import type { Classification } from "./classify"

export const average = (classifications: Classification[]) => {
   const total = classifications.reduce((acc, { items }) => acc + items.length, 0)
   return classifications.reduce((acc, { lb, ub, items }) => {
      const Fi = items.length
      const xi = (lb + ub) / 2
      return acc + xi * Fi / total
   }, 0)
}