import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createTask } from '../../actions/task';

export const Homelayout = ({ createTask }) => {
	const [ formData, setFormData ] = useState({
		task: ''
	});

	const { task } = formData;

	const onChange = e => setFormData({...formData, [e.target.name]: e.target.value });

	const onSubmit = e => {
		e.preventDefault();
		createTask(formData);
	}

	return (
		<div className="container app">
			<div className="row">
            <div className="col-sm-12 mx-auto">
			<h1> yourTodoList App </h1>
			    <div className="content">
				<form action="" method="post" name="createTask" onSubmit={(e) => onSubmit(e)}>
				<div className="input-group">
								<input
									type="text"
									className="form-control"
									name="task"
									value={task}
									onChange={(e) => onChange(e)}
									placeholder="Enter a task you wish to schedule"
								/>
								<span className="input-group-btn">
									<button className="input-group-btn btn btn-primary" type="submit">
										Add{' '}
									</button>{' '}
								</span>
								</div>{' '}
							</form>
				</div>	
							
			</div>
			</div>	
						
					
				
		</div>
	);
};

Homelayout.propTypes = {
	createTask: PropTypes.func.isRequired
}

export default connect(null, {createTask})(Homelayout);
