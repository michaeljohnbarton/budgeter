import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TransactionFormComponent } from '../transaction-form/transaction-form.component';

import { Transaction, transactions } from '../transactions'


@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  transactions = transactions

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editTransaction(id: number) {
    let transaction = this.getTransactionById(id);

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = '400px';
    dialogConfig.data = transaction;

    this.dialog.open(TransactionFormComponent, dialogConfig);
  }

  getTransactionById(id: number): Transaction {
    for(let i = 0; i < transactions.length; i++) {
      if(transactions[i].id == id) {
        return transactions[i];
      }
    }
    return {} as Transaction;
  }

}
