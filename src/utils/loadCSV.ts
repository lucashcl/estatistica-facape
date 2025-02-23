export const loadCSV = async (path: string) => {
   const content = await Bun.file(path).text()
   return content.split("\n")
      .map(it => it.trim())
      .slice(1)
      .map(Number)
   // {age: number[]}
}