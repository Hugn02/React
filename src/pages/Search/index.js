import React, { useState, useEffect } from 'react';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredExams, setFilteredExams] = useState([]);

    const exams = [
        { id: 1, title: 'Đề thi HTML 1', subject: 'html', level: 'basic',  },
        { id: 2, title: 'Đề thi CSS2', subject: 'css', level:'medium' },
        { id: 3, title: 'Đề thi javascript 3', subject: 'javascript', level:'advanced' },
        { id: 4, title: 'Đề thi reactjs 4', subject: 'reactjs', level: 'medium' },
    ];

    useEffect(() => {
        const results = exams.filter(exam =>
            exam.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredExams(results);
    }, [searchTerm]);

    return (
        <div>
            <h2>Tìm kiếm đề thi</h2>
            <input
                type="text"
                placeholder="Nhập tên đề thi..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <ul>
                {filteredExams.length > 0 ? (
                    filteredExams.map(exam => (
                        <li key={exam.id}>{exam.title} - {exam.subject} ({exam.level})</li>
                    ))
                ) : (
                    <li>Không tìm thấy đề thi nào</li>
                )}
            </ul>
        </div>
    );
}

export default Search;
