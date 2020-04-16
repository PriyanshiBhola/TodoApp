// Utils
const serializeForm = form => 
  form
    .serializeArray()
    .filter(obj => !!obj.value)
    .reduce((acc, curr) => {
      acc[curr.name] = curr.value
      return acc
    }, {})
const getQueryString = params => 
  Object
    .keys(params)
    .filter(k => params[k] !== undefined)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&')
const api = (endpoint, config) => fetch(`/api${endpoint}`, config).then(resp => resp.json())
const apiPost = (endpoint, body) => 
  api(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
const apiPatch = (endpoint, body) =>
  api(endpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

// Controllers
const TodoController = {
  create: payload => apiPost('/todos', payload),
  update: (id, payload) => apiPatch(`/todos/${id}`, payload),
  getAll: sort => {
    const params = {
      sort
    }
    return api(`/todos?${getQueryString(params)}`)
  },
  getById: id => api(`/todos/${id}`)
}
const NotesController = {
  create: (taskId, payload) => apiPost(`/todos/${taskId}/notes`, payload),
  getAll: taskId => api(`/todos/${taskId}/notes`)
}

// Handlers
const TodoHandlers = {
  create: () => {
    const form = $('#createTodoForm')
    const paylod = serializeForm(form)
    TodoController
      .create(paylod)
      .then(() => TodoHandlers.refreshAll())
      .then(() => {
        form.trigger('reset')
      })
  },
  refreshAll: sort => {
    $('#todoList').empty()
    TodoController.getAll(sort).then(todos => {
      todos.forEach(todo => {
        $('#todoList').append(templates.todoListItem(todo))
      });
    })
  }
}
const NotesHandlers = {
  create: taskId => {
    const form = $(`#${taskId}Form`)
    const payload = serializeForm(form)
    NotesController
      .create(taskId, payload)
      .then(() => NotesHandlers.refreshAll(taskId))
      .then(() => form.trigger('reset'))
  },
  toggleNote: taskId => {
    const noteBody = $(`#${taskId}Body`)
    if (noteBody.hasClass('show')) {
      noteBody.removeClass('show')
    } else {
      noteBody.addClass('show')
      NotesHandlers.refreshAll(taskId)
    }
  },
  refreshAll: taskId => {
    $(`#${taskId}List`).empty()
    NotesController
      .getAll(taskId)
      .then(notes => {
        notes.forEach(note => {
          console.log(templates.notesListItem(note))
          $(`#${taskId}List`).append(templates.notesListItem(note))
        })
      })
  }
}

// ID-Handler map
const idHandlerMap = {
  createTodoButton: TodoHandlers.create,
  sortUsingDate: () => TodoHandlers.refreshAll('due_date'),
  sortPriority: () => TodoHandlers.refreshAll('priority'),
  sortStatus: () => TodoHandlers.refreshAll('status')
}
// Intialization
$().ready(function() {
  Object.keys(idHandlerMap).map(id => {
    $(`#${id}`).click(idHandlerMap[id])
  })
  TodoHandlers.refreshAll()
});
