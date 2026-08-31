class ExpenseTracker {
  constructor() {
    this.expenses = [];
  }

  addExpense(expense) {
    this.expenses.push(expense);
    this.renderExpense(expense);
    this.saveExpenses();
    this.updateTotal();
    this.renderFilters();
    this.updateCount();
  }
// render expense
  renderExpense(expense) {
  let li = document.createElement("li");

  let textSpan = document.createElement("span");
  textSpan.textContent = `${expense.description} - $${expense.amount} (${expense.category})`;
  li.appendChild(textSpan);

  let btn = document.createElement("button");
  btn.textContent = "Delete";
  li.appendChild(btn);

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    
    this.expenses = this.expenses.filter(function (item) {
      return item !== expense;
    });
    this.saveExpenses();
    this.updateTotal();
    this.updateCount();
    this.renderFilters();
    // we'll build this next
  });

  document.querySelector("#expense-list").appendChild(li);
}
  //delete expense

  deleteExpense(expense) {
    console.log("deleteExpense called with:", expense);
  }

  getTotal() {
    const total =  this.expenses.reduce((sum, expense) => sum + expense.amount, 0)
    return total
    
  }


  updateTotal(){
    const total = this.getTotal()
    document.querySelector('#total-spent').textContent = `Total spent $${total}`
  }


  saveExpenses() {
    localStorage.setItem("expense", JSON.stringify(this.expenses))
  
  }

  loadExpenses() {
     let saved = localStorage.getItem("expense");
    if (!saved) {
    return []; 
  }

  try {
    return JSON.parse(saved); 
  } catch (error) {
    console.log("Failed to load expenses, data may be corrupted:", error.message);
    return []; // fallback: start fresh instead of crashing
  }
  }

renderFilters() {
  const filterList = document.querySelector('#filters ul');
  filterList.innerHTML = ''; // clear old buttons

  const categories = this.expenses.map(expense => expense.category);
  const uniqueCategories = [...new Set(categories)];

  const allCategories = ["All", ...uniqueCategories]; // "All" always first

  allCategories.forEach((category) => {
    let li = document.createElement("li");
    li.textContent = category;

    li.addEventListener("click", () => {
      this.filterByCategory(category);
    });

    filterList.appendChild(li);
  });
}


filterByCategory(category){
  document.querySelector('#expense-list').innerHTML = '';

  let filtered;
  if (category === "All") {
    filtered = this.expenses; // show everything, no filtering needed
  } else {
    filtered = this.expenses.filter(function(expense) {
      return expense.category === category;
    });
  }

  filtered.forEach((expense) => {
    this.renderExpense(expense);
  });
}

updateCount() {
   document.querySelector('#amount').textContent = `Entries: ${this.expenses.length}`;
  
  }

}
//end class here




const myTracker = new ExpenseTracker()

const savedExpenses = myTracker.loadExpenses();
savedExpenses.forEach(function (expense) {
  myTracker.expenses.push(expense);
  myTracker.renderExpense(expense);
});
myTracker.updateTotal()
myTracker.renderFilters()
myTracker.updateCount()

document.querySelector('form').addEventListener('submit', function(e){
    e.preventDefault()
    const description = document.querySelector('#description') 
     const descriptionValue = description.value;

    const amount = document.querySelector('#Amount') 
    const amountValue = Number(amount.value)
    
    const category = document.querySelector('#category')
    const categoryValue = category.value;
    
     if (descriptionValue === '') {
        alert("Please enter a description");
        return; // stop here - don't continue to add anything
    }

    if (isNaN(amountValue) || amountValue <= 0) {
        alert("Please enter a valid amount greater than 0");
        return; // stop here too
    }

    const newExpense = { description: descriptionValue, amount: amountValue, category: categoryValue };
    myTracker.addExpense(newExpense);

    description.value = '';
    amount.value = '';
    category.value = '';
});

