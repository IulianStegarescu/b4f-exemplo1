const express = require("express");
const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(express.json())
const {createReminder,readAll,readOne, updateOne,deleteById} = require("./funcoesBD")
app.get("/api/reminders", async (req,res)=> {
    const result = await readAll()
    res.status(200).json(result)
})
app.post("/api/reminders", async (req,res)=> {
    const {description,remindAt} = req.body
    const result = await createReminder(req.body)
    res.status(201).json({_id:result})
})

app.get("/api/reminders/:id", async (req,res)=> {
    const {id} =req.params
    const result = await readOne(id)
    if(!result ){
        res.sendStatus(404)
    }else{
         res.status(200).json(result)
  }
})
app.patch("/api/reminders/:id" , async (req,res) =>{
    const {id} =req.params
    const {description,remindAt} = req.body
    const result = await updateOne(id,description,remindAt)
    if(!result){
       res.sendStatus(404)
    }else{
         res.sendStatus(200)
    }
})
app.delete("/api/reminders/:id", async (req,res)=>{
    const {id} =req.params
    const result  = await deleteById(id)
    if(result){
        res.sendStatus(200)
    }else{
        res.sendStatus(404)
    }

})





app.listen(PORT, () => console.log(`Listening in http://locahost:${PORT}`)) 