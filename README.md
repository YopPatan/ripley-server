## Desafio Ripley

Proyecto que simula un catalogo de productos y muestra el detalle de un producto en especifico.

* Se utiliza la API de ripley para obtener los datos del producto y el catalogo.
* Se utiliza REDIS para guardar los resultados de API de ripley para guardar un cache por 120 segundos.
* Se simula un 15% de errores al momento de consultar API de ripley.

### Instalacion en local

* Descargar repositorio

`git clone https://github.com/YopPatan/ripley-server`

* Compilar frontend

`cd ripley-server/client`

`npm install`

`ng build`

* Compilar backend

`cd ../`

`npm install`

`npm start`

### Prerequisitos Instalacion en GCP
Para la instalcion en GCP se debe tener:
* Proyecto GCP creado
* API de REDIS habilitado
* API de VPC habilitado
* Crear aplicacion en App Engine
* Creacion de instancia REDIS
* Creacion de instancia VPC

### Instalacion en GCP

* Entrar en Cloud Shell

* Descargar repositorio

`git clone https://github.com/YopPatan/ripley-server`

* Compilar frontend

`cd ripley-server/client`

`npm install`

`ng build --prod`

* Compilar backednd

`cd ../`

`export PORT=8080`

`npm install`

`gcloud app deploy`


