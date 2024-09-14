import React, { useEffect, useState } from 'react';
import { Table, Card, Space } from 'antd';

function Comment() {
    const [Comment, setComment] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/comments')
            .then(response => response.json())
            .then(data => setComment(data));     
    }, []);

     const Columns = [
        {
            title: 'Mã đề thi',
            dataIndex: 'idExam',
            key: 'idExam',
        },
        {
            title: 'Bình luận',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Thời gian',
            dataIndex: 'timestamp',
            key: 'timestamp',
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="Bình luận đề thi" bordered={false}>
                    <Table 
                        columns={Columns} 
                        dataSource={Comment} 
                        rowKey="id" 
                        pagination={false} 
                    />
                </Card>
            </Space>
        </div>
    );
}

export default Comment;
