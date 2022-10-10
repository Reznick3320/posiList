import About from "../pages/About";
import Posts from './../pages/Posts';
import PostIdPage from './../pages/PostIdPage';
import Error from "../pages/Error";


export const routes = [
	{ path: '/about', component: About },
	{ path: '/posts', component: Posts },
	{ path: '/error', component: Error },
	{ path: '/posts/:id', component: PostIdPage },
]