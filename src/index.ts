import { classify, type Classification } from "./lib/classify"
import { median } from "./lib/median"
import { mode } from "./lib/mode"
import { isolateColumn } from "./utils/collections/isolateColumn"
import { formatNumber } from "./utils/formatNumber"
import { loadCSV } from "./utils/loadCSV"
import { printTable } from "./utils/printTable"

const format = (classifications: Classification[]) => {
   const total = classifications.reduce((acc, { fi }) => acc + fi, 0)
   return classifications.map(({ lb, ub, fi }, index, array) => {
      const Fi = fi
      const f = Fi / total
      const xi = (lb + ub) / 2
      console.log({
         lb,
         ub,
         fi,
         Fi,
         f,
         xi
      })
      const Fac = array
         .slice(0, index + 1)
         .reduce((acc, { fi }) => acc + fi, 0)
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

const data = await loadCSV("data.csv")
const values = isolateColumn(data, "age").map(Number.parseFloat)
const classifications = classify(values)
printTable(format(classifications))
console.log(`Mediana: ${formatNumber(median(classifications))}`)
console.log(`Moda: ${formatNumber(mode(classifications))}`)
