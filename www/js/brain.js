var _brain = {
  call: function() {

  },

  /**
   * Binusmaya Instance from Angular Factory
   */
  binusMaya: function() {
    return angular.element(document.body).injector().get('BinusMaya');
  },

  getResponse: function(text, callback) {

    console.log("get response !");
    var length = this.listPharse.length,
        pharse = this.listPharse,
        response = {
          isBot: 'bot'
        },
        _ketemu = false,
        _t = this,
        res = null,
        i = 0;

    if(localStorage.hasReply) {
      var replyObj = JSON.parse(localStorage.hasReply)
      ,   reply = this.listPharse[replyObj.index].response[replyObj.random].reply;
      pharse = reply;
      length = reply.length;
    }

    while (i < length && _ketemu === false) {
      if (typeof pharse[i].pattern === "object") {
        // do regex pattern
        if (pharse[i].pattern.test(text.toLowerCase())) {
          // cek repeat pharse
          _t._setObjectResponse(text, response, pharse, i, callback);
          _ketemu = true;
        }
      } else {
        // do String pattern
        if (text.toLowerCase().search(pharse[i].pattern) == pharse[i].index) {
          // Response lebih dari 1
          _t._setObjectResponse(text, response, pharse, i, callback);
          _ketemu = true;
        } else if (text.toLowerCase().search(pharse[i].pattern) >= pharse[i].index) {
          res = _t._setResponse(pharse, i);
          response.text = res.text;
          callback(response);
          _ketemu = true;
        }

      }
      i++;
    }

    if (!response.text) {

      if(localStorage.hasReply) {
        delete localStorage.hasReply;
        this.getResponse(text, callback);
        return false;
      }

      var noFound = [
        'saya tidak mengerti bahasa mu ?',
        'kamu tuh ngomong opo :(',
        'ngomong apa sih ??? :('
      ];
      var randIndex = Math.floor(Math.random() * noFound.length);
      response.text = noFound[randIndex];

      callback(response);
    }
  },

  _setObjectResponse: function(text, response, pharse, i, callback) {
    res = this._setResponse(pharse, i);
    response.text = res.text;
    if (pharse[i].isMovie && res.type === 'response') {
      // Is movie
      response.isBot = 'bot is-movie';
      cordovaHTTP.setHeader("Cookie", "city_id=10; city_name=JAKARTA;", function() {}, function() {});
      cordovaHTTP.get("http://m.21cineplex.com/index?sid=&p=hm", {}, {}, function(d) {
        response.isMovie = true;
        response.list = [];
        $(d.data).find("#menu_ol_arrow:eq(0) li").each(function(_, d) {
          response.list.push($(d).text());
        });
        callback(response);
      }, function() {
        response.text = "Maaf kak daftar film nya ga munculx :(";
        callback(response);
      });
    } else if (pharse[i].isBilboard && res.type === 'response') {
      // is Music
      response.isBot = 'bot is-billboard';
      cordovaHTTP.get("http://www.billboard.com/charts/hot-100", {}, {}, function(d) {
        response.isBilboard = true;
        response.list = [];
        $(d.data).find(".chart-row").each(function(i, d) {
          if (i < 10) {
            response.list.push({
              artist: $(d).find(".row-title h3").text(),
              title: $(d).find(".row-title h2").text()
            });
          }
        });
        callback(response);
      }, function() {
        response.text = "Maaf kak daftar musik nya ga munculx :(";
        callback(response);
      });
    } else if (pharse[i].isBusway && res.type === 'response') {
      navigator.geolocation.getCurrentPosition(function(d) {
        //var listHalte = findLocation.findNearby(d.coords.latitude, d.coords.longitude);
        var listHalte = findLocation.findNearby(-6.2057546, 106.7705255);
        
        if(listHalte.length > 0) {
          response.isBot = 'bot is-busway';
          response.isBusway = true;
          response.text = "Ini Halte terdekat dalam radius 500m :)";
          response.list = [];
          for (var i = 0; i < listHalte.length; i++) {
            response.list.push(listHalte[i]);
          }
        } else {
          response.text = "tidak ada halte terdekat dalam radius 500m";
        }
        console.log(response);
        callback(response);
      }, function(d) {
        response.text = "Maaf aku tidak bisa menemukan lokasi ... ";
        callback(response);
      });
    } else if (pharse[i].isBuswayRoute && res.type === 'response') {
      var data = text.match(/^rute (busway|transjakarta) dari (.*) (?::sampai|ke) (.*)/i);
      console.log(data);
      var halte1 = findLocation.findHalte(data[2]),
          halte2 = findLocation.findHalte(data[3]);
      if(halte1 === false) {
        response.text = "Maaf halte " +data[2]+ " tidak di temukan";
        callback(response);
      } else if(halte2 === false) {
        response.text = "Maaf halte " +data[3]+ " tidak di temukan";
        callback(response);
      } else {
        console.log({
          start: halte1.id,
          end: halte2.id
        });
        cordovaHTTP.post("http://transj.twiq.us/api/search/route", {
          start: halte1.id,
          end: halte2.id
        }, {},
        function(d) {
          console.log(d);
          d = JSON.parse(d.data);
          console.log(d);
          if(d.route) {
            response.list = [];
            var line = d.route[0].line;
            for (var i = 0; i < line.length; i++) {
              var station = [];
              for (var j = 0; j < line[i].stations.length; j++) {
                var halte = findLocation.findHaltebyId(line[i].stations[j]);
                station.push({
                  id: line[i].stations[j],
                  name: halte ? halte.name : 'Tidak dikenal'
                });
              }
              response.list.push({stations: station});
            }
            response.isBot = 'bot is-busway-route';
            response.isBuswayRoute = true;
            response.text = "rute untuk halte " + data[2] + " sampai " + data[3];
          } else {
            response.text = "rute tidak ditemukan";
          }
          callback(response);
        }, function(d) {
          response.text = "koneksi internet nya bermasalah :(";
          callback(response);
        });
      }

    } else {
      console.log(pharse[i]);
      callback(response);
    }
  },

  _setResponse: function(pharse, i) {
    var obj = ''
    ,   _t = this;
    if (localStorage.repeatPharse == i) {
      if (pharse[i].repeatGila === false) {
        obj = 'response';
        localStorage.repeatPharseCount = 0;
      } else if (parseInt(localStorage.repeatPharseCount) >= pharse[i].repeatGila) {
        localStorage.repeatPharseCount = 1;
        obj = 'ifrepeat';
      } else {
        localStorage.repeatPharseCount = parseInt(localStorage.repeatPharseCount) + 1;
        obj = 'response';
      }
    } else {
      obj = 'response';
      localStorage.repeatPharseCount = 1;
      localStorage.repeatPharse = i;
    }

    if (pharse[i][obj].length > 1) {
      var randIndex = Math.floor(Math.random() * pharse[i][obj].length);
      _t.setReply(pharse, i, obj, randIndex);
      return {
        text: pharse[i][obj][randIndex].text,
        type: obj
      };
    } else {
      // Response hanya terdiri 1 objek
      _t.setReply(pharse, i, obj, 0);
      return {
        text: pharse[i][obj][0].text,
        type: obj
      };
    }
  },

  setReply: function(pharse, i, obj, randIndex) {
    var replies = pharse[i][obj][randIndex];

    if(replies.reply) {
      console.log("hash next response !");
      localStorage.hasReply = JSON.stringify({
        index: i,
        random: randIndex
      });
    } else {
      console.log("no next response !");
      delete localStorage.hasReply;
    }
  },

  listPharse: _pharse
};
