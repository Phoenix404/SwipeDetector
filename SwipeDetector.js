function SwipeDetect(el, maxSwipe = 50) {
  var that	= this;
  
  this.elm = el;
  this.isSwiping = false;
  this.swipeStarted = 0;
  
  this.swipeState = 'none';

  this.isSwiped	= function() {
    return that.swipeState;
  }

  this.isTouchSurface = function(e) {
    return (('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0) ||
      (navigator.msMaxTouchPoints > 0));
  }

  this.mouseDown = function(e) {
    e.preventDefault();
    that.isSwiping = true;
    that.swipeStarted = e.clientX;
  }

  this.mouseUp = function(e) {
    e.preventDefault();
    that.isSwiping = false;
	
	return (sw.isSwiped());
  }

  this.mouseMove = function(e) {
    //e.preventDefault();
    if (that.isSwiping) {

      if (that.swipeStarted < e.clientX) // swiping right side --->
        if (e.clientX >= (that.swipeStarted + maxSwipe)) {
          that.swipeState = 'right';
		  return;
		}

      if (that.swipeStarted > e.clientX){ // swiping left side <---
        if (e.clientX <= (that.swipeStarted + maxSwipe)) {
          that.swipeState = 'left';
		  return;
		}
	  }
    }
	
	that.swipeState = 'none';

  }
  
  
  this.touchDown = function(e) { //touch start
    e.preventDefault();
    that.isSwiping = true;
    that.swipeStarted = e.changedTouches[0].clientX;

  }

  this.touchUp = function(e) { //touch end
    e.preventDefault();
    that.isSwiping = false;
	return (sw.isSwiped());
  }

  this.touchMove = function(e) { //touch move
    e.preventDefault();
    if (this.isSwiping){

      if (that.swipeStarted < e.clientX) // swiping right side --->
        if (e.clientX >= (that.swipeStarted + maxSwipe)) {
          that.swipeState = 'right';
		  return;
		}

      if (that.swipeStarted > e.clientX){ // swiping left side <---
        if (e.clientX <= (that.swipeStarted + maxSwipe)) {
          that.swipeState = 'left';
		  return;
		}
	  }
    }
	
	that.swipeState = 'none';
  }

  this.elm.addEventListener('mousedown', this.mouseDown, false);
  this.elm.addEventListener('mousemove', this.mouseMove, false);
  this.elm.addEventListener('mouseup', this.mouseUp, false);

  this.elm.addEventListener('touchstart', this.touchDown, false);
  this.elm.addEventListener('touchmove', this.touchMove, false);
  this.elm.addEventListener('touchend', this.touchUp, false);
}
