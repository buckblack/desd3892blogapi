import { ToastrService } from 'ngx-toastr';
import { ModalDirective } from 'ngx-bootstrap';
import { Chart } from 'chart.js';
import { Component, OnInit, ViewChild } from '@angular/core';
import { StatisticalService } from 'src/app/services/admin/statistical.service';
import { Title } from '@angular/platform-browser';

export interface arrDataChartUser {
  name: string;
  avatar: string;
  count: number;
}
@Component({
  selector: 'app-adminstatisuser',
  templateUrl: './adminstatisuser.component.html',
})
export class AdminstatisuserComponent implements OnInit {

  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  myChart: Chart;

  arrDataChart: arrDataChartUser[] = [] as arrDataChartUser[];
  @ViewChild('modalLoading') modalLoading: ModalDirective;
  constructor(private title: Title, private statisticalService: StatisticalService, private toast: ToastrService) { }

  ngOnInit(): void {
    this.title.setTitle("User | Satistical | Admin | Mini Blog");
    this.dateFrom.setDate(new Date().getDate());
    this.dateTo.setDate(new Date().getDate());
  }

  loadChartAllTime() {
    this.modalLoading.show();
    this.statisticalService.LoadUserChartAllTime().subscribe(result => {
      if (result.errorCode === 0) {
        //clean data of chart
        this.arrDataChart = [] as arrDataChartUser[];
        //add data into array
        result.data.forEach(row => {
          //create new data of row
          const dataRow: arrDataChartUser = {} as arrDataChartUser;
          dataRow.avatar = row.pathAvatar;
          dataRow.count = row.sumPost;
          dataRow.name = row.fullName;
          //add data to array
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
    this.modalLoading.show();
    //create parameters
    const param = {
      "dateTo": this.dateTo,
      "dateFrom": this.dateFrom,
    }
    //call api get data chart
    this.statisticalService.LoadUserChartByTime(param).subscribe(result => {
      if (result.errorCode === 0) {
        //clean data of chart
        this.arrDataChart = [] as arrDataChartUser[];
        result.data.forEach(row => {
          //create new data of row
          const dataRow: arrDataChartUser = {} as arrDataChartUser;
          dataRow.avatar = row.pathAvatar;
          dataRow.count = row.sumPost;
          dataRow.name = row.fullName;
          //add data into to array
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
    const arrAvatar = this.arrDataChart.map(x => x.avatar);
    this.myChart = new Chart(document.getElementById('chartComment'), {
      type: 'bar',
      data: {
        labels: this.arrDataChart.map(x => x.name),
        datasets: [{
          label: 'Post of user',
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
              return `<img src="${arrAvatar[tooltipItem.index]}" style="width:30px" /> ${Number(tooltipItem.yLabel)} <b>Posts</b>`;
            }
          },
          enabled: false,
          custom: function (tooltipModel) {
            // Tooltip Element
            var tooltipEl = document.getElementById('chartjs-tooltip');

            // Create element on first render
            if (!tooltipEl) {
              tooltipEl = document.createElement('div');
              tooltipEl.id = 'chartjs-tooltip';
              tooltipEl.innerHTML = '<table class="custom-tooltip-chart"></table>';
              document.body.appendChild(tooltipEl);
            }

            // Hide if no tooltip
            if (tooltipModel.opacity == '0') {
              tooltipEl.style.opacity = '0';
              return;
            }

            // Set caret Position
            tooltipEl.classList.remove('above', 'below', 'no-transform');
            if (tooltipModel.yAlign) {
              tooltipEl.classList.add(tooltipModel.yAlign);
            } else {
              tooltipEl.classList.add('no-transform');
            }

            function getBody(bodyItem) {
              return bodyItem.lines;
            }

            // Set Text
            if (tooltipModel.body) {
              var titleLines = tooltipModel.title || [];
              var bodyLines = tooltipModel.body.map(getBody);

              var innerHtml = '<thead>';

              titleLines.forEach(function (title) {
                innerHtml += '<tr><th>' + title + '</th></tr>';
              });
              innerHtml += '</thead><tbody>';

              bodyLines.forEach(function (body, i) {
                var colors = tooltipModel.labelColors[i];
                var style = 'background:' + colors.backgroundColor;
                style += '; border-color:' + colors.borderColor;
                style += '; border-width: 2px';
                var span = '<span style="' + style + '"></span>';
                innerHtml += '<tr><td>' + span + body + '</td></tr>';
              });
              innerHtml += '</tbody>';

              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
            }

            // `this` will be the overall tooltip
            var position = this._chart.canvas.getBoundingClientRect();

            // Display, position, and set styles for font
            tooltipEl.style.opacity = '1';
            tooltipEl.style.position = 'absolute';
            tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
            tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
            tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
            tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
            tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
            tooltipEl.style.padding = tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
            tooltipEl.style.pointerEvents = 'none';
          }
        },
        title: {
          display: true,
          text: 'Statistical Top 20 Users',
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
