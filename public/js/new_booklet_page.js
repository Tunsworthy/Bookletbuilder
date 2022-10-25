

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


document.addEventListener("dragstart" ,function(event){
    console.log('on drag start')
    console.log(event)
    event.target.setAttribute('id','Selected')
    event.dataTransfer.setData("text", event.target.id);
    console.log(event.dataTransfer.getData("text"))
})


  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  document.addEventListener("drop", function(event) {
    event.preventDefault();
    console.log("Dropped")
    console.log(event.dataTransfer.getData("text"))
    const source_ele = document.getElementById(event.dataTransfer.getData("text"))
    console.log(source_ele)

    console.log(event)
    const target_ele = event.target.lastElementChild
    console.log(target_ele)
    //document.getElementById(target_ele)
    target_ele.appendChild(source_ele)

    
    });