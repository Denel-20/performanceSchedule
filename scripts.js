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
            subjectBar.style.backgroundColor = '#ACF3FF';
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
