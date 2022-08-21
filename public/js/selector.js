//Functions to set class Start
function set_class_start(element){
    element.setAttribute("class","btn btn-start btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')
    element.children[0].setAttribute("style",'color:white')
}

function set_class_middle(element){
    element.setAttribute("class","btn btn-middle btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')
    element.children[0].setAttribute("style",'color:white')    
}

function set_class_end(element){
    element.setAttribute("class","btn btn-end btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')  
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
            set_class_first(element)
            set_class_middle(element.nextElementSibling)
            break;
        default:
            set_class_selected(element)
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



function setstart(element){
    console.log(element)
    //let cb = document.getElementById(id)
    element.setAttribute("class","btn btn-start btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')
    element.children[0].setAttribute("style",'color:white')
    if(element.previousElementSibling.classList.contains('btn-middle')){
        console.log("found previous that is middle")
        setendclass(element.previousElementSibling)
    }
    if(element.previousElementSibling.classList.contains('btn-start')){
        console.log("found previous start")
        resetelement(element.previousElementSibling)
    }
}

function setendclass(element){
    console.log("in setend classs")

    element.setAttribute("class","btn btn-end btn-floating ripple-surface shadow-none verse")
    element.setAttribute("style",'')  
    element.children[0].setAttribute("style",'color:white')
if(element.nextElementSibling){
    if(element.nextElementSibling.classList.contains('btn-start')){
        console.log("found Next that is start")
        console.log(element.nextElementSibling)
        setmiddleclass(element.nextElementSibling)
    }

    if(element.nextElementSibling.classList.contains('btn-middle')){
        console.log("found Next that is middle")
        console.log(element.nextElementSibling)
        setstart(element.nextElementSibling)
    }
    if(element.nextElementSibling.classList.contains('btn-end')){
        console.log("found Next that is end")
        console.log(element.nextElementSibling)
        resetelement(element.nextElementSibling)
    }
}
}

function setend(id,first){
    console.log("In setend")
    console.log(id)
    console.log(first)
   // console.log(first.length)
    /*if(first){ 
        if(first.id){
            var firstid = first.id  
        }
        else{
            var firstid = first
        }
    */
    let allElements = Array.from(document.getElementsByClassName("verse"))
    //console.log(allElements)
    let order = []
    order.push(allElements.findIndex(x => x.id === first.id))
    order.push(allElements.findIndex(x => x.id === id.id))
    
    console.log(order.sort(function(a, b){return a - b}))

    //set the end this will always be the end one
    //allElements[order.sort()[1]]
    setendclass(allElements[order[1]])
        
    setstart(allElements[order[0]]) 
    setmiddle(order[0],order[1],allElements)
    }

    
    //console.log("firstID:"+ firstid +" EndID:"+ endid)
    //when we sent an end we also need to set the start from the first



function setmiddle(startindex,endindex,allElements){
    //let allElements = Array.from(document.getElementsByClassName("verse"))
    //console.log(allElements)
    //startindex = allElements.findIndex(x => x.id === firstid)
    //endindex = allElements.findIndex(x => x.id === endid)
    
    for (var i = startindex+1; i < endindex; i++) {
        let cb = allElements[i]
        setmiddleclass(cb)
    
        //console.log()
        //let cb = document.getElementById(allElements[i].id)
        
    }   
}

function clearmiddle(element){

    resetelement(element)
    
    //need to add some logic - if the selected item is next to a start or end it just clears all of them
    var end = element.previousElementSibling
    var first = element.nextElementSibling
    
    switch(true){
        case element.previousElementSibling.classList.contains('btn-start'):
            console.log("Previous Element is a start so we are going to clear that");
            resetelement(element.previousElementSibling)
            setstart(first)
        case element.nextElementSibling.classList.contains('btn-end'):
            console.log("next Element is a end so we are going to clear that");
            resetelement(element.nextElementSibling)
            setendclass(end)
            break;
        default:
            console.log("default")
            setend(end,first)
    }

    

};



    

/*
Basic Functions
-Select a Start and End - everything in the middle is highlighted
-Can expand a selection by selecting the verse before and after 

--Bug
 you cannot select backwards
-Feature Adds (for future)
    -Different colours per selection
    -expand current selection
    -if you sleect a middle it should make it a start and change the one to the left to an end
    -if you sleect an end it should remove it and select the one to the left of it as an end
    -if you select a start it should remove it and select the one to it's right to an end

*/
async function selector(id){
    console.log('in selector ' + id)
    //Find if a first is already selected - there should only even be one of these
    let first = document.getElementsByClassName("btn-first");
    console.log(first);
    //let elements = document.querySelectorAll("button[data-selected='true']");
    let cb = document.getElementById(id)  
    
    console.log(cb.classList.value.toString())
    console.log("Next sibling:")
    console.log(cb.nextElementSibling)
    console.log(cb.previousElementSibling)
    let classstring = cb.classList.value.toString()

    switch(classstring){
        case String(classstring.match(/^btn btn-first.*/i)): case String(classstring.match(/^btn btn-start.*/i)):
            console.log("is currently frist or start,nothing to be done");
            break;
        case String(classstring.match(/^btn btn-end.*/i)):
            let cstatus = 'end'
            //if it's a currnt end we want to set it to a start then set the one to the left to an end
            console.log("is currently end");
            break;
        case String(classstring.match(/^btn btn-middle.*/i)):
            //if it's a middle we want to set it to a start and the one left to a end
            console.log("is currently middle");
            clearmiddle(cb)
            break;
        default:
            console.log("not anything - will set it to end or first");
            if(first.length == 1){
                first = document.getElementById(first[0].id)
                id = document.getElementById(id)
                setend(id,first)
            }
            else {
                setfirst(cb,id)
            }
            break;
    }
}
 