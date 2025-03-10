function toggleSubjects() {
    const subjectList = document.getElementById('subject-list');
    if (subjectList.style.display === 'none') {
        subjectList.style.display = 'block';
    } else {
        subjectList.style.display = 'none';
    }
}

function toggleParentAndChildren(parentId, childrenId) {
    const parentCheckbox = document.getElementById(parentId);
    const childrenCheckboxes = document.querySelectorAll(`#${childrenId} input[type="checkbox"]`);

    childrenCheckboxes.forEach(child => {
        child.checked = parentCheckbox.checked;
    });
}

function toggleDetails(itemId) {
    const itemContent = document.getElementById(itemId);
    if (itemContent.style.display === 'none') {
        itemContent.style.display = 'block';
    } else {
        itemContent.style.display = 'none';
    }
}

function updateParentCheckbox(parentId, childrenId) {
    const parentCheckbox = document.getElementById(parentId);
    const childrenCheckboxes = document.querySelectorAll(`#${childrenId} input[type="checkbox"]`);
    const allChecked = Array.from(childrenCheckboxes).every(child => child.checked);
    const noneChecked = Array.from(childrenCheckboxes).every(child => !child.checked);

    if (allChecked) {
        parentCheckbox.checked = true;
        parentCheckbox.indeterminate = false;
    } else if (noneChecked) {
        parentCheckbox.checked = false;
        parentCheckbox.indeterminate = false;
    } else {
        parentCheckbox.checked = false;
        parentCheckbox.indeterminate = true;
    }
}

function updateSubjects() {
    const subjects = [
        { id: 'dkorean-a', data: '2025. 3. 1 (0교시)' , name: '심화국어A', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-b', data: '2025. 3. 2 (0교시)' , name: '심화국어B', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-c', data: '2025. 3. 3 (0교시)' , name: '심화국어C', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-d', data: '2025. 3. 4 (0교시)' , name: '심화국어D', details: '내용이 지정되지 않았습니다.' },
        { id: 'geometry-b', data: '2025. 3. 5 (0교시)' , name: '기하B', details: '내용이 지정되지 않았습니다.' },
        { id: 'geometry-c', data: '2025. 3. 6 (0교시)' , name: '기하C', details: '내용이 지정되지 않았습니다.' },
        { id: 'geometry-d', data: '2025. 3. 7 (0교시)' , name: '기하D', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac-a', data: '2025. 3. 8 (0교시)' , name: '화법과 작문A', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac-b', data: '2025. 3. 9 (0교시)' , name: '화법과 작문B', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac-c', data: '2025. 3. 10 (0교시)' , name: '화법과 작문C', details: '내용이 지정되지 않았습니다.' },
        { id: 'english-a', data: '2025. 3. 11 (0교시)' , name: '심화영어A', details: '내용이 지정되지 않았습니다.' },
        { id: 'english-b', data: '2025. 3. 12 (0교시)' , name: '심화영어B', details: '내용이 지정되지 않았습니다.' },
        { id: 'math-a', data: '2025. 3. 13 (0교시)' , name: '심화수학A', details: '내용이 지정되지 않았습니다.' },
        { id: 'math-b', data: '2025. 3. 14 (0교시)' , name: '심화수학B', details: '내용이 지정되지 않았습니다.' },
        { id: 'physics-c', data: '2025. 3. 15 (0교시)' , name: '물리2C', details: '내용이 지정되지 않았습니다.' },
        { id: 'physics-d', data: '2025. 3. 16 (0교시)' , name: '물리2D', details: '내용이 지정되지 않았습니다.' },
        { id: 'chemistry-a', data: '2025. 3. 17 (0교시)' , name: '화학2A', details: '내용이 지정되지 않았습니다.' },
        { id: 'chemistry-b', data: '2025. 3. 18 (0교시)' , name: '화학2B', details: '내용이 지정되지 않았습니다.' },
        { id: 'chemistry-c', data: '2025. 3. 19 (0교시)' , name: '화학2C', details: '내용이 지정되지 않았습니다.' },
        { id: 'life-a', data: '2025. 3. 20 (0교시)' , name: '생명2A', details: '내용이 지정되지 않았습니다.' },
        { id: 'life-b', data: '2025. 3. 21 (0교시)' , name: '생명2B', details: '내용이 지정되지 않았습니다.' },
        { id: 'life-c', data: '2025. 3. 22 (0교시)' , name: '생명2C', details: '내용이 지정되지 않았습니다.' },
        { id: 'life-d', data: '2025. 3. 23 (0교시)' , name: '생명2C', details: '내용이 지정되지 않았습니다.' },
        { id: 'earth-b', data: '2025. 3. 24 (0교시)' , name: '지구2B', details: '내용이 지정되지 않았습니다.' },
        { id: 'earth-d', data: '2025. 3. 25 (0교시)' , name: '지구2D', details: '내용이 지정되지 않았습니다.' },
        { id: 'travel-ag', data: '2025. 3. 26 (0교시)' , name: '여행지리A가', details: '내용이 지정되지 않았습니다.' },
        { id: 'travel-an', data: '2025. 3. 27 (0교시)' , name: '여행지리A나', details: '내용이 지정되지 않았습니다.' },
        { id: 'travel-b', data: '2025. 3. 28 (0교시)' , name: '여행지리B', details: '내용이 지정되지 않았습니다.' },
        { id: 'travel-c', data: '2025. 3. 29 (0교시)' , name: '여행지리C', details: '내용이 지정되지 않았습니다.' },
        { id: 'science', data: '2025. 3. 30 (0교시)' , name: '과학 과제 연구', details: '내용이 지정되지 않았습니다.' },
        { id: 'art', data: '2025. 3. 14 (4교시)' , name: '미술', details: '진로와 관련된 책 한권 빌려오기' }
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

        const subjectDate = new Date(subject.data.split('(')[0].trim());
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const weekLater = new Date();
        weekLater.setDate(today.getDate() + 7);

        if (subjectDate.toDateString() === today.toDateString() || subjectDate.toDateString() === tomorrow.toDateString()) {
            subjectBar.style.backgroundColor = '#FFBBC6';
        } else if (subjectDate > tomorrow && subjectDate <= weekLater) {
            subjectBar.style.backgroundColor = '#FFFF8C';
        }  else if (subjectDate > weekLater) {
            subjectBar.style.backgroundColor = '#C0FFFF';
        } else if (subjectDate < today) {
            subjectBar.style.backgroundColor = '#F4F4F4';
        }

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
