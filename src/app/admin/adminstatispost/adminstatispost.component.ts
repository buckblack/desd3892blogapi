import { ModalDirective } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticalService } from 'src/app/services/admin/statistical.service';
import { Title } from '@angular/platform-browser';

export interface arrDataChartPost {
  name: string;
  count: number;
}

@Component({
  selector: 'app-adminstatispost',
  templateUrl: './adminstatispost.component.html'
})
export class AdminstatispostComponent implements OnInit {

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  myChart: Chart;
  arrDataChart: arrDataChartPost[] = [] as arrDataChartPost[];
  @ViewChild('modalLoading') modalLoading: ModalDirective;
  constructor(private title: Title, private statisticalService: StatisticalService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.title.setTitle("Post | Statistical | Admin | Mini Blog");
    this.dateFrom.setDate(new Date().getDate());
    this.dateTo.setDate(new Date().getDate());
  }

  loadChartAllTime() {
    this.modalLoading.show();
    this.statisticalService.LoadPostChartAllTime().subscribe(result => {
      if (result.errorCode === 0) {
        //clean data of chart
        this.arrDataChart = [] as arrDataChartPost[];
        result.data.forEach(row => {
          //create new data of row
          const dataRow: arrDataChartPost = {} as arrDataChartPost;
          dataRow.name = row.subCateName;
          dataRow.count = row.sumPost;
          //add data into array
          this.arrDataChart.push(dataRow);
        })
        //load chart
        this.insertChart();
      }
      else {
        this.toast.error(result.message);
        this.modalLoading.hide();
      }
    })

  }

  loadChartByTime() {
    //create parameters
    this.modalLoading.show();
    const param = {
      "dateTo": this.dateTo,
      "dateFrom": this.dateFrom,
    }
    //call api and load data of chart
    this.statisticalService.LoadPostChartByTime(param).subscribe(result => {
      if (result.errorCode === 0) {
        //clean data of chart
        this.arrDataChart = [] as arrDataChartPost[];
        result.data.forEach(row => {
          //create data of row
          const dataRow: arrDataChartPost = {} as arrDataChartPost;
          dataRow.name = row.subCateName;
          dataRow.count = row.sumPost;
          //add data into array
          this.arrDataChart.push(dataRow);
        })
        this.insertChart();
      }
      else {
        this.toast.error(result.message);
        this.modalLoading.hide();
      }
    })

  }

  insertChart() {
    //if chart is exists, this chart will be reset
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
    //create chart
    this.myChart = new Chart(document.getElementById('chartPost'), {
      type: 'bar',
      data: {
        labels: this.arrDataChart.map(x => x.name),
        datasets: [{
          label: 'post count',
          data: this.arrDataChart.map(x => x.count),
          backgroundColor: 'rgba(33, 212, 241, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, arrName) {
              return arrName.labels[tooltipItem.index] + ": " + Number(tooltipItem.yLabel) + " Posts";
            }
          }
        },
        title: {
          display: true,
          text: 'Post of Sub-Category',
          position: 'bottom',
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    this.modalLoading.hide();
  }

}
