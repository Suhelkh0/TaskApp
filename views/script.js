document.addEventListener('DOMContentLoaded', () => {
    fetch('/newTask')
      .then(response => response.json())
      .then(data => {
        const taskList = document.getElementById('taskList');
        data.forEach(task => {
          const listItem = document.createElement('li');
          listItem.textContent = task.title;
          taskList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  });