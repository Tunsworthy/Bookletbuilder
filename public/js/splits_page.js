/* 

This files contains the functions to submit the selection data

*/


async function delete_split(id){
    confirm("Are you sure you wanted to delete this")
    let url = '/split/delete/'+id
  
    
    //This function will submit data to selectionsaver
    let fetchoptions ={
      method: "delete",
      headers: {
        'Content-Type': 'application/json'
      },
    }
  
    fetch(url,fetchoptions)
          .then(
              function(response) {
                  console.log(response)
                  location.reload();
              });
  
  }
  