/**
 * Converts a number into a compact string format with suffixes (e.g., 1000 -> "1k", 1000000 -> "1M").
 *
 * @param {number} num - The number to convert.
 * @param {number} [decimals=1] - The number of decimal places to include (default is 1).
 * @returns {string} The formatted string with appropriate suffix.
 * @throws {Error} If num is not a number or decimals is not a non-negative integer.
 */
export function formatNumber(num: number, decimals: number = 1): string {
   // Validate input number
   if (typeof num !== "number" || isNaN(num)) {
      throw new Error("Input must be a valid number");
   }

   // Validate decimals
   if (!Number.isInteger(decimals) || decimals < 0) {
      throw new Error("Decimals must be a non-negative integer");
   }

   // Handle negative numbers
   const isNegative = num < 0;
   const absNum = Math.abs(num);

   // Define thresholds and suffixes
   const thresholds = [
      { value: 1e12, suffix: "T" }, // Trillions
      { value: 1e9, suffix: "B" },  // Billions
      { value: 1e6, suffix: "M" },  // Millions
      { value: 1e3, suffix: "k" },  // Thousands
      { value: 1, suffix: "" },     // Less than 1000
   ];

   // Find the appropriate threshold
   for (const { value, suffix } of thresholds) {
      if (absNum >= value) {
         const scaled = absNum / value;
         // Format with specified decimals, remove trailing zeros after decimal
         const formatted = scaled.toFixed(decimals).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1");
         return `${isNegative ? "-" : ""}${formatted}${suffix}`;
      }
   }

   // Fallback for very small numbers (shouldn't happen with thresholds above)
   return `${isNegative ? "-" : ""}${absNum.toFixed(decimals)}`;
}