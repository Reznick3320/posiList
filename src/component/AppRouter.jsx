import React, { useContext } from "react";
import { Routes, Route, Navigate } from 'react-router-dom';

import About from './../pages/About';
import Posts from './../pages/Posts';
import Error from './../pages/Error';
import PostIdPage from './../pages/PostIdPage';
import Login from "../pages/Login";
import { AuthContext } from "../context/AuthContext";
import Loader from './UI/Loader/Loader';


const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext)
	console.log(isAuth);

	if (isLoading) {
		return <Loader />
	}
	return (
		isAuth
			?
			<Routes>
				<Route path="/" element={<Navigate to="/posts" />} />
				<Route path="/about" element={<About />} />
				<Route path="/posts" element={<Posts />} />
				<Route path="/posts/:id" element={<PostIdPage />} />
				<Route path="/error" element={<Error />} />
				<Route path="*" element={<Navigate to="/posts" />} />
			</Routes>
			:
			<Routes>
				<Route path="/" element={<Navigate to="/login" />} />
				<Route path="/login" element={<Login />} />
				<Route path="/error" element={<Error />} />
				<Route path="*" element={<Navigate to="/login" />} />

			</Routes>


	)
}

export default AppRouter;