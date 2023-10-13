// display all editable parts of the page
const testCategories = document.querySelector("#categories")
const userTotals = document.getElementById("totals")
let categoryTotals = {}
let userData = JSON.parse(JSON.stringify(Remake.getSaveData(testCategories)))
let categoryID = 1

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

function getCategoryTotal(category) {
  let categoryTotal = 0
  category.expenses.forEach((expense) => {
    const money = convert(expense.money)
    categoryTotal += money
  })
  return categoryTotal
}

function generateCategoryID() {
  return `category${categoryID++}`
}

function displayTotals(){
  userData = JSON.parse(JSON.stringify(Remake.getSaveData(testCategories)))
  categoryTotals = {}
  userData.categories.forEach((category) => {
    const id = generateCategoryID()
    const total = getCategoryTotal(category).toFixed(2)
    categoryTotals[id] = [category.name, total]
  })
  if (Object.keys(categoryTotals).length > 0) {
    let tempTotals = "<ol>"
    for (const category in categoryTotals) {
      tempTotals += `<li key:name="@innerText" id="${categoryTotals[category][0]}"> ${categoryTotals[category][0]} : $${categoryTotals[category][1]} </li>`
    }
    tempTotals += "</ol"
    userTotals.innerHTML = tempTotals
  }
}



displayTotals()
initHighlight();