/*
 *  jquery-boilerplate - v3.5.0
 *  A jump-start for jQuery plugins development.
 *  http://jqueryboilerplate.com
 *
 *  Made by Zeno Rocha
 *  Under MIT License
 */


;(function ( $, window, document, undefined ) {
    var _instance;
    var _overlayPanel;

    "use strict";

    // Create the defaults once
    var pluginName = "Drims",
        defaults = {
            overlayPanel: undefined,
            startPanel: undefined,
            contentPanel: undefined
        };

    // The actual plugin constructor
    function Plugin ( element, options ) {
        this.element = element;
        this.settings = $.extend( {}, defaults, options );
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(Plugin.prototype, {
        init: function () {
            _instance = this;
            _startPanel = this.settings.startPanel;
            _overlayPanel = this.settings.overlayPanel;
            _contentPanel = this.settings.contentPanel;

            var actualPauseScrollValue = 0;
            var windowHeight = $(window).height();

            _startPanel.css("height", windowHeight + "px");
            _overlayPanel.css("height",windowHeight + "px");


            $(document).bind({'mousewheel DOMMouseScroll onmousewheel touchmove scroll': 
                              function(e) {
                                  if (e.target.id == 'el') return;
                                  e.preventDefault();
                                  e.stopPropagation();

                                  if(_overlayPanel != undefined){
                                      var alphaValue = actualPauseScrollValue / windowHeight;

                                      //Determine Direction
                                      if (e.originalEvent.wheelDelta && e.originalEvent.wheelDelta >= 0) {
                                          //Up
                                          if(alphaValue <= 0){alphaValue = 0;}
                                          actualPauseScrollValue = actualPauseScrollValue - 30;

                                      } else if (e.originalEvent.detail && e.originalEvent.detail <= 0) {
                                          //Up
                                          if(alphaValue <= 0){alphaValue = 0;}
                                          actualPauseScrollValue = actualPauseScrollValue - 30;

                                      } else {
                                          //Down
                                          if(alphaValue >= 1){alphaValue = 1;}
                                          actualPauseScrollValue = actualPauseScrollValue + 30;
                                      }
                                      if(alphaValue < 1){
                                          window.scrollTo(0, 0);
                                      }
                                      _overlayPanel.css("opacity", alphaValue);

                                  }
                              }
                             });

            /*$(document).scroll(function(){
                var actualScrollValue = $(window).scrollTop();
                console.log(actualScrollValue);
                if(_overlayPanel != undefined){
                    if(actualPauseScrollValue < windowHeight){
                        if(actualScrollValue > 1){
                            actualPauseScrollValue = actualPauseScrollValue + 50;
                        }else{
                            actualPauseScrollValue = actualPauseScrollValue - 50;
                        }

                        var alphaValue = actualPauseScrollValue / windowHeight;

                        window.scrollTo(0, 1);
                        _overlayPanel.css("opacity", alphaValue);
                    }
                }

            });*/

        },
        SetElementsPosition: function () {

        }
    });

    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        var args = arguments;
        if (options === undefined || typeof options === 'object') {
            return this.each(function () {
                if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
                }
            });
        } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
            var returns;

            this.each(function () {
                var instance = $.data(this, 'plugin_' + pluginName);
                if (instance instanceof Plugin && typeof instance[options] === 'function') {
                    returns = instance[options].apply( instance, Array.prototype.slice.call( args, 1 ) );
                }
                if (options === 'destroy') {
                    $.data(this, 'plugin_' + pluginName, null);
                }
            });
            return returns !== undefined ? returns : this;
        }
    };

})( jQuery, window, document );
