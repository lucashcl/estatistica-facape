export const isolateColumn = (data: Record<string, string>[], columnName: string) => {
   // Check if data is an array
   if (!Array.isArray(data)) {
      throw new Error("Data must be an array");
   }

   // Check if columnName is a string
   if (typeof columnName !== "string") {
      throw new Error("Column name must be a string");
   }

   // Extract the values from the specified column
   return data.map(row => row[columnName]);
};