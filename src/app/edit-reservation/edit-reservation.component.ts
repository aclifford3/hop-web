import { Component, OnInit } from '@angular/core';
import {GetReservationResponse, HopApiService, Reservation, Response} from '../home/hop-api.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-edit-reservation',
  templateUrl: './edit-reservation.component.html',
  styleUrls: ['./edit-reservation.component.scss']
})
export class EditReservationComponent implements OnInit {

  isLoading: boolean;
  id = {
    propertyName: 'Alec\'s House',
    checkInDate: '2018-02-15'
  };
  reservation: Reservation;

  constructor(private hopApiService: HopApiService) { }

  ngOnInit() {
    this.loadReservation();
  }

  loadReservation() {
    this.isLoading = true;
    this.hopApiService.getReservationById(this.id.propertyName, this.id.checkInDate)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((getReservationResponse: GetReservationResponse) => {
        this.reservation = getReservationResponse.Item;
      }, error => {
        console.log(error);
      });
  }

}
