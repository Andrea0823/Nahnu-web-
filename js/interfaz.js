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
function saveRecord() {
    // Obtén los valores del formulario
    const word = document.getElementById('word').value;
    const audioFile = document.getElementById('audio-espanol').files[0];
    
    // Verifica si todos los campos están completos
    if (!word || !audioFile) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    // Crea una nueva fila en la tabla
    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');
    
    // Crea celdas para la fila
    const wordCell = document.createElement('td');
    wordCell.textContent = word;
    
    const audioCell = document.createElement('td');
    audioCell.textContent = audioFile.name; // Muestra solo el nombre del archivo
    
    // Agrega las celdas a la fila
    newRow.appendChild(wordCell);
    newRow.appendChild(audioCell);
    
    // Agrega la fila al cuerpo de la tabla
    tableBody.appendChild(newRow);
    
    // Limpia el formulario después de guardar
    document.getElementById('word').value = '';
    document.getElementById('audio-espanol').value = '';
}
function saveRecord() {
    // Obtén los valores del formulario
    const pronunciation = document.getElementById('pronunciation-nahuatl').value;
    const audioFile = document.getElementById('audio-nahuatl').files[0];
    const motherTongue = document.getElementById('mother-tongue').value;
    const wordId = document.getElementById('word-id').value;
    const regionId = document.getElementById('region-id').value;
    const dialect = document.getElementById('dialect').value;
    
    // Verifica si todos los campos están completos
    if (!pronunciation || !audioFile || !motherTongue || !wordId || !regionId || !dialect) {
        alert('Por favor, complete todos los campos.');
        return;
    }
    
    // Crea una nueva fila en la tabla
    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');
    
    // Crea celdas para la fila
    const pronunciationCell = document.createElement('td');
    pronunciationCell.textContent = pronunciation;
    
    const audioCell = document.createElement('td');
    audioCell.textContent = audioFile.name; // Muestra solo el nombre del archivo
    
    const motherTongueCell = document.createElement('td');
    motherTongueCell.textContent = motherTongue;
    
    const wordIdCell = document.createElement('td');
    wordIdCell.textContent = wordId;
    
    const regionIdCell = document.createElement('td');
    regionIdCell.textContent = regionId;
    
    const dialectCell = document.createElement('td');
    dialectCell.textContent = dialect;
    
    // Agrega las celdas a la fila
    newRow.appendChild(pronunciationCell);
    newRow.appendChild(audioCell);
    newRow.appendChild(motherTongueCell);
    newRow.appendChild(wordIdCell);
    newRow.appendChild(regionIdCell);
    newRow.appendChild(dialectCell);
    
    // Agrega la fila al cuerpo de la tabla
    tableBody.appendChild(newRow);
    
    // Limpia el formulario después de guardar
    document.getElementById('pronunciation-nahuatl').value = '';
    document.getElementById('audio-nahuatl').value = '';
    document.getElementById('mother-tongue').value = '';
    document.getElementById('word-id').value = '';
    document.getElementById('region-id').value = '';
    document.getElementById('dialect').value = '';
}
function saveRecord() {
    // Obtén el valor del campo de entrada
    const region = document.getElementById('region').value;

    // Verifica si el campo está vacío
    if (!region) {
        alert('Por favor, complete el campo de región.');
        return;
    }

    // Crea una nueva fila en la tabla
    const tableBody = document.getElementById('record-table');
    const newRow = document.createElement('tr');

    // Crea una celda para la fila
    const regionCell = document.createElement('td');
    regionCell.textContent = region;

    // Agrega la celda a la fila
    newRow.appendChild(regionCell);

    // Agrega la fila al cuerpo de la tabla
    tableBody.appendChild(newRow);

    // Limpia el campo de entrada después de guardar
    document.getElementById('region').value = '';
}
