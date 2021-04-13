import { useState, useCallback } from 'react';

function userInputs(initialForm: object) {
	console.log('initialForm', initialForm);
	const [form, setForm] = useState(initialForm);
	// change
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const onChange = useCallback(e => {
		const { name, value } = e.target;
		console.log('e.target', e.target);
		if (name === 'str') setForm(form => ({ ...form, dataForm: { str: value } }));
		else setForm(form => ({ ...form, [name]: value }));
		console.log('form====', form);
	}, []);
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const reset = useCallback(() => setForm(initialForm), [initialForm]);
	return [form, onChange, reset];
}

export default userInputs;
