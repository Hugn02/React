import React, { useState } from 'react';
import { Form, Input, Select, Button, Table, Row, Col, Card } from 'antd';

const { Option } = Select;

const SearchExams = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState([]);

  
  const examData = [
    { id: 1, title: 'Đề thi HTML', subject: 'HTML', level: 'Cơ bản', time: '15 phút' },
    { id: 2, title: 'Đề thi CSS', subject: 'CSS', level: 'Trung bình', time: '20 phút' },
    { id: 3, title: 'Đề thi Javascript', subject: 'Javascript', level: 'Nâng cao', time: '30 phút' },
    { id: 4, title: 'Đề thi React', subject: 'React', level: 'Trung bình', time: '25 phút' },
  ];

  
  const onFinish = (values) => {
    const { keyword, subject, level } = values;

    
    const filteredResults = examData.filter((exam) => {
      const matchesKeyword = keyword ? exam.title.toLowerCase().includes(keyword.toLowerCase()) : true;
      const matchesSubject = subject ? exam.subject === subject : true;
      const matchesLevel = level ? exam.level === level : true;

      return matchesKeyword && matchesSubject && matchesLevel;
    });

    setSearchResults(filteredResults);
  };

  
  const columns = [
    {
      title: 'Tên đề thi',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Môn học',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: 'Mức độ',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'Thời gian',
      dataIndex: 'time',
      key: 'time',
    },
  ];

  return (
    
      <Col >
        <Card style={{ textAlign: "center"}}
          title="Tìm kiếm đề thi"
          
        >
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item name="keyword" label="Từ khóa">
              <Input placeholder="Nhập từ khóa tìm kiếm" />
            </Form.Item>

            <Form.Item name="subject" label="Môn học">
              <Select placeholder="Chọn môn học">
                <Option value="HTML">HTML</Option>
                <Option value="CSS">CSS</Option>
                <Option value="Javascript">Javascript</Option>
                <Option value="React">React</Option>
              </Select>
            </Form.Item>

            <Form.Item name="level" label="Mức độ">
              <Select placeholder="Chọn mức độ">
                <Option value="Cơ bản">Cơ bản</Option>
                <Option value="Trung bình">Trung bình</Option>
                <Option value="Nâng cao">Nâng cao</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Tìm kiếm
              </Button>
            </Form.Item>
          </Form>
        </Card>

        
        {searchResults.length > 0 && (
          <Card title="Kết quả tìm kiếm">
            <Table dataSource={searchResults} columns={columns} rowKey="id" />
          </Card>
        )}
      </Col>
    
  );
};

export default SearchExams;
