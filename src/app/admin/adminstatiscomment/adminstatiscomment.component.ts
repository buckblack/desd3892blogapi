import { ToastrService } from 'ngx-toastr';
import { Chart } from 'chart.js';
import { ModalDirective } from 'ngx-bootstrap';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticalService } from 'src/app/services/admin/statistical.service';
import { Title } from '@angular/platform-browser';

export interface arrDataChartComment {
  name: string;
  title: string;
  count: number;
}

@Component({
  selector: 'app-adminstatiscomment',
  templateUrl: './adminstatiscomment.component.html'
})
export class AdminstatiscommentComponent implements OnInit {

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  myChart: Chart;

  arrDataChart: arrDataChartComment[] = [] as arrDataChartComment[];
  @ViewChild('modalLoading') modalLoading: ModalDirective;
  constructor(private title: Title, private statisticalService: StatisticalService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.title.setTitle("Comment | Statistical | Admin | Mini Blog");
    this.dateFrom.setDate(new Date().getDate());
    this.dateTo.setDate(new Date().getDate());
  }

  loadChartAllTime() {
    this.modalLoading.show();
    this.statisticalService.LoadCommentChartAllTime().subscribe(result => {
      if (result.errorCode === 0) {
        //clean data of chart
        this.arrDataChart = [] as arrDataChartComment[];
        result.data.forEach(row => {
          //create new data of row
          const dataRow: arrDataChartComment = {} as arrDataChartComment;
          dataRow.name = row['id'];
          dataRow.count = row.sumComment;
          dataRow.title = row.postTitle;
          //add data into array
          this.arrDataChart.push(dataRow)
        });
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
    this.modalLoading.show();
    //create parameters
    const param = {
      "dateTo": this.dateTo,
      "dateFrom": this.dateFrom,
    }
    //call api and load data of chart
    this.statisticalService.LoadCommentChartByTime(param).subscribe(result => {
      if (result.errorCode === 0) {
        //clean data of chart
        this.arrDataChart = [] as arrDataChartComment[];
        result.data.forEach(row => {
          //create new data of row
          const dataRow: arrDataChartComment = {} as arrDataChartComment;
          dataRow.name = row['id'];
          dataRow.count = row.sumComment;
          dataRow.title = row.postTitle;
          //add data into chart
          this.arrDataChart.push(dataRow);
        });
        //load chart
        this.insertChart();
      }
      else {
        this.toast.error(result.message);
        this.modalLoading.hide();
      }
    })

  }

  insertChart() {
    //if chart is exists, this cgart will be reset
    if (this.myChart != undefined) {
      this.myChart.destroy();
    }
    //create chart
    const arrtitle = this.arrDataChart.map(x => x.title);
    this.myChart = new Chart(document.getElementById('chartComment'), {
      type: 'bar',
      data: {
        labels: this.arrDataChart.map(x => x.name),
        datasets: [{
          label: 'Commnents of Post ID',
          data: this.arrDataChart.map(x => x.count),
          backgroundColor: 'rgba(33, 212, 241, 1)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return arrtitle[tooltipItem.index] + ": " + Number(tooltipItem.yLabel) + " Comments";
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
