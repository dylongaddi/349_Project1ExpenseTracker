const testCategories = document.querySelector("#categories")
const userTotals = document.getElementById("totals")
let categoryLabelsAndAmount = {}
let categoryTotals = {}
let userData = JSON.parse(JSON.stringify(Remake.getSaveData(testCategories)))
let categoryID = 1
const autocolors = window['chartjs-plugin-autocolors'];
Chart.register(autocolors);

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

const chartEle = document.getElementById("myChart")

const ctx = new Chart(chartEle, {
  type: 'pie',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [{
      label: 'Money Spent',
      data: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange', 'Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      borderWidth: 1
    }]
  }
  ,options: {
    plugins: {
      autocolors: {
        mode: 'data'
      }
    }
  }
});


function changeChart() {
  ctx.type = 'bar'
}

function updateChart() {
    ctx.data.labels = Object.keys(categoryLabelsAndAmount)
    ctx.data.datasets.forEach((dataset) => {
      dataset.data = Object.values(categoryLabelsAndAmount);
    });
    console.log(ctx.data.datasets.data)
    ctx.update()
}

function displayTotals(){
  userData = JSON.parse(JSON.stringify(Remake.getSaveData(testCategories)))
  categoryTotals = {}
  categoryLabelsAndAmount = {}
  userData.categories.forEach((category) => {
    const id = generateCategoryID()
    const total = getCategoryTotal(category).toFixed(2)
    categoryLabelsAndAmount[category.name] = parseFloat(total)
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
  console.log(categoryLabelsAndAmount)
  updateChart()
}

function getTotals() {
  return categoryTotals
}


displayTotals()
initHighlight();