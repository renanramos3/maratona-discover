const Storage = {
  get() {
    return JSON.parse(localStorage.getItem("dev.finances:transactions")) || [];
  },

  set(transactions) {
    localStorage.setItem(
      "dev.finances:transactions",
      JSON.stringify(transactions)
    );
  },
};

const defineBackground = (transactionTotal) => {
  if (transactionTotal < 0) {
    document.querySelector("#card-total").classList.remove("fundoVerde");
    document.querySelector("#card-total").classList.add("fundoVermelho");
  } else {
    document.querySelector("#card-total").classList.remove("fundoVermelho");
    document.querySelector("#card-total").classList.add("fundoVerde");
  }
};

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction);

    App.reload();
  },

  remove(index) {
    if (confirm("deseja excluir o item?")) {
      Transaction.all.splice(index, 1);

      App.reload();
    }
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount > 0) {
        income += transaction.amount;
      }
    });
    return income;
  },

  expenses() {
    let expense = 0;
    Transaction.all.forEach((transaction) => {
      if (transaction.amount < 0) {
        expense += transaction.amount;
      }
    });
    return expense;
  },

  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};
