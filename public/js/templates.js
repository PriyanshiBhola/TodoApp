const templates = {
  todoListItem: todo => `
    <div class="card">
      <div class="card-header">
        <h2 class="mb-0">
          <button class="btn btn-link" type="button" id="${todo.id}">
            ${todo.title} (${todo.status ? 'Completed' : 'Incomplete'})
          </button>
        </h2>
        <p>
          ${todo.description}
        </p>
      </div>
  
      <div id="${todo.id}Body" class="collapse" aria-labelledby="${todo.id}" data-parent="#todoList">
        <div class="card-body">
          <h4> Notes </h4>
          <ul id="${todo.id}List">
          </ul>
          <form id="${todo.id}Form">
            <input type="text" name="note" />
            <button type="button" class="btn btn-primary" id="${todo.id}NoteAdd">
              Add Note
            </button>
          </form>
        </div>
      </div>
    </div>

    <script>
      $("#${todo.id}").click(() => {
        NotesHandlers.toggleNote(${todo.id})
      })
      $("#${todo.id}NoteAdd").click(() => {
        NotesHandlers.create(${todo.id})
      })
    </script>
  `,
  notesListItem: note => `
    <li>${note.note}</li>
  `
}