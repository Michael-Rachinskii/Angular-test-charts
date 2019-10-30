import { Component, OnInit } from '@angular/core';
import { AppService } from './shared/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private loading = false;
  private dataSource = {
    chart: {
      yAxisMaxValue: 64,
      xAxisName: 'Year',
      yAxisName: 'Bills',
      numberSuffix: 'K',
      theme: 'fusion',
      type: 'mssplinearea',
      palettecolors: '009c4f,214255'
    },
    dataset: [],
    categories: [],
  };
  constructor(private readonly appService: AppService) {}
  ngOnInit(): void {
    this.loading = true;
    this.appService.getDataFromFile().subscribe((data: any) => {
      this.dataSource.dataset = data.dataset;
      this.dataSource.categories = data.categories;
      this.loading = false;
    }, (error) => {
      this.loading = false;
    });
  }
}
