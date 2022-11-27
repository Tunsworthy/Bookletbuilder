
function process_button(){
    console.log("called process")
    let list = document.getElementById('tbody_destination')
    let process_btn = document.getElementById('process_btn')

    if(list.childElementCount >= 1){
        console.log('more than one')
        process_btn.classList.remove("disabled")
    }
    else{
        process_btn.classList.add("disabled")
    }

}

document.addEventListener("dragstart" ,function(event){
    //set the selected id on the selected data
    event.target.setAttribute('id','Selected')
    event.dataTransfer.setData("text", event.target.id);
    
})


  document.addEventListener("dragover", function(event) {
    event.preventDefault();
  });

  document.addEventListener("drop", function(event) {
    //Find the seletected selement by the set ID
    let source_ele = document.getElementById(event.dataTransfer.getData("text"))

    let drop_index = 'a'
    event.composedPath().forEach(function (item, index){
        if('classList' in item){
            if(item.classList.contains('drop_target')){
                
                drop_index = index
                return;
            }

        }     
    })

    
    //Append the row into the table body
    let destination_table_tbody = event.composedPath()[drop_index].lastElementChild.lastElementChild
    destination_table_tbody.appendChild(source_ele)
    //remove the slected id
    source_ele.removeAttribute('id')
    process_button()
    });