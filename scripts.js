function toggleSubjects() {
    const subjectList = document.getElementById('subject-list');
    if (subjectList.style.display === 'none') {
        subjectList.style.display = 'block';
    } else {
        subjectList.style.display = 'none';
    }
}

function updateSubjects() {
    const subjects = [
        { id: 'sac', data: '2025. 0. 0(0교시)' , name: '화법과 작문A', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac', data: '2025. 0. 0(0교시)' , name: '화법과 작문B', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac', data: '2025. 0. 0(0교시)' , name: '화법과 작문C', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean', data: '2025. 0. 0(0교시)' , name: '심화국어A', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean', data: '2025. 0. 0(0교시)' , name: '심화국어B', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean', data: '2025. 0. 0(0교시)' , name: '심화국어C', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean', data: '2025. 0. 0(0교시)' , name: '심화국어D', details: '내용이 지정되지 않았습니다.' },
        { id: 'math', data: '2025. 0. 0(0교시)' , name: '심화수학A', details: '내용이 지정되지 않았습니다.' },
        { id: 'math', data: '2025. 0. 0(0교시)' , name: '심화수학B', details: '내용이 지정되지 않았습니다.' },
        { id: 'english', data: '2025. 0. 0(0교시)' , name: '심화영어A', details: '내용이 지정되지 않았습니다.' },
        { id: 'english', data: '2025. 0. 0(0교시)' , name: '심화영어B', details: '내용이 지정되지 않았습니다.' }
    ];

    const subjectContainer = document.getElementById('selected-subjects');
    subjectContainer.innerHTML = '';

    const selectedSubjects = subjects.filter(subject => {
        const checkbox = document.getElementById(subject.id);
        return checkbox && checkbox.checked;
    });

    selectedSubjects.sort((a, b) => new Date(a.data.split('(')[0]) - new Date(b.data.split('(')[0]));

    selectedSubjects.forEach(subject => {
        const subjectBar = document.createElement('div');
        subjectBar.classList.add('subject-bar');
        subjectBar.textContent = `${subject.name} - ${subject.data}`;

        if (Array.isArray(subject.details)) {
            subject.details.forEach(detail => {
                const subjectDetails = document.createElement('div');
                subjectDetails.classList.add('subject-details');
                subjectDetails.textContent = detail;
                subjectBar.appendChild(subjectDetails);
            });
        } else {
            const subjectDetails = document.createElement('div');
            subjectDetails.classList.add('subject-details');
            subjectDetails.textContent = subject.details;
            subjectBar.appendChild(subjectDetails);
        }

        subjectBar.onclick = function() {
            subjectBar.classList.toggle('expanded');
        };

        subjectContainer.appendChild(subjectBar);
    });
}
