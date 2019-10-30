export interface IProcessedDataFromCSV {
  categories: { category: { label: string }[] }[];
  dataset: { seriesname: string, data: { value: number }[] }[];
}
