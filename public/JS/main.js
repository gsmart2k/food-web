var ham = document.querySelector(".ham")
var hamopen = document.querySelector(".hamopen")
var hamclose = document.querySelector(".ham-off")
ham.addEventListener("click", hamOpen)

hamclose.addEventListener("click", hamClose)

function hamOpen() {
    if(hamopen.classList.contains("hide")){
        hamopen.classList.replace("hide","show")
    }else{
        hamopen.classList.add("show")
    }
}
function hamClose() {
        if(hamopen.classList.contains("show")){
            hamopen.classList.remove("show")
            hamopen.classList.add("hide")
        }else{
            hamopen.classList.add("show")
        }
}
