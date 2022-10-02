'use strict';
const axios = require('axios').default
let mongoose = require('mongoose'),
  ESVConfig = mongoose.model('ESVConfig')

/*
This module is for getting the passags from ESV

Response 
{
  query: 'John 11:35–12:1',
  canonical: 'John 11:35–12:1',
  parsed: [ [ 43011035, 43012001 ] ],
  passage_meta: [
    {
      canonical: 'John 11:35–12:1',
      chapter_start: [Array],
      chapter_end: [Array],
      prev_verse: 43011034,
      next_verse: 43012002,
      prev_chapter: [Array],
      next_chapter: [Array]
    }
  ],
  passages: [
  ]
}
*/

    async function convert_config(data){
        //console.log(data)
        // on or off to true and false
        switch(data.toLowerCase()){
            case "on":
                return(true)
            case "off":
                return(false)
        }
    }

    //Function to get ESV Config
    async function get_esv_config(){
        try{
            let rdata = await ESVConfig.find({})
            return(rdata[0])
        }
        catch(err){
            return(err)
        }        
    }

    async function get_esv_passage(passage){            
            let esvconfig = await get_esv_config()
            //This function will submit data to selectionsaver
            
            let config ={
              method: "get",
              url: esvconfig.url,
              headers: {
                "Authorization": 'Token '+ esvconfig.authorization
              },
              params: {
                "include-first-verse-numbers" : await convert_config(esvconfig.include_first_verse_numbers),
                "include-footnotes": await convert_config(esvconfig.include_footnotes),
                "indent-using": esvconfig.indent_using,
                "indent-paragraphs": esvconfig.indent_paragraphs,
                "include-headings": await convert_config(esvconfig.include_headings),
                "include-footnote-body":await convert_config(esvconfig.include_footnote_body),
                "include-footnote": await convert_config(esvconfig.include_footnotes),
                "include-passage-references":await convert_config(esvconfig.include_passage_references),
                "include-short-copyright":await convert_config(esvconfig.include_short_copyright),
                "indent-poetry-lines":1,
                "include-subheadings":await convert_config(esvconfig.include_subheadings),
                "wrapping-div":await convert_config(esvconfig.wrapping_div),
                "div-classes":await convert_config(esvconfig.div_classes),
                "include-crossrefs":await convert_config(esvconfig.include_crossrefs),
                //q format "John+11:35-12:1" <Book>+<Chapter>:<Verse>-<Chapter>:<Verse>
                "q": passage
            }
            }
            
            const response = await axios(config);
            return(response.data)
            //console.log(response.data)
          }



module.exports = {
    //list of functions
    get_esv_passage
}
