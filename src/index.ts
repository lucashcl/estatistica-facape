import { classify, type Classification } from "./lib/classify"
import { loadCSV } from "./utils/loadCSV"

const format = (classifications: Classification[]) => {
   const total = classifications.reduce((acc, { items }) => acc + items.length, 0)
   return classifications.map(({ lb, ub, items }, index, array) => {
      const Fi = items.length
      const f = Fi / total
      const xi = (lb + ub) / 2
      const Fac = array
         .slice(0, index + 1)
         .reduce((acc, { items }) => acc + items.length, 0)
      return {
         "classe": `${lb}-${ub}`,
         // Frequência absoluta (Fi)
         "F(i)": Fi,
         // Frequência relativa (fi)
         "f(i)": f,
         "%": `${(f * 100).toFixed()}%`,
         // Média da classe (xi)
         "xi": xi,
         // Frequência acumulada (Fac)
         "Fac": Fac
      }
   })
}

const media = (classifications: Classification[]) => {
   const total = classifications.reduce((acc, { items }) => acc + items.length, 0)
   return classifications.reduce((acc, { lb, ub, items }) => {
      const Fi = items.length
      const xi = (lb + ub) / 2
      return acc + xi * Fi / total
   }, 0)
}

const data = await loadCSV("data.csv")
const classifications = classify(data)
console.log(`Média: ${media(classifications)}`)

console.table(format(classifications))
