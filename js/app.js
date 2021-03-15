var _pannelFooterRatio = 0.4;
var loaderTimer;

$(document).foundation();

$(document).ready(function() {
    loaderTimer = setTimeout(function(){ $("#loader").show(); }, 100);
});


$( window ).load(function(){
    
    $.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
    
    // clear the time if the page made less than 100 sec to load
    window.clearTimeout(loaderTimer);
    // fade out the loader
    $("#loader").fadeOut("slow");
    // fade in the page
    $(".main-frame").fadeIn("slow");

    //set content-panel-footer > div size
    $(".content-panel-footer > div").css("height", $(".content-panel-footer > div").width() * _pannelFooterRatio);

    // Set scroll
    $("section").Drims({overlayPanel:$("#overlay-panel"), startPanel: $("#start-panel"), contentPanel: $("#content-panel")});

    // Toggle bruger icon aspect
    $("#menuBar")
        .on("on.zf.toggler", function(e) {
        $(".burger-icon").addClass( "open" );
        $("#details-popin").foundation('close');
    })
        .on("off.zf.toggler", function(e) {
        $(".burger-icon").removeClass( "open" );
    });

    // Set scroll bar for the popin
    $("#details-popin").on("open.zf.reveal", function(e) {

        var scrollWarper = $('.scroll-warper'),
            scrollHandle = $('.scroll-handle'),
            scrollBar = $('.scroll-bar');

        if(scrollWarper.length > 0 && scrollHandle.length > 0 && scrollBar.length > 0){
            var scrollBarHeight = scrollBar.outerHeight();
            var scrollWarperHeight = scrollWarper[0].scrollHeight;
            var scrollWarperViewHeight = scrollWarper.outerHeight();

            var scrollHandleHeight = (scrollBarHeight * scrollWarperViewHeight) / scrollWarperHeight;

            if(scrollHandleHeight == scrollBarHeight){
                scrollBar.css("visibility","hidden");
            }else{
                scrollBar.css("visibility","visible");
            }
            scrollHandle.css("height",scrollHandleHeight + "px")

            scrollHandle.height( scrollHandleHeight ).draggable({
                axis : 'y',
                containment : 'parent', 
                drag: function(e, ui) {
                    console.log((ui.position.top * scrollWarperHeight) /  scrollHandleHeight);
                    scrollWarper.scrollTop( (ui.position.top * scrollWarperViewHeight) /  scrollHandleHeight);
                }
            }); 

            scrollWarper.on("scroll", function(){
                scrollHandle.css("top", (scrollWarper.scrollTop() * scrollBarHeight) / scrollWarperHeight);
            });
        }
    });


    $(".mosaic > div > .image-overlay").mouseenter(function(){
        $(this).parent().children("img").addClass("hover"); 
    });
    $(".mosaic > div > .image-overlay").mouseleave(function(){
        $(this).parent().children("img").removeClass("hover"); 
    });


                var min_x = 0;
                var max_x = $('#logo-cloud').width() ;
                var min_y = 0;
                var max_y = $('#logo-cloud').height();
                var filled_areas = new Array();

                $('#logo-cloud > img').each(function() {
                    var rand_x=0;
                    var rand_y=0;
                    var area;
                    do {
                        rand_x = Math.round(min_x + ((max_x - min_x)*(Math.random() % 1)));
                        rand_y = Math.round(min_y + ((max_y - min_y)*(Math.random() % 1)));
                        area = {x: rand_x, y: rand_y, width: $(this).width(), height: $(this).height()};
                    } while(check_overlap(area));

                    filled_areas.push(area); 

                    $(this).css({left:rand_x, top: rand_y});
                });

                function check_overlap(area) {
                    for (var i = 0; i < filled_areas.length; i++) {

                        check_area = filled_areas[i];

                        var bottom1 = area.y + area.height;
                        var bottom2 = check_area.y + check_area.height;
                        var top1 = area.y;
                        var top2 = check_area.y;
                        var left1 = area.x;
                        var left2 = check_area.x;
                        var right1 = area.x + area.width;
                        var right2 = check_area.x + check_area.width;
                        if (bottom1 < top2 || top1 > bottom2 || right1 < left2 || left1 > right2) {
                            continue;
                        }
                        return true;
                    }
                    return false;
                }

});

$( window ).resize(function() {
    //set content-panel-footer > div size
    $(".content-panel-footer > div").css("height", $(".content-panel-footer > div").width() * _pannelFooterRatio);

    $("section").Drims("SetElementsPosition");
    if($("#details-popin").length > 0)
        $("#details-popin").foundation('close');
});
