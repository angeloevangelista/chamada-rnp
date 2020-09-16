(() => {
  console.clear();

  var studentsContainer = document.getElementsByClassName("list--Z2pj65C")[2];

  var studentsList = studentsContainer.firstChild.children;

  let studentNames = [];

  for (let i = 0; i < studentsList.length; i++) {
    const studentName =
      studentsList[i].children[0].children[0].children[0].children[1]
        .children[0].children[0].innerText;

    studentNames.push(studentName);
  }

  var studentsString = studentNames.toString();

  fetch(`https://chamada-rnp.herokuapp.com/?students=${studentsString}`, {
    method: "GET",
  })
    .then((response) => response.blob())
    .then((blob) => {
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement("a");
      a.href = url;
      a.download = "chamada.txt";
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
})();
