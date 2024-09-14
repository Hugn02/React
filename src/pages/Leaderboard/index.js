import React, { useEffect, useState } from 'react';
import { Table, Card, Space } from 'antd';



function Leaderboard() {
    const [topExams, setTopExams] = useState([]);
    const [topSubjects, setTopSubjects] = useState([]);

    
    useEffect(() => {
        fetch('http://localhost:8080/histories')
            .then(response => response.json())
            .then(data => setTopExams(data));     
    }, []);

    
    useEffect(() => {
        fetch('http://localhost:8080/exams')
            .then(response => response.json())
            .then(data => setTopSubjects(data));     
    }, []);

    
    const examColumns = [
        {
            title: 'Tên đề thi',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Điểm thi',
            dataIndex: 'score',
            key: 'score',
        }
    ];

    
    const subjectColumns = [
        {
            title: 'Tên môn học',
            dataIndex: 'subject',
            key: 'subject',
        },
        {
            title: 'Mức độ',
            dataIndex: 'level',
            key: 'level',
        }
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title="Đề thi được thi nhiều nhất" bordered={false}>
                    <Table 
                        columns={examColumns} 
                        dataSource={topExams} 
                        rowKey="id" 
                        pagination={false} 
                    />
                </Card>

                
                <Card title="Môn học nhiều đề thi nhất" bordered={false}>
                    <Table 
                        columns={subjectColumns} 
                        dataSource={topSubjects} 
                        rowKey="subject" 
                        pagination={false} 
                    />
                </Card>
            </Space>
        </div>
    );
}

export default Leaderboard;
