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
    
    // call init() if it is defined. This is a struts.Handler user convenience
    // to prevent having to call super() in the derived class constructor. The user
    // may put initialization code in init() and the Handler base will call it.
    if (this.init && typeof(this.init) === 'function') {
      this.init();
    }
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
          lvl: 'debug',
          src: this.constructor.name,
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
      lvl: 'normal',
      src: this.constructor.name,
      msg: msg
    });
    return this;
  }
  
  //
  // error handler
  //
  error(err) {
    this.emitter.emit('error', {
      lvl: 'error',
      src: this.constructor.name,
      msg: err
    });
    return this;
  }
  
  
}

//
// exports
//
module.exports = Handler;