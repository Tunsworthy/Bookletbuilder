'use strict';
//const axios = require('axios').default;
const fs = require('fs').promises;
var mongoose = require('mongoose'),
  Booklet = mongoose.model('BookletSchema'),
  SplitsSchema = mongoose.model('SplitsSchema'),
  ESVConfig = mongoose.model('ESVConfig')

/*
This is the module for getting all the passages
It will get one at a time and report back to the database when its finished

Details to initiate
-Userid
-Bookletid

*/

    //Function to get ESV Config
    async function get_esv_config(){
        try{
            let rdata = await ESVConfig.find({})
            return(rdata)
        }
        catch(err){
            return(err)
        }        
    }

    

    async function get_passage(esvconfig,passage){

    }
module.exports = {
    //list of functions
    get_esv_config
}
