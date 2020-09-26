<h1 align="center">

![QR Code Generator](.github/images/logo.png)

</h1>

<h3 align="center">
  Chamada RNP
</h3>
<p>

<p align="center">Esta API realiza o download de uma listagem com os participantes de uma conferência.</p>

## Como usar

Apenas cole o script abaixo no `console` das ferramentas do desenvolvedor, em uma janela de conferência da RNP, e rode o comando.

```javascript
(() => {
  fetch("https://chamada-rnp.herokuapp.com/script")
    .then((response) => response.text())
    .then((response) => eval(response));
})();
```
