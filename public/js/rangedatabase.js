let db;
const openRequest = window.indexedDB.open('range_db', 1);


// error handler signifies that the database didn't open successfully
openRequest.addEventListener('error', () => console.error('Database failed to open'));

// success handler signifies that the database opened successfully
openRequest.addEventListener('success', () => {
  console.log('Database opened successfully');

  // Store the opened database object in the db variable. This is used a lot below
  db = openRequest.result;
  clearData(db);
  // Run the displayData() function to display the notes already in the IDB
  //displayData();
});

function clearData(db) {
  // open a read/write db transaction, ready for clearing the data
  const transaction = db.transaction(["range_os"], "readwrite");

  // report on the success of the transaction completing, when everything is done
  transaction.oncomplete = (event) => {
   console.log("Transaction completed");
  };

  transaction.onerror = (event) => {
    console.log("Transaction not opened due to error: ${transaction.error}")
  };
    // create an object store on the transaction
    const objectStore = transaction.objectStore("range_os");

    // Make a request to clear all the data out of the object store
    const objectStoreRequest = objectStore.clear();
  
    objectStoreRequest.onsuccess = (event) => {
      // report the success of our request
      console.log("Request successful")
    };
  };

// Set up the database tables if this has not already been done
openRequest.addEventListener('upgradeneeded', (e) => {

    // Grab a reference to the opened database
    db = e.target.result;
  
    // Create an objectStore to store our notes in (basically like a single table)
    // including a auto-incrementing key
    const objectStore = db.createObjectStore('range_os', { keyPath: 'id', autoIncrement:true });
  
    // Define what data items the objectStore will contain
    objectStore.createIndex('range_start_id', 'range_start_id', { unique: true });
    objectStore.createIndex('range_end_id', 'range_end_id', { unique: true });
  
    console.log('Database setup complete');
  });

function range_data_add(start_id,end_id){
    //e.preventDefault();

    const newItem = {
      range_start_id: start_id,
      range_end_id: end_id,
    }
    console.log(newItem)
    const transaction = db.transaction(['range_os'], 'readwrite');
    const objectStore = transaction.objectStore('range_os');
    const addRequest = objectStore.add(newItem);


    addRequest.addEventListener('success', () => {
        // Clear the form, ready for adding the next entry
      });

     transaction.addEventListener('complete', () => {
        console.log('Transaction completed: database modification finished.');
        //displayData();
    });
    transaction.addEventListener('error', () => console.log('Transaction not opened due to error'));
}

//This function updates the data in the range
// When a start is selected get all verses 
//find the index of the start
//go from that index and find the next end

//when an end is selected, get all verses
//find the index of the end
//for from that index and find the next start

//if it's coming from a middle 
function range_data_update_fmiddle(new_start,new_end){
  
  console.log(new_start.id)
  console.log(new_end.id)

  let all_elements = Array.from(document.getElementsByClassName('verse'));

  //get the index of the start and end
    let start_index = all_elements.findIndex(x => x.id === new_start.id)
    let end_index = all_elements.findIndex(x => x.id === new_end.id)
    console.log(start_index)
    console.log(end_index)

    var start_slice = all_elements.slice(start_index);
    var end_slice = all_elements.slice(0,end_index);
  //if it's a new end find the matching start and upadte the range
  console.log(start_slice)
  console.log(end_slice.reverse())

  //find the first end in the start_slice
  let start_slice_end = start_slice.find(element =>{ 
    return element.classList.contains('btn-end')
  })

  let end_slice_start = end_slice.reverse().find(element =>{ 
    return element.classList.contains('btn-start')
  })

  console.log(start_slice_end)
  console.log(end_slice_start)

  //for the new end update the end from the start ID
  range_data_update(start_slice_end.id,new_end.id,"end")

  //create a new range with the new start ID and current end ID
  range_data_add(new_start.id,start_slice_end.id)
  create_input(new_start.id,start_slice_end.id)
}



function range_data_update(previous_id,current_id,from){
  console.log("In Range_data_Update")
  console.log("previous id: "+previous_id+ " current id: "+ current_id)

  const transaction = db.transaction(['range_os'], 'readwrite');
  const objectStore = transaction.objectStore('range_os');

  switch(from){
    case "start":
      var index = objectStore.index("range_start_id")
      var selection = "range_start_id"
      break;
    case "end":
      var index = objectStore.index("range_end_id")
      var selection = "range_end_id"
      break;
  }

  var request = index.get(previous_id)
  
  request.onsuccess = () => {
    console.log(request.result);
    
    request.result[selection] = current_id
   
    console.log(request.result)
    
    const updateid = objectStore.put(request.result)

    updateid.onsuccess = () =>{
      console.log(updateid)
      update_input(previous_id,current_id)
    }
  }

}

//This function will update the range when a new end or start is created from selecting a middle
function range_data_update_middle(){

  
}