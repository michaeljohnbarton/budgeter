import { Component, OnInit } from '@angular/core';

import { transactions } from '../transactions'

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {

  transactions = transactions

  constructor() { }

  ngOnInit(): void {
  }

}
