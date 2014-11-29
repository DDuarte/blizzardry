var File, StormLib, attr, ref;

attr = require('attr-accessor');

ref = require('ref');

StormLib = require('./storm-lib');

File = (function() {
  var get, self, set, _ref;

  module.exports = self = File;

  _ref = attr.accessors(File), get = _ref[0], set = _ref[1];

  File.FILE_BEGIN = 0;

  File.FILE_CURRENT = 1;

  File.FILE_END = 2;

  File.MAX_PATH = 260;

  function File(handle) {
    this.handle = handle;
  }

  get({
    name: function() {
      var name;
      if (this.handle) {
        name = new Buffer(self.MAX_PATH);
        if (!StormLib.SFileGetFileName(this.handle, name)) {
          return null;
        }
        return name.readCString();
      }
    }
  });

  get({
    size: function() {
      return this.handle && StormLib.SFileGetFileSize(this.handle, null);
    }
  });

  get({
    data: function() {
      var data;
      if (this.handle) {
        data = new Buffer(this.size);
        this.position = 0;
        if (!StormLib.SFileReadFile(this.handle, data, this.size, null, null)) {
          return null;
        }
        return data;
      }
    }
  });

  set({
    position: function(offset) {
      return StormLib.SFileSetFilePointer(this.handle, offset, null, self.FILE_BEGIN);
    }
  });

  return File;

})();