import React from 'react'

import './comment.css';

export const Comment = (props) => {
    const { id, name, email, body } = props.data;
    
    return(
        <div className="comment-container">
                <div className="header">
                    <div className="title">{name}</div>
                    <div className="userdata">
                        <div className="username-label">Autor:</div>
                        <div className="username">{email}</div>
                    </div>
                </div>
                <div className="content">
                <div className="body">{body}</div>
            </div>
            </div>
    )

}

export default Comment;