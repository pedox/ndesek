var _brain = {
  call: function() {

  },

  getResponse: function(text, callback) {

    console.log("get response !");
    var length = this.listPharse.length,
        pharse = this.listPharse,
        response = {
          isBot: 'bot'
        },
        _ketemu = false;
        _t = this,
        res = null,
        i = 0;
    while(i < length && _ketemu === false)
    {
      if(typeof pharse[i].pattern === "object" ) {
        // do regex pattern
        if(pharse[i].pattern.test(text.toLowerCase())) {
          // cek repeat pharse
          res = _t._setResponse(pharse, i);
          response.text = res.text;
          callback(response);
          _ketemu = true;
        }
      } else {
        // do String pattern
        if(text.toLowerCase().search(pharse[i].pattern) == pharse[i].index) {
          // Response lebih dari 1
          res = _t._setResponse(pharse, i);
          response.text = res.text;
          if(pharse[i].isMovie && res.type === 'response') {
            // Is movie
            response.isBot = 'bot is-movie';
            cordovaHTTP.setHeader("Cookie", "city_id=10; city_name=JAKARTA;", function() {}, function() {});
            cordovaHTTP.get("http://m.21cineplex.com/index?sid=&p=hm",{},{}, function(d) {
              response.isMovie = true;
              response.list = [];
              $(d.data).find("#menu_ol_arrow:eq(0) li").each(function(_,d) {
                response.list.push($(d).text());
              });
              callback(response);
            }, function() {
              response.text = "Maaf kak daftar film nya ga munculx :(";
              callback(response);
            });
          } else if(pharse[i].isBilboard && res.type === 'response') {
            // is Music
            response.isBot = 'bot is-billboard';
            cordovaHTTP.get("http://www.billboard.com/charts/hot-100",{},{}, function(d) {
              response.isBilboard = true;
              response.list = [];
              $(d.data).find(".chart-row").each(function(i,d) {
                if(i < 10) {
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
          } else {
            callback(response);
          }
          _ketemu = true;
        } else if(text.toLowerCase().search(pharse[i].pattern) >= pharse[i].index) {
          res = _t._setResponse(pharse, i);
          response.text = res.text;
          callback(response);
          _ketemu = true;
        }

      }
      i++;
    }

    if(!response.text) {
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

  _setResponse: function(pharse, i) {
    var obj = '';
    if(localStorage.repeatPharse == i) {
      if(pharse[i].repeatGila === false) {
        obj = 'response';
        localStorage.repeatPharseCount = 0;
      } else if(parseInt(localStorage.repeatPharseCount) >= pharse[i].repeatGila) {
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

    if(pharse[i][obj].length > 1) {
      var randIndex = Math.floor(Math.random() * pharse[i][obj].length);
      return {
        text: pharse[i][obj][randIndex].text,
        type: obj
      };
    } else {
    // Response hanya terdiri 1 objek
      return {
        text: pharse[i][obj][0].text,
        type: obj
      };
    }
  },

  listPharse: _pharse
};
