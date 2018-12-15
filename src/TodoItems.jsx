import React, { Component } from "react";

class TodoItems extends Component {
  createTasks = item => {
    const taskDate = new Date(item.key);

    return (
      <li key={item.key} onClick={() => this.props.deleteItem(item.key)}>
        {item.text} - {taskDate.toLocaleTimeString()}
      </li>
    );
  };
  render() {
    const todoEntries = this.props.entries;
    const listItems = todoEntries.map(this.createTasks);

    return <ul className="theList">{listItems}</ul>;
  }
}

export default TodoItems;
