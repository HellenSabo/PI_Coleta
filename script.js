$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();
        
        const cep = $('#cepInput').val();
        const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&countrycodes=BR`;
        
        $.ajax({
            type: 'GET',
            url: url
        }).done(function(data) {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                const name = data[0].display_name;
                
                $('#ecopontoList').html(`<li class="list-group-item"><strong>${name}</strong><br>Latitude: ${lat}<br>Longitude: ${lon}</li>`);
                
                var mymap = L.map('map').setView([lat, lon], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                }).addTo(mymap);
                
                L.marker([lat, lon]).addTo(mymap)
                    .bindPopup(name)
                    .openPopup();
                    
                $('.results').show();
            } else {
                alert('Endereço não encontrado para o CEP fornecido.');
            }
        }).fail(function(xhr, status, error) {
            console.error('Erro ao buscar Ecopontos:', error);
            alert('Erro ao buscar Ecopontos. Por favor, tente novamente.');
        });
    });
});