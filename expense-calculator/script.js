// Array to store expenses
let expenses = [];

// DOM Elements
const expenseForm = document.getElementById('expenseForm');
const expensesList = document.getElementById('expensesList');
const calculateBtn = document.getElementById('calculateBtn');
const totalExpensesElement = document.getElementById('totalExpenses');
const avgDailyExpenseElement = document.getElementById('avgDailyExpense');
const topExpensesList = document.getElementById('topExpensesList');

// Add event listener for form submission
expenseForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const category = document.getElementById('category').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (category && amount) {
        addExpense(category, amount);
        expenseForm.reset();
    }
});

// Add event listener for calculate button
calculateBtn.addEventListener('click', calculateResults);

// Function to add a new expense
function addExpense(category, amount) {
    const expense = {
        category,
        amount,
        id: Date.now()
    };
    
    expenses.push(expense);
    updateExpensesTable();
}

// Function to delete an expense
function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    updateExpensesTable();
}

// Function to update the expenses table
function updateExpensesTable() {
    expensesList.innerHTML = '';
    
    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${expense.category}</td>
            <td>${expense.amount.toLocaleString()}</td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>
            </td>
        `;
        expensesList.appendChild(row);
    });
}

// Function to calculate and display results
function calculateResults() {
    if (expenses.length === 0) {
        alert('Please add some expenses first.');
        return;
    }

    // Calculate total expenses
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Calculate average daily expense (assuming 30 days in a month)
    const avgDailyExpense = totalExpenses / 30;
    
    // Get top 3 largest expenses
    const topExpenses = [...expenses]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, 3);

    // Update the UI
    totalExpensesElement.textContent = totalExpenses.toLocaleString();
    avgDailyExpenseElement.textContent = avgDailyExpense.toLocaleString(undefined, {
        maximumFractionDigits: 2
    });

    // Update top expenses list
    topExpensesList.innerHTML = '';
    topExpenses.forEach(expense => {
        const li = document.createElement('li');
        li.textContent = `${expense.category} (${expense.amount.toLocaleString()})`;
        topExpensesList.appendChild(li);
    });
}

// Add sample data
const sampleExpenses = [
    { category: 'Groceries', amount: 15000 },
    { category: 'Rent', amount: 40000 },
    { category: 'Transportation', amount: 5000 },
    { category: 'Entertainment', amount: 10000 },
    { category: 'Communication', amount: 2000 },
    { category: 'Gym', amount: 3000 }
];

// Add sample data to the expenses array
sampleExpenses.forEach(expense => {
    addExpense(expense.category, expense.amount);
}); 