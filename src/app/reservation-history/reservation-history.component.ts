import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-history',
  templateUrl: './reservation-history.component.html',
  styleUrls: ['./reservation-history.component.scss']
})
export class ReservationHistoryComponent implements OnInit {

  daysOfHistory: number;

  ngOnInit() {
    this.daysOfHistory = 360;
  }

}
