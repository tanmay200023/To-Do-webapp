window.addEventListener('load', () => {
	todos = JSON.parse(localStorage.getItem('todos')) || [];
	const nameInput = document.querySelector('#name');
	const newTodoForm = document.querySelector('#new-todo-form');

	const name = localStorage.getItem('name') || '';

	nameInput.value = name;

	nameInput.addEventListener('change', (e) => {
		localStorage.setItem('name', e.target.value);
		window.sessionStorage.setItem('name', e.target.value);
	})

	newTodoForm.addEventListener('submit', e => {
		e.preventDefault();

		const todo = {
			content: e.target.elements.content.value,
			category: e.target.elements.category.value,
			date: e.target.elements.date.value,
			done: false,
			createdAt: new Date().getTime()
		}

		todos.push(todo);

		localStorage.setItem('todos', JSON.stringify(todos));

		// Reset the form
		e.target.reset();

		DisplayTodos()
	})

	DisplayTodos()
})

function DisplayTodos () {
	const todoList = document.querySelector('#todo-list');
	todoList.innerHTML = "";

	todos.forEach(todo => {
		const todoItem = document.createElement('div');
		todoItem.classList.add('todo-item');

		const label = document.createElement('label');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const content = document.createElement('div');
		const date = document.createElement('div');
		const actions = document.createElement('div');
		const edit = document.createElement('button');
		const deleteButton = document.createElement('button');

		input.type = 'checkbox';
		input.checked = todo.done;
		span.classList.add('bubble');
		if (todo.category == 'personal') {
			span.classList.add('personal');
		} else if (todo.category == 'business') {
			span.classList.add('business');
		} else if (todo.category == 'work'){
			span.classList.add('work');
		} else {
			span.classList.add('educational');
		}

		
		content.classList.add('todo-content');
		date.classList.add('date');
		actions.classList.add('actions');
		if (todo.category == 'personal') {
			edit.classList.add('edit-personal');
		} else if (todo.category == 'business') {
			edit.classList.add('edit-business');
		} else if (todo.category == 'work'){
			edit.classList.add('edit-work');
		} else {
			edit.classList.add('edit-education');
		}
		
		deleteButton.classList.add('delete');

		content.innerHTML = `<input type="text" value="${todo.content}" readonly> <span> <em>Finish By:</em> ${todo.date}</span>`;
		edit.innerHTML = 'Edit';
		deleteButton.innerHTML = 'Delete';

		label.appendChild(input);
		label.appendChild(span);
		actions.appendChild(edit);
		actions.appendChild(deleteButton);
		todoItem.appendChild(label);
		todoItem.appendChild(content);
		todoItem.appendChild(actions);

		todoList.appendChild(todoItem);

		if (todo.done) {
			todoItem.classList.add('done');
		}
		
		input.addEventListener('change', (e) => {
			todo.done = e.target.checked;
			localStorage.setItem('todos', JSON.stringify(todos));

			if (todo.done) {
				todoItem.classList.add('done');
			} else {
				todoItem.classList.remove('done');
			}

			DisplayTodos()

		})

		edit.addEventListener('click', (e) => {
			const input = content.querySelector('input');
			input.removeAttribute('readonly');
			input.focus();
			input.addEventListener('blur', (e) => {
				input.setAttribute('readonly', true);
				todo.content = e.target.value;
				localStorage.setItem('todos', JSON.stringify(todos));
				DisplayTodos()
			})
		})

		deleteButton.addEventListener('click', (e) => {
			todos = todos.filter(t => t != todo);
			localStorage.setItem('todos', JSON.stringify(todos));
			DisplayTodos()
		})

	})

	var text, person = "Please enter your name:", stranger = "Stranger";
    if (!window.sessionStorage) {  // if sessionStorage not supported
        return window.prompt(person, stranger); // perform other action
    }
    text = window.sessionStorage.getItem('name');
	document.getElementById("name").value = text;
    if (!text || text === 'null') {
        text = window.prompt(person, stranger);
        window.sessionStorage.setItem('name', text);
		document.getElementById("name").value = text;
    }
    return text;
}

