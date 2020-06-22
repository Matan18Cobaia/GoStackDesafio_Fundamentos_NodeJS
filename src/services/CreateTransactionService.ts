import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface CreateTransactionDTO{
  type:'income'|'outcome';
  title:string;
  value:number
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({type, title, value}:CreateTransactionDTO): Transaction {

    const balanceTotal = this.transactionsRepository.getBalance().total;
    if(type==='outcome'&&balanceTotal<value){
      throw(new Error("No balance for this transaction"))
    }
    const transaction = this.transactionsRepository.create({type, title, value})
    return transaction;
  }
}

export default CreateTransactionService;
