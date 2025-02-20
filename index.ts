type Classification = {
   lb: number,
   ub: number,
   items: number[]
}

function range(number: number) {
   return Array.from(({ length: number }), (_, i) => i)
}

const loadCSV = async (path: string) => {
   const content = await Bun.file(path).text()
   return content.split("\n")
      .map(it => it.trim())
      .slice(1)
      .map(Number)
   // {age: number[]}
}

const classify = (items: number[]) => {
   const lb = Math.min(...items)
   const ub = Math.max(...items)
   const A = ub - lb
   const K = Math.ceil(1 + 3.3 * Math.log10(items.length))
   const h = Math.ceil(A / K)
   return range(K)
      .map(i => {
         const lbi = lb + h * i
         const ubi = lbi + h
         return {
            lb: lbi,
            ub: ubi,
            items: items.filter(it => it >= lbi && it < ubi)
         }
      })
}

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
         "F(i)": Fi,
         "f(i)": f,
         "%": `${(f * 100).toFixed()}%`,
         "xi": xi,
         "Fac": Fac
      }
   })
}

const data = await loadCSV("data.csv")
const classifications = classify(data)

console.table(format(classifications))
