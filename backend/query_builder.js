'use strict';
/*
This module will go through and get all the data needed to submit the API requests to ESV


Get from the booklet table
    -Split_IDs
        -Get from the Splits table the ranges
            -Build the correct query to send to ESV
*/

let mongoose = require('mongoose'),
  Booklet = mongoose.model('BookletSchema'),
  Splits = mongoose.model('SplitsSchema')

    //Function to get ESV Config
async function get_booklet_details(bookletid){
    console.log('In booklet details getter')
    console.log(bookletid)
    try{
        let data = await Booklet.findOne({_id:bookletid})
        //console.log(data)
        return(data.selected_splits)
    }
    catch(err){
        return(err)
    }        
}


async function get_splits_details(splitid){
    try{
        let data = await Splits.findOne({_id:splitid})
        return(data)
    }
    catch(err){
        return(err)
    }        
}

/*

A section should be passed looking like this
            "range_start_id": "C1V1",
            "range_end_id": "C1V17",
            "_id": "632859bed417e30e25751ac5"

            it needs to end up looking like "John+11:35-12:1" <Book>+<Chapter>:<Verse>-<Chapter>:<Verse>
*/
async function format_sections(section){

    let s_chapter = section.range_start_id.match(/C[0-9]*/)[0].replace("C","")
    let s_verse = section.range_start_id.match(/V[0-9]*/)[0].replace("V","")
    let e_chapter = section.range_end_id.match(/C[0-9]*/)[0].replace("C","")
    let e_verse = section.range_end_id.match(/V[0-9]*/)[0].replace("V","")

    return(s_chapter+":"+s_verse+"-"+e_chapter+":"+e_verse)
}



async function query_builder(bookletid){
    console.log(bookletid)
    let formatted_selection_array = []
    let selected_splits_data = await get_booklet_details(bookletid)
    let split_id
    //console.log(selected_splits_data)
    for(let i = 0; i < selected_splits_data.length; i++){
        //console.log('in for loop i')
       // console.log(selected_splits_data[i].split_id)
       let splits_data = await get_splits_details(selected_splits_data[i].split_id)
       split_id = splits_data._id
       //console.log(splits_data)

       for(let a = 0; a < splits_data.sections.length; a++){
       // console.log(splits_data.sections[a])
       let formatted_selection = await format_sections(splits_data.sections[a])
        formatted_selection_array.push(splits_data.book+"+"+formatted_selection) 
        //console.log(formatted_selection)
       }
        
    }
    console.log(split_id)
    let return_data = {
        "splits_id": split_id,
        "formmated_selection": formatted_selection_array
    }

    return(return_data)
}

module.exports = {
    //list of functions
    query_builder
}