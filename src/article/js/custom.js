import "./util/_toggleClass";
import "./util/_scaleRoot";
import "./util/_lightbox";
import "lazysizes";
// import "./util/_scrollFrame";
import scrollFrame from "./util/_scrollFrame";

$(function(){

    $("#toggleSide").toggleClassname({
        toggle: [
            {
                el: $('.links-side'),
                className: 'active'
            }
        ]
    });

    $("#burger").toggleClassname({
        toggle: [
            {
                el: $("#burger"), 
                className: 'active'
            }
        ]
    });



    $(".wrapper").scaleRoot({
        mode: 'scaleForWidth'
    });  



    if ($("[data-lightbox]").length > 0) {
        $("[data-lightbox]").each(function(){
            $(this).lightBox({
                objLightBox: $(this).attr('href'),
                type: $(this).data('lightbox-type')
            });
        }); 
    }

    // if ($("#playInnerClip").length > 0) {
    //     $("#playInnerClip").on("click", function(e){
    //         e.preventDefault();
    //         let src = $("#innerClip").attr('src');

    //         if (src.indexOf("?autoplay=1") < 0) {
    //             src += "?autoplay=1";
    //             $("#playInnerClip").addClass("playing");
    //         } else {
    //             src = src.replace("?autoplay=1", "");
    //             $("#playInnerClip").removeClass("playing");
    //         }

    //         $("#innerClip").attr('src', src);
    //     })
    // }


    
    scrollFrame.init();
})
