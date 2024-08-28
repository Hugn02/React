import React, { useEffect, useState } from 'react';

function Leaderboard() {
    const [topExams, setTopExams] = useState([]);
    const [topSubjects, setTopSubjects] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/histories')
            .then(response => response.json())
            .then(data => setTopExams(data));

        fetch('http://localhost:8080/exams')
            .then(response => response.json())
            .then(data => setTopSubjects(data));
    }, []);

    return (
        <div>
            <h2>Đề thi được thi nhiều nhất</h2>
            <ul>
                {topExams.map(exam => (
                    <li key={exam.id}>
                        {exam.title} - {exam.score} Điểm
                    </li>
                ))}
            </ul>

            <h2>Môn học nhiều đề thi nhất</h2>
            <ul>
                {topSubjects.map(subject => (
                    <li key={subject.id}>
                        {subject.subject} - {subject.level} 
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Leaderboard;
