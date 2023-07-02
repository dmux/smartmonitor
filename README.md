# Smart Monitor

[![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/made-with-vue.svg)](https://forthebadge.com)

## Descrição

Smart Monitor é uma plataforma de gestão e coleta de dados de sensores de IoT.

A plataforma conta com as seguintes funcionalidades:

- Gestão de dispositivos (Atualmente ESP32)
- Ingestão de dados através de API
- Relatórios

## Dependências diretas do Projeto

- Node 18.x
- Yarn >=1.22.19
- NuxtJS ^2.15.8

## Serviços Externos

- Auth0
- Viacep
- OneSignal (Push Notification)
- MongoDB Atlas (Database)
- Sensor de Temperatura e Umidade DHT11 com ESP8266 e ESP32

## Variáveis de Ambiente

ALLOWED_ORIGINS = "\*"
NODE_ENV = "production"
PORT = "5000"
BASE_URL = "<http://localhost:3000/api>"
TZ = "America/Sao_Paulo"
AUTH0_DOMAIN = ""
AUTH0_AUDIENCE = ""
AUTH0_CLIENT_ID = ""
AUTH0_CLIENT_SECRET = ""

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn run dev

# build for production and launch server
$ yarn run build
$ yarn run start

# generate static project
$ yarn run generate
```

## Screenhosts

## Devices
![devices](https://github.com/dmux/smartmonitor/assets/2119249/4a4f641c-3b1d-439c-9564-44a72ae4da26)

## IoT Data
![data](https://github.com/dmux/smartmonitor/assets/2119249/403bd4f1-d9a0-4bc0-b4f2-e7a49ab6254b)


