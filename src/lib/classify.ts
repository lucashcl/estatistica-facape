import { range } from "../utils/collections/range"

export type Classification = {
   lb: number,
   ub: number,
   fi: number
}

export const classify = (items: number[]) => {
   // limite inferior (lower bound)
   const lb = Math.min(...items)
   // limite superior (upper bound)
   const ub = Math.max(...items)
   // amplitude
   const A = ub - lb
   // número de classes
   const K = Math.ceil(1 + 3.3 * Math.log10(items.length))
   // amplitude de classe
   const h = Math.ceil(A / K)
   return range(K)
      .map(i => {
         const lbi = lb + h * i
         const ubi = lbi + h
         return {
            lb: lbi,
            ub: ubi,
            fi: items.filter(it => it >= lbi && it < ubi).length
         }
      })
}