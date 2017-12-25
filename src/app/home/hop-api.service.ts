import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const url = 'https://ubk2kssfj5.execute-api.us-east-1.amazonaws.com/Dev/reservations';
const headers = new HttpHeaders().set('x-api-key', 'Ai7RemrPPk96XGDz8pdHw1ZUeJZgDXGW18iispp9');

export interface Reservation {
  propertyName: string;
  checkInDate: string;
  checkOutDate: string;
  reservationSource: string;
  meetTime: string;
  guestsNum: number;
  apartment: boolean;
  lastName: string;
  carrier: string;
  ddReturned: boolean;
  email: string;
  firstName: string;
  flightArrivalTime: string;
  flightNum: string;
  flightOrigCity: string;
  instructionsSent: boolean;
  notes: string;
  phoneNum: string;
}

export interface GetReservationsResponse {
  Items: Reservation[];
}

export interface GetReservationResponse {
  Item: Reservation;
}

export interface Response {
  statusCode: string;
  body: string;
}

@Injectable()
export class HopApiService {

  constructor(private httpClient: HttpClient) { }

  getReservations() {
    return this.httpClient.get<GetReservationsResponse>(url, {headers: headers });
  }

  getReservationById(propertyName: string, checkInDate: string) {
    return this.httpClient
      .get<GetReservationResponse>(url + '/' + propertyName + '/' + checkInDate, {headers: headers });
  }

  addReservation(reservation: Reservation) {
    return this.httpClient.post<Response>(url, reservation, {headers: headers });
  }

  deleteReservation(reservation: Reservation) {
    return this.httpClient.delete<Response>(url, {headers: headers });
  }

  //
  // getRandomQuote(context: RandomQuoteContext): Observable<string> {
  //   return this.http.get(routes.quote(context), { cache: true })
  //     .pipe(
  //       map((res: Response) => res.json()),
  //       map(body => body.value),
  //       catchError(() => of('Error, could not load joke :-('))
  //     );
  // }

}
