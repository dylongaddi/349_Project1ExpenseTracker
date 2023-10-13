// display all editable parts of the page
const testCategories = document.querySelector("#categories")
const userData = JSON.parse(JSON.stringify(Remake.getSaveData(testCategories)))
const userTotals = document.getElementById("totals")
const categoryTotals = {}
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



function displayTotals(){
  let tempTotals = "<ol>"
  for (const category in categoryTotals) {
    tempTotals += `<li id="${categoryTotals[category][0]}"> ${categoryTotals[category][0]} : $${categoryTotals[category][1]} </li>`
  }
  tempTotals += "</ol"
  userTotals.innerHTML = tempTotals
}

function generateCategoryID() {
  return `category${categoryID++}`
}

userData.categories.forEach((category) => {
  const id = generateCategoryID()
  console.log(`${category.name}`)
  const total = getCategoryTotal(category).toFixed(2)
  console.log(getCategoryTotal(category).toFixed(2))
  categoryTotals[id] = [category.name, total]
})

displayTotals()
console.log(userData)
console.log(userData.categories)
console.log(getCategoryTotal(userData.categories[0]))
console.log(categoryTotals)

initHighlight();