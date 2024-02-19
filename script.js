setTimeout(function() {
  const paragraph = document.getElementById('animated-paragraph');
  paragraph.style.display = 'block';
}, 3000);


const myForm = document.getElementById("myForm");
const Output = document.getElementById("output");

myForm.addEventListener("submit", function (event){
  event.preventDefault();
  const removeCreatedElement = document.querySelector(".created");
  if (removeCreatedElement) {
    removeCreatedElement.remove();
  }

  var word = document.getElementById("word").value;
  Output.innerText = "";

  url = "https://www.english-bangla.com/dictionary/" + word;
  const corsProxyUrl = 'https://corsproxy.io/?' + encodeURIComponent(url);

  const req = new XMLHttpRequest();
  req.open("GET", corsProxyUrl);
  req.send();
  req.onload = function() {
    if (req.status === 200) {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(req.responseText, "text/html");
      const collection = xmlDoc.getElementsByClassName("format1");

      if (collection.length == 0) {
          Output.innerText = "Your Search word - " + word + " - did not match exactly any word.";
          return;
      }

      for (let i = 0; i < collection.length; i++) {
        if(i==0) {
          const posData = xmlDoc.querySelector("span.pos").textContent;
          console.log(posData);
          Output.innerText = word + posData + " অর্থঃ " + collection[i].textContent;
        }
        if (i>0) {
          const para = document.createElement("p");
          para.className = "created";
          para.innerHTML = word + collection[i].textContent;
          document.getElementById("more_output").appendChild(para);
        } 
      }
    }
    else {
      console.error('Error:', req.status, req.statusText);
    }
  };
});