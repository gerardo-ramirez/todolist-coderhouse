const express = require('express');
const route  = express.Router();
const Task = require('./../models/ModelTask');
ejs = require('ejs')
//add
/*route.get('/', async (req,res)=>{
    const task = await Task.find();
    console.log(task);
    res.render('index.ejs',{task: task});

});*/

route.get('/',async (req,res)=>{
    const task = await Task.find();
    //pasar las tareas de base de datos a la vista(en pantalla).
    res.render('index.ejs',{
        task // es lo mismpo que decir task:task

    })

});


route.post('/add', async (req,res)=>{
const nuevo = new Task (req.body);
await nuevo.save();
res.redirect('/');

});

//update
route.get('/update/:id', async (req,res)=>{
let {id} = req.params;
const task = await Task.findById(id);
res.render('modify.ejs',{
    task
})
});
route.post('/update/:id', async (req,res)=>{
    const element = req.body;
    const {id} = req.params;
    await Task.update({_id: id},element);
    res.redirect('/');

});

//status
route.get('/status/:id', async (req,res)=>{
    let {id}= req.params;
    const taskStatus = await Task.findById(id);
    taskStatus.status = !taskStatus.status;
    await taskStatus.save();
    res.redirect('/') ;
});


//delete
route.get('/delete/:id', async (req,res)=>{
    let {id} = req.params;
    await Task.remove({_id:id});
    res.redirect('/');
});


module.exports= route; 