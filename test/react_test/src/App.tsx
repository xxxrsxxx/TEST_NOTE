import React, { useRef, useReducer, useMemo, useCallback } from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import userInputs from './hooks/userInputs';

function countActiveUsers(users: any) {
	console.log('활성 사용자 수를 세는중...');
	return users.filter((user: { active: boolean }) => user.active).length;
}

const initialState = {
	users: [
		{
			id: 1,
			username: 'velopert',
			email: 'public.velopert@gmail.com',
			active: true,
		},
		{
			id: 2,
			username: 'tester',
			email: 'tester@example.com',
			active: true,
		},
		{
			id: 3,
			username: 'liz',
			email: 'liz@example.com',
			active: false,
		},
	],
};

function reducer(state: { users: any[] }, action: { type: any; user: any; id: any }) {
	switch (action.type) {
		case 'CREATE_USER':
			return {
				users: state.users.concat(action.user),
			};
		case 'TOGGLE_USER':
			return {
				...state,
				users: state.users.map(user =>
					user.id === action.id ? { ...user, active: !user.active } : user,
				),
			};
		case 'REMOVE_USER':
			return {
				...state,
				users: state.users.filter(user => user.id !== action.id),
			};
		default:
			return state;
	}
}

function App() {
	const [{ username, email, dataForm }, onChange, reset] = userInputs({
		username: '',
		email: '',
		dataForm: {
			str: '',
		},
	});
	const [state, dispatch] = useReducer(reducer, initialState);
	const nextId = useRef(4);

	const { users } = state;

	const onCreate = useCallback(() => {
		dispatch({
			type: 'CREATE_USER',
			user: {
				id: nextId.current,
				username,
				email,
			},
		});
		console.log('=====str', dataForm);
		reset();
		nextId.current += 1;
	}, [username, email, reset, dataForm]);

	const onToggle = useCallback(id => {
		dispatch({
			type: 'TOGGLE_USER',
			id,
		});
	}, []);

	const onRemove = useCallback(id => {
		dispatch({
			type: 'REMOVE_USER',
			id,
		});
	}, []);

	const count = useMemo(() => countActiveUsers(users), [users]);
	return (
		<>
			<CreateUser
				username={username}
				email={email}
				onChange={onChange}
				dataForm={dataForm}
				onCreate={onCreate}
			/>
			<UserList users={users} onToggle={onToggle} onRemove={onRemove} />
			<div>활성사용자 수 : {count}</div>
		</>
	);
}

export default App;
