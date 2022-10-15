import { Component, OnInit } from '@angular/core';
import {StatisticServiceService} from '../../service/statistic/statistic-service.service';
import {ICart} from '../../model/cart/icart';

@Component({
  selector: 'app-financial-statistic',
  templateUrl: './financial-statistic.component.html',
  styleUrls: ['./financial-statistic.component.css']
})
export class FinancialStatisticComponent implements OnInit {

  ban: number;
  tra: number;
  huy: number;
  luong: number;
  nhap: number;
  tongthu = 0;
  tongchi = 0;
  doanhthu = 0;
  constructor(private statisticService: StatisticServiceService) { }

  ngOnInit(): void {
    this.statisticService.getBan().subscribe(
      (res) => {
        this.ban = res;
        this.tongthu = this.tongthu + this.ban;
      });
    this.statisticService.getTra().subscribe(
      (res) => {
        this.tra = res;
        this.tongthu = this.tongthu + this.tra;
      });
    this.statisticService.getHuy().subscribe(
      (res) => {
        this.huy = res;
        this.tongthu = this.tongthu + this.huy;
      });
    this.statisticService.getLuong().subscribe(
      (res) => {
        this.luong = res;
        this.tongchi = this.tongchi + this.luong;
        this.doanhthu = this.tongthu - this.tongchi;
      });
    this.statisticService.getNhap().subscribe(
      (res) => {
        this.nhap = res;
        this.tongchi = this.tongchi + this.nhap;
      });
  }
}
