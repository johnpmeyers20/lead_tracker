let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const saveBtn = document.getElementById("save-btn")
const deleteBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
const ulEl = document.getElementById("ul-el")

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  renderLeads(myLeads)
}

inputBtn.addEventListener("click", function() {
  myLeads.push(inputEl.value)
  inputEl.value = ""
  renderLeads()
})

saveBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    renderLeads(myLeads);
  })
})

deleteBtn.addEventListener("dblclick", function () {
  myLeads = []
  localStorage.removeItem("myLeads")
  renderLeads(myLeads)
})
 
function renderLeads() {
    let listItems = ""
    for (let i = 0; i < myLeads.length; i++) {
        listItems += `
            <li>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML = listItems  
}
