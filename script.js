function addRow() {
    const table = document.getElementById('gradesTable');
    const row = table.insertRow();
    row.innerHTML = `
        <td><input type="checkbox"></td>
        <td><input type="text" placeholder="Course Name"></td>
        <td>
            <select>
                <option value="4.0">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.0">D</option>
                <option value="0.0">F</option>
            </select>
        </td>
        <td><input type="number" min="0" step="1" placeholder="Credits"></td>
        <td><button class="btn-delete" onclick="deleteRow(this)">X</button></td>
    `;
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function calculateGPA() {
    const table = document.getElementById('gradesTable');
    let totalCredits = 0, totalPoints = 0;

    for (const row of table.rows) {
        const isChecked = row.cells[0].firstChild.checked;
        const gradeValue = row.cells[2].firstChild.value;
        const creditsValue = row.cells[3].firstChild.value;

        const grade = parseFloat(gradeValue) || 0;
        const credits = parseFloat(creditsValue) || 0;

        if (isChecked && credits > 0) {
            totalPoints += grade * credits;
            totalCredits += credits;
        }
    }

    const gpa = totalCredits ? (totalPoints / totalCredits).toFixed(2) : '0.00';
    document.getElementById('gpaResult').textContent = `GPA: ${gpa}`;
}

function resetTable() {
    const table = document.getElementById('gradesTable');
    while (table.rows.length > 1) table.deleteRow(1);
    document.getElementById('gpaResult').textContent = 'GPA: --';
}
