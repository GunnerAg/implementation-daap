# marketplace-api
![alt text](https://www.ucavila.es/wp-content/uploads/2022/03/conUcraniaLogo.png)
## Instalación:

* Dentro del directorio marketplace-api, usa npm package manager [npm](https://www.npmjs.com) para ejecutar:


```bash
npm install
```

## Uso:
 Crea un nuevo archivo .env en la raiz de tu directorio y añade tu mnemonic con el nombre: MNEMONIC.

 Posteriormente debes desplegar los contratos, para ello necesitas test ETH de algún faucet.

 Desplegar los contratos en rinkeby:
```
npm run deploy:rinkeby
```

 Desplegar los contratos en goerli:
```
npm run deploy:goerli
```


 Ejecutar la API:
```
npm run start
```

## Licencia:
[MIT](https://choosealicense.com/licenses/mit/)
