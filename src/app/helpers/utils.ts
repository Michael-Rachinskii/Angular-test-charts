interface IDestructuredDataFromCSV {
  year: string;
  data1: string;
  data2: string;
}

export const csvJSON = (csv: string): string => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  return JSON.stringify(lines.reduce((result, line: string, lineIndex: number): IDestructuredDataFromCSV[] => {
    if (line && lineIndex !== 0) {
      const currentLine = line.split(',');
      const obj = currentLine.reduce((accum: IDestructuredDataFromCSV, stringItem: string, index: number) => {
        accum[headers[index]] = stringItem;
        return accum;
      }, {});
      result.push(obj);
    }
    return result;
  }, []));
};

export const dynamicBlur = (value: string | number): number => Number(value) + (Math.random() * 20 - 13);
