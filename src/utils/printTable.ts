export function printTable(data: Record<string, any>[]) {
   // Handle empty array
   if (data.length === 0) {
      console.log('No data');
      return;
   }

   // Extract headers from the first object
   const headers = Object.keys(data[0]);

   // Initialize widths with header lengths
   const widths = headers.map(header => header.length);

   // Calculate maximum width for each column
   for (const row of data) {
      for (const [index, header] of headers.entries()) {
         // Handle missing values by treating them as empty strings
         const value = String(row[header] ?? '');
         if (value.length > widths[index]) {
            widths[index] = value.length;
         }
      }
   }

   // Create border line (e.g., +----+----+)
   // Add 2 to each width for padding spaces on both sides
   const border = '+' + widths.map(w => '-'.repeat(w + 2)).join('+') + '+';

   // Format header row (e.g., | id | name |)
   const headerRow = '|' + headers.map((h, i) => ' ' + h.padEnd(widths[i]) + ' ').join('|') + '|';

   // Print top border
   console.log(border);
   // Print header row
   console.log(headerRow);
   // Print separator border
   console.log(border);

   // Format and print each data row
   for (const row of data) {
      const rowStr = '|' + headers.map((h, i) => ' ' + String(row[h] ?? '').padEnd(widths[i]) + ' ').join('|') + '|';
      console.log(rowStr);
   }
   // Print bottom border
   console.log(border);
}