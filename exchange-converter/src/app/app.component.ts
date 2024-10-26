import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class AppComponent implements OnInit {
  title = 'Exchange Converter';
  currencyPairs: string[] = []; // Updated to hold currency pairs directly as strings
  dates: string[] = [];
  currencyPair: string = ''; // Holds the selected currency pair, e.g., "USD/GBP"
  fromCurrency: string = '';
  toCurrency: string = '';
  amount: number | null = null;
  selectedDate: string = '';
  conversionResult: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];

    // Fetch supported currency pairs for today's date
    this.apiService.getSupportedCurrencies(today).subscribe({
      next: (data) => (this.currencyPairs = data), // Use the data directly as strings
      error: (err) => console.error('Error fetching currency pairs:', err),
    });

    // Fetch available dates
    this.apiService.fetchAvailableDates().subscribe({
      next: (data) => (this.dates = data),
      error: (err) => console.error('Error fetching dates:', err),
    });
  }

  convertCurrency(): void {
    if (this.selectedDate && this.currencyPair && this.amount) {
      const [fromCurrency, toCurrency] = this.currencyPair.split('/');
      this.fromCurrency = fromCurrency;
      this.toCurrency = toCurrency;

      this.apiService.getExchangeRate(this.selectedDate, this.fromCurrency, this.toCurrency, this.amount).subscribe({
        next: (data) => (this.conversionResult = data.convertedAmount),
        error: (err) => console.error('Error fetching exchange rate:', err),
      });
    }
  }
}

