import React, { createContext, useReducer } from 'react';

const TodoContext = createContext();

const initialState = {
  tasks: [],
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return { ...state, tasks: action.payload };
    case 'REMOVE_TASK':
      const updatedTasks = state.tasks.filter(task => task._uuid !== action.payload);
      return { ...state, tasks: updatedTasks };
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
