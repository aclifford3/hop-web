import { Component, OnInit } from '@angular/core';
import {environment} from "../../environments/environment";
import {HopApiService, Reservation, Response} from "../home/hop-api.service";
import {finalize} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {


  isLoading: boolean;

  constructor(private hopApiService: HopApiService,
              private router: Router) { }

  response: Response;
  version: string = environment.version;
  reservation: Reservation = {
    "apartment": false,
    "carrier": " ",
    "checkInDate": "2018-02-15",
    "checkOutDate": "2018-02-24",
    "ddReturned": false,
    "email": "alec.clifford@gmail.com",
    "firstName": "",
    "flightArrivalTime": " ",
    "flightNum": " ",
    "flightOrigCity": " ",
    "guestsNum": 2,
    "instructionsSent": false,
    "lastName": "Clifford",
    "meetTime": " ",
    "notes": " ",
    "phoneNum": "(404) 906-0924",
    "propertyName": "Alec's House",
    "reservationSource": "Homeaway"
  };

  ngOnInit() {
  }

  addReservation() {
    this.isLoading = true;
    this.hopApiService.addReservation(this.reservation)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response: Response) => {
        this.response = response;
        this.router.navigate(['home']);
      },error => {
          console.debug('Failed to create reservation: ' + error);
        });
  }

}
