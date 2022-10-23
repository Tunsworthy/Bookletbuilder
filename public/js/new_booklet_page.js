

function process_button(){
    console.log("called process")
    let list = document.getElementById('list')
    let process_btn = document.getElementById('process_btn')

    if(list.childElementCount >= 1){
        console.log('more than one')
        process_btn.classList.remove("disabled")
    }
    else{
        process_btn.classList.add("disabled")
    }

}

function addtoselect(infomration){
    console.log(infomration.id)
    console.log(infomration.name)
}

function addDelButton(parent) {
    var buttonElem = parent.appendChild(document.createElement("button"));
    buttonElem.setAttribute('class','btn btn-danger btn-sm ml-1 me-5 ms-2')
    buttonElem.innerHTML = "Remove";
    buttonElem.onclick = function() {
        this.parentElement.remove();
        process_button()
        addtoselect(this.parentElement)
    }
}

// Add text
function addToBasket() {
    let element = document.getElementById("select")
    let ul = document.getElementById('list')
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(element.options[element.selectedIndex].label))
    li.setAttribute("id", element.options[element.selectedIndex].value); // added line
    li.setAttribute("name", element.options[element.selectedIndex].label); // added line
    addDelButton(li)
    ul.appendChild(li);
    element.options[element.selectedIndex].remove()
    process_button()
}