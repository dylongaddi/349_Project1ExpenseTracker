// display all editable parts of the page
const testCategories = document.querySelector("#categories")
const testExpenses = document.querySelector("#categories #expenses")
const userData = JSON.parse(JSON.stringify(Remake.getSaveData(testCategories)))

function highlightEditables(evt) {
    evt.preventDefault();
    document.body.classList.toggle('highlightEditables');
}

function initHighlight () {
  const hleButton = document.querySelector('#highlightEditables');
  if (hleButton) hleButton.addEventListener('click', highlightEditables);
}

function convert(currency) {
  let temp = currency.replace(/[^0-9.-]+/g, "");
  return parseFloat(temp);
}

function getCategoryTotal(categoryExpenses) {
  console.log(categoryExpenses)
  let categoryTotal = 0
  categoryExpenses.expenses.forEach((expense) => {
    let money = convert(expense.money)
    categoryTotal += money
  })
  return categoryTotal
}

console.log(Remake.getSaveData(testCategories))
console.log(Remake.getSaveData(testExpenses))
console.log(userData)
console.log(userData.categories)
console.log(userData.categories[0])
console.log(getCategoryTotal(userData.categories[0]))







initHighlight();