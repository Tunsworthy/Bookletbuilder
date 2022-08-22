module.exports = function(app){
    // Event Routes
    app.get('/',function(req,res){
          res.render('index',{title: process.env.PROGRAM_NAME});
      })

}