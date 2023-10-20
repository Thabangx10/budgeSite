// JavaScript Functions
function showContent(contentId) {
  var allContents = document.querySelectorAll(".section-content");
  
  // Hide all contents
  allContents.forEach(function(content) {
    content.style.display = "none";
  });
  
  // Show the selected content
  var contentToShow = document.getElementById(contentId);
  contentToShow.style.display = "block";
}


// DOM elements
const budgetValue = document.getElementById("budgetValue");
const expenseForm = document.getElementById("expenseForm");
const expenseNameInput = document.getElementById("expenseName");
const expenseAmountInput = document.getElementById("expenseAmount");
const expenseList = document.getElementById("expenseList");
const incomeForm = document.getElementById("incomeForm");
const incomeSourceInput = document.getElementById("incomeSource");
const incomeAmountInput = document.getElementById("incomeAmount");
const incomeList = document.getElementById("incomeList");
const expenseVisualizationList = document.getElementById(
  "expenseVisualizationList"
);
const incomeVisualizationList = document.getElementById(
  "incomeVisualizationList"
);

// Data
let totalIncome = 0;
let totalExpenses = 0;
let expenses = [];
let incomes = [];

// Load data from Local Storage when the page is loaded
window.addEventListener("load", () => {
  loadFromLocalStorage();
  updateExpenseVisualization();
  updateIncomeVisualization();
  updateCombinedChart();
});

// Function to update the budget value and its visualization
function updateBudgetVisualization(incomeOverExpense) {
  const incomePercentage =
    totalIncome === 0 ? 0 : (incomeOverExpense / totalIncome) * 100;
  budgetValue.textContent = `R${Math.abs(incomeOverExpense).toFixed(2)}`;
  budgetValue.style.color = incomeOverExpense >= 0 ? "green" : "red";
  budgetValue.style.fontWeight = incomePercentage > 60 ? "bold" : "normal";
}

// Function to update the pie chart data and redraw it
function updatePieChart(chartId, labels, data) {
  const ctx = document.getElementById(chartId).getContext("2d");
  const config = {
    type: "pie",
    data: {
      labels: labels,
      datasets: [
        {
          data: data,
          backgroundColor: [
            "#ff6384",
            "#36a2eb",
            "#cc65fe",
            "#ffce56",
            "#4bc0c0",
            "#f56954",
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  // Check if the chart exists in the window object
  if (window[chartId] && window[chartId] instanceof Chart) {
    // If the chart exists, update its data and redraw
    window[chartId].data.datasets[0].data = data;
    window[chartId].update();
  } else {
    // If the chart doesn't exist, create a new chart instance and store it in the window object
    window[chartId] = new Chart(ctx, config);
  }
}

// Function to update the expense visualization list
function updateExpenseVisualization() {
  expenseVisualizationList.innerHTML = "";
  expenses.forEach((expense) => {
    const expenseItem = document.createElement("li");
    expenseItem.textContent = `${expense.name}: R${expense.amount.toFixed(2)}`;
    expenseVisualizationList.appendChild(expenseItem);
  });
}

// Function to update the income visualization list
function updateIncomeVisualization() {
  incomeVisualizationList.innerHTML = "";
  incomes.forEach((income) => {
    const incomeItem = document.createElement("li");
    incomeItem.textContent = `${income.source}: R${income.amount.toFixed(2)}`;
    incomeVisualizationList.appendChild(incomeItem);
  });
}

// Function to update the combined pie chart
function updateCombinedChart() {
  const incomeLabels = incomes.map((income) => income.source);
  const incomeAmounts = incomes.map((income) => income.amount.toFixed(2));
  const expenseLabels = expenses.map((expense) => expense.name);
  const expenseAmounts = expenses.map((expense) => expense.amount.toFixed(2));
  const combinedLabels = [...incomeLabels, ...expenseLabels];
  const combinedData = [...incomeAmounts, ...expenseAmounts];
  updatePieChart("pie-chart", combinedLabels, combinedData);
}

// Function to calculate income over expenses and update the budget visualization
function calculateIncomeOverExpense() {
  const incomeOverExpense = totalIncome - totalExpenses;
  updateBudgetVisualization(incomeOverExpense);
}

// Function to update the expenses
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
  updateCombinedChart();
}

// Function to add an expense
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
}

// Function to remove an expense
function removeExpense(index) {
  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    updateExpenses();
  }
}

// Function to update the incomes
function updateIncomes() {
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
  updateIncomeVisualization();
  updateLocalStorage();
  updateCombinedChart();
}

// Function to add an income
function addIncome(e) {
  e.preventDefault();
  const source = incomeSourceInput.value.trim();
  const amount = parseFloat(incomeAmountInput.value.trim());

  if (source !== "" && !isNaN(amount) && amount > 0) {
    const income = { source, amount };
    incomes.push(income);
    updateIncomes();
    incomeSourceInput.value = "";
    incomeAmountInput.value = "";
  }
}

// Function to remove an income
function removeIncome(index) {
  if (index >= 0 && index < incomes.length) {
    incomes.splice(index, 1);
    updateIncomes();
  }
}

// Function to load data from Local Storage
function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("budget_data"));
  if (data) {
    totalIncome = data.totalIncome;
    totalExpenses = data.totalExpenses;
    expenses = data.expenses;
    incomes = data.incomes;
  }
}

// Function to update Local Storage with the data
function updateLocalStorage() {
  const data = {
    totalIncome,
    totalExpenses,
    expenses,
    incomes,
  };
  localStorage.setItem("budget_data", JSON.stringify(data));
}

// Load data from Local Storage when the page is loaded
window.addEventListener("load", () => {
  loadFromLocalStorage();
  updateExpenseVisualization();
  updateIncomeVisualization();
  updateCombinedChart();
});

// Event listeners for form submissions
expenseForm.addEventListener("submit", addExpense);
incomeForm.addEventListener("submit", addIncome);