// SCALE PLATFORM 
// | Especially use for Web Platform 3.0
// | Although WP3.0 is preventing non-responsive design, there still have some
// | unexpected input PSD from outsource, out-dated designers.


$.fn.scalePlatform = function (options) {
    var defaults = {
        obj: $(this),
        designSafe: {
            // if width of device smaller safe zone, then init scale. 
            desktop: 1140,
            mobile: 768
        },
        designWidth: {
            desktop: 2100,
            mobile: 768
        },
        designHeight: {
            desktop: 1000,
            mobile: 1100
        },
        mode: '', //scaleForWidth
        elScale: {
            desktop: {
                topLeft: '.floatingDesktopTopLeft',
                topCenter: '.floatingDesktopTopCenter',
                topRight: '.floatingDesktopTopRight',
                midLeft: '.floatingDesktopMidLeft',
                midCenter: '.floatingDesktopMidCenter',
                midRight: '.floatingDesktopMidRight',
                botLeft: '.floatingDesktopBotLeft',
                botCenter: '.floatingDesktopBotCenter',
                botRight: '.floatingDesktopBotRight'
            },
            mobile: {
                topLeft: '.floatingMobileTopLeft',
                topCenter: '.floatingMobileTopCenter',
                topRight: '.floatingMobileTopRight',
                midLeft: '.floatingMobileMidLeft',
                midCenter: '.floatingMobileMidCenter',
                midRight: '.floatingMobileMidRight',
                botLeft: '.floatingMobileBotLeft',
                botCenter: '.floatingMobileBotCenter',
                botRight: '.floatingMobileBotRight'
            }
        },
        elSpecial: {
            rescaleHeight: '.floatingRescaleHeight',
            rescaleMaxHeight: '.floatingRescaleMaxHeight'
        }
    }
    var settings = $.extend(defaults, options);


    $(window).on("resize", function () {
        var device = {
            width: $(window).innerWidth(),
            height: $(window).innerHeight()
        };

        var obj = {
            height: settings.obj.outerHeight()
        }
        
        // console.log(device);

        var isMobile = (width = device.width, height = device.height) => ((width <= 700) || (width < height));



        var mode = 'margin/scale',
            scaleRatio = 1,
            marginLeft = 0;

        if (!isMobile || (device.width > settings.designSafe.desktop)) {
            // only margin, no scale
            mode = 'margin';
            marginLeft = -1 * (device.width - settings.designSafe) / 2;

        } else {
            // only scale, no margin

            // console.log(device.width);

            mode = 'scale';
            scaleRatio = (isMobile()) ? 
                            device.width / settings.designWidth.mobile : 
                            device.width / settings.designWidth.desktop;

        }


        var scaleHeight = obj.height * scaleRatio;
        var actualHeight = device.height * 1 / scaleRatio;

        settings.obj.css({
            display: "block",
            transform: "scale(" + scaleRatio + ")",
            marginLeft: marginLeft + "px"
        });
        settings.obj.parent().css({
            height: scaleHeight + "px",
            width: device.width + "px",
        });

        var origin = 'center center';


        var currentDeviceType = isMobile() ? 'mobile' : 'desktop';
        for (const [deviceType, listPosition] of Object.entries(settings.elScale)) {
            for (const [originType, className] of Object.entries(listPosition)) {
                var origin = '';
                switch (originType) {
                    case 'topLeft': origin = 'top left'; break;
                    case 'topCenter': origin = 'top center'; break;
                    case 'topRight': origin = 'top right'; break;
                    case 'midLeft': origin = 'center left'; break;
                    case 'midCenter': origin = 'center center'; break;
                    case 'midRight': origin = 'center right'; break;
                    case 'botLeft': origin = 'bottom left'; break;
                    case 'botCenter': origin = 'bottom center'; break;
                    case 'botRight': origin = 'bottom right'; break;
                }

                // console.log(currentDeviceType, deviceType);

                if ((currentDeviceType === deviceType) && $(settings.elScale[deviceType][originType]).length > 0) {
                    $(className).css({
                        transformOrigin: origin,
                        transform: "scale(" + scaleRatio + ")",
                        marginLeft: marginLeft+"px"
                    });
                }

            }

        }

        // rescale Height (for element that need full height after scale)
        // TODO

        // elRescaleHeight = settings.elSpecial.rescaleHeight;

        // if ($(elRescaleHeight).length > 0) {

        //     $(elRescaleHeight).each(function(){
        //         itsHeight = $(this).css('height');
        //         itsHeight = parseInt(itsHeight.replace("px",""));
        //         console.log(itsHeight);
    
        //         rescaledHeight = itsHeight * 1 / scaleRatio;
    
        //         $(elRescaleHeight).css({
        //             height: rescaledHeight + "px"
        //         });
        //     })

        // }


        // // rescale max Height (for element that need full height after scale)

        // elRescaleMaxHeight = settings.elSpecial.rescaleMaxHeight;

        // if ($(elRescaleMaxHeight).length > 0) {


        //     itsMaxHeight = $(elRescaleMaxHeight).css('max-height');

        //     rescaledMaxHeight = itsMaxHeight * 1 / scaleRatio;

        //     console.log(itsMaxHeight);

        //     $(elRescaleMaxHeight).css({
        //         maxHeight: rescaledMaxHeight + "px"
        //     });
        // }

        // settings.obj.attr("data-scale-ratio", scaleRatio);

    }).resize();




}
