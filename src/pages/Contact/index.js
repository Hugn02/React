import React from "react";
import { Form, Input, Button, Card, Row, Col, message } from "antd";
import { MailOutlined } from "@ant-design/icons";

const FeedbackForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Feedback submitted:", values);
    // Gọi API gửi email ở đây
    sendFeedbackEmail(values)
      .then(() => {
        message.success("Gửi feedback thành công!");
        form.resetFields();
      })
      .catch(() => {
        message.error("Gửi feedback thất bại, vui lòng thử lại!");
      });
  };

  const sendFeedbackEmail = async (feedbackData) => {
    const response = await fetch("http://localhost:8080/send-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      throw new Error("Failed to send feedback");
    }

    return response.json();
  };

  return (
  
      <Col >
        <Card
          
        >
          <h2 style={{ textAlign: "center", fontSize: "28px", marginBottom: "30px" }}>
            Gửi Feedback
          </h2>
          <Form
            form={form}
            name="feedback"
            onFinish={onFinish}
            layout="vertical"
            style={{ fontSize: "16px" }}
          >
            <Form.Item
              name="name"
              label="Tên của bạn"
              rules={[{ required: true, message: "Vui lòng nhập tên của bạn!" }]}
            >
              <Input
                placeholder="Tên của bạn"
                size="large"
                style={{ borderRadius: "5px", fontSize: "16px" }}
              />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input
                placeholder="Email của bạn"
                size="large"
                style={{ borderRadius: "5px", fontSize: "16px" }}
              />
            </Form.Item>
            <Form.Item
              name="message"
              label="Lời nhắn"
              rules={[{ required: true, message: "Vui lòng nhập lời nhắn!" }]}
            >
              <Input.TextArea
                rows={6}
                placeholder="Lời nhắn của bạn"
                size="large"
                style={{ borderRadius: "5px", fontSize: "16px" }}
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<MailOutlined />}
                size="large"
                style={{ width: "100%", borderRadius: "5px", fontSize: "18px", padding: "10px 0" }}
              >
                Gửi Feedback
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    
  );
};

export default FeedbackForm;
