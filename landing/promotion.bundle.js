/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/promotion.js":
/*!**************************!*\
  !*** ./src/promotion.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _promotion_js_custom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./promotion/js/custom.js */ "./src/promotion/js/custom.js");
/* harmony import */ var _promotion_scss_promotion_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./promotion/scss/promotion.scss */ "./src/promotion/scss/promotion.scss");
/* harmony import */ var _promotion_scss_promotion_scss__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_promotion_scss_promotion_scss__WEBPACK_IMPORTED_MODULE_1__);
// JS
 // SCSS



/***/ }),

/***/ "./src/promotion/js/custom.js":
/*!************************************!*\
  !*** ./src/promotion/js/custom.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _util_toggleClass__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util/_toggleClass */ "./src/promotion/js/util/_toggleClass.js");
/* harmony import */ var _util_toggleClass__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_util_toggleClass__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _util_scaleRoot__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util/_scaleRoot */ "./src/promotion/js/util/_scaleRoot.js");
/* harmony import */ var _util_scaleRoot__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_util_scaleRoot__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _util_lightbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./util/_lightbox */ "./src/promotion/js/util/_lightbox.js");
/* harmony import */ var _util_lightbox__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_util_lightbox__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lazysizes */ "./node_modules/lazysizes/lazysizes.js");
/* harmony import */ var lazysizes__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(lazysizes__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _util_milestones__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./util/_milestones */ "./src/promotion/js/util/_milestones.js");
/* harmony import */ var _fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @fancyapps/fancybox */ "./node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js");
/* harmony import */ var _fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fancyapps_fancybox__WEBPACK_IMPORTED_MODULE_5__);


 // import {dndPromotion, getAwardSrcById} from "./util/_promotion";

 // import "./util/_scrollFrame";
// import scrollFrame from "./util/_scrollFrame";



$(function () {
  $("#toggleSide").toggleClassname({
    toggle: [{
      el: $('.rightnav ul'),
      className: 'active'
    }]
  });
  $("#burger").toggleClassname({
    toggle: [{
      el: $("#burger"),
      className: 'active'
    }]
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
    }
  });
  $(".scrollTop").each(function () {
    $(this).on("click", function () {
      $("html, body").animate({
        scrollTop: 0
      }, 400);
    });
  });

  if ($("[data-lightbox]").length > 0) {
    $("[data-lightbox]").each(function () {
      $(this).lightBox({
        objLightBox: $(this).attr('href'),
        type: $(this).data('lightbox-type')
      });
    });
  } // var serverTime = 1617929253;
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

});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

/***/ }),

/***/ "./src/promotion/js/util/_lightbox.js":
/*!********************************************!*\
  !*** ./src/promotion/js/util/_lightbox.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$.fn.lightBox = function (options) {
  var defaults = {
    obj: $(this),
    type: '',
    objLightBox: '',
    animate: {},
    animateToggle: {},
    backgroundClickToClose: true,
    floatEl: $("#floatLightbox"),
    objClose: '.close'
  };
  var settings = $.extend(defaults, options);
  let toolbarPopup = `
    <div class="popup__toolbar">
      <span class="close hamburger hamburger--emphatic is-active">
            <span class="hamburger-box">
                <span class="hamburger-inner"></span>
            </span>
        </span>
    </div>`;
  let popupId;
  let popupDom;

  switch (settings.type) {
    case 'youtube':
      popupId = generateId();
      var youtubeId = settings.obj.attr("href").split("=")[1];
      settings.obj.attr("href", "#" + popupId);
      popupDom = `
                <div id="${popupId}" class="popup popup--open-video">
                    <div class="popup__background"></div>
                    <div class="popup__content">
                        <div class="embed"><div id="${popupId}_embed" data-youtube-id="${youtubeId}"></div></div>
                    </div>
                    ${toolbarPopup}
                </div>
            `;
      settings.floatEl.append(popupDom);
      break;

    case 'image':
      popupId = generateId();
      let imgUrl = settings.obj.attr("href");
      settings.obj.attr("href", "#" + popupId);
      popupDom = `
                <div id="${popupId}" class="popup popup--open-image">
                    <div class="popup__background"></div>
                    <div class="popup__content">
                        <div class="image"><img src="${imgUrl}" /></div>
                    </div>
                    ${toolbarPopup}
                </div>
            `;
      settings.floatEl.append(popupDom);
      break;

    default: // inline
    // settings.obj.on("click", () => {
    //     console.log(settings.objLightBox)
    //     $(settings.objLightBox).addClass('active');
    //     $(settings.objLightBox).animate(settings.animate);
    // });
    // $(settings.objLightBox).children(".popup__content").children(".close").children("a").on("click", function(){
    //     $(settings.objLightBox).removeClass('active');
    //     $(settings.objLightBox).animate(settings.animateToggle);
    // });
    // if (settings.backgroundClickToClose) {
    //     if (settings.type == '') {
    //         $(settings.objLightBox).children(".popup__background").on("click", function(){
    //             $(settings.objLightBox).removeClass('active');
    //             $(settings.objLightBox).animate(settings.animateToggle);
    //         });
    //     } else {
    //         $(".scroll-content".find()).children(".popup__background").on("click", function(){
    //             $(settings.objLightBox).removeClass('active');
    //             $(settings.objLightBox).animate(settings.animateToggle);
    //         });
    //     }
    // }

  }

  settings.obj.on("click", e => {
    e.preventDefault();
    $("html").addClass("popup-opened");

    if ($(this).data("lightbox-type") == "youtube" && ytPlayer[$(this).attr("href")] == undefined) {
      ytPlayer[$(this).attr("href")] = YoutubePlayer($(this).attr("href").substring(1) + "_embed", {
        videoId: $($(this).attr("href") + "_embed").data("youtube-id"),
        playerVars: {
          rel: 0,
          autoplay: 1,
          color: 'white'
        }
      }); // ytPlayer[$(this).attr("href")].stopVideo();
    }

    $($(this).attr("href"));
    $($(this).attr("href")).addClass('active');
    $($(this).attr("href")).animate(settings.animate);

    if ($(this).data("lightbox-type") == "youtube") {
      ytPlayer[$(this).attr("href")].playVideo();
    }
  }); // Inline
}; // if ($(".popup__background").length > 0) {
//     $(".popup__background").each(function(){
//         $(this).on("click", function(){
//             $(this).parent().removeClass("active");
//             if ($(this).parent().hasClass("popup--open-video")) {
//                 ytPlayer["#"+$(this).parent().attr("id")].pauseVideo();
//             }
//         })
//     })
// }


$("body").on("click", ".close", function () {
  $("html").removeClass("popup-opened");
  $(this).parents(".popup").removeClass("active");
  $(this).parent().parent().removeClass("active");
  $(this).parent().removeClass("active");

  if ($(this).parent().parent().hasClass("popup--open-video")) {
    ytPlayer["#" + $(this).parent().parent().attr("id")].pauseVideo();
  }
});
$("body").on("click", ".popup__background", function () {
  $("html").removeClass("popup-opened");
  $(this).parent().removeClass("active");

  if ($(this).parent().hasClass("popup--open-video")) {
    ytPlayer["#" + $(this).parent().attr("id")].pauseVideo();
  }
});

function generateId() {
  return Math.random().toString(36).substring(2, 8);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

/***/ }),

/***/ "./src/promotion/js/util/_milestones.js":
/*!**********************************************!*\
  !*** ./src/promotion/js/util/_milestones.js ***!
  \**********************************************/
/*! exports provided: milestonesSimulator, milestonesHybrid */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "milestonesSimulator", function() { return milestonesSimulator; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "milestonesHybrid", function() { return milestonesHybrid; });
// TEST
// 
// var serverTime = new Date().getTime();
// var serverTime = new Date(2021,3, 3).getTime();
// 
const milestonesSimulator = {
  data: {
    value: {
      serverTime: new Date().getTime() // serverTime: new Date(2021,3, 5).getTime()

    },
    el: {
      milestonesValue: '#milestonesValue',
      milestonesCheatAdd: '#milestonesCheatAdd',
      milestonesCheatMultiply: '#milestonesCheatMultiply',
      milestonesBar: '#milestonesBar',
      milestonesBarActive: '#milestonesBarActive'
    },
    target: [//   / \
    //  / ! \  Remember month starts by 0 instead of 1.
    // /_____\
    {
      time: new Date(2021, 5, 30),
      // <-- open promotion time
      gain: 0
    }, {
      time: new Date(2021, 6, 3),
      gain: 5000
    }, {
      time: new Date(2021, 6, 11),
      gain: 10000
    }, {
      time: new Date(2021, 6, 18),
      gain: 20000
    }],
    milestonesDisplay: {
      attribute: {
        desktop: 'width',
        mobile: 'width'
      },
      unit: {
        desktop: '%',
        mobile: '%'
      }
    },
    milestones: [{
      gain: 0,
      value: {
        desktop: 0,
        mobile: 0
      }
    }, {
      gain: 10000,
      value: {
        desktop: 16,
        mobile: 18
      }
    }, {
      gain: 30000,
      value: {
        desktop: 50,
        mobile: 50
      }
    }, {
      gain: 100000,
      value: {
        desktop: 84,
        mobile: 82
      }
    }, {
      gain: 999999,
      value: {
        desktop: 100,
        mobile: 100
      }
    }]
  },
  util: {
    isMobile: () => () => {
      var width = $(window).outerWidth(),
          height = $(window).outerHeight();
      return width <= 700 || width < height;
    },
    getCurrentTime: serverTime => serverTime.toString().length < 12 ? serverTime * 1000 : serverTime,
    getCurrentStage: serverTime => {
      var before = -1,
          after = -1;

      for (let i = 0, len = milestonesSimulator.data.target.length; i < len; i++) {
        let stage = milestonesSimulator.data.target[i];
        let currentTime = milestonesSimulator.util.getCurrentTime(serverTime);
        if (currentTime >= stage.time.getTime()) before = i;

        if (currentTime < stage.time.getTime()) {
          after = i;
          break;
        }
      }

      return [before, after];
    },
    getSubscriptions: serverTime => {
      let currentTime = milestonesSimulator.util.getCurrentTime(serverTime);
      let stages = milestonesSimulator.data.target;
      let [before, after] = milestonesSimulator.util.getCurrentStage(milestonesSimulator.data.value.serverTime);
      if (before < 0) return stages[0].gain;
      if (after < 0) return stages[stages.length - 1].gain;
      let middlePercentage = (currentTime - stages[before].time.getTime()) / (stages[after].time.getTime() - stages[before].time.getTime()); // console.log(currentTime - stages[before].time.getTime());
      // console.log(stages[after].time.getTime() - stages[before].time.getTime());
      // console.log(timePercentage);

      return stages[before].gain + middlePercentage * (stages[after].gain - stages[before].gain);
    },
    displaySubscriptions: milestonesValue => {
      if ($(milestonesSimulator.data.el.milestonesValue).length > 0) {
        // $(milestonesSimulator.data.el.milestonesValue).val(milestonesValue);
        var elSubs = $(milestonesSimulator.data.el.milestonesValue);

        switch (elSubs.prop("tagName")) {
          case 'input':
            elSubs.val(milestonesValue);
            break;

          default:
            elSubs.html(milestonesValue);
        }
      }

      return 0;
    },
    displayMilestones: milestonesValue => {
      let before = -1,
          after = -1;
      let stages = milestonesSimulator.data.milestones;

      for (let i = 0, len = stages.length; i < len; i++) {
        let stage = stages[i];
        if (milestonesValue >= stage.gain) before = i;

        if (milestonesValue < stage.gain) {
          after = i;
          break;
        }
      }

      let deviceType = milestonesSimulator.util.isMobile() ? "mobile" : "desktop";

      if (before < 0) {
        $(milestonesSimulator.data.el.milestonesBarActive).css({
          [milestonesSimulator.data.milestonesDisplay.attribute[deviceType]]: 0 + milestonesSimulator.data.milestonesDisplay.unit[deviceType]
        });
        return;
      }

      ;

      if (after < 0) {
        $(milestonesSimulator.data.el.milestonesBarActive).css({
          [milestonesSimulator.data.milestonesDisplay.attribute[deviceType]]: milestonesSimulator.data.milestones[milestonesSimulator.data.milestones.length - 1].value[deviceType] + milestonesSimulator.data.milestonesDisplay.unit[deviceType]
        });
        return;
      }

      ;
      let middlePercentage = (milestonesValue - stages[before].gain) / (stages[after].gain - stages[before].gain);
      let displayPercentage = stages[before].value[deviceType] + middlePercentage * (stages[after].value[deviceType] - stages[before].value[deviceType]); // console.log(displayPercentage);

      if ($(milestonesSimulator.data.el.milestonesBarActive).length > 0) {
        $(milestonesSimulator.data.el.milestonesBarActive).css({
          [milestonesSimulator.data.milestonesDisplay.attribute[deviceType]]: displayPercentage + milestonesSimulator.data.milestonesDisplay.unit[deviceType]
        });
      } // console.log(before, after);

    }
  },
  before: function () {},
  after: function () {},
  init: function (data) {
    milestonesSimulator.data.value.serverTime = data.serverTime;
    console.log(milestonesSimulator.data.value);
    milestonesSimulator.before(); // 

    var subs = milestonesSimulator.util.getSubscriptions(milestonesSimulator.data.value.serverTime);
    console.log(subs);
    subs = Math.floor(subs);
    let milestonesCheatAdd = 0,
        milestonesCheatMultiply = 1;

    if ($(milestonesSimulator.data.el.milestonesCheatAdd).length > 0) {
      milestonesCheatAdd = $(milestonesSimulator.data.el.milestonesCheatAdd).val();
    }

    if ($(milestonesSimulator.data.el.milestonesCheatMultiply).length > 0) {
      milestonesCheatMultiply = $(milestonesSimulator.data.el.milestonesCheatMultiply).val();
    }

    milestonesCheatAdd = parseInt(milestonesCheatAdd);
    milestonesCheatMultiply = parseInt(milestonesCheatMultiply);
    subs = subs * milestonesCheatMultiply + milestonesCheatAdd;
    subs = subs < 0 ? 0 : subs;
    milestonesSimulator.util.displaySubscriptions(subs);
    milestonesSimulator.util.displayMilestones(subs); //  

    milestonesSimulator.after();
  }
};
const milestonesHybrid = {
  data: {
    value: {
      // serverTime: new Date().getTime(), 
      // ajax: '//event.zing.vn/webapi/getTotalRegister?dd=8afa6fa843c12cf38e8e1c6e65a11d89&programID=312&apiKey=APIKEY_6a4f5cd1ac697080b8cb178c82cf740f',
      ajax: ''
    },
    el: {
      milestonesValue: '#milestonesValue',
      milestonesCheatAdd: '#milestonesCheatAdd',
      milestonesCheatMultiply: '#milestonesCheatMultiply',
      milestonesBar: '#milestonesBar',
      milestonesBarActive: '#milestonesBarActive',
      milestonesRun: "#milestonesRun",
      milestonesIcon: "#milestonesIcon"
    },
    milestonesDisplay: {
      attribute: {
        desktop: 'width',
        mobile: 'width'
      },
      unit: {
        desktop: '%',
        mobile: '%'
      }
    },
    milestonesRunDisplay: {
      attribute: {
        desktop: 'left',
        mobile: 'left'
      },
      unit: {
        desktop: '%',
        mobile: '%'
      }
    },
    milestones: [{
      gain: 0,
      value: {
        desktop: 0,
        mobile: 0
      }
    }, {
      gain: 10000,
      value: {
        desktop: 16,
        mobile: 18
      }
    }, {
      gain: 30000,
      value: {
        desktop: 50,
        mobile: 50
      }
    }, {
      gain: 100000,
      value: {
        desktop: 84,
        mobile: 82
      }
    }, {
      gain: 999999,
      value: {
        desktop: 100,
        mobile: 100
      }
    }]
  },
  util: {
    isMobile: () => () => {
      var width = $(window).outerWidth(),
          height = $(window).outerHeight();
      return width <= 700 || width < height;
    },
    getSubscriptions: (callback = function (data) {}) => {
      if (milestonesHybrid.data.value.ajax.length === 0) {
        // get data from #value
        var elSubs = $(milestonesHybrid.data.el.milestonesValue);
        var subscriptions = 0;

        switch (elSubs.prop("tagName")) {
          case 'INPUT':
            subscriptions = elSubs.val();
            break;

          default:
            subscriptions = parseInt(elSubs.html());
        } // console.log(elSubs.prop("tagName"));


        callback(parseInt(subscriptions));
      } else {
        $.ajax({
          url: milestonesHybrid.data.value.ajax,
          dataType: 'json',
          success: function (data) {
            // console.log(data);
            if (data.status != undefined && data.status == 1) {
              callback(parseInt(data.data));
            }
          }
        });
      }
    },
    displaySubscriptions: milestonesValue => {
      if ($(milestonesHybrid.data.el.milestonesValue).length > 0) {
        $(milestonesHybrid.data.el.milestonesValue).val(milestonesValue);
        var elSubs = $(milestonesHybrid.data.el.milestonesValue);

        switch (elSubs.prop("tagName")) {
          case 'input':
            elSubs.val(milestonesValue);
            break;

          default:
            elSubs.html(milestonesValue);
        }
      }

      return 0;
    },
    displayMilestones: milestonesValue => {
      let before = -1,
          after = -1;
      let stages = milestonesHybrid.data.milestones;

      for (let i = 0, len = stages.length; i < len; i++) {
        let stage = stages[i]; // console.log(milestonesValue, stage.gain);

        if (milestonesValue >= stage.gain) before = i;

        if (milestonesValue < stage.gain) {
          after = i;
          break;
        }
      } // console.log(before, after);


      let deviceType = milestonesHybrid.util.isMobile() ? "mobile" : "desktop";

      if (before < 0) {
        $(milestonesHybrid.data.el.milestonesBarActive).css({
          [milestonesHybrid.data.milestonesDisplay.attribute[deviceType]]: 0 + milestonesHybrid.data.milestonesDisplay.unit[deviceType]
        }); // return;
      }

      ;

      if (after < 0) {
        $(milestonesHybrid.data.el.milestonesBarActive).css({
          [milestonesHybrid.data.milestonesDisplay.attribute[deviceType]]: milestonesHybrid.data.milestones[milestonesHybrid.data.milestones.length - 1].value[deviceType] + milestonesHybrid.data.milestonesDisplay.unit[deviceType]
        }); // return;
      }

      ; // console.log(before, after); 

      let middlePercentage = (milestonesValue - stages[before].gain) / (stages[after].gain - stages[before].gain);
      let displayPercentage = stages[before].value[deviceType] + middlePercentage * (stages[after].value[deviceType] - stages[before].value[deviceType]); // console.log(displayPercentage);

      if ($(milestonesHybrid.data.el.milestonesBarActive).length > 0) {
        $(milestonesHybrid.data.el.milestonesBarActive).css({
          [milestonesHybrid.data.milestonesDisplay.attribute[deviceType]]: displayPercentage + milestonesHybrid.data.milestonesDisplay.unit[deviceType]
        });
      }

      if ($(milestonesHybrid.data.el.milestonesRun).length > 0) {
        $(milestonesHybrid.data.el.milestonesRun).css({
          [milestonesHybrid.data.milestonesRunDisplay.attribute[deviceType]]: displayPercentage + milestonesHybrid.data.milestonesRunDisplay.unit[deviceType]
        });
      } // console.log(after);


      if ($(milestonesHybrid.data.el.milestonesIcon).length > 0) {
        for (let i = 0; i < before; i++) {
          // console.log(i);
          $(milestonesHybrid.data.el.milestonesIcon + " > li").eq(i).addClass("active");
        }
      }
    }
  },
  before: function () {},
  after: function () {},
  init: function (data) {
    // milestonesHybrid.data.value.serverTime = data.serverTime;
    // console.log(milestonesHybrid.data.value)
    milestonesHybrid.before(); // 

    milestonesHybrid.util.getSubscriptions(function (subs) {
      // console.log(subs); 
      subs = Math.floor(parseInt(subs));
      let milestonesCheatAdd = 0,
          milestonesCheatMultiply = 1;

      if ($(milestonesHybrid.data.el.milestonesCheatAdd).length > 0) {
        milestonesCheatAdd = $(milestonesHybrid.data.el.milestonesCheatAdd).val();
      }

      if ($(milestonesHybrid.data.el.milestonesCheatMultiply).length > 0) {
        milestonesCheatMultiply = $(milestonesHybrid.data.el.milestonesCheatMultiply).val();
      }

      milestonesCheatAdd = parseInt(milestonesCheatAdd);
      milestonesCheatMultiply = parseInt(milestonesCheatMultiply); // console.log(subs, milestonesCheatMultiply, milestonesCheatAdd); 
      // subs = subs * milestonesCheatMultiply + milestonesCheatAdd;

      subs = subs < 0 ? 0 : subs;
      milestonesHybrid.util.displaySubscriptions(subs);
      milestonesHybrid.util.displayMilestones(subs); //  

      milestonesHybrid.after();
    });
  }
};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

/***/ }),

/***/ "./src/promotion/js/util/_scaleRoot.js":
/*!*********************************************!*\
  !*** ./src/promotion/js/util/_scaleRoot.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {// SCALE PLATFORM 
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
    mode: '',
    //scaleForWidth
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
  };
  var settings = $.extend(defaults, options);
  $(window).on("resize", function () {
    var device = {
      width: $(window).innerWidth(),
      height: $(window).innerHeight()
    };
    var obj = {
      height: settings.obj.outerHeight()
    }; // console.log(device);

    var isMobile = (width = device.width, height = device.height) => width <= 700 || width < height;

    var mode = 'margin/scale',
        scaleRatio = 1,
        marginLeft = 0;

    if (!isMobile || device.width > settings.designSafe.desktop) {
      // only margin, no scale
      mode = 'margin';
      marginLeft = -1 * (device.width - settings.designSafe) / 2;
    } else {
      // only scale, no margin
      // console.log(device.width);
      mode = 'scale';
      scaleRatio = isMobile() ? device.width / settings.designWidth.mobile : device.width / settings.designWidth.desktop;
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
      width: device.width + "px"
    });
    var origin = 'center center';
    var currentDeviceType = isMobile() ? 'mobile' : 'desktop';

    for (const [deviceType, listPosition] of Object.entries(settings.elScale)) {
      for (const [originType, className] of Object.entries(listPosition)) {
        var origin = '';

        switch (originType) {
          case 'topLeft':
            origin = 'top left';
            break;

          case 'topCenter':
            origin = 'top center';
            break;

          case 'topRight':
            origin = 'top right';
            break;

          case 'midLeft':
            origin = 'center left';
            break;

          case 'midCenter':
            origin = 'center center';
            break;

          case 'midRight':
            origin = 'center right';
            break;

          case 'botLeft':
            origin = 'bottom left';
            break;

          case 'botCenter':
            origin = 'bottom center';
            break;

          case 'botRight':
            origin = 'bottom right';
            break;
        } // console.log(currentDeviceType, deviceType);


        if (currentDeviceType === deviceType && $(settings.elScale[deviceType][originType]).length > 0) {
          $(className).css({
            transformOrigin: origin,
            transform: "scale(" + scaleRatio + ")",
            marginLeft: marginLeft + "px"
          });
        }
      }
    } // rescale Height (for element that need full height after scale)
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
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

/***/ }),

/***/ "./src/promotion/js/util/_toggleClass.js":
/*!***********************************************!*\
  !*** ./src/promotion/js/util/_toggleClass.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function($) {$.fn.toggleClassname = function (options) {
  var defaults = {
    obj: $(this),
    toggle: [{
      el: $(this).parent(),
      className: 'active'
    }],
    before: () => {},
    after: () => {}
  };
  var settings = $.extend(defaults, options);
  settings.obj.on("click", e => {
    e.preventDefault();
    settings.before();
    settings.toggle.forEach(function (item) {
      if (item.el.hasClass(item.className)) {
        item.el.removeClass(item.className);
      } else {
        item.el.addClass(item.className);
      }
    });
    settings.after();
  });
};
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery-exposed-exposed.js")))

/***/ }),

/***/ "./src/promotion/scss/promotion.scss":
/*!*******************************************!*\
  !*** ./src/promotion/scss/promotion.scss ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

throw new Error("Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\nModuleBuildError: Module build failed (from ./node_modules/css-loader/dist/cjs.js):\nError: Can't resolve '../assets/fonts/UTMCopperplate/UTM_Copperplate.ttf' in '/Users/thientv.mini/cx/git/wp3-microsite/src/promotion/scss'\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:209:21\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/UnsafeCachePlugin.js:44:7\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:27:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:67:43\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:16:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:27:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/DescriptionFilePlugin.js:67:43\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:16:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/Resolver.js:285:5\n    at eval (eval at create (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/tapable/lib/HookCodeFactory.js:33:10), <anonymous>:15:1)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/DirectoryExistsPlugin.js:27:15\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/enhanced-resolve/lib/CachedInputFileSystem.js:85:15\n    at processTicksAndRejections (internal/process/task_queues.js:77:11)\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/webpack/lib/NormalModule.js:316:20\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/loader-runner/lib/LoaderRunner.js:367:11\n    at /Users/thientv.mini/cx/git/wp3-microsite/node_modules/loader-runner/lib/LoaderRunner.js:233:18\n    at context.callback (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/loader-runner/lib/LoaderRunner.js:111:13)\n    at Object.loader (/Users/thientv.mini/cx/git/wp3-microsite/node_modules/css-loader/dist/index.js:155:5)\n    at runMicrotasks (<anonymous>)\n    at processTicksAndRejections (internal/process/task_queues.js:95:5)");

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ./src/promotion.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/promotion.js */"./src/promotion.js");


/***/ })

/******/ });
//# sourceMappingURL=promotion.bundle.js.map