import React, { useState, useEffect } from "react";

import DataController from "../Controller/DataController";
import Comment from "./Comment";

import "./post.css";

export const Post = (props) => {
    const { postId, title, userId, body, userName } = props;
    const [showDetails, setShowDetails] = useState(false);

    const Details = () => {
        const [comments, setComments] = useState([]);

        useEffect(() => {
            getData();
        }, []);

        const list = comments.map((comment) => <Comment data={comment} />);

        return <div className="details-container">{list}</div>;

        async function getData() {
            const commentsResponse = await DataController.getComents(postId);
            setComments(commentsResponse.data);
        }
    };
    return (
        <div className="post-container">
            <div className="post">
                <div className="header">
                    <div className="title">{title}</div>
                    <div className="userdata">
                        <div className="username-label">Autor:</div>
                        <div className="username">{userName}</div>
                    </div>
                </div>
                <div className="content">
                    <div className="body">{body}</div>
                </div>
            </div>
            <div className="details">
            {showDetails && <Details />}
            {!showDetails && (
                <div
                    className="show-details"
                    onClick={() => setShowDetails(true)}
                >
                    Detalhes
                </div>
            )}
            </div>
            
        </div>
    );
};

export default Post;
