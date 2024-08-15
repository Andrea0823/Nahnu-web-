// savePronunciationRecord.js
function saveRecord() {
    const pronunciation = document.getElementById('pronunciation-nahuatl').value;
    const audioNahu = document.getElementById('audio-nahuatl').files[0];
    const motherTongue = document.getElementById('mother-tongue').value;
    const wordId = document.getElementById('word-id').value;
    const regionId = document.getElementById('region-id').value;
    const dialect = document.getElementById('dialect').value;

    if (!pronunciation || !audioNahu || !motherTongue || !wordId || !regionId || !dialect) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${pronunciation}</td>
        <td>${audioNahu.name}</td>
        <td>${motherTongue}</td>
        <td>${wordId}</td>
        <td>${regionId}</td>
        <td>${dialect}</td>
    `;

    tableBody.appendChild(newRow);

    // Clear the form after saving
    document.getElementById('pronunciation-nahuatl').value = '';
    document.getElementById('audio-nahuatl').value = '';
    document.getElementById('mother-tongue').value = '';
    document.getElementById('word-id').value = '';
    document.getElementById('region-id').value = '';
    document.getElementById('dialect').value = '';
}
