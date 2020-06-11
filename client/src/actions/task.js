import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_TASKS,
    TASKS_ERROR,
    ADD_TASK,
    DELETE_TASK
} from './types';

// Get scheduled tasks
export const getTasks = () => async dispatch => {
    try {
        const res = await axios.get('/api/task');

        dispatch({
            type: GET_TASKS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Create a task
export const createTask = (formData) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const res = await axios.post('/api/task', formData, config);

        dispatch({
            type: ADD_TASK,
            payload: res.data
        });

        dispatch(setAlert('Task Scheduled Successfully', 'success'));
    } catch (err) {
        
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}

// Delete task
export const deleteTask = id => async dispatch => {
    try {
        await axios.delete(`/api/task/${id}`);

        dispatch({
            type: DELETE_TASK,
            payload: id
        });

        dispatch(setAlert('Task deleted', 'success'));
    } catch (err) {
        
        dispatch({
            type: TASKS_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status }
        });
    }
}