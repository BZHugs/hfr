var url = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&lang=fr&timezone=Europe%2FParis"

var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

function info_update(fields) {

  const container = document.createElement("div");
  const title = document.createElement("h1");
  const status = document.createElement("h2");
  const places = document.createElement("h3");

  container.className = 'grid-item';
  
  title.innerHTML = fields.nom;
  status.innerHTML = fields.etatremplissage;
  places.innerHTML = "";

  if (fields.etatremplissage === "LIBRE"){
    status.style = "color: GREEN;";
    places.innerHTML = fields.jrdinfosoliste;
  }else{
    status.style = "color: RED;";
    places.innerHTML = "";
  }

  container.appendChild(title);
  container.appendChild(status);
  container.appendChild(places);

  document.getElementById("container").appendChild(container);
}

function update() {
    getJSON(url,
        function(err, data) {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            data.records.forEach(record => {
              console.log(record)
              info_update(record.fields);
            });
          }
    });
}

update();

setInterval(update, 1000 * 60)

