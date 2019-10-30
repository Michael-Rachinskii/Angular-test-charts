import { Injectable } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

import { csvJSON, dynamicBlur } from '../helpers/utils';
import { IProcessedDataFromCSV, IParsedDataItem } from '../core/models';

interface IParsedDataAccumulator {
  category: { label: string }[];
  firstValue: { value: number }[];
  secondValue: { value: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  constructor(private readonly http: HttpClient) {}
  getDataFromFile(): Observable<IProcessedDataFromCSV> {
    return timer(0, 1000)
      .pipe(
        switchMap(_ => this.http.get('/assets/example_data.csv', { responseType: 'text' })
          .pipe(map((data: string): IProcessedDataFromCSV => {
          const parsedData = JSON.parse(csvJSON(data));
          const { category, firstValue, secondValue }: IParsedDataAccumulator = parsedData.reduce(
            (accum: IParsedDataAccumulator, item: IParsedDataItem) => {
            accum.category.push({ label: item.year });
            accum.firstValue.push({ value: dynamicBlur(item.data1) });
            accum.secondValue.push({ value: dynamicBlur(item.data2) });
            return accum;
          }, { category: [], firstValue: [], secondValue: [] });
          const categories = [ { category } ];
          const dataset = [ { seriesname: 'First value', data: firstValue }, { seriesname: 'Second value', data: secondValue } ];

          return { categories, dataset };
        })))
      );
  }
}

