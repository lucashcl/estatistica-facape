import { mapToFrequencies } from "./accFrequency";
import type { Classification } from "./classify";

export const median = (classes: Array<Classification>) => {
   const n = classes.reduce((acc, it) => it.fi + acc, 0)
   const cmd = mapToFrequencies(classes).reduce((closest, current) =>
      Math.abs(current.Fac - n / 2) < Math.abs(closest.Fac - n / 2) ? current : closest
   );
   const cmdIdx = classes.findIndex(val => val.lb === cmd.lb)
   const lmd = cmd.lb
   const fmld = cmd.fi
   const h = cmd.ub - cmd.lb
   const Ef = classes.slice(0, cmdIdx).reduce((acc, it) => it.fi + acc, 0)
   return lmd + (n / 2 - Ef) * h / fmld;
}
