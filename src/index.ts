import { classify, type Classification } from "./lib/classify"
import { isolateColumn } from "./utils/collections/isolateColumn"
import { formatNumber } from "./utils/formatNumber"
import { loadCSV } from "./utils/loadCSV"
import { printTable } from "./utils/printTable"

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
         "classe": `${formatNumber(lb)}-${formatNumber(ub)}`,
         // Frequência absoluta (Fi)
         "F(i)": Fi,
         // Frequência relativa (fi)
         "f(i)": f.toFixed(3),
         "%": `${(f * 100).toFixed()}%`,
         // Média da classe (xi)
         "xi": formatNumber(xi),
         // Frequência acumulada (Fac)
         "Fac": Fac
      }
   })
}

const data = await loadCSV("Extrato.csv", ";")
printTable(data)
const values = isolateColumn(data, "Valor").map(Number.parseFloat)
const classifications = classify(values)
printTable(format(classifications))
//const ages = isolateColumn(data, "age").map(Number)
//const classifications = classify(ages)
//printTable(format(classifications))
