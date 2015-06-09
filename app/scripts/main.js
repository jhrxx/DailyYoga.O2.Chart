new Dragdealer('scroll',{steps:25, flex: true, x: 1});
// new Dragdealer('demo-simple-slider',{steps:3});
var addEvent = function(element, type, callback) {

  if(!element) {
    console.log(element);
  }else if (element.addEventListener) {
    element.addEventListener(type, callback, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + type, callback);
  }
};

var preventEventDefaults = function(e) {
  if (!e) {
    e = window.event;
  }
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.returnValue = false;
};

var stopEventPropagation = function(e) {
  if (!e) {
    e = window.event;
  }
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  e.cancelBubble = true;
};

var Cursor = {
  /**
   * Abstraction for making the combined mouse or touch position available at
   * any time.
   *
   * It picks up the "move" events as an independent component and simply makes
   * the latest x and y mouse/touch position of the user available at any time,
   * which is requested with Cursor.x and Cursor.y respectively.
   *
   * It can receive both mouse and touch events consecutively, extracting the
   * relevant meta data from each type of event.
   *
   * Cursor.refresh(e) is called to update the global x and y values, with a
   * genuine MouseEvent or a TouchEvent from an event listener, e.g.
   * mousedown/up or touchstart/end
   */
  x: 0,
  y: 0,
  xDiff: 0,
  yDiff: 0,
  refresh: function(e) {
    if (!e) {
      e = window.event;
    }
    if (e.type == 'mousemove') {
      this.set(e);
    } else if (e.touches) {
      this.set(e.touches[0]);
    }
  },
  set: function(e) {
    var lastX = this.x,
        lastY = this.y;
    if (e.clientX || e.clientY) {
      this.x = e.clientX;
      this.y = e.clientY;
    } else if (e.pageX || e.pageY) {
      this.x = e.pageX - document.body.scrollLeft - document.documentElement.scrollLeft;
      this.y = e.pageY - document.body.scrollTop - document.documentElement.scrollTop;
    }
    this.xDiff = Math.abs(this.x - lastX);
    this.yDiff = Math.abs(this.y - lastY);
    console.log(this);
  }
};

var wrapper = document.getElementById('scroll'),
    handle =  document.getElementById('content'),

onHandleMouseDown = function(e) {
  Cursor.refresh(e);
  preventEventDefaults(e);
  stopEventPropagation(e);
  activity = false;
  startDrag(e);
},
onHandleTouchStart = function(e) {
  Cursor.refresh(e);
  // Unlike in the `mousedown` event handler, we don't prevent defaults here,
  // because this would disable the dragging altogether. Instead, we prevent
  // it in the `touchmove` handler. Read more about touch events
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events#Handling_clicks
  stopEventPropagation(e);
  activity = false;
  startDrag(e);
},
onDocumentMouseMove = function(e) {
  Cursor.refresh(e);
  if (dragging) {
    activity = true;
    preventEventDefaults(e);
  }
},
onWrapperTouchMove = function(e) {
  Cursor.refresh(e);
  // Dragging on a disabled axis (horizontal or vertical) shouldn't prevent
  // defaults on touch devices. !this.activity denotes this is the first move
  // inside a drag action; you can drag in any direction after this point if
  // the dragging wasn't stopped
  if (!activity) {
    if (dragging) {
      stopDrag(e);
    }
    return;
  }
  // Read comment in `onHandleTouchStart` above, to understand why we're
  // preventing defaults here and not there
  preventEventDefaults(e);
  activity = true;
},
onDocumentMouseUp = function(e) {
  stopDrag(e);
  stopTap(e);
},
onDocumentTouchEnd = function(e) {
  stopDrag(e);
  stopTap(e);
},
startTap = function(e) {
  tapping = true;
  // this.setWrapperOffset();

  // this.setTargetValueByOffset([
  //   Cursor.x - this.offset.wrapper[0] - (this.handle.offsetWidth / 2),
  //   Cursor.y - this.offset.wrapper[1] - (this.handle.offsetHeight / 2)
  // ]);
},
stopTap = function(e) {
  tapping = false;
  // this.setTargetValue(this.value.current);
},
startDrag = function(e){
  // console.log(e);
  // if (this.disabled) {
  //   return;
  // }
  this.dragging = true;
  // this.setWrapperOffset();

  // this.offset.mouse = [
  //   Cursor.x - Position.get(this.handle)[0],
  //   Cursor.y - Position.get(this.handle)[1]
  // ];
  // if (!this.wrapper.className.match(this.options.activeClass)) {
  //   this.wrapper.className += ' ' + this.options.activeClass;
  // }
  // this.callDragStartCallback();
},
stopDrag = function(e) {
  // console.log(e);
  // if (this.disabled || !this.dragging) {
  //   return;
  // }
  this.dragging = false;

  // var target = this.groupClone(this.value.current);
  // if (this.options.slide) {
  //   var ratioChange = this.change;
  //   target[0] += ratioChange[0] * 4;
  //   target[1] += ratioChange[1] * 4;
  // }
  // this.setTargetValue(target);
  // this.wrapper.className = this.wrapper.className.replace(' ' + this.options.activeClass, '');
  // this.callDragStopCallback();
};



// addEvent(handle, 'mousedown', onHandleMouseDown);
// addEvent(handle, 'touchstart', onHandleTouchStart);
// // While dragging
// addEvent(document, 'mousemove', onDocumentMouseMove);
// addEvent(wrapper, 'touchmove', onWrapperTouchMove);
// // Stop dragging/tapping
// addEvent(document, 'mouseup', onDocumentMouseUp);
// addEvent(document, 'touchend', onDocumentTouchEnd);


// addEvent(handle, 'scroll、,,,', onScrolling);
// handle.onscroll = function(e){
//    console.log("scrolling: ", e);
// }
