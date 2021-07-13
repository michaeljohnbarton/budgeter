import { Component, OnInit } from '@angular/core';

import { transactions } from '../transactions'


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions = transactions

  constructor() { }

  ngOnInit(): void {
  }

}
