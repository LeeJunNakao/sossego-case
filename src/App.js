import React, { useState, useEffect, useReducer } from "react";

import DataController from "./Controller/DataController";

import Post from "./Components/Post";

import logo from './logo.svg';
import loading from './loading.gif';

import "./App.css";
function App() {
    const [data, setData] = useState([]);
    const [postsList, setPostsList] = useState([]);
    const [postsIndex, setPostsIndex] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    const loadMore = () => {
      const initialIndex = postsIndex;
      const finalIndex = postsIndex + 10;
      const slicedPosts = data.posts.slice(initialIndex,finalIndex);
      const loadedPosts = JSON.parse(JSON.stringify(postsList));
      const posts = [ ...loadedPosts, ...slicedPosts];
      setPostsList(posts);
    }

    const PostList = (props) => {
        if (data.posts && data.users) {

            const list = postsList.map((post) => {

                const userData = data.users.find(
                    (user) =>{
                      return user.id === post.userId
                    } 
                );
                
                return (
                    <Post key={post.id}
                        postId={post.id}
                        title={post.title}
                        body={post.body}
                        userId={userData.id}
                        userName={userData.username}
                    />
                );
            });
            return (
              <div className="posts-list-container">
                {list}
                {props.children}
              </div>
            )
        }else{
          return <div></div>
        }
    };

    return (
        <div className="App">
          <div className="navbar">
            <div className="logo">
              <img src={logo}></img>
            </div>
            <div className="nav-title">ReactPost</div>
          </div>
            <PostList>
              <div className="load-more" onClick={loadMore}></div>
            </PostList>
            <div id="loading-screen">
              <img src={loading}></img>
            </div>
        </div>
    );

    async function getData() {
        const loadingScreen = document.getElementById("loading-screen");
        loadingScreen.style.display="flex";
        const posts = await DataController.getPosts();
        const users = await DataController.getUsers();
        const initialIndex = postsIndex;
        const finalIndex = initialIndex+10;
        const slicedPosts = posts.data.slice(initialIndex,finalIndex);

        setData({
            posts: posts.data,
            users: users.data,
        });

        setPostsList(slicedPosts);
        setPostsIndex(finalIndex);
        loadingScreen.style.display="none";
    }
}

export default App;
