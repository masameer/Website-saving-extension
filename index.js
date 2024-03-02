let myleads=[]
let oldleads=[]
const inputEl=document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const tabbtn= document.getElementById("tab-btn")
const ulEl= document.getElementById("ul-el")
const deletebtn=document.getElementById("delete-btn")
const sitesfromlocalStorage = JSON.parse(localStorage.getItem("myleads"))// to get stored localStorage strings

if(sitesfromlocalStorage){
    myleads= sitesfromlocalStorage
    render(myleads)
}

tabbtn.addEventListener("click",function(){
    chrome.tabs.query({active:true, currentWindow: true},function(tabs){
        myleads.push(tabs[0].url)
        localStorage.setItem("myleads",JSON.stringify(myleads))
        render(myleads)  
    })
    
})

function render(leads){
    let listitems= ""
    for(let i=0;i<leads.length;i++){
   /* listitems += "<li><a target='_blank' href='" +myleads[i]+"'>" + myleads[i] + "</a></li>" this is to get the 
   list as link, this is in one line , below one is using string template with backticks */

   listitems += 
            `<li>
                <a target='_blank' href=${leads[i]}>
                ${leads[i]}
                </a>
           </li>`
     }
ulEl.innerHTML= listitems
}

inputBtn.addEventListener("click", function() {
        myleads.push(inputEl.value)
        inputEl.value = ""
        localStorage.setItem("myleads",JSON.stringify(myleads))// to stores array as string in localStorage
        render(myleads)
        console.log(localStorage.getItem("myleads"))
})

deletebtn.addEventListener("dblclick", function(){
             localStorage.clear()
             myleads=[]
             render(myleads)
      
})
