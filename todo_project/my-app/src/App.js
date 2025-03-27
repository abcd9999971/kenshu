import React, { Component } from "react"

class App extends Component {
    constructor(props) {
      super(props);
      this.state = {
        viewCompleted: false,
        activeItem: { 
          title: "",
          created_at : "",
          completed: false, 
          subtask: [], 
        },
        todoList: []
      };
    };

    async componentDidMount() {
      try{
        const res = await fetch('http://localhost:8000/api/tasks/');
        const todoList = await res.json();
        this.setState({
          todoList
        });
      }catch(e){ 
          console.log(e);
        } 
      }
      renderItems = () => {
        const {viewComplated} = this.state;
        const newItems = this.state.todoList.filter(  
          item => item.completed == viewComplated
        );
        return newItems.map(item => (
          <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className={`todo-title mr-2 ${this.state.viewCompleted ? "completed-todo" : ""}`} title={item.title}>
              {item.title}
            </span>
            <span>
              <button className="btn btn-secondary mr-2">Edit</button>
              <button className="btn btn-danger">Delete</button>
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
      </main>
      )
    }
  }
  
export default App;