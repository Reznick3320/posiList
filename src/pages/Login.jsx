import React, { useContext } from "react";
import MyInput from "../component/UI/input/MyInput";
import { AuthContext } from "../context/AuthContext";
import MyButton from './../component/UI/button/MyButton';

const Login = () => {

	const { isAuth, setIsAuth } = useContext(AuthContext);

	const login = event => {
		event.preventDefault();
		setIsAuth(true)
		localStorage.setItem('auth', 'true')
	}
	return (
		<div>
			<h1>Страница логина</h1>
			<form onSubmit={login}>
				<MyInput type="text" placeholder="Введите логин" />
				<MyInput type="password" placeholder="Введите пароль" />
				<MyButton>Войти</MyButton>
			</form>
		</div>
	)
}

export default Login;