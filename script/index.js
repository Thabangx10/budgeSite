// JavaScript for budget functionality

const budgetValue = document.getElementById("budgetValue");
const expenseForm = document.getElementById("expenseForm");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const incomeForm = document.getElementById("incomeForm");
const incomeSourceInput = document.getElementById("incomeSource");
const incomeAmountInput = document.getElementById("incomeAmount");
const incomeList = document.getElementById("incomeList");

let totalIncome = 0;
let totalExpenses = 0;
let expenses = [];
let incomes = [];

const expenseVisualizationList = document.getElementById(
  "expenseVisualizationList"
);
const incomeVisualizationList = document.getElementById(
  "incomeVisualizationList"
);

function updateExpenseVisualization() {
  expenseVisualizationList.innerHTML = "";

  expenses.forEach((expense) => {
    const expenseItem = document.createElement("li");
    expenseItem.textContent = `${expense.name}: R${expense.amount.toFixed(2)}`;
    expenseVisualizationList.appendChild(expenseItem);
  });
}

function updateIncomeVisualization() {
  incomeVisualizationList.innerHTML = "";

  incomes.forEach((income) => {
    const incomeItem = document.createElement("li");
    incomeItem.textContent = `${income.source}: R${income.amount.toFixed(2)}`;
    incomeVisualizationList.appendChild(incomeItem);
  });
}

function calculateIncomeOverExpense() {
  const incomeOverExpense = totalIncome - totalExpenses;
  const incomePercentage =
    totalIncome === 0 ? 0 : (incomeOverExpense / totalIncome) * 100;

  if (incomeOverExpense >= 0) {
    budgetValue.textContent = `R${incomeOverExpense.toFixed(2)}`;
  } else {
    budgetValue.textContent = `R-${Math.abs(incomeOverExpense).toFixed(2)}`;
  }

  if (incomePercentage > 60) {
    budgetValue.style.color = "red";
    budgetValue.style.fontWeight = "bold";
  } else {
    budgetValue.style.color = "green";
    budgetValue.style.fontWeight = "normal";
  }
}

function updateLocalStorage() {
  // Save expenses and incomes to Local Storage
  localStorage.setItem("expenses", JSON.stringify(expenses));
  localStorage.setItem("incomes", JSON.stringify(incomes));
}

function loadFromLocalStorage() {
  // Load expenses and incomes from Local Storage
  const storedExpenses = localStorage.getItem("expenses");
  const storedIncomes = localStorage.getItem("incomes");

  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    updateExpenses();
  }

  if (storedIncomes) {
    incomes = JSON.parse(storedIncomes);
    updateIncome();
  }
}

// Load data from Local Storage when the page is loaded
window.addEventListener("load", () => {
  loadFromLocalStorage();
});

function updateExpenses() {
  totalExpenses = 0;
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    totalExpenses += expense.amount;
    const expenseItem = document.createElement("div");
    expenseItem.classList.add("expense-item");
    expenseItem.innerHTML = `
            <span>${expense.name}</span>
            <span>R${expense.amount.toFixed(2)}</span>
            <button onclick="removeExpense(${index})">Remove</button>
        `;
    expenseList.appendChild(expenseItem);
  });

  calculateIncomeOverExpense();

  updateExpenseVisualization();
  updateLocalStorage();
}

function addExpense(e) {
  e.preventDefault();
  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value.trim());

  if (name !== "" && !isNaN(amount) && amount > 0) {
    const expense = { name, amount };
    expenses.push(expense);
    updateExpenses();
    expenseNameInput.value = "";
    expenseAmountInput.value = "";
  }
  updateExpenseVisualization();
  updateLocalStorage();
}

function removeExpense(index) {
  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    updateExpenses();
  }
  updateExpenseVisualization();
  updateLocalStorage();
}

function updateIncome() {
  totalIncome = 0;
  incomeList.innerHTML = "";

  incomes.forEach((income, index) => {
    totalIncome += income.amount;
    const incomeItem = document.createElement("div");
    incomeItem.classList.add("income-item");
    incomeItem.innerHTML = `
            <span>${income.source}</span>
            <span>R${income.amount.toFixed(2)}</span>
            <button onclick="removeIncome(${index})">Remove</button>
        `;
    incomeList.appendChild(incomeItem);
  });

  calculateIncomeOverExpense();

  updateExpenseVisualization();
  updateLocalStorage();
}

function addIncome(e) {
  e.preventDefault();
  const source = incomeSourceInput.value.trim();
  const amount = parseFloat(incomeAmountInput.value.trim());

  if (source !== "" && !isNaN(amount) && amount > 0) {
    const income = { source, amount };
    incomes.push(income);
    updateIncome();
    incomeSourceInput.value = "";
    incomeAmountInput.value = "";
  }

  updateExpenseVisualization();
  updateLocalStorage();
}

function removeIncome(index) {
  if (index >= 0 && index < incomes.length) {
    incomes.splice(index, 1);
    updateIncome();
  }

  updateExpenseVisualization();
  updateLocalStorage();
}

// Event listeners for form submissions
expenseForm.addEventListener("submit", addExpense);
incomeForm.addEventListener("submit", addIncome);

// Load data from Local Storage when the page is loaded
window.addEventListener("load", () => {
  loadFromLocalStorage();
  updateExpenseVisualization();
  updateIncomeVisualization();
});
