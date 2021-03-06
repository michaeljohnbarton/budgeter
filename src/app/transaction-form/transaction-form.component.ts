import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Transaction } from '../transactions';

@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.css']
})
export class TransactionFormComponent implements OnInit {

  title: string
  create: boolean

  constructor(
    private dialogRef: MatDialogRef<TransactionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Transaction) { 

      if(this.isEmpty(data)) {
        this.title = "Create transaction";
        this.create = true;
      } else {
        this.title = "Edit transaction";
        this.create = false;
      }
      
  }

  ngOnInit(): void {
  }

  isEmpty(obj: any) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.data.name);
    console.log(this.data.type);
    this.dialogRef.close();
  }

  categoriesList = [ 
    "Income", "Expense"
  ];

  categoryMapping: { [key: string]: string[] } = {
    "Income" : [
      "Job Income", "Other Income"
    ],
    "Expense" : [
      "Spending Money", "House Rent", "Gas", "Electric"
    ]
  };

}
