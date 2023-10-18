import React, { createContext, useReducer } from 'react';

const TodoContext = createContext();

const initialState = {
  tasks: [],
};

const todoReducer = (state, action) => {

  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'ADD_TASK':
      return { ...state, tasks: [...action.payload, ...state.tasks] };
    case 'REMOVE_TASK':
      const updatedTasks = state.tasks.filter(task => task._uuid !== action.payload);
      return { ...state, tasks: updatedTasks };
    case 'CHANGE_TASK_STATUS':
      const updatedTask = state.tasks.map(task => {
        if (task._uuid === action.payload && task.completed === false) {
          return { ...task, completed: true };
        }
        if (task._uuid === action.payload && task.completed === true) {
          return { ...task, completed: false };
        }
        return task;
      });
      return { ...state, tasks: updatedTask };

    default:
      return state;
  }
};


const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export { TodoContext, TodoProvider };
