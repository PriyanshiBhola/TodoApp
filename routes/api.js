const express = require('express')
const router = express.Router()
const U = require('../utils')
const DB = require('../models')
const { ce } = require('../middlewares/captureError')

const TODO_SAFE_ATTRS = ['id', 'title', 'description', 'due_date', 'status', 'priority']
const NOTE_SAFE_ATTRS = ['id', 'note']

router.get('/todos', ce(async (req, res) => {
  const { sort } = req.query
  const tasks = await DB.tasks.findAll({
      attributes: TODO_SAFE_ATTRS,
      ...(sort && {
        order: [sort]
      })
  })
  res.send(tasks);
}));

router.post('/todos', ce(async (req, res) => {
  const todoPayload = U.normalizePayload(req.body, TODO_SAFE_ATTRS)
  const todo = await DB.tasks.create(todoPayload)
  res.json(todo)
}));

router.get('/todos/:id', ce(async (req, res) => {
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
}));

router.get('/todos/:id/notes', ce(async (req, res) => {
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
}))

router.post('/todos/:id/notes',  ce(async (req, res) => {
  const id = req.params.id
  if(isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }

  const notePayload = U.normalizePayload(req.body, NOTE_SAFE_ATTRS)
  const note = await DB.notes.create({
    ...notePayload,
    taskId: id
  })

  res.json(note)
}))

router.patch('/todos/:id', ce(async (req, res) =>
{
  const id = req.params.id
  if(isNaN(parseInt(req.params.id))) {
    return res.status(400).json({
      error: 'Invalid ID'
    });
  }
  
  const taskPayload = U.normalizePayload(req.body, TODO_SAFE_ATTRS)
  await DB.tasks.update(taskPayload, {
    where: {
      id
    }
  })
  const task = await DB.tasks.findById(id)

  res.json(task)
}))

module.exports = router
