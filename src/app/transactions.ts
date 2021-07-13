enum TransactionType {
    Debit,
    Credit
}

export interface Transaction {
    id: number,
    date: Date,
    name: string,
    cost: number,
    type: TransactionType,
    category: string,
    subcategory: string
}

export const transactions = [
    {
        id: 1,
        date: new Date('June 26, 2021'),
        name: "Donuts",
        cost: 5.99,
        type: TransactionType.Debit,
        category: "Expense",
        subcategory: "Spending Money"
    },
    {
        id: 2,
        date: new Date('June 27, 2021'),
        name: "Paycheck 6/27",
        cost: 1028.43,
        type: TransactionType.Credit,
        category: "Income",
        subcategory: "Job Income"
    },
    {
        id: 3,
        date: new Date('June 28, 2021'),
        name: "House Rent - June",
        cost: 300,
        type: TransactionType.Debit,
        category: "Expense",
        subcategory: "House Rent"
    },
    {
        id: 4,
        date: new Date('June 29, 2021'),
        name: "Sheetz - 6/29",
        cost: 40.08,
        type: TransactionType.Debit,
        category: "Expense",
        subcategory: "Gas"
    },
    {
        id: 1,
        date: new Date('June 26, 2021'),
        name: "Donuts",
        cost: 5.99,
        type: TransactionType.Debit,
        category: "Expense",
        subcategory: "Spending Money"
    },
    {
        id: 2,
        date: new Date('June 27, 2021'),
        name: "Paycheck 6/27",
        cost: 1028.43,
        type: TransactionType.Credit,
        category: "Income",
        subcategory: "Job Income"
    },
    {
        id: 3,
        date: new Date('June 28, 2021'),
        name: "House Rent - June",
        cost: 300,
        type: TransactionType.Debit,
        category: "Expense",
        subcategory: "House Rent"
    },
    {
        id: 4,
        date: new Date('June 29, 2021'),
        name: "Sheetz - 6/29",
        cost: 40.08,
        type: TransactionType.Debit,
        category: "Expense",
        subcategory: "Gas"
    },
];
