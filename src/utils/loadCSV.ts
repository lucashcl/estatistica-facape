export const loadCSV = async (path: string, delimiter: "," | ";" = ",") => {
   // Read the file content as text
   const content = await Bun.file(path).text();

   // Split content into lines, trim each line, and filter out empty lines
   const lines = content.split("\n").map(line => line.trim()).filter(line => line !== "");

   // If there are no lines, return an empty array
   if (lines.length === 0) return [];

   // Extract headers from the first line, split by comma, and trim each header
   const headers = lines[0].split(delimiter).map(h => h.trim());

   // Process remaining lines into objects
   const data = lines.slice(1).map(line => {
      // Split the line into values by comma and trim each value
      const values = line.split(delimiter).map(v => v.trim());

      // Create an object mapping headers to corresponding values
      return headers.reduce<Record<string, string>>((obj, header, index) => {
         // If the value is undefined (e.g., fewer columns), use an empty string
         obj[header] = values[index] || "";
         return obj;
      }, {});
   });

   return data;
}