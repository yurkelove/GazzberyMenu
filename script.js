(function(){
  
  //t = current time
  //b = start value
  //c = change in value
  //d = duration
  Math.easeInOutQuad = function (t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
  };
  
  var app = {
    cache: function() {      
      this.$body = document.documentEelement || document.body;
    },
    events: function() {
      // If you comment the line below, the automatic scroll to next page will be deactivated;
      window.onscroll = this.scrolling.bind(this);
    },
    init: function() {
      this.scrollTop   = 0;
      this.isScrolling = false;
      this.duration    = 500;
      this.vHeight     = window.innerHeight;
      
      this.cache();
      this.events();
    },
    scrolling: function(e) {
      var scrollTop;
      
      if(this.isScrolling) return;
      
      this.vHeight = window.innerHeight;
      scrollTop    = this.$body.scrollTop;
      
      if( scrollTop > this.scrollTop )
        this.scrollTo(this.$body, (this.scrollTop + this.vHeight), this.duration);
      else
        this.scrollTo(this.$body, (this.scrollTop - this.vHeight), this.duration);
    },
    scrollTo: function(element, to, duration) {
      var start = element.scrollTop,
          change = to - start,
          currentTime = 0,
          increment = 20,
          self = this;
        
      var animateScroll = function(){        
          currentTime += increment;
          var val = Math.easeInOutQuad(currentTime, start, change, duration);
          element.scrollTop = val;
          if(currentTime <= duration) {
              setTimeout(animateScroll, increment);
          } else {
            self.scrollTop = element.scrollTop;
            setTimeout(function(){ self.isScrolling = false },increment);
          }
      };
      
      this.isScrolling = true;
      animateScroll();
    }
  };
 
  app.init();
  
})();