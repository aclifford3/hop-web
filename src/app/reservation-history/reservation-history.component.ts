import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.scss']
})
export class ReservationHistoryComponent implements OnInit {

  daysOfHistory = '90';
  title = 'History';
  constructor() {
  }
  ngOnInit() {
  }

}
