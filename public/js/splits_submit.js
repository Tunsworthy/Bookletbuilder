/* 

This files contains the functions to submit the selection data

*/
async function submit_data(book){
  let url = '/split'

  
  //This function will submit data to selectionsaver
  let selection = await get_data();
  console.log("selection returned")
  console.log(selection)


  let body = await build_body(book,selection);
  console.log("body returned")
  console.log(body)

  let fetchoptions ={
    method: "Post",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }

  fetch(url,fetchoptions)
		.then(
			function(response) {
				console.log(response)
			});

}

async function get_data(){

  const transaction = db.transaction(['range_os'], 'readwrite');
  const objectStore = transaction.objectStore('range_os');
  
  let  allRecords = objectStore.getAll()
  
  let data = await new Promise((resolve,reject)=> {
      allRecords.onsuccess = function() {
        console.log(allRecords.result);
        return resolve(allRecords.result)
      } 
  });
  return(data)

}



async function build_body(book,selection,userid,version){

    let body = {
        userid: "Example",
        version: 1,
        book: book, 
        sections: selection,
        nickname: document.getElementById('nickname').value
    }

    //selection.push(body)
    return(body)


}