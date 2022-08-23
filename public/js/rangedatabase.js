let db;
const openRequest = window.indexedDB.open('range_db', 1);

// error handler signifies that the database didn't open successfully
openRequest.addEventListener('error', () => console.error('Database failed to open'));

// success handler signifies that the database opened successfully
openRequest.addEventListener('success', () => {
  console.log('Database opened successfully');

  // Store the opened database object in the db variable. This is used a lot below
  db = openRequest.result;

  // Run the displayData() function to display the notes already in the IDB
  //displayData();
});

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
    }
  }

}