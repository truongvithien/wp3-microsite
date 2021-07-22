$.fn.scaleRoot = function(options){
    var defaults = {
      obj: $(this),
      designWidth: {
          desktop: 2000,
          mobile: 2000
      },
      designHeight: {
          desktop: 1000, 
          mobile: 1000
      },
      mode: '', //scaleForWidth
      floating: {
          el: '.popup' ,
          elBackground: '.popup__background',
          elPopContent: '.popup__content',
          elAsideRight: '.asideRight',
          elAsideLeft: '.asideLeft',
          elAsideLeftFullheight: '.asideLeftFullheight' 
      }
    }
    var settings = $.extend(defaults, options);


    $(window).on("resize", function(){
        var device = {
            width: $(window).outerWidth(),
            height: $(window).outerHeight()
        };
        var obj = {
            height: settings.obj.outerHeight()
        }

        var styleLightboxApply = function(height){
            var style = `
                <style id="lightbox-css" type="text/css">
                    ${settings.floating.el} {
                        height: ${height}px;
                    }
                    ${settings.floating.elBackground} {
                        height: ${height}px;
                    }
                </style>
            `;

            return style;
        }

        var isMobile = (width = device.width, height = device.height) => ((width <= 700) || (width < height));

        // console.log(isMobile());

        var ratioDesign = settings.designWidth.desktop / settings.designHeight.desktop;


        var ratioActual = device.width / device.height;

        var scaleRatio,
            marginLeft = 0; 

        console.log(device.width, device.height, ratioActual, ratioDesign);

        if (ratioActual > ratioDesign || settings.mode === 'scaleForWidth') { 
            // console.log("scale for width");
            // device height higher than expected => scale for width
            // var scaleRatio = device.width / settings.designWidth.desktop;
            scaleRatio = (isMobile()) ? device.width / settings.designWidth.mobile : device.width / settings.designWidth.desktop;
            marginLeft = 0;


        } else {
            // console.log("scale for height");
            // device width higher than expected => scale for height
            // var scaleRatio = device.height / settings.designHeight.desktop;
            scaleRatio = (isMobile()) ?  device.width / settings.designWidth.mobile :  device.height / settings.designHeight.desktop;
            marginLeft = (isMobile()) ? 0 : -1 * (settings.designWidth.desktop * scaleRatio - device.width) / 2;

        }
        // var scaleRatio = (isMobile()) ? device.width / settings.designWidth.mobile : device.width / settings.designWidth.desktop;

        var scaleHeight = obj.height * scaleRatio;
        var actualHeight = device.height * 1 / scaleRatio; 

        settings.obj.css({
            display: "block",
            transform: "scale("+scaleRatio+")",
            marginLeft: marginLeft+"px"
            // marginLeft: 0+"px"
        });
        settings.obj.parent().css({
            height: scaleHeight+"px",
            width: device.width+"px",
            // overflow: "hidden"
        }); 
        
        if ($(settings.floating.elAsideRight).length > 0) {

            // console.log($(settings.floating.elAsideRight).css("transform"))
            $(settings.floating.elAsideRight).css({
                transformOrigin: 'top right',
                transform: "scale("+scaleRatio+")"
            });
        }
        if ($(settings.floating.elAsideLeft).length > 0) {
            $(settings.floating.elAsideLeft).css({
                transformOrigin: 'top left',
                transform: "scale("+scaleRatio+")"
            });
        }


        if ($(settings.floating.elAsideLeftFullheight).length > 0) {
            scaleRatio = (isMobile()) ?  device.width / settings.designWidth.mobile :  device.height / settings.designHeight.desktop;
            $(settings.floating.elAsideLeftFullheight).css({
                transformOrigin: 'top left',
                transform: "scale("+scaleRatio+")"
            });
        }


        // if ($(settings.floating.elBackground).length > 0) {
        //     if (!isMobile()) {
        //         $(settings.floating.elBackground).css({
        //             transformOrigin: 'top left',
        //             transform: "scale("+scaleRatio+")"
        //         });
        //     }
        // }

        // if ($(settings.floating.elPopContent).length > 0) {
        //     if (!isMobile()) {
        //         $(settings.floating.elPopContent).css({
        //             transformOrigin: 'center center',
        //             transform: "scale("+scaleRatio+")"
        //         });
        //     }
        // }

        settings.obj.attr("data-scale-ratio", scaleRatio);

        // if (1) { 
        //     // landscape
        //     var scaleRatio = device.width / settings.designWidth.desktop;
        //     var scaleHeight = obj.height * scaleRatio;
        //     var actualHeight = device.height * 1 / scaleRatio; 
        //     var marginLeft = -1 * (settings.designWidth.desktop * scaleRatio - device.width) / 2
        //     settings.obj.css({
        //         display: "block",
        //         transform: "scale("+scaleRatio+")",
        //         marginLeft: marginLeft+"px"
        //     });
        //     settings.obj.parent().css({
        //         height: scaleHeight+"px" 
        //     })

        //     settings.obj.attr("data-scale-ratio", scaleRatio);
    
        // }
    }).resize();



    
}
