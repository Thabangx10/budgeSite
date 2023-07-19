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

// LANGUAGE TRANSCRIPTS
const transcripts = {
  en: {
    title: "English Transcript",
    content: "This is the English transcript of the video.",
  },
  xh: {
    title: "Xhosa Transcript",
    content: "Lomfuduzo unokufunda ku-Xhosa.",
  },
  af: {
    title: "Afrikaans Transcript",
    content: "Hierdie is die Afrikaanse transkripsie van die video.",
  },
};

function changeLanguage(language) {
  // Hide all language transcripts
  const allTranscripts = document.querySelectorAll(".transcript");
  allTranscripts.forEach((transcript) => {
    transcript.style.display = "none";
  });

  // Show the selected language transcript
  const selectedTranscript = document.querySelector(`.lang-${language}`);
  selectedTranscript.style.display = "block";

  // Update the language title
  const pageTitle = document.getElementById("page-title");
  pageTitle.textContent = `PEAK! - ${language.toUpperCase()}`;

  // Update the language visualization based on the selected language
  updateExpenseVisualization();
  updateIncomeVisualization();
}

const expenseVisualizationList = document.getElementById(
  "expenseVisualizationList"
);
const incomeVisualizationList = document.getElementById(
  "incomeVisualizationList"
);

function createCombinedPieChart(incomeLabels, incomeData, expenseLabels, expenseData, chartId) {
  const chartContainer = document.getElementById(chartId);
  const existingChart = Chart.getChart(chartContainer); // Check if a Chart instance already exists

  if (existingChart) {
    existingChart.destroy(); // Destroy the existing Chart instance
  }

  const ctx = chartContainer.getContext("2d");

  new Chart(ctx, {
    type: "pie",
    data: {
      labels: [...incomeLabels, ...expenseLabels],
      datasets: [
        {
          data: [...incomeData, ...expenseData],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#008080",
            "#800080",
            "#FF4500",
            "#FF8C00",
            "#8A2BE2",
            "#7CFC00",
            "#4B0082",
            "#FF1493",
            "#00FF00",
            "#00BFFF",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: true,
        position: "right",
      },
      tooltips: {
        callbacks: {
          label: function (tooltipItem, data) {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const total = dataset.data.reduce((previousValue, currentValue) => previousValue + currentValue);
            const currentValue = dataset.data[tooltipItem.index];
            const percentage = Math.floor(((currentValue / total) * 100) + 0.5);
            return `${data.labels[tooltipItem.index]}: ${currentValue} ( ${percentage}% )`;
          },
        },
      },
    },
  });
}

// Update the income and expense charts
function updateCombinedChart() {
  const incomeLabels = incomes.map((income) => income.source);
  const incomeAmounts = incomes.map((income) => income.amount.toFixed(2));
  const expenseLabels = expenses.map((expense) => expense.name);
  const expenseAmounts = expenses.map((expense) => expense.amount.toFixed(2));

  createCombinedPieChart(incomeLabels, incomeAmounts, expenseLabels, expenseAmounts, "combinedChart");
}

function updateCharts() {
  updateCombinedChart();
}


function updateExpenseVisualization() {
  const expenseVisualizationList = document.getElementById(
    "expenseVisualizationList"
  );
  expenseVisualizationList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement("li");
    expenseItem.textContent = `${expense.name}: R${expense.amount.toFixed(2)}`;
    expenseVisualizationList.appendChild(expenseItem);
  });
}

function updateIncomeVisualization() {
  const incomeVisualizationList = document.getElementById(
    "incomeVisualizationList"
  );
  incomeVisualizationList.innerHTML = "";

  incomes.forEach((income, index) => {
    const incomeItem = document.createElement("li");
    incomeItem.textContent = `${income.source}: R${income.amount.toFixed(2)}`;
    incomeVisualizationList.appendChild(incomeItem);
  });
}

// Create the expense chart
function updateExpenseChart() {
  const expenseLabels = expenses.map((expense) => expense.name);
  const expenseAmounts = expenses.map((expense) => expense.amount.toFixed(2));

  createPieChart(expenseLabels, expenseAmounts, "expenseChart");
}

// Update the income chart
function updateIncomeChart() {
  const incomeLabels = incomes.map((income) => income.source);
  const incomeAmounts = incomes.map((income) => income.amount.toFixed(2));

  createPieChart(incomeLabels, incomeAmounts, "incomeChart");
}

function updateCharts() {
  updateExpenseChart();
  updateIncomeChart();
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
  updateExpenseVisualization();
  updateIncomeVisualization();
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
  updateCharts();
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
}

function removeExpense(index) {
  if (index >= 0 && index < expenses.length) {
    expenses.splice(index, 1);
    updateExpenses();
  }
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
  updateIncomeVisualization();
  updateLocalStorage();
  updateCharts();
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
}

function removeIncome(index) {
  if (index >= 0 && index < incomes.length) {
    incomes.splice(index, 1);
    updateIncome();
  }
}

// Event listeners for form submissions
expenseForm.addEventListener("submit", addExpense);
incomeForm.addEventListener("submit", addIncome);

document.addEventListener("DOMContentLoaded", () => {
  loadFromLocalStorage();
  updateExpenseVisualization();
  updateIncomeVisualization();
});
