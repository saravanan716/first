const express=require('express')
const port=3500
const path=require('path')
const mongoose=require('mongoose')
const app=express()
app.use(express.urlencoded({extended:true}))
const db=mongoose.connection
db.once('open',()=>{
    console.log("mongodb connection sucessfull")
})
const userschema= new mongoose.Schema({
    name:String,age:String

})
const user=mongoose.model("data",userschema)

app.post('/post' ,async (req,res)=>{
    const{name,age}=req.body
    const users = new user({
        name,
        age
    })
    await users.save()
    console.log(users)
    res.send('Form Submittend Sucessfully')

})


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})
app.listen(port,()=>console.log(`Server is Running ${port}`))


