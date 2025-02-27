import type { Classification } from "./classify";

export const mapToFrequencies = (classes: Array<Classification>) => {
   return classes.map((it, index, array) => {
      const Fi = it.fi
      const Fac = array
         .slice(0, index + 1)
         .reduce((acc, { fi }) => acc + fi, 0)
      return {
         ...it,
         // Frequência acumulada (Fac)
         "Fac": Fac
      }
   })
}