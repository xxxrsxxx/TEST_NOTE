import React from 'react';

interface userProps {
	user: object;
	users?: Array<any>;
	onRemove: any;
	onToggle: any;
}

const User = React.memo(function User({ user, onRemove, onToggle }: userProps) {
	return (
		<div>
			<b
				style={{
					cursor: 'pointer',
					color: user.active ? 'green' : 'black',
				}}
				onClick={() => onToggle(user.id)}>
				{user.username}
			</b>
			&nbsp;
			<span>({user.email})</span>
			<button onClick={() => onRemove(user.id)}>삭제</button>
		</div>
	);
});

function UserList({ users, onRemove, onToggle }: userProps) {
	return (
		<div>
			{users.map(user => (
				<User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle} />
			))}
		</div>
	);
}

export default React.memo(UserList, (prevProps, nextProps) => prevProps.users === nextProps.users);
