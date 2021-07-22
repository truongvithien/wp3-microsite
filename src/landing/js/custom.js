import "./util/_toggleClass";
import "./util/_scaleRoot";
import "./util/_lightbox";
// import {dndPromotion, getAwardSrcById} from "./util/_promotion";
import "lazysizes";
// import "./util/_scrollFrame";
// import scrollFrame from "./util/_scrollFrame";
import {milestonesSimulator} from "./util/_milestones";
import "@fancyapps/fancybox";

$(function(){

    $("#toggleSide").toggleClassname({
        toggle: [
            {
                el: $('.rightnav ul'),
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


    $("#wrapper").scalePlatform({
        designSafe: {
            desktop: 2000,
            mobile: 768
        },
        designWidth: {
            desktop: 2000,
            mobile: 768
        },
        designHeight: {
            desktop: 1000,
            mobile: 1100
        },
    });

    $(".scrollTop").each(function(){
        $(this).on("click", function(){
            $("html, body").animate({scrollTop: 0}, 400)
        })
    })

    if ($("[data-lightbox]").length > 0) {
        $("[data-lightbox]").each(function(){
            $(this).lightBox({
                objLightBox: $(this).attr('href'),
                type: $(this).data('lightbox-type')
            });
        }); 
    }

    // var serverTime = 1617929253;
    // milestonesSimulator.init({
    //     serverTime: serverTime
    // });


    // var serverTime = 1617929253;
    // var serverTime = new Date(2021, 6, 10).getTime();
    // milestonesSimulator.init({
    //     serverTime: serverTime 
    // });

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


    // dndPromotion({
    //     url: domainKM
    // });
    // window['getAwardSrcById'] = getAwardSrcById;
    
    // scrollFrame.init();
})
