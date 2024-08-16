// interfaz.js
async function saveRecord() {
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

    try {
        // Declarar variables para los IDs
        let nah = null;
        let esp = null;

        // Enviar datos nahuatl
        const dataNahu = {
            "audio_nahuatl": audioNahu.name,
            "transcripcion_nahuatl": transcriptionNahu
        };

        const responseNahu = await fetch('http://192.168.0.151:3001/contenido_nahuatl', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataNahu),
        });

        // Maneja la respuesta
        if (responseNahu.ok) {
            const resultNahu = await responseNahu.json();
            console.log('Éxito en contenido_nahuatl:', resultNahu.id_contenido_nahuatl);
            nah = resultNahu.id_contenido_nahuatl;
        } else {
            handleError(responseNahu);
            return; // Salir si hay un error
        }

        // Enviar datos español
        const dataEsp = {
            "audio_esp": audioEsp.name,
            "transcripcion_esp": transcriptionEsp
        };

        const responseEsp = await fetch('http://192.168.0.151:3001/contenido_esp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataEsp),
        });

        // Maneja la respuesta
        if (responseEsp.ok) {
            const resultEsp = await responseEsp.json();
            console.log('Éxito en contenido_esp:', resultEsp.id_contenido_esp);
            esp = resultEsp.id_contenido_esp;
        } else {
            handleError(responseEsp);
            return; // Salir si hay un error
        }

        // Enviar datos traductor
        const data = {
            "id_contenido_nahuatl": nah,
            "id_contenido_esp": esp
        };

        const response = await fetch('http://192.168.0.151:3001/traductores', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Maneja la respuesta
        if (response.ok) {
            const result = await response.json();
            console.log('Éxito en traductores:', result);
        } else {
            handleError(response);
        }
    } catch (error) {
        console.error('Error en el envío del formulario:', error);
        alert(`Error en el envío del formulario: ${error.message}`);
    }
}

// Función para manejar errores en las respuestas
function handleError(response) {
    if (response.status >= 400 && response.status < 500) {
        console.error('Error del cliente:', response.status, response.statusText);
        alert(`Error del cliente: ${response.status} - ${response.statusText}`);
    } else if (response.status >= 500 && response.status < 600) {
        console.error('Error del servidor:', response.status, response.statusText);
        alert(`Error del servidor: ${response.status} - ${response.statusText}`);
    } else {
        console.error('Error inesperado:', response.status, response.statusText);
        alert(`Error inesperado: ${response.status} - ${response.statusText}`);
    }
}
// Función para obtener los registros existentes
async function getRecords() {
    try {
        // Realiza las solicitudes GET al servidor
        const [responseNahu, responseEsp] = await Promise.all([
            fetch('http://192.168.0.151:3001/contenido_nahuatl'),
            fetch('http://192.168.0.151:3001/contenido_esp')
        ]);

        // Verifica que ambas respuestas sean exitosas
        if (responseNahu.ok && responseEsp.ok) {
            const recordsNahu = await responseNahu.json();
            const recordsEsp = await responseEsp.json();

            // Combina los registros de ambos endpoints
            const combinedRecords = recordsNahu.map((nahRecord, index) => ({
                audio_nahuatl: nahRecord.audio_nahuatl,
                transcripcion_nahuatl: nahRecord.transcripcion_nahuatl,
                audio_esp: recordsEsp[index]?.audio_esp || 'N/A', // Usa 'N/A' si no hay registro en el segundo endpoint
                transcripcion_esp: recordsEsp[index]?.transcripcion_esp || 'N/A' // Usa 'N/A' si no hay registro en el segundo endpoint
            }));

            populateTable(combinedRecords);
        } else {
            console.error('Error al obtener los registros:', responseNahu.status, responseEsp.status);
        }
    } catch (error) {
        console.error('Error en la solicitud GET:', error);
    }
}

// Función para poblar la tabla con los registros obtenidos
function populateTable(records) {
    const tableBody = document.getElementById('record-table');
    tableBody.innerHTML = ''; // Limpia la tabla antes de llenarla

    records.forEach(record => {
        const newRow = document.createElement('tr');

        const audioNahuCell = document.createElement('td');
        audioNahuCell.textContent = record.audio_nahuatl;

        const transcriptionNahuCell = document.createElement('td');
        transcriptionNahuCell.textContent = record.transcripcion_nahuatl;

        const audioEspCell = document.createElement('td');
        audioEspCell.textContent = record.audio_esp;

        const transcriptionEspCell = document.createElement('td');
        transcriptionEspCell.textContent = record.transcripcion_esp;

        newRow.appendChild(audioNahuCell);
        newRow.appendChild(transcriptionNahuCell);
        newRow.appendChild(audioEspCell);
        newRow.appendChild(transcriptionEspCell);

        tableBody.appendChild(newRow);
    });
}

// Llama a la función getRecords cuando se carga la página
document.addEventListener('DOMContentLoaded', getRecords);