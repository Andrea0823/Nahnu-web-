// saveRegionRecord.js
function saveRecord() {
    const region = document.getElementById('region').value;

    if (!region) {
        alert('Por favor, complete el campo de región.');
        return;
    }

    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${region}</td>
    `;

    tableBody.appendChild(newRow);

    // Clear the form after saving
    document.getElementById('region').value = '';
}
