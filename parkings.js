var url = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&lang=fr&timezone=Europe%2FParis"

function openMap(name, x, y) {
  let coord = x+","+y;
  const query = encodeURIComponent(`${name} (${coord})`);
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`);
}

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
  container.className = 'grid-item';
  container.setAttribute("onclick", "openMap('"+fields.nom+"', '"+fields.coordonnees[0]+"', '"+fields.coordonnees[1]+"')")

  const title = document.createElement("h1");
  const status = document.createElement("h2");
  const places = document.createElement("h3");

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
            document.getElementById("container").innerHTML = '';
            data.records.forEach(record => {
              info_update(record.fields);
            });
          }
    });
}

update();

setInterval(update, 1000*30)

