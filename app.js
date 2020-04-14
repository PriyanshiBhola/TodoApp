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