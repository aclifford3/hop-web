import { Component, OnInit } from '@angular/core';
import {environment} from '../../environments/environment';
import {GetReservationResponse, HopApiService, Reservation, Response} from '../home/hop-api.service';
import {finalize} from 'rxjs/operators';
import {Router} from '@angular/router';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent implements OnInit {


  isLoading: boolean;
  propertyName: string
  checkInDate: string

  constructor(private hopApiService: HopApiService,
              private router: Router,
              private navParams: NavParams) { }

  response: Response;
  version: string = environment.version;
  title = 'Add Reservation';
  reservation: Reservation = {
    'apartment': false,
    'carrier': ' ',
    'checkInDate': '2018-02-15',
    'checkOutDate': '2018-02-24',
    'ddReturned': false,
    'email': 'alec.clifford@gmail.com',
    'firstName': '',
    'flightArrivalTime': ' ',
    'flightNum': ' ',
    'flightOrigCity': ' ',
    'guestsNum': 2,
    'instructionsSent': false,
    'lastName': 'Clifford',
    'meetTime': ' ',
    'notes': ' ',
    'phoneNum': '(404) 906-0924',
    'propertyName': 'Alec\'s House',
    'reservationSource': 'Homeaway'
  };

  ngOnInit() {
    console.log(this.navParams);
    this.propertyName = this.navParams.get('propertyName');
    this.checkInDate = this.navParams.get('checkInDate');
    this.hopApiService.getReservationById(this.propertyName, this.checkInDate)
      .pipe(finalize( () => { this.isLoading = false; }))
      .subscribe((getReservationResponse: GetReservationResponse) => {
        this.reservation = getReservationResponse.Item;
      },
        error => {
        console.log(error);
        });
  }

  addReservation() {
    this.isLoading = true;
    this.hopApiService.addReservation(this.reservation)
      .pipe(finalize(() => { this.isLoading = false; }))
      .subscribe((response: Response) => {
        this.response = response;
        this.router.navigate(['home']);
      }, error => {
          console.log(error);
        });
  }

}
