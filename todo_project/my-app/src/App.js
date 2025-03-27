import React, { Component } from "react";
import Modal from "./components/Modal";
import axios from "axios";

class App extends Component {
  state = {
    viewCompleted: false,
    modal: false,
    activeItem: { 
      title: "",
      created_at: "",
      completed: false, 
      subtasks: [], 
    },
    todoList: []
  };

  async componentDidMount() {
    try {
      const res = await fetch('http://localhost:8000/api/tasks/');
      const todoList = await res.json();
      this.setState({ todoList });
    } catch (e) {
      console.log(e);
    }
  }

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  refreshList = () => {
    fetch('http://localhost:8000/api/tasks/')
      .then(res => res.json())
      .then(todoList => this.setState({ todoList }));
  };

  handleSubmit = item => {
    this.toggle();  // Close the modal
    if (item.id) {
      // Update task
      axios.put(`http://localhost:8000/api/tasks/${item.id}/`, item)
        .then(() => this.refreshList());
      return;
    }

    // Create task
    axios.post("http://localhost:8000/api/tasks/", item)
      .then(res => {
        // Create subtasks if any
        if (item.subtasks && item.subtasks.length) {
          item.subtasks.forEach(subtask => {
            axios.post("http://localhost:8000/api/subtasks/", { ...subtask, task: res.data.id })
              .then(() => this.refreshList());
          });
        }
        this.refreshList();
      });
  };

  editItem = (item) => {
    this.setState({
      activeItem: item
    }, () => this.toggle());  // Open modal with selected item for editing
  };

  renderItems = () => {
    const { viewCompleted } = this.state;
    const newItems = this.state.todoList.filter(item => item.completed === viewCompleted);

    return newItems.map(item => (
      <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
        <div>
          <span className={`todo-title mr-2 ${viewCompleted ? "completed-todo" : ""}`} title={item.title}>
            {item.title}
          </span>
          <br />
          <span className="text-muted">Created: {item.created_at}</span>
          <br />
          <span className={`badge ${item.completed ? "badge-success" : "badge-warning"}`}>
            {item.completed ? "Completed" : "Incomplete"}
          </span>
        </div>

        <ul>
          {item.subtasks && item.subtasks.map(subtask => (
            <li key={subtask.id} className="list-group-item">
              <span className={`todo-title mr-2 ${subtask.completed ? "completed-todo" : ""}`} title={subtask.title}>
                {subtask.title}
              </span>
            </li>
          ))}
        </ul>

        <span>
          <button className="btn btn-secondary mr-2" onClick={() => this.editItem(item)}>Edit</button>
          <button className="btn btn-danger" onClick={() => this.deleteTask(item.id)}>Delete</button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="content">
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <ul className="list-group list-group-flush">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>

        {this.state.modal && <Modal activeItem={this.state.activeItem} handleSubmit={this.handleSubmit} />}
      </main>
    );
  }
}

export default App;
