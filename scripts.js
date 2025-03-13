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
        { id: 'art', data: '2025. 4. 4 (4교시)' , name: '미술', details: ['자신의 진로와 관련된 책 속 한 문장을 일러스트와 어울리게 자신의 서체로 표현한다.', ' *문장을 암기하여 실시한다.(문장 또는 책 수정시 반드시 리로스쿨 수정정)'] },
        { id: 'art', data: '2025. 4. 11 (4교시)' , name: '미술', details: ['자신의 진로와 관련된 책 속 한 문장을 일러스트와 어울리게 자신의 서체로 표현한다.', ' *문장을 암기하여 실시한다.(문장 또는 책 수정시 반드시 리로스쿨 수정정)'] },
        { id: 'art', data: '2025. 4. 18 (4교시)' , name: '미술', details: ['캘리그래피 발표대본을 자유 형식으로 200자 원고 작성하기', ' *책제목, 저자, 선택 문구 정확히 소개']}
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
            subjectBar.style.backgroundColor = '#C8FAC8';
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