/* 

This files contains the functions to submit the selection data

*/


function submit_data(book){
    //This function will submit data to selectionsaver
    var data = {
        userid: "Example",
        version: 1,
        book: book, 
        selection: []
    }


    const transaction = db.transaction(['range_os'], 'readwrite');
    const objectStore = transaction.objectStore('range_os');
    let allRecords = objectStore.getAll()
    allRecords.onsuccess = function() {
        console.log(allRecords.result);
        data.selection.push(allRecords.result)
        console.log(data)
    };

}

function send(data){
    //this is the function that sends the data to the API
  console.log('Sending data');

  const XHR = new XMLHttpRequest();

  const urlEncodedDataPairs = [];

  // Turn the data object into an array of URL-encoded key/value pairs.
  for (const [name, value] of Object.entries(data)) {
    urlEncodedDataPairs.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behavior of browser form submissions.
  const urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  // Define what happens on successful data submission
  XHR.addEventListener('load', (event) => {
    alert('Yeah! Data sent and response loaded.');
  });

  // Define what happens in case of error
  XHR.addEventListener('error', (event) => {
    alert('Oops! Something went wrong.');
  });

  // Set up our request
  XHR.open('POST', 'https://example.com/cors.php');

  // Add the required HTTP header for form data POST requests
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  // Finally, send our data.
  XHR.send(urlEncodedData);


}