import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api'; // Base URL

  constructor(private http: HttpClient) {}

  getSupportedCurrencies(date: string): Observable<string[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<string[]>(`${this.apiUrl}/supported-currencies`, { params });
  }

  fetchAvailableDates(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/available-dates`);
  }

  getExchangeRate(date: string, fromCurrency: string, toCurrency: string, amount: number): Observable<{ rate: number, convertedAmount: number }> {
    const params = new HttpParams()
      .set('date', date)
      .set('baseCurrency', fromCurrency)
      .set('counterCurrency', toCurrency)
      .set('amount', amount.toString());

    return this.http.get<{ rate: number, convertedAmount: number }>(`${this.apiUrl}/exchange-rate`, { params });
  }
}

