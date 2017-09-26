//
// Base class for a Struts Handler
//
class Handler {
  //
  // Constructor accepts reference to emitter. The emitter is central to handler
  // operation and should have can be any implementation as long as it adheres
  // to `EventEmitter` convention.
  // @param emitter The emitter to use for this handler
  // @param options A freeform object specifying options used by derived class
  //
  constructor(emitter, options={}) {
    this.emitter = emitter;
    this.options = options;
    
    // call init() if it is defined. This is a struts.Handler user convenience
    // to prevent having to call super() in the derived class constructor. The user
    // may put initialization code in init() and the Handler base will call it.
    if (this.init && typeof(this.init) === 'function') {
      this.init();
    }
    
    // handle global struts debug enable event
    this.emitter.on('struts.debug', () => this.debug());
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
        this.emitter.emit('struts.log', {
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
    this.emitter.emit('struts.log', {
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
    // keep this event as 'error' to take advantage of the native checks that
    // make sure the event is handled.
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