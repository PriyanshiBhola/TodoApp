const express = require('express');
const {db, Tasks, Notes} = require('./write-db');

const app = express();

app.use(express.json());

db.sync()
.then(() => 
{
    app.listen(8080);

})
.catch((err) => {
    console.error(err)
});

app.get('/todos', (req, res) => {
    Tasks.findAll({
        attributes : ['id', 'title', 'description', 'due_date', 'status', 'priority']
    }).then((data) => {
        res.send(data);
    })
});

app.post('/todos', (req, res) => {
    let data = req.body;
    console.log(data);
    Tasks.create(data).then((resp) => {
        if(data.notes != ""){
            let noteData = {
                note : data.note,
                taskId : resp.dataValues.id
            };
            Notes.create(noteData).then(()=> {
                res.send({success : "data inserted"})
            });
        }
        else{
            res.send({success : "Data inserted without note."});
        }
    });
    
});
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if(isNaN(parseInt(req.params.id)))
    {
        req.status(404).send(
            {
                error : 'invalid todo id'
            });
            return;
    }
    Todos.findOne({
        attributes : ['id', 'title', 'description', 'due_date', 'status', 'priority'],
        where : 
        {
            'id' : id
        }
    }).then((data) => {
        res.send(data);
    }
    );
});

app.post('/todos/:id/notes', (req, res) => {
    id = req.params.id
    data = req.body
    data.TodoId = Number(id)
    Todos.findAll({
        attributes : ['id']
    })
    .then((list) => {
        for(let item of list){
            if(item.id == id)
            {notes.create(data).then(() => res.send(""))
            return

            }
        }
        res.status(404)
        res.send({error : 'Wrong Id'})
    })
})

app.get('/todos/:id/notes', (req, res) => 
{
    id = req.params.id
    notes.findAll({
        attributes : ['note'],
        where :
        {
            TodoId : id
        }

    }).then((data) => res.send(data))
})

app.patch('/todos/:id', (req, res) =>
{
    let Taskid = req.params.id
    let data = req.body
    Todos.findOne({
        where : {
            id : Taskid
        }
    })
    .then((todo) => {
        todo.due = data.due
        todo.priority = data.priority
        todo.status = data.status
        todo.save().then(()=> res.send(""))
    })
})

