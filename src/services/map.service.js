const axios = require('axios');

async function coordenadas(cep){
    const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${cep}&country=Brazil&limit=1`);
try{
    if (response.data && response.data.length > 0) {
        const {lat, lon} = response.data[0];
        return { lat, lon }
    }else {
        throw new Error('CEP não encontrado');
    }
} catch (error) {
        console.error('Erro ao buscar o endereço:', error);
        throw new Error('Erro ao processar a solicitação')
    }

}