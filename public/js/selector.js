//Functions to set class Start
function set_class_start(element){
    element.setAttribute("class","btn btn-start btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')
    element.setAttribute("onclick","select_start(this)")
    //element.setAttribute("draggable","true")
    element.children[0].setAttribute("style",'color:white')
}

function set_class_middle(element){
    element.setAttribute("class","btn btn-middle btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')
    element.setAttribute("onclick","select_middle(this)")
    element.children[0].setAttribute("style",'color:white')    
}

function set_class_end(element){
    element.setAttribute("class","btn btn-end btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')
    element.setAttribute("onclick","select_end(this)")
    //element.setAttribute("draggable","true")
    element.children[0].setAttribute("style",'color:white')
}

function set_class_selected(element){
    element.setAttribute("class","btn btn-selected btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')  
    element.children[0].setAttribute("style",'color:white')
}

function reset_class(element){
    element.setAttribute("class","btn btn-normal btn-floating ripple-surface shadow-none verse")
    element.setAttribute("onclick","select_normal(this)")
    element.children[0].setAttribute("style",'color:black')
};
////Functions to set class End

//This is the function that runs when you select a normal element
function select_normal(element){
    console.log('in Select Normal for:')
    console.log(element)

    switch(true){
        case document.getElementsByClassName("btn-selected").length >= 1:
            console.log("in set_range")
            //Run function to set range
            set_range(element)
            break;
        case element.nextElementSibling.classList.contains('btn-start'):
            //Run function to set selected as start and Nex to middle
            set_class_start(element)
            set_class_middle(element.nextElementSibling)
            break;
        default:
            set_class_selected(element)
            break;
    }
}

//This function is added to middle elements when they are created
//It works out what to do when a middle section is selected
function select_middle(element){
    reset_class(element)

    switch(true){
        case element.previousElementSibling.classList.contains('btn-start'):
            reset_class(element.previousElementSibling)
            break;  
   
        case element.previousElementSibling.classList.contains('btn-middle'):
            set_class_end(element.previousElementSibling)
            break; 
    }

    switch(true){
        case element.nextElementSibling.classList.contains('btn-end'):
            reset_class(element.nextElementSibling)   
            break;  

        case element.nextElementSibling.classList.contains('btn-middle'):
            set_class_start(element.nextElementSibling) 
            break;
    }
}

//Fuction that runs when you select a sart element
function select_start(element){
    reset_class(element)

    switch(true){
        case element.nextElementSibling.classList.contains('btn-middle'):
            set_class_start(element.nextElementSibling) 
            break;
        
        case element.nextElementSibling.classList.contains('btn-end'):
            reset_class(element.nextElementSibling) 
            break;
    } 
}

//Fuction that runs when you select a end element
function select_end(element){
    reset_class(element)

    switch(true){
        case element.previousElementSibling.classList.contains('btn-middle'):
            set_class_end(element.previousElementSibling) 
            break;
        
        case element.previousElementSibling.classList.contains('btn-start'):
            reset_class(element.previousElementSibling) 
            break;
    } 
}

//This function sets the range for the area you selected
function set_range(element){
    //get the currently selected element
    let selected = document.getElementsByClassName("btn-selected")[0]
    //get all the verse elements - we need this to find the range to select
    let allElements = Array.from(document.getElementsByClassName("verse"))
    //console.log(allElements)
    
    //this function will get the index of the selected elements and get their index based on all the elements
    //The array is then ordered to ensure that the start and end are always the correct way round
    let order = []
    order.push(allElements.findIndex(x => x.id === element.id))
    order.push(allElements.findIndex(x => x.id === selected.id))
    order.sort(function(a, b){return a - b})

    set_class_start(allElements[order[0]])
    set_class_end(allElements[order[1]]) 

    for (var i = order[0]+1; i < order[1]; i++) {
        set_class_middle(allElements[i])
    }
}

//Drag Events
document.addEventListener("drag", function(event) {
    console.log('got a drag event')
    console.log(event)
});
document.addEventListener("drop", function(event) {
    console.log('got a drop event')
    console.log(event)
    event.preventDefault();
});
document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });