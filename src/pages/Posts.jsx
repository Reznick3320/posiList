import React, { useEffect, useState } from "react";
import { useFeching } from './../hooks/useFeching';
import { usePost } from "../hooks/usePost";

import PostService from './../API/PostService';
import { getPageCount } from './../utils/pages';
import MyButton from './../component/UI/button/MyButton';
import MyModal from './../component/UI/MyModal/MyModal';
import PostForm from './../component/PostForm';
import PostFilter from './../component/PostFilter';
import PostList from './../component/PostList';
import Paginations from './../component/UI/pagination/Paginations';
import Loader from './../component/UI/Loader/Loader';



function Posts() {
	const [posts, setPosts] = useState([]);

	const [filter, setFilter] = useState({ sort: '', query: '' });
	const [modal, setModal] = useState(false);

	const [totalPages, setTotalPages] = useState(0);
	const [limit, setLimit] = useState(10);
	const [page, setPage] = useState(1);


	const [fetchPosts, isPostsLoading, postError] = useFeching(async (limit, page) => {
		const responce = await PostService.getAll(limit, page);
		setPosts(responce.data);
		const totalCount = responce.headers['x-total-count'];
		setTotalPages(getPageCount(totalCount, limit));
	})


	useEffect(() => {
		fetchPosts(limit, page);
	}, []);

	const sortedAndSearchPost = usePost(posts, filter.sort, filter.query);

	const createPost = (newPost) => {
		setPosts([...posts, newPost]);
		setModal(false)
	}

	const removePost = (post) => {
		setPosts(posts.filter(p => p.id !== post.id));
	}

	const changePage = (page) => {
		setPage(page);
		fetchPosts(limit, page)
	}


	return (
		<div className="App">
			<MyButton style={{ marginTop: 15 }} onClick={() => setModal(true)}>
				Создать пост
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>

			<hr style={{ margin: '15px 0' }} />
			<PostFilter
				filter={filter}
				setFilter={setFilter}
			/>
			{postError &&
				<h1>Произошла ошибка ${postError}</h1>
			}
			{isPostsLoading
				? <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
				: <PostList remove={removePost} posts={sortedAndSearchPost} title="Список постов" />
			}
			<Paginations
				page={page}
				changePage={changePage}
				totalPages={totalPages}
			/>

		</div>
	);
}
export default Posts;
