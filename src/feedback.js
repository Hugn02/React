const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

// Middleware để parse JSON
app.use(bodyParser.json());

// Thiết lập transporter cho Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail', // Sử dụng Gmail, hoặc bạn có thể dùng một SMTP server khác
    auth: {
        user: '',
        pass: '' // Hãy thay bằng mật khẩu ứng dụng nếu dùng Gmail
    }
});

// Tạo API POST để gửi email
app.post('/send-feedback', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: '', // Địa chỉ email nhận feedback
        subject: `Feedback từ ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Lỗi khi gửi email:', error);
            return res.status(500).send('Gửi email thất bại');
        }
        res.status(200).send('Email gửi thành công');
    });
});

app.listen(port, () => {
    console.log(`Server đang chạy trên cổng ${port}`);
});
