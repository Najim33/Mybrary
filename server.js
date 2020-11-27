if ( process.env.NODE_ENV !== 'production'  ){
    require('dotenv').config()
}

const { DATABASE_URL} = process.env
const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const indexRouter=require('./routes/index')

 


app.set('view engine','ejs')
app.set('views',__dirname+'/views' )
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

//DB PART
const mongoose=require('mongoose')

mongoose.connect(DATABASE_URL, 
    {useNewUrlParser:true , useUnifiedTopology: true})

const db=mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>{console.log('Connected To Mongoose')
                       
})

//routes
app.use('/',indexRouter)

app.listen(process.env.PORT || 3000)
