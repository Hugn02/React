import React, { useEffect, useState } from 'react';

function Comment() {
    const [Comment, setComment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/comments')
            .then(response => response.json())
            .then(data => setComment(data));

        
    }, []);

    return (
        <div>
            <h2>Đề thi được thi nhiều nhất</h2>
            <ul>
                {Comment.map(comment => (
                    <li key={comment.id}>
                        Mã đề thi: {comment.idExam} - {comment.comment} - {comment.timestamp}
                    </li>
                ))}
            </ul>

            
        </div>
    );
}

export default Comment;
