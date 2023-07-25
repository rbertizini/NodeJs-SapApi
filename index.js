const express = require("express");
const CircularJSON = require("circular-json");
const app = express();
const port = 3000;

const axios = require("axios");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/oi", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log("Executando webapi");
});

app.get("/api/dadosSAP", async (req, res) => {
	//Variáveis
	var response = "";

	try {

		//Constantes
		const apiKey = "Iv5WWPRGgjBHpJjZCOnMGLxrAvDgAzPT";
		const apiUrl =
			"https://sandbox.api.sap.com/s4hanacloud/sap/opu/odata/sap/API_PRODUCT_SRV/A_Product?$inlinecount=allpages&$top=50";

		// Configuração dos parâmetros e headers na requisição
		const options = {
			headers: {
				APIKey: apiKey,
				DataServiceVersion: "2.0",
				Accept: "application/json",
			},
		};

		//Fazer a requisição à API do SAP HUB usando o request-promise
		response = await axios.get(apiUrl, options);
	} catch (error) {
		console.log(error);
		console.error("Erro ao obter os dados do SAP HUB:", error.message);
		res.status(500).json({ error: "Erro ao obter os dados do SAP HUB" });
	}
	//Como debugar para noobies (eu)
	//https://www.alura.com.br/artigos/debugando-projetos-nodejs-no-vscode?gclid=Cj0KCQjw5f2lBhCkARIsAHeTvliBK7tK9u28JHYgRwYcghNhX-YrzC4IBwafdVTwgWSarDH0IvFZXLcaAkcwEALw_wcB

	var jsonFiltro = {
		materials: []
	};

	//Formatando informação
	// Criando uma instância da classe
	const myData = new Materials();

	if (response.data.d.results.length > 0) {
		for (let i = 0; i < response.data.d.results.length; i++) {
			myData.addItem(response.data.d.results[i].Product, response.data.d.results[i].ProductType);						
		}
	}

	// Convertendo a instância para JSON
	const jsonRet = myData.toJSON();
	res.send(jsonRet);
});

class Materials {
	constructor() {
		this.Item = [];
	}

	addItem(id, type) {
		const novoMat = { id, type };
		this.Item.push(novoMat);
	}

	toJSON() {		
		return JSON.stringify({ Item: this.Item });
	}
}