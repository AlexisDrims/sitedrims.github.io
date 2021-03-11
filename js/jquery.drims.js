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
    var _MAX_OPACITY_VALUE_ = 0.9;
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
                        paddingTop: 20,
                        paddingBottom: 20
                    }, 200, function() {
                        _titleBar.clearQueue().stop();
                    });
                }else{
                    
                    _titleBar.animate({
                        paddingTop: 33,
                        paddingBottom: 33
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
