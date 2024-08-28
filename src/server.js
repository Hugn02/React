const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('http://localhost:8080/comments'); // Đường dẫn tới db.json
const fs = require('fs');

app.use(bodyParser.json());

// API lấy danh sách bình luận cho một đề thi cụ thể
app.get('/api/comments/:idExam', (req, res) => {
    const { idExam } = req.params;
    const examComments = db.comments.filter(comment => comment.idExam === idExam);
    res.json(examComments);
});

// API thêm bình luận cho một đề thi
app.post('/api/comments', (req, res) => {
    const { idExam, idUser, comment } = req.body;
    
    // Tạo một ID duy nhất cho bình luận mới
    const newComment = {
        id: (db.comments.length + 1).toString(),
        idExam,
        idUser,
        comment,
        timestamp: new Date().toISOString()
    };

    db.comments.push(newComment);

    // Ghi lại file JSON để lưu trữ bình luận mới
    fs.writeFile('http://localhost:8080/comments', JSON.stringify(db, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to save comment' });
        }
        res.status(201).json(newComment);
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
