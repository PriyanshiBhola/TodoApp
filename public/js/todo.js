// UTILS
const serializeForm = form => 
  form
    .serializeArray()
    .filter(obj => !!obj.value)
    .reduce((acc, curr) => {
      acc[curr.name] = curr.value
      return acc
    }, {})

const api = (endpoint, config) => fetch(`/api/${endpoint}`, config).then(resp => resp.json())
const apiPost = (endpoint, body) => 
  api(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })

// Controllers
const TodoController = {
  create: payload => {
    return apiPost('/todos', payload)
  },
  getAll: () => {
    return api('/todos')
  },
  getById: id => {
    return api(`/todos/${id}`)
  }
}

// Handlers
const TodoHandlers = {
  create: () => {
    const paylod = serializeForm($('#createTodoForm'))
    return TodoController.create(paylod)
  }
}

// ID-Handler map
const idHandlerMap = {
  createTodoButton: TodoHandlers.create
}
// Intialization
$().ready(function() {
  Object.keys(idHandlerMap).map(id => {
    $(`#${id}`).click(idHandlerMap[id])
  })
  TodoController.getAll().then(console.log)
});
