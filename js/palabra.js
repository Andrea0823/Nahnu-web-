// saveRecord.js
function saveRecord() {
    const word = document.getElementById('word').value;
    const audioEsp = document.getElementById('audio-espanol').files[0];

    if (!word || !audioEsp) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${word}</td>
        <td>${audioEsp.name}</td>
    `;

    tableBody.appendChild(newRow);

    // Clear the form after saving
    document.getElementById('word').value = '';
    document.getElementById('audio-espanol').value = '';
}
