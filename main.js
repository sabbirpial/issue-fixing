document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Open';

    const issue = { id, description, severity, assignedTo, status };
    let issues = [];
    if (localStorage.getItem('issues')) {
        issues = JSON.parse(localStorage.getItem('issues'));
    }
    issues.push(issue);
    localStorage.setItem('issues', JSON.stringify(issues));

    document.getElementById('issueInputForm').reset();
    fetchIssues();
    e.preventDefault();
}

const closeIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    console.log(issues)
    const currentIssue = issues.find(issue => issue.id == id);
    currentIssue.description.style.textDecoration = 'line-through'

    currentIssue.status = 'Closed';
    localStorage.setItem('issues', JSON.stringify(issues));

    fetchIssues();
}

const deleteIssue = id => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issues => issues.id != id);
    console.log(remainingIssues)
    localStorage.setItem('issues', JSON.stringify(remainingIssues));

    fetchIssues()
}

const fetchIssues = () => {
    const issues = JSON.parse(localStorage.getItem('issues'));
    document.getElementById('issueCount').innerText = issues.length
    const issuesList = document.getElementById('issuesList');

    console.log(issues.length)
    issuesList.innerHTML = '';

    for (var i = 0; i < issues.length; i++) {
        const { id, description, severity, assignedTo, status } = issues[i];

        issuesList.innerHTML += `<div class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span class="label label-info"> ${status} </span></p>
                              <h3 id="bal"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }
}