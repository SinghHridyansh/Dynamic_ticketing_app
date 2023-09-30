import React from "react";
import { useState, useEffect } from "react";
import "../Components/Todo.css";

import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);

  const Task = (props) => {
    return (
      <div className={props.status ? "task" : "task-done"}>
        <input
          type="checkbox"
          id="taskHeading"
          onChange={() => handleCheckbox(props.idThing)}
          checked={!props.status}
        />

        <p>{props.taskTitle}</p>
      </div>
    );
  };

  const handleCheckbox = (id) => {
    const updatedTask = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTask);
  };

  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= Math.ceil(tasks.length / 12) &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=100"
        );
        if (!response.ok) {
          throw new Error("Failed to Fetch data");
        }
        const data = await response.json();
        setTasks(data);
        console.log(data);
        console.log("Data is fetched");
      } catch (error) {
        console.Error(error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="todo">
      <h1> dynamic todos</h1>
      <div className="tasks">
        {tasks.length > 0 ? (
          <>
            {tasks.slice(page * 12 - 12, page * 12).map((task) => (
              <Task
                key={task.id}
                wholeTask={task}
                taskTitle={task.title}
                status={task.completed}
                idThing={task.id}
              />
            ))}
          </>
        ) : (
          <div>Wait up!</div>
        )}
      </div>
      {tasks.length > 0 && (
        <div className="buttons">
          <button
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "page_disabled"}
          >
            <FiArrowLeft />
            Prev
          </button>
          {[...Array(Math.ceil(tasks.length / 12))].map((_, i) => {
            return (
              <span
                className={page === i + 1 ? "selectedPage" : ""}
                key={i}
                onClick={() => selectPageHandler(i + 1)}
              >
                {i + 1}
              </span>
            );
          })}
          <p className="page-summary">
            {page}/{Math.ceil(tasks.length / 12)}
          </p>
          <button
            onClick={() => selectPageHandler(page + 1)}
            className={
              page < Math.ceil(tasks.length / 12) ? "" : "page_disabled"
            }
          >
            Next
            <FiArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default Todo;
