let buttonClick = document.getElementById("input-btn")
let myLeads = []
const inputEl = document.getElementById("input-el")
// 2. Grab the unordered list and store it in a const variable called ulEl
let ulEl = document.getElementById("ul-el")
let deleteBtn = document.getElementById("delete")
let savetab = document.getElementById("tab-btn")

savetab.addEventListener('click', function(){
    //Talk with chrome api
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        //console.log(tab[0].url)
        myLeads.push(tabs[0].url)
        render(myLeads) 
        localStorage.setItem("myLeads", JSON.stringify(myLeads)) //localstorage only takes strings
        //so converting to strings
        console.log( localStorage.getItem("myLeads") )   
     })
})

deleteBtn.addEventListener('dblclick', function(){
    localStorage.clear()
    myLeads = []
    console.log(myLeads)
    render(myLeads)
})

const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
console.log(leadsFromLocalStorage)

// 1. Check if leadsFromLocalStorage is truthy

if (leadsFromLocalStorage){
    //console.log("True" + leadsFromLocalStorage)
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
// 2. If so, set myLeads to its value and call renderLeads()

function render(leads){
    // Log out the items in the myLeads array using a for loop 
    let listItems = ""
    for(let i=0; i<leads.length; i+=1){

        //listItems += "<li>" + myLeads[i] + "</li>" //But this is more easier
        //listItems += "<li><a href='" + myLeads[i] + "' target='_blank'>" + myLeads[i] + "</a></li>";
        //Template Strings are much easier
        listItems += `<li>
                        <a target='_blank' href='${leads[i]}'>
                         ${leads[i]}
                        </a>
                      </li>`
    // // create element
    // const lis = document.createElement('li')
    // // set text content
    // lis.textContent = myLeads[i]
    // // append to ul
    // ulEl.append(lis)    
    }
    ulEl.innerHTML = listItems
}

buttonClick.addEventListener('click', function(){
    myLeads.push(inputEl.value)
    inputEl.value = ''
    render(myLeads) 
    localStorage.setItem("myLeads", JSON.stringify(myLeads)) //localstorage only takes strings
    //so converting to strings
    console.log( localStorage.getItem("myLeads") )
})





