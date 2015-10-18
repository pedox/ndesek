var findLocation = {

  // http://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula
  getDistance: function(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return Math.round(d * 1000); // to M
  },
  deg2rad: function(deg) {
    return deg * (Math.PI/180);
  },
  findNearby: function(lat, lon) {
    var station = _halteBusway.data.stations;
    var list = [];
    for(var i = 0; i < station.length; i++)
    {
      var distance = this.getDistance(station[i].lat, station[i].lng, lat,lon);
      if(distance < 500) {
        station[i].distance = distance;
        list.push(station[i]);
      }
    }

    return list;
  },
  findHalte: function(name) {
    var ketemu = false,
        count = 0,
        station = _halteBusway.data.stations;
    while (ketemu === false && count < station.length ) {
      if(name.toLowerCase() == station[count].name.toLowerCase()) {
        ketemu = station[count];
      } else {
        count++;
      }
    }
    return ketemu;
  },
  findHaltebyId: function(id) {
    var ketemu = false,
        count = 0,
        station = _halteBusway.data.stations;
    while (ketemu === false && count < station.length ) {
      if(id == station[count].id) {
        ketemu = station[count];
      } else {
        count++;
      }
    }
    return ketemu;
  }
};
