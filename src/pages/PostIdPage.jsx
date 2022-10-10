import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useFeching } from './../hooks/useFeching';
import PostService from './../API/PostService';
import Loader from "../component/UI/Loader/Loader";

const PostIdPage = () => {
	const params = useParams();
	const [post, setPost] = useState({});
	const [comments, setComments] = useState([]);

	const [fetchPostById, isLoading, error] = useFeching(async (id) => {
		const response = await PostService.getById(id);
		setPost(response.data)
	});

	const [fetchComments, isComLoading, comError] = useFeching(async (id) => {
		const response = await PostService.getCommentsByPostId(id);
		setComments(response.data);
	});

	useEffect(() => {
		fetchPostById(params.id);
		fetchComments(params.id);
	}, [])
	return (
		<div>
			<h1>Вы открыли страницу поста c ID = {params.id}</h1>
			{isLoading
				? <Loader />
				: <div> {post.id} {post.title}</div>
			}

			{isComLoading
				? <Loader />
				: <div>{comments.map(comment =>
					<div key={comment.id} style={{ marginTop: 15 }}>
						<h5>{comment.email}</h5>
						<div>{comment.body}</div>
					</div>
				)}</div>
			}

		</div>

	)
}

export default PostIdPage;