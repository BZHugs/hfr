var url = "https://data.rennesmetropole.fr/api/records/1.0/search/?dataset=tco-parcsrelais-star-etat-tr&q=&lang=fr&refine.nom=Henri+Fr%C3%A9ville&timezone=Europe%2FParis"

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
    document.getElementById("status").innerHTML = fields.etatremplissage;

    if (fields.etatremplissage === "LIBRE"){
        document.getElementById("status").style = "color: GREEN;";
        document.getElementById("places").innerHTML = fields.jrdinfosoliste;
    }else{
        document.getElementById("status").style = "color: RED;";
        document.getElementById("places").innerHTML = "";
    }
}

function update() {
    getJSON(url,
        function(err, data) {
          if (err !== null) {
            alert('Something went wrong: ' + err);
          } else {
            var fields = data.records[0].fields;
            info_update(fields);
          }
    });
}

update();

setInterval(update, 1000 * 60)

