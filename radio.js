var radio = {
  url: 'http://revo/fsapi/',
  sessionId: null,
  friendlyName: null,
  volumeSteps: null,
  volume: null,
  playInfoName: null,
  playInfoText: null,

  request: function(operation, value, success) {
    var url = this.url + operation + '?pin=1234';
    if(radio.sessionId) { url = url + '&sid=' + radio.sessionId; }
    if(value) { url = url + '&value=' + value; }
    console.log(url);

    $.get({
      url: url,
      success: function(data) {
        console.log(data);
        var xml = $('fsapiResponse', data);

        if(typeof success !== 'undefined') { success(radio, xml); }
      }
    });
  },

  getSessionId: function(success) {
    radio.request('CREATE_SESSION', null, function(radio, xml) {
      radio.sessionId = xml.find('sessionId').text();
      success(radio);
    });
  },

  getFriendlyName: function(success) {
    radio.request('GET/netRemote.sys.info.friendlyName', null, function(radio, xml) {
      radio.friendlyName = xml.find('value').text();
      success(radio);
    });
  },

  getVolumeSteps: function(success) {
    radio.request('GET/netRemote.sys.caps.volumeSteps', null, function(radio, xml) {
      radio.volumeSteps = xml.find('value').text();
      success(radio);
    });
  },

  getVolume: function(success) {
    radio.request('GET/netRemote.sys.audio.volume', null, function(radio, xml) {
      radio.volume = xml.find('value').text();
      success(radio);
    });
  },

  getPlayInfoName: function(success) {
    radio.request('GET/netRemote.play.info.name', null, function(radio, xml) {
      radio.playInfoName = xml.find('value').text();
      success(radio);
    });
  },

  getPlayInfoText: function(success) {
    radio.request('GET/netRemote.play.info.text', null, function(radio, xml) {
      radio.playInfoText = xml.find('value').text();
      success(radio);
    });
  }
};
