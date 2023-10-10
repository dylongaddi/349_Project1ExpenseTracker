// display all editable parts of the page
const categories = document.querySelector("#categories")

function highlightEditables(evt) {
    evt.preventDefault();
    document.body.classList.toggle('highlightEditables');
}

function initHighlight () {
  const hleButton = document.querySelector('#highlightEditables');
  if (hleButton) hleButton.addEventListener('click', highlightEditables);
}

function getCategoryTotal(category) {
  let categoryTotal = 0
  category.forEach((expense) => {
    categoryTotal += expense.money
  })
  return categoryTotal
}

console.log(Remake.getSaveData(categories))
initHighlight();