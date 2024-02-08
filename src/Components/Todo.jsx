import React from "react";
import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import "../Components/Todo.css";

import { FiArrowLeft } from "react-icons/fi";
import { FiArrowRight } from "react-icons/fi";
import { RxHamburgerMenu } from "react-icons/rx";

const Todo = () => {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState(1);
  const [menuOpened, setMenuopened] = useState(false);

  const getMenuStyles = (menuOpened) => {
    if (document.documentElement.clientWidth <= 800) {
      return { scale: !menuOpened && "0" };
    }
  };

  const Task = (props) => {
    return (
      <div className={props.status ? "task-done" : "task"}>
        <input
          type="checkbox"
          id="taskHeading"
          onChange={() => handleCheckbox(props.idThing)}
          checked={props.status}
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
      <h1>TaskSphere</h1>
      <div
        className="menu-icon"
        onClick={() => {
          setMenuopened((prev) => !prev);

          console.log("====================================");
          console.log("clicked");
          console.log("====================================");
        }}
      >
        <RxHamburgerMenu size={30} color={"black"} />
      </div>

      <OutsideClickHandler
        onOutsideClick={() => {
          setMenuopened(false);
        }}
      >
        <div className="details" style={getMenuStyles(menuOpened)}>
          <span>Task Completed</span>
          <span style={{ fontWeight: "bold" }}>
            {tasks.filter((task) => task.completed === true).length}/100
          </span>
        </div>
      </OutsideClickHandler>

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
