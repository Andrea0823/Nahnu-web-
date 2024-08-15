// interfaz.js
function saveRecord() {
    // Obtén los valores del formulario
    const audioNahu = document.getElementById('audio-nahuatl').files[0];
    const transcriptionNahu = document.getElementById('transcription-nahuatl').value;
    const audioEsp = document.getElementById('audio-espanol').files[0];
    const transcriptionEsp = document.getElementById('transcription-espanol').value;

    // Verifica si todos los campos están completos
    if (!audioNahu || !transcriptionNahu || !audioEsp || !transcriptionEsp) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    // Crea una nueva fila en la tabla
    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');

    // Crea celdas para la fila
    const audioNahuCell = document.createElement('td');
    audioNahuCell.textContent = audioNahu.name; // Muestra solo el nombre del archivo

    const transcriptionNahuCell = document.createElement('td');
    transcriptionNahuCell.textContent = transcriptionNahu;

    const audioEspCell = document.createElement('td');
    audioEspCell.textContent = audioEsp.name; // Muestra solo el nombre del archivo

    const transcriptionEspCell = document.createElement('td');
    transcriptionEspCell.textContent = transcriptionEsp;

    // Agrega las celdas a la fila
    newRow.appendChild(audioNahuCell);
    newRow.appendChild(transcriptionNahuCell);
    newRow.appendChild(audioEspCell);
    newRow.appendChild(transcriptionEspCell);

    // Agrega la fila al cuerpo de la tabla
    tableBody.appendChild(newRow);

    // Limpia el formulario después de guardar
    document.getElementById('audio-nahuatl').value = '';
    document.getElementById('transcription-nahuatl').value = '';
    document.getElementById('audio-espanol').value = '';
    document.getElementById('transcription-espanol').value = '';
}
