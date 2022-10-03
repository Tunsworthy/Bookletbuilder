//this page is used to update checkboxes with the correct value if selected or not

function updatecheckbox(){
   
    let elements = document.querySelectorAll(".form-check-input");


    for (let element of elements){
        let setting = element.getAttribute('data-setting')

        if(setting === 'on'){
            element.setAttribute('checked', '');
        }
    }
    /*
    Commented out for refactor
    for (let i = 0; i < elements.length; i++) {
        let setting = elements[i].getAttribute('data-setting')
        //console.log(setting)
        //console.log(elements[i].id)
        if(setting === 'on'){
            elements[i].setAttribute('checked', '');
        }
        
      }
    */
}
