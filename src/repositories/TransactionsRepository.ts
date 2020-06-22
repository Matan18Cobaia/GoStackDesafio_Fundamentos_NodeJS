import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface NewTransactionDTO {
  type: 'income' | 'outcome';
  title: string;
  value: number
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {

    const balance = this.transactions.reduce((balance, transaction) => {
      if (transaction.type === 'income') {
        balance.income += transaction.value;

      } else if (transaction.type === 'outcome') {
        balance.outcome += transaction.value

      } else { 
        throw (new Error("Internal Error, transaction without valid type")) 
      }

      balance.total = balance.income - balance.outcome
      return balance;
    }, { income: 0, outcome: 0, total: 0 } as Balance)

    return (balance);
  }

  public create({ title, type, value }: NewTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value })
    this.transactions.push(transaction)
    return transaction;
  }
}

export default TransactionsRepository;
