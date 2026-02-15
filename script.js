const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("transactionForm");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateLocalStorage() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function addTransactionDOM(transaction) {
    const li = document.createElement("li");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        ${transaction.text}
        <span>
            ${transaction.amount > 0 ? "+" : ""}$${Math.abs(transaction.amount).toFixed(2)}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
        </span>
    `;

    list.appendChild(li);
}

function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0)
        .toFixed(2);
    const expenseTotal = (
        amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0) * -1
    ).toFixed(2);

    balance.innerText = `$${total}`;
    income.innerText = `$${incomeTotal}`;
    expense.innerText = `$${expenseTotal}`;
}

function addTransaction(e) {
    e.preventDefault();

    if (text.value.trim() === "" || amount.value.trim() === "") return;

    const transaction = {
        id: Date.now(),
        text: text.value,
        amount: +amount.value
    };

    transactions.push(transaction);
    addTransactionDOM(transaction);
    updateValues();
    updateLocalStorage();

    text.value = "";
    amount.value = "";
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    updateLocalStorage();
    init();
}

function init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

form.addEventListener("submit", addTransaction);

init();
