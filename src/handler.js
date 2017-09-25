//
// Base class for Struts Handler
//
class Handler {
  //
  // Constructor accepts reference to emitter. The emitter is central to handler
  // operation and should have can be any implementation as long as it adheres
  // to `EventEmitter` convention.
  // @param emitter The emitter to use for this handler
  //
  constructor(emitter) {
    this.emitter = emitter;
  }
  
  //
  // If no message is provided, enable debug on this handler, otherwise
  // this function will emit a log event if debug is enabled.
  //
  debug(msg) {
    if (msg === undefined) {
      // no argument, enable debug
      this._isDebug = true;
    } else {
      // log only if debug was ever enabled
      if (this._isDebug) {
        this.emitter.emit('log', {
          src: this.constructor.name,
          lvl: 'debug',
          msg: msg
        });
      }
    }
    return this;
  }

  //
  // Standard log message handler
  //
  log(msg) {
    this.emitter.emit('log', {
      src: this.constructor.name,
      lvl: 'normal',
      msg: msg
    });
    return this;
  }
  
  //
  // error handler
  //
  error(err) {
    this.emitter.emit('error', {
      src: this.constructor.name,
      lvl: 'error',
      msg: err
    });
    return this;
  }
  
  
}

//
// exports
//
module.exports = Handler;