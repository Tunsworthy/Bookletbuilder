//this page is used to update checkboxes with the correct value if selected or not

function updatecheckbox(){
   // console.log('in update checkbox')
    let elements = document.querySelectorAll(".form-check-input");
    //console.log(elements)
    for (let i = 0; i < elements.length; i++) {
        let setting = elements[i].getAttribute('data-setting')
        //console.log(setting)
        //console.log(elements[i].id)
        if(setting === 'on'){
            elements[i].setAttribute('checked', '');
        }
        
      }
}
