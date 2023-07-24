// LANGUAGE TRANSCRIPTS
const transcripts = {
  en: {
    title: "English Transcript",
    content:
      "SpendSmart is a cutting-edge budgeting app designed to empower individuals in taking control of their personal finances. Our comprehensive platform offers intuitive features, seamless integration, and personalized insights to help users achieve their financial goals.Through SpendSmart, users can effortlessly track their expenses, set budgets, and receive real-time notifications to stay on top of their spending habits. Our app's user-friendly interface provides clear visualizations, empowering users to make informed financial decisions.We generate revenue through a freemium model, offering a basic version of the app for free with limited features, and providing a premium subscription for enhanced functionality, tailored financial advice, and exclusive perks.With a strategic marketing approach targeting young professionals and families, we aim to capture a significant share of the growing market for personal finance management apps. Our extensive marketing campaigns, including partnerships with financial influencers and social media advertising, will position SpendSmart as the go-to solution for hassle-free budgeting.In the ever-evolving landscape of personal finance management, SpendSmart stands out as the ultimate financial companion, helping users transform their financial lives, one budget at a time. Join us on this exciting journey towards financial empowerment and success.",
  },
  xh: {
    title: "Xhosa Transcript",
    content:
      "SpendSmart ngumcimbi webhajethi yezikhwali ezijikelezayo ethelekisa abantu ukuchatha iindlela zabo zemali zabo. Isicwangciso sethu sikhupha izilwanyana ezithembile, ukwabelana kwezinto kanye nokuphathwa kwemithetho epheleleyo, ukuze kuvelise abasebenzisi ekufikeleleni kwezilwanyana zabo zemali.Ngokuba kunye noSpendSmart, abasebenzisi bangathanda ukutshintsha izimpahla zabo, ukulawula izigidi, futhi bazizwa imishwana yokugcina uhlobo lwabo lwesikweletu. Umbhalo wesikhangiso sika- SpendSmart ukuwusiza abasebenzisi ukwazi ukukhetha izixhobo ezilula kwiimali zabo.Singawenza imali ngeModel ye-Freemium, sithumela i-app yokusebenzisa ethile mahhala enencoma ezigidi, futhi sinikeza isubscription esithile kwezinto ezihlukileyo, ukukhuthaza ukubonisana kwesimo semali, kanye nokwakhela izivilelo ezinzima.Ngesilwanyana sebhange sasebenzayo esiphuthelisayo nabantu abancinci abasebenza nabazali, sikhuthaza ukuvuselela isabelo esikhulu somthetho wamava olwengeziwe we-app wezokuhlola iimali. Iinkonzo zethu ezinzi zesaziso, kuzithoba kubasebenzise abantu abaneendlela zomvumelelo wezimali kwaye imikhakha yombhalo wezithutha ezifana nezothando zoluntu, ziyathetha SpendSmart njengesolwazi sokuqala sokutshintsha imali kwaye kusenze kubekhulu okusemthethweni.Emva kokuba isimo senkululeko yemali ngesigaba sakhe sakuvuke, SpendSmart inesithombiso esiphakathi njengombulelo wezimali oza kuzisa izandla kubasebenzisi zithathu ngebegroting. Njengoba ulambileyo, ulandele kuthi kubomi bobomi buka SpendSmart, sithemba ukukwazi ukubanzi izibini zethu kuqalileyo, kuqala.",
  },
  af: {
    title: "Afrikaans Transcript",
    content:
      "SpendSmart is 'n voorste begrotings-app wat ontwerp is om individue te bemagtig om beheer te neem van hul persoonlike finansies. Ons omvattende platform bied intuïtiewe funksies, naadlose integrasie, en gepersonaliseerde insigte om gebruikers te help om hul finansiële doelwitte te bereik.Deur SpendSmart kan gebruikers moeiteloos hul uitgawes dop hou, begrotings stel, en in werklike tyd kennisgewings ontvang om hul spanderinggewoontes onder beheer te hou. Ons app se gebruikersvriendelike interfees bied duidelike visualisering, wat gebruikers bemagtig om ingeligte finansiële besluite te neem.Ons genereer inkomste deur 'n freemium-model, waar ons 'n basiese weergawe van die app gratis aanbied met beperkte funksies, en 'n premium intekening vir verbeterde funksionaliteit, op maat finansiële advies, en eksklusiewe voordele.Met 'n strategiese bemarkingsbenadering wat gemik is op jong professionele persone en gesinne, het ons ten doel om 'n aansienlike deel van die groeiende mark vir persoonlike finansies bestuurs-apps te verower. Ons omvangryke bemarkingsveldtogte, insluitend vennootskappe met finansiële beïnvloeders en sosiale media-advertensies, sal SpendSmart vestig as die gewilde oplossing vir moeiteloos begroting.In die ewig veranderende landskap van persoonlike finansiesbestuur, steek SpendSmart uit as die ultieme finansiële metgesel wat gebruikers help om hul finansiële lewens een begroting op 'n slag te verander. Sluit by ons aan op hierdie opwindende reis na finansiële bemagtiging en sukses.",
  },
};

// DOM elements
const languageContainer = document.getElementById("languageContainer");
const pageTitle = document.getElementById("page-title");
const transcriptContainers = document.querySelectorAll(".transcript");

// Function to change the language and display the content
function changeLanguage(language) {
  // Hide all transcript containers first
  transcriptContainers.forEach((container) => {
    container.style.display = "none";
  });

  // Display the selected language transcript
  if (transcripts[language]) {
    const selectedTranscript = transcripts[language];
    languageContainer.style.display = "none"; // Hide the language selection container
    pageTitle.textContent = selectedTranscript.title;
    const transcriptContentElement = document.querySelector(
      `.lang-${language} .transcript-content`
    );
    if (transcriptContentElement) {
      transcriptContentElement.textContent = selectedTranscript.content;
      // Display the transcript container for the selected language
      const selectedTranscriptContainer = document.querySelector(
        `.lang-${language}`
      );
      selectedTranscriptContainer.style.display = "block";
    }
  } else {
    // If the selected language is not available in the transcripts object, show the language selection container
    languageContainer.style.display = "block";
  }
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

// JavaScript code to display our agenda

  function showWho() {
    // Replace the content below with your "Who We Are" content
    const who = "<p>We are a team of passionate individuals...</p>";
    document.getElementById("showContent").innerHTML = content;
  }

  function showWhat() {
    // Replace the content below with your "What We Do" content
    const content = "<p>We provide innovative solutions...</p>";
    document.getElementById("showContent").innerHTML = content;
  }

  function showWhy() {
    // Replace the content below with your "Why Choose Us" content
    const content = "<p>We prioritize customer satisfaction...</p>";
    document.getElementById("showContent").innerHTML = content;
  }



// Employee Functionality
// const employees = [
//   {
//     name: "John Doe",
//     position: "Software Engineer",
//     performance: 85,
//   },
//   {
//     name: "Jane Smith",
//     position: "UX Designer",
//     performance: 92,
//   },
//   {
//     name: "Mike Johnson",
//     position: "Project Manager",
//     performance: 78,
//   },
//   {
//     name: "Emily Williams",
//     position: "Data Analyst",
//     performance: 89,
//   },
//   {
//     name: "Tom Anderson",
//     position: "Marketing Specialist",
//     performance: 70,
//   },
// ];

// function displayEmployeeProfiles() {
//   const employeeProfiles = document.getElementById("employeeProfiles");

//   employees.forEach((employee) => {
//     const profileCard = document.createElement("div");
//     profileCard.classList.add("col-md-4", "mb-4");

//     profileCard.innerHTML = `
//       <div class="card">
//         <div class="card-body">
//           <h5 class="card-title">${employee.name}</h5>
//           <h6 class="card-subtitle mb-2 text-muted">${employee.position}</h6>
//           <p class="card-text">Performance: ${employee.performance}</p>
//         </div>
//       </div>
//     `;

//     employeeProfiles.appendChild(profileCard);
//   });
// }

// // Call the function to display employee profiles when the page is loaded
// window.addEventListener("load", displayEmployeeProfiles);
