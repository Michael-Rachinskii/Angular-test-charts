export interface IProcessedDataFromCSV {
  categories: { category: { label: string }[] }[];
  dataset: { seriesname: string, data: { value: number }[] }[];
}

export interface IParsedDataItem {
  year: string;
  data1: string;
  data2: string;
}
