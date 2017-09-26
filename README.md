# struts

no apache here

## Description

struts provides back support for modular Node.js-powered microservices. A struts-powered project is arranged in a hub-spoke pattern with an EventEmitter (or equivalent) module in the center with various worker/handler modules around it. struts provides the boilerplate so that worker/handlers are as simple as possible.

## Usage

### Hub-and-Spoke

struts provides a simple base class called Handler which facilitates a hub-and-spoke pattern using a central EventEmitter. The goal is to keep the various components/handlers DRY by providing as much boilerplate in the Handler base class as possible.

```js

let struts = require('struts');

class ExampleHandler extends struts.Handler {
  //
  // init is called by struts constructor so user doesn't have to
  // call super()
  //
  init() {
    // all events go through hub, which is this.emitter
    this.emitter.on("any.event", () => {
      this.anyFunction()
    })
    
    // this.options is set by struts construtor
    this.options.someParam = this.options.someParam || 5;
  }
  
  //
  // user-defined members can take advantage of struts-provided boilerplate for
  // eventing, logging, and error handling
  //
  anyFunction() {
    this.emitter.emit("another.event", data);
    this.log("some log msg");
    this.debug("only shows in debug mode");
    this.error("emits an 'error' event which will have to be handled");
  }
}

class Hub extends EventEmitter {
  constructor(options) {
    new ExampleHandler(this, options);
  
    // handlers
    ...
  }
}

```

