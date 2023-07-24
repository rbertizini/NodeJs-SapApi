const express = require('express')
const CircularJSON = require('circular-json');
const app = express()
const port = 3000

const axios = require('axios');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/oi', (req, res) => {
	res.send('Hello World!')
  })

app.listen(port, () => {
  console.log('Executando webapi')
})


  app.get('/api/dadosSAP', async (req, res) => {
	try {
	  const apiKey = 'Iv5WWPRGgjBHpJjZCOnMGLxrAvDgAzPT'; 
	  
	  const apiUrl = 'https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product?$inlinecount=allpages&$top=50';
	  
	  // Configuração dos parâmetros e headers na requisição
	  const options = {		
		  headers: {			
			  'APIKey': apiKey,
			  'DataServiceVersion': '2.0',
			  'Accept': 'application/json',
			}, // Indica que a resposta deve ser automaticamente parseada como JSON
		};
  
	  // Fazer a requisição à API do SAP HUB usando o request-promise
	  const response = await axios.get(apiUrl, options);
	  console.log (response);
  
	  const jsonString = CircularJSON.stringify(response); 	  
	  console.log(jsonString);

	  res.send(jsonString);
	} catch (error) {
	  console.log(error);
	  console.error('Erro ao obter os dados do SAP HUB:', error.message);
	  res.status(500).json({ error: 'Erro ao obter os dados do SAP HUB' });
	}
  });
  
