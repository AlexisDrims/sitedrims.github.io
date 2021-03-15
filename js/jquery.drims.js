var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

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
    var _contentPanel;
    var _sectionWarper;
    var _titleBar;
    var _MAX_OPACITY_VALUE_ = 1;
    var windowHeight;

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
            _sectionWarper = $(this.element);
            _titleBar = $(".title-bar");

            SetElementsPosition();

            loadLazyImages();

            $(document).scroll(function(){
                setScrollPosition();

                if($(document).scrollTop() > $(window).height() - _titleBar.height()){
                    
                    _titleBar.animate({
                        paddingTop: 15,
                        paddingBottom: 15
                    }, 200, function() {
                        _titleBar.clearQueue().stop();
                    });
                }else{
                    
                    _titleBar.animate({
                        paddingTop: 20,
                        paddingBottom: 20
                    }, 200, function() {
                        _titleBar.clearQueue().stop();
                    });
                }
            });
        },
        SetElementsPosition: function () {
            SetElementsPosition();
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

    function SetElementsPosition(){
        var actualPauseScrollValue = 0;
        var windowHeight = $(window).height();
        var windowWidth = $(window).width();

        _startPanel.css("height", windowHeight + "px");
        _startPanel.css("position","fixed");
        _startPanel.css("top","0");
        _startPanel.css("z-index","101");
        _overlayPanel.css("height",windowHeight + "px");
        _overlayPanel.css("position","fixed");
        _overlayPanel.css("top","0");
        _overlayPanel.css("z-index","102");
        _contentPanel.css("position","absolute");
        _contentPanel.css("z-index","103");

        if(_overlayPanel.length == 0){
            _contentPanel.css("top", windowHeight + "px");
            _sectionWarper.css("height",windowHeight + _contentPanel.height() + "px");
        }else if(isMobile.phone || isMobile.tablet){
            _contentPanel.css("top", windowHeight * 2 + "px");
            _sectionWarper.css("height",windowHeight * 2 + _contentPanel.height() + "px");
            _overlayPanel.css("display" , "block");
            _overlayPanel.css("position","absolute");
            _overlayPanel.css("top", windowHeight + "px");
            _overlayPanel.css("opacity" , _MAX_OPACITY_VALUE_);
        }else{
            _contentPanel.css("top", windowHeight * 2 + "px");
            _sectionWarper.css("height",windowHeight * 2 + _contentPanel.height() + "px");
            setScrollPosition();
        }
    }

    function setScrollPosition(){
        var windowHeight = $(window).height();
        var opacityValue = $(document).scrollTop() / windowHeight;

        if(opacityValue > _MAX_OPACITY_VALUE_)
            opacityValue = _MAX_OPACITY_VALUE_;

        if(opacityValue <= 0){
            _overlayPanel.css("position","fixed");
            _overlayPanel.css("display" , "none");
            _overlayPanel.css("top", 0);
            _overlayPanel.css("opacity" , 0);
        }else if($(document).scrollTop()< windowHeight){
            _overlayPanel.css("top", 0);
            _overlayPanel.css("position","fixed");
            _overlayPanel.css("display" , "block");
            _overlayPanel.css("opacity" , opacityValue);
        }else if($(document).scrollTop() >= windowHeight){
            _overlayPanel.css("display" , "block");
            _overlayPanel.css("position","absolute");
            _overlayPanel.css("top", windowHeight + "px");
            _overlayPanel.css("opacity" , opacityValue);
        }
    }

    function loadLazyImages(){
        $("img.lazy").each(function(){
            var originalSrc = $(this).attr("origin-src");
            var originalHeight = $(this).attr("height");
            var originalWidth = $(this).attr("width");
            var obj = this;

            //$(this).replaceWith("<div width='100%' height='100%'>ok</div>");
            console.log(originalWidth)
        });
    }

})( jQuery, window, document );


}
/*
     FILE ARCHIVED ON 05:21:01 May 19, 2020 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 15:15:56 Mar 15, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  RedisCDXSource: 65.538
  esindex: 0.015
  CDXLines.iter: 19.074 (3)
  PetaboxLoader3.resolve: 141.818 (2)
  LoadShardBlock: 602.522 (3)
  PetaboxLoader3.datanode: 604.64 (5)
  captures_list: 691.148
  exclusion.robots.policy: 0.2
  exclusion.robots: 0.216
  load_resource: 462.456 (2)
*/