import { IParsedDataItem } from '../core/models';

export const csvJSON = (csv: string): string => {
  const lines = csv.split('\n');
  const headers = lines[0].split(',');

  return JSON.stringify(lines.reduce((result: IParsedDataItem[], line: string, lineIndex: number): IParsedDataItem[] => {
    if (line && lineIndex !== 0) {
      const currentLine = line.split(',');
      const obj = currentLine.reduce((accum: IParsedDataItem, stringItem: string, index: number) => {
        accum[headers[index]] = stringItem;

        return accum;
      }, {} as any as IParsedDataItem);
      result.push(obj);
    }

    return result;
  }, []));
};

export const dynamicBlur = (value: string | number): number => Number(value) + (Math.random() * 20 - 13);
