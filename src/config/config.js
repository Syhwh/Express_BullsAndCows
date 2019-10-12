const path =require('path')
const config ={
    app:{
        port: process.env.NODE_ENV || 3000
    },
    views: path.join(__dirname,'../views'),
    engine:{
        engName:'.hbs',
        engConf:{
            defaultLayout:'main',
            extname:'.hbs'
        }
    },
    viewEngine:'.hbs'
}

module.exports=config;