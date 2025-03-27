function saveAllCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const state = {};

    checkboxes.forEach(checkbox => {
        state[checkbox.id] = {
            checked: checkbox.checked,
            indeterminate: checkbox.indeterminate
        };
    });

    localStorage.setItem('checkboxStates', JSON.stringify(state));
}

function loadAllCheckboxStates() {
    const state = JSON.parse(localStorage.getItem('checkboxStates') || '{}');

    Object.keys(state).forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.checked = state[id].checked;
            checkbox.indeterminate = state[id].indeterminate;
        }
    });

    updateSubjects()
}

function toggleSubjects() {
    const subjectList = document.getElementById('subject-list');
    if (subjectList.style.display === 'none') {
        subjectList.style.display = 'block';
    } else {
        subjectList.style.display = 'none';
    }
    saveAllCheckboxStates();
}

function toggleParentAndChildren(parentId, childrenId) {
    const parentCheckbox = document.getElementById(parentId);
    const childrenCheckboxes = document.querySelectorAll(`#${childrenId} input[type="checkbox"]`);

    childrenCheckboxes.forEach(child => {
        child.checked = parentCheckbox.checked;
        child.indeterminate = false;
    });

    saveAllCheckboxStates();
}

function toggleDetails(itemId) {
    const itemContent = document.getElementById(itemId);
    if (itemContent.style.display === 'none') {
        itemContent.style.display = 'block';
    } else {
        itemContent.style.display = 'none';
    }
    saveAllCheckboxStates();
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

    saveAllCheckboxStates();
}

function updateSubjects() {
    const subjects = [
        { id: 'art', data: '2025. 4. 4 (4교시)', name: '미술', details: ['자신의 진로와 관련된 책 속 한 문장을 일러스트와 어울리게 자신의 서체로 표현한다.', '*문장을 암기하여 실시한다.(문장 또는 책 수정 시 반드시 리로스쿨 수정정)'] },
        { id: 'art', data: '2025. 4. 11 (4교시)', name: '미술', details: ['자신의 진로와 관련된 책 속 한 문장을 일러스트와 어울리게 자신의 서체로 표현한다.', '*문장을 암기하여 실시한다.(문장 또는 책 수정 시 반드시 리로스쿨 수정정)'] },
        { id: 'art', data: '2025. 4. 18 (4교시)', name: '미술', details: ['캘리그래피 발표 대본을 자유 형식으로 200자 원고 작성하기', '*책 제목, 저자, 선택 문구 정확히 소개'] },
        { id: 'travel-ag', data: '2025. 3. 31 (3교시)' , name: '여행지리A가', details: '제시되는 표에 나열된 국가 이름과 지도에서 해당 국가의 위치 번호를 연결하여 표를 완성하기' },
        { id: 'travel-an', data: '2025. 3. 31 (3교시)' , name: '여행지리A나', details: '제시되는 표에 나열된 국가 이름과 지도에서 해당 국가의 위치 번호를 연결하여 표를 완성하기' },
        { id: 'travel-b', data: '2025. 4. 1 (3교시)' , name: '여행지리B', details: '제시되는 표에 나열된 국가 이름과 지도에서 해당 국가의 위치 번호를 연결하여 표를 완성하기' },
        { id: 'travel-c', data: '2025. 4. 3 (3교시)' , name: '여행지리C', details: '제시되는 표에 나열된 국가 이름과 지도에서 해당 국가의 위치 번호를 연결하여 표를 완성하기' },
        { id: 'chemistry-a', data: '2025. 4. 4 (23:00)' , name: '화학2A', details: ['화2 교과서(대단원 1,2,4단원) 내에서 자신의 진로와 관련된 탐구 주제를 선정 후 리로스쿨에 간략하게 작성하기', '*결론 도출이 가능한 주제, 탐구할 만한 주제여야함'] },
        { id: 'chemistry-b', data: '2025. 4. 4 (23:00)' , name: '화학2B', details: ['화2 교과서(대단원 1,2,4단원) 내에서 자신의 진로와 관련된 탐구 주제를 선정 후 리로스쿨에 간략하게 작성하기', '*결론 도출이 가능한 주제, 탐구할 만한 주제여야함'] },
        { id: 'chemistry-c', data: '2025. 4. 4 (23:00)' , name: '화학2C', details: ['화2 교과서(대단원 1,2,4단원) 내에서 자신의 진로와 관련된 탐구 주제를 선정 후 리로스쿨에 간략하게 작성하기', '*결론 도출이 가능한 주제, 탐구할 만한 주제여야함'] },
        { id: 'chemistry-a', data: '2025. 5. 15 (5교시)' , name: '화학2A', details: '리로스쿨에 제출한 예비 보고서 내용을 참고하여서 보고서 작성하기' },
        { id: 'chemistry-a', data: '2025. 5. 22 (5교시)' , name: '화학2A', details: '리로스쿨에 제출한 예비 보고서 내용을 참고하여서 보고서 작성하기' },
        { id: 'chemistry-b', data: '2025. 5. 13 (3교시)' , name: '화학2B', details: '리로스쿨에 제출한 예비 보고서 내용을 참고하여서 보고서 작성하기' },
        { id: 'chemistry-b', data: '2025. 5. 20 (3교시)' , name: '화학2B', details: '리로스쿨에 제출한 예비 보고서 내용을 참고하여서 보고서 작성하기' },
        { id: 'chemistry-c', data: '2025. 5. 12 (5교시)' , name: '화학2C', details: '리로스쿨에 제출한 예비 보고서 내용을 참고하여서 보고서 작성하기' },
        { id: 'chemistry-c', data: '2025. 5. 19 (5교시)' , name: '화학2C', details: '리로스쿨에 제출한 예비 보고서 내용을 참고하여서 보고서 작성하기' }
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
        weekLater.setDate(today.getDate() + 5);

        if (subjectDate.toDateString() === today.toDateString() || subjectDate.toDateString() === tomorrow.toDateString()) {
            subjectBar.style.backgroundColor = '#FFBBC6';
        } else if (subjectDate > tomorrow && subjectDate <= weekLater) {
            subjectBar.style.backgroundColor = '#FFFF8C';
        } else if (subjectDate > weekLater) {
            subjectBar.style.backgroundColor = '#96FFFF';
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

window.onload = loadAllCheckboxStates;

document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', saveAllCheckboxStates);
});
