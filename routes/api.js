const express = require('express')
const router = express.Router()
const U = require('../utils')
const DB = require('../models')

const TODO_SAFE_ATTRS = ['id', 'title', 'description', 'due_date', 'status', 'priority']
const NOTE_SAFE_ATTRS = ['id', 'note']

router.get('/todos', async (req, res) => {
  const tasks = await DB.tasks.findAll({
      attributes: TODO_SAFE_ATTRS 
  })
  res.send(tasks);
});

router.post('/todos', async (req, res) => {
  const todoPayload = U.normalizePayload(req.body, TODO_SAFE_ATTRS)
  const todo = await DB.tasks.create(todoPayload)
  res.json(todo)
});

router.get('/todos/:id', async (req, res) => {
  const  id = req.params.id;
  if(isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }

  const todo = await DB.tasks.findById(id, {
    attributes: TODO_SAFE_ATTRS
  })
  if (!todo) {
    return res.status(404).json({
      error: 'TODO Not Found'
    })
  }

  res.json(todo)
});

router.get('/todos/:id/notes', async (req, res) => {
  const id = req.params.id
  if(isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }
  
  const notes = await DB.notes.findAll({
      attributes: NOTE_SAFE_ATTRS,
      where: {
        taskId : id
      }
  })

  res.json(notes)
})

router.post('/todos/:id/notes', async (req, res) => {
  const id = req.params.id
  if(isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }

  const notePayload = normalizePayload(req.body, NOTE_SAFE_ATTRS)
  const note = await DB.notes.create(notePayload)

  res.json(note)
})

router.patch('/todos/:id', async (req, res) =>
{
  const id = req.params.id
  if(isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }
  
  const taskPayload = normalizePayload(req.body, TODO_SAFE_ATTRS)
  await DB.tasks.update(taskPayload, {
    where: {
      id
    }
  })
  const task = await DB.tasks.findById(id)

  res.json(task)
})

module.exports = router
