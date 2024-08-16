// savePronunciationRecord.js
async function saveRecord() {
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

    try {
        const data = {
            "pronunciacion": pronunciation,
            "audio_nahuatl_limpio": audioNahu.name,
            "lengua_madre": motherTongue,
            "id_palabra_fk": wordId,
            "id_region_fk": regionId,
            "dialecto": dialect
        };

        // Envía los datos usando fetch
        const response = await fetch('http://192.168.0.151:3003/pronunciaciones', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Maneja la respuesta
        if (response.ok) {
            const result = await response.json();
            console.log('Éxito:', result);
            alert('Registro exitoso. Ahora puedes iniciar sesión.');
        } else if (response.status >= 400 && response.status < 500) {
            console.error('Error del cliente:', response.status, response.statusText);
            alert(`Error del cliente: ${response.status} - ${response.statusText}`);
        } else if (response.status >= 500 && response.status < 600) {
            console.error('Error del servidor:', response.status, response.statusText);
            alert(`Error del servidor: ${response.status} - ${response.statusText}`);
        } else {
            console.error('Error inesperado:', response.status, response.statusText);
            alert(`Error inesperado: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Error en el envío del formulario:', error);
        alert(`Error en el envío del formulario: ${error.message}`);
    }
}
// Función para obtener los registros existentes
async function getRecords() {
    try {
        // Realiza la solicitud GET al servidor
        const response = await fetch('http://192.168.0.151:3003/pronunciaciones');

        if (response.ok) {
            const records = await response.json();
            populateTable(records);
        } else {
            console.error('Error al obtener los registros:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
    }
}

// Función para poblar la tabla con los registros obtenidos
async function populateTable(records) {
    const tableBody = document.getElementById('record-table');
    tableBody.innerHTML = ''; // Limpia la tabla antes de llenarla

    records.forEach(record => {
        const newRow = document.createElement('tr');

        const pronunciation = document.createElement('td');
        pronunciation.textContent = record.pronunciacion;

        const audioNahu = document.createElement('td');
        audioNahu.textContent = record.audio_nahuatl_limpio;

        const motherTongue = document.createElement('td');
        motherTongue.textContent = record.lengua_madre;

        const wordId = document.createElement('td');
        wordId.textContent = record.id_palabra_fk;

        const regionId = document.createElement('td');
        regionId.textContent = record.id_region_fk;

        const dialect = document.createElement('td');
        dialect.textContent = record.dialecto;

        newRow.appendChild(pronunciation);
        newRow.appendChild(audioNahu);
        newRow.appendChild(motherTongue);
        newRow.appendChild(wordId);
        newRow.appendChild(regionId);
        newRow.appendChild(dialect);

        tableBody.appendChild(newRow);
    });
}

// Llama a la función getRecords cuando se carga la página
document.addEventListener('DOMContentLoaded', getRecords);