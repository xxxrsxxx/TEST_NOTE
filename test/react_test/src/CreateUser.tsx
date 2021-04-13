import React from 'react';

const CreateForm = ({ username, email, dataForm, onChange, onCreate }) => {
	const submitHandler = () => {
		// 유효성 검사 로직 처리 후 액션 처리
		const confirm = username && email;
		if (confirm) onCreate();
	};
	return (
		<div>
			<input name="username" placeholder="계정명" onChange={onChange} value={username} />
			<input name="email" placeholder="이메일" onChange={onChange} value={email} />
			<button onClick={submitHandler}>등록</button>
		</div>
	);
};

export default React.memo(CreateForm);
