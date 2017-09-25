//
// Base class for Struts Handler
//
class Handler {
  
  constructor(emitter) {
    this.emitter = emitter;
  }
  
  //
  // Log message handler
  //
  log(msg) {
    this.emitter.emit('log', {
      src: this.constructor.name,
      msg: msg
    });
  }
  
  //
  // error handler
  //
  error(err) {
    this.emitter.emit('error', {
      src: this.constructor.name,
      msg: err
    });
  }
}

//
// exports
//
module.exports = Handler;