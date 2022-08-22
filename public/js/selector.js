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

    create_input(order,allElements)
    set_class_start(allElements[order[0]])
    set_class_end(allElements[order[1]]) 
    

    for (var i = order[0]+1; i < order[1]; i++) {
        set_class_middle(allElements[i])
    }
}

//Form Data
//This function creates a hidden form input 
/*
I want a list that shows the current selected ranges

On range create - Add details
on a range change - update details

*/
async function create_input(indexes,allElements){
console.log("in create input")
    //clone the current form
    let clone = document.getElementById('clone')
    let cloned = clone.cloneNode(true)
    cloned.style.display = ""
    //Get the elements from the indexs - this will allow us to get the ID of the item to add into the Chapter and Verse
    let rangeelements = []
    console.log('indexes elements')
    console.log(rangeelements.push(allElements[indexes[0]]))
    console.log(rangeelements.push(allElements[indexes[1]]))
    
    //Go through and get the Details we want to extract
    let details = []
    for (let i = 0; i < rangeelements.length; i++) {
        console.log(rangeelements[i].id);
        //id look slike C14V22
        let id = rangeelements[i].id
        let chapter = id.match(/C[0-9]*/)[0].replace("C","")
        let verse = id.match(/V[0-9]*/)[0].replace("V","")
        console.log(chapter)
        console.log(verse)
        let detail = {id:id, chapter: chapter, verse: verse}
        details.push(detail)
    }
    console.log(details)

    //now that we have all the details we need to get them into the correct spots
    //Because we have sorted the indexes earlier we know they are in start(begining) and end
        console.log(cloned.children)
    for (let i = 0; i < cloned.children.length; i++) {

        for(let x = 0;x < cloned.children[i].children[0].children.length; x++){
            console.log(cloned.children[i].children[0].children[x].id)
            let element = cloned.children[i].children[0].children[x]
           // let childid = cloned.children[i].children[0].children[x].id
           // console.log(childid == 'start-chapter')

            switch(true){
                case element.id == "start-chapter":
                    console.log("chapter-start found")
                    await set_input_details(cloned.children[i].children[0].children[x],details[0].chapter,details[0].id)
                break;
                case element.id == "start-verse":
                    await set_input_details(cloned.children[i].children[0].children[x],details[0].verse,details[0].id)
                    console.log("chapter-verse found")
                break;
                
                case element.id == "end-chapter":
                    await set_input_details(cloned.children[i].children[0].children[x],details[1].chapter,details[1].id)
                    console.log("chapter-end found")
                 break;
                case element.id == "end-verse":
                    await set_input_details(cloned.children[i].children[0].children[x],details[1].verse,details[1].id)
                    console.log("verse-end found")
                 break;
            }
        }
    }

    let formgroup = document.getElementById("form-group")
    formgroup.appendChild(cloned)
   // clone
    console.log(clone)
    

    
}

async function set_input_details(element,value,id){
    element.setAttribute('value',value)
    newid = element.id.split('-')[1] +"-" + id
    element.setAttribute('id',newid)
    element.classList.add('active')
    return('done')
    //this function will enter the chapter number into the Begining section
}

function remove_input(element){

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

