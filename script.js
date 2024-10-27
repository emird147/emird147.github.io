function addRow() {
    const table = document.getElementById('gradesTable');
    const row = document.createElement('tr');

    row.innerHTML = `
        <td><input type="checkbox"></td>
        <td><input type="text" placeholder="Course Name"></td>
        <td>
            <select>
                <option value="">--</option>
                <option value="4.0">A+</option>
                <option value="4.0">A</option>
                <option value="3.7">A-</option>
                <option value="3.3">B+</option>
                <option value="3.0">B</option>
                <option value="2.7">B-</option>
                <option value="2.3">C+</option>
                <option value="2.0">C</option>
                <option value="1.7">C-</option>
                <option value="1.3">D+</option>
                <option value="1.0">D</option>
                <option value="0.0">F</option>
            </select>
        </td>
        <td><input type="number" min="0" step="1" placeholder="Credits"></td>
        <td><button class="btn-delete" onclick="deleteRow(this)">X</button></td>
    `;

    table.appendChild(row);
}

function deleteRow(button) {
    const row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
}

function calculateGPA() {
    const rows = document.querySelectorAll('#gradesTable tr');
    let totalCredits = 0;
    let totalGradePoints = 0;

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip header row

        const isChecked = row.querySelector('input[type="checkbox"]').checked;
        const gradeValue = row.querySelector('select').value;
        const creditsValue = row.querySelector('input[type="number"]').value;

        const grade = parseFloat(gradeValue);
        const credits = parseFloat(creditsValue);

        if (isChecked && !isNaN(grade) && !isNaN(credits)) {
            totalGradePoints += grade * credits;
            totalCredits += credits;
        }
    });

    const gpa = totalCredits > 0 ? (totalGradePoints / totalCredits).toFixed(2) : 'N/A';
    document.getElementById('gpaResult').textContent = `GPA: ${gpa}`;
}

function resetTable() {
    const table = document.getElementById('gradesTable');
    while (table.rows.length > 1) table.deleteRow(1); // Keep header row
    document.getElementById('gpaResult').textContent = 'GPA: --';
}
