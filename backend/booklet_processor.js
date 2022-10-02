'use strict';
/*
This module brings all the processing for a booklet together

This process is in initiated after a user submits a new booklet request
input required:
    booklet_id
    user_id


*/
let mongoose = require('mongoose'),
  Response = mongoose.model('ResponseSchema')

let esv = require('./esv.js')
let query_builder = require('./query_builder.js')


async function save_response(data){
        console.log('in data save')
        console.log(data)
        let new_selection = new Response(data);
        new_selection.save(function(err,sel){
          if(err)
           console.log(err)
          return(sel)
        })
      }



async function intitate(data){
    let bookletid = '633952ddb476a659192855a1'
    let today = new Date();
    let run_id = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();


    //get all the data that we need
    let passage_data = []
    let query_data = await query_builder.query_builder(bookletid);
    let loop_data = query_data.formmated_selection
    console.log(loop_data)
   
    for(let i = 0; i < loop_data.length; i++){
        //because this will be saved into the response table - we will add in the details we might need later "bookletid" - splits id - ordering infomration
        let returned_data = await esv.get_esv_passage(loop_data[i])
            returned_data.run_id = run_id
            returned_data.booklet_id = bookletid
            returned_data.order = i
            returned_data.splits_id = query_data.splits_id
        
        //save the response data - we do this as a backup or if we need to rebuilt later
        let response = await save_response(returned_data)
        console.log(response)
       //passage_data.push(returned_data) 
    }

    

    console.log(passage_data)

}


module.exports = {
    //list of functions
    intitate
}