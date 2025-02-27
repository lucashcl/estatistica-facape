import { mapToFrequencies } from "./accFrequency"
import type { Classification } from "./classify"

export const mode = (classes: Array<Classification>) => {
   const cmd = mapToFrequencies(classes).reduce((acc, it) => {
      if (it.fi > acc.fi) return it
      else return acc
   }, classes[0])
   const cmdIdx = classes.findIndex(val => val.lb === cmd.lb)
   const delta1 = cmd.fi - classes[cmdIdx - 1].fi
   const delta2 = cmd.fi - classes[cmdIdx + 1].fi
   const h = cmd.ub - cmd.lb
   const lMo = cmd.lb
   return lMo + delta1 / (delta1 + delta2) * h
}