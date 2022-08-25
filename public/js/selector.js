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
            range_data_update(element.nextElementSibling.id,element.id,"start")
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
    let set_start = false
    let set_end = false
    switch(true){
        case element.previousElementSibling.classList.contains('btn-start'):
            reset_class(element.previousElementSibling)
            //range_data_update(element.id,element.previousElementSibling.id,"start")
            break;  
   
        case element.previousElementSibling.classList.contains('btn-middle'):
            set_class_end(element.previousElementSibling)
            set_end = true
            //get_start_range(element.previousElementSibling)
            break; 
    }

    switch(true){
        case element.nextElementSibling.classList.contains('btn-end'):
            reset_class(element.nextElementSibling)   
            break;  

        case element.nextElementSibling.classList.contains('btn-middle'):
            set_class_start(element.nextElementSibling)
            set_start = true 
            break;
    }

    if(set_end && set_start ){
        console.log("both set to true start: "+ set_start + " end: "+ set_end)
        range_data_update_fmiddle(element.nextElementSibling,element.previousElementSibling)
    }

}

//Fuction that runs when you select a sart element
function select_start(element){
    reset_class(element)

    switch(true){
        case element.nextElementSibling.classList.contains('btn-middle'):
            set_class_start(element.nextElementSibling)
            //range_data_update(element.id,element.nextElementSibling.id,"start")
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
            range_data_update(element.id,element.previousElementSibling.id,"end")
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

    create_input(allElements[order[0]].id,allElements[order[1]].id)
    range_data_add(allElements[order[0]].id,allElements[order[1]].id)
    set_class_start(allElements[order[0]])
    set_class_end(allElements[order[1]]) 
    

    for (var i = order[0]+1; i < order[1]; i++) {
        if(allElements[i].classList.contains('btn-start')|| allElements[i].classList.contains('btn-end')){
            console.log('element found in middle of range that is a start or end')
            //need to create a range remove and a delete row
        }
        set_class_middle(allElements[i])
    }
    calculate_ranges()
}


//passed from the middle when it is setting a end
function get_start_range(new_end){
    console.log("in get start")
    console.log(new_end)
    //Aim - get the closests start previous to the new end
    let allstarts = Array.from(document.getElementsByClassName('btn-start')).reverse()
    console.log(allstarts)
    let indexs = allstarts.findIndex(x => x.id < new_end.id)
   console.log(indexs)
   console.log(allstarts[indexs])

}

//Form Data
//This function creates a hidden form input 
/*
I want a list that shows the current selected ranges

On range create - Add details
on a range change - update details

*/
function split_id_details(id){
    console.log("in split_id_details")
    let chapter = id.match(/C[0-9]*/)[0].replace("C","")
    let verse = id.match(/V[0-9]*/)[0].replace("V","")

    let detail = {chapter: chapter, verse: verse,id: id}
    console.log(detail)
    return(detail)
}



async function create_input(start_id,end_id){
console.log("in create input")
    //clone the current form
    let clone = document.getElementById('clone')
    let cloned = clone.cloneNode(true)
    cloned.style.display = ""
    cloned.setAttribute("id","")
    //Get the elements from the indexs - this will allow us to get the ID of the item to add into the Chapter and Verse
    
    //split out the start_id and end_id to their needed chapter and verse
    let start_details = split_id_details(start_id)
    let end_details = split_id_details(end_id)

    console.log(cloned.getElementsByTagName('input'))
    var elements = cloned.getElementsByTagName('input')
    for (let i = 0; i < elements.length; i++){

        switch(true){
            case elements[i].id == "start-chapter":
                console.log("chapter-start found")
                await set_input_details(elements[i],start_details.chapter,start_id)
            break;
            case elements[i].id  == "start-verse":
                await set_input_details(elements[i],start_details.verse,start_id)
                console.log("chapter-verse found")
            break;
            
            case elements[i].id  == "end-chapter":
                await set_input_details(elements[i],end_details.chapter,end_id)
                console.log("chapter-end found")
             break;
            case elements[i].id  == "end-verse":
                await set_input_details(elements[i],end_details.verse,end_id)
                console.log("verse-end found")
             break;
        }
    }


    let formgroup = document.getElementById("form-group")
    console.log(formgroup)
    console.log(cloned)
    formgroup.append(cloned)
}

//this function will update the input feilds with the new vaules
function update_input(previous_id,current_id){

    let input_chapter = document.getElementById("chapter-"+previous_id)
    let input_verse = document.getElementById("verse-"+previous_id)

    let details = split_id_details(current_id)

    set_input_details(input_chapter,details.chapter,current_id)
    set_input_details(input_verse,details.verse,current_id)

}


async function set_input_details(element,value,id){
    element.setAttribute('value',value)
    newid = element.id.split('-')[1] +"-" + id
    element.setAttribute('id',newid)
    element.classList.add('active')
    return(element)
    //this function will enter the chapter number into the Begining section
}


//
function formsubmit(){
    //const form = document.getElementById('form');
    const form = document.getElementsByClassName('form-row')[0]
    console.log(form)
    const formData = new FormData(form);
    console.log(formData)
    //const output = document.getElementById('output');

    for (const [key, value] of formData) {
        console.log(key+":" +value)
        //output.textContent += `${key}: ${value}\n`;
    }
}




//this will get all the starts and end and produce a list
function calculate_ranges(){
    console.log("calcuating ranges")
    
    let allElements = Array.from(document.getElementsByClassName("verse"))
    let all = []
    for (let i = 0; i < allElements.length; i++){
        switch(true){
            case allElements[i].classList.contains('btn-start'):
                all.push(allElements[i])
                break;
           case allElements[i].classList.contains('btn-end'):
                all.push(allElements[i])
                break;
        }
    }
    console.log(all)  

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

