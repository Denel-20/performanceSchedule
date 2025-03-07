// 과목 리스트 토글 (보이기/숨기기)
function toggleSubjects() {
    const subjectList = document.getElementById('subject-list');
    if (subjectList.style.display === 'none') {
        subjectList.style.display = 'block';
    } else {
        subjectList.style.display = 'none';
    }
}

// 부모-자식 체크박스 상태 동기화
function toggleParentAndChildren(parentId, childrenId) {
    const parentCheckbox = document.getElementById(parentId);
    const childrenCheckboxes = document.querySelectorAll(`#${childrenId} input[type="checkbox"]`);

    childrenCheckboxes.forEach(child => {
        child.checked = parentCheckbox.checked;
    });
}

// 개별 항목의 하위 내용 표시/숨기기
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
        { id: 'sac-a', data: '2025. 0. 0(0교시)' , name: '화법과 작문A', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac-b', data: '2025. 0. 0(0교시)' , name: '화법과 작문B', details: '내용이 지정되지 않았습니다.' },
        { id: 'sac-c', data: '2025. 0. 0(0교시)' , name: '화법과 작문C', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-a', data: '2025. 0. 0(0교시)' , name: '심화국어A', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-b', data: '2025. 0. 0(0교시)' , name: '심화국어B', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-c', data: '2025. 0. 0(0교시)' , name: '심화국어C', details: '내용이 지정되지 않았습니다.' },
        { id: 'dkorean-d', data: '2025. 0. 0(0교시)' , name: '심화국어D', details: '내용이 지정되지 않았습니다.' },
        { id: 'math-a', data: '2025. 0. 0(0교시)' , name: '심화수학A', details: '내용이 지정되지 않았습니다.' },
        { id: 'math-b', data: '2025. 0. 0(0교시)' , name: '심화수학B', details: '내용이 지정되지 않았습니다.' },
        { id: 'english-a', data: '2025. 0. 0(0교시)' , name: '심화영어A', details: '내용이 지정되지 않았습니다.' },
        { id: 'english-b', data: '2025. 0. 0(0교시)' , name: '심화영어B', details: '내용이 지정되지 않았습니다.' },
        { id: 'art', data: '2025. 3. 14(4교시)' , name: '미술', details: '진로와 관련된 책 한권 빌려오기' }
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
