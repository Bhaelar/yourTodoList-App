import React from 'react';
import { deleteTask } from '../../actions/task';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export const ListItem = ({ deleteTask, auth, task: { _id, task } }) => {
	return (
		<div className="container app">
			<div className="taskContent d-flex row col-sm-12 mx-auto">
			<div className="p2 mr-auto">
				<p>{task}</p>
			</div>
			<div className="p2">
				<button onClick={(e) => deleteTask(_id)} type="button" className="btn btn-danger">
					Delete{' '}
				</button>{' '}
			</div>
			</div>
		</div>
	);
};

ListItem.propTypes = {
	task: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired,
	deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	auth: state.auth
});

export default connect(mapStateToProps, { deleteTask })(ListItem);
