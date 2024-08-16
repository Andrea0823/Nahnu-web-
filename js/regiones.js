// saveRegionRecord.js
async function saveRecord() {
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

    try {
        const data = {
            "region": region
        };

        // Envía los datos usando fetch
        const response = await fetch('http://192.168.0.151:3003/regiones', {
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
        const response = await fetch('http://192.168.0.151:3003/regiones');

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

        const region = document.createElement('td');
        region.textContent = record.region;

        newRow.appendChild(region);

        tableBody.appendChild(newRow);
    });
}

// Llama a la función getRecords cuando se carga la página
document.addEventListener('DOMContentLoaded', getRecords);