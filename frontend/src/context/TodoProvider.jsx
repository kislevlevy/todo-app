// Imports:
import { createContext, useEffect, useState } from 'react';

import { BACK_END } from '../utils/config.js';
import axios from 'axios';

// Context initiation:
const TodoContext = createContext();

///////////////////////////////////////////////////
// Provider
export function TodoProvider({ children }) {
  // State veriables:
  const [todoArr, setTodoArr] = useState([]);
  const [filterdArr, setFilterdArr] = useState(todoArr);
  const [currentUser, setCurrentUser] = useState(null);
  const [isEditing, setIsEditing] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    if (currentUser) getTaskByUser();
  }, [currentUser]);

  // Provider functions:
  const getTaskByUser = async function () {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/user/${currentUser._id}/tasks`,
        method: 'get',
        withCredentials: true,
      };
      const { data } = await axios(reqConfig);

      return setTodoArr(data.tasks);
    } catch (err) {
      console.log('☀️', err.message);
      return setTodoArr([]);
    }
  };

  const addNewTask = async function (body) {
    try {
      if (!body || !body.title) return;

      const reqConfig = {
        url: `${BACK_END}/api/v1/task`,
        method: 'post',
        withCredentials: true,
        data: body,
      };
      const { data } = await axios(reqConfig);

      return setTodoArr(data.tasks);
    } catch (err) {
      console.log('☀️', err.message);
    }
  };
  const updateTask = async function (id, body) {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/task/${id}`,
        method: 'patch',
        withCredentials: true,
        data: body,
      };
      const { data } = await axios(reqConfig);

      return setTodoArr(data.tasks);
    } catch (err) {
      console.log('☀️', err.message);
    }
  };
  const markCompleted = async function (id, isCompleted) {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/task/${id}`,
        method: 'patch',
        withCredentials: true,
        data: { isCompleted: !isCompleted },
      };
      const { data } = await axios(reqConfig);

      return setTodoArr(data.tasks);
    } catch (err) {
      console.log('☀️', err.message);
    }
  };
  const deleteItem = async function (id) {
    try {
      const reqConfig = {
        url: `${BACK_END}/api/v1/task/${id}`,
        method: 'delete',
        withCredentials: true,
      };
      await axios(reqConfig);

      return getTaskByUser();
    } catch (err) {
      console.log('☀️', err.message);
    }
  };

  // Set provider veriables:
  const globalVariables = {
    getTaskByUser,
    setTodoArr,
    todoArr,
    setFilterdArr,
    filterdArr,

    currentUser,
    setCurrentUser,

    isRegistering,
    setIsRegistering,
    isEditing,
    setIsEditing,

    addNewTask,
    updateTask,
    markCompleted,
    deleteItem,
  };

  // Return Provider:
  return (
    <TodoContext.Provider value={globalVariables}>{children}</TodoContext.Provider>
  );
}
export default TodoContext;
