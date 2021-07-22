import md5 from 'md5';

var dndpDefault = {
    // url: './assets/test-api/getdata.html',
    // url2: './assets/test-api/savedata.html',
    url: '',
    directory: 'vltkm/landing/wp-mqs-2021-vong_xoay_nguyen_tieu/promotion/assets/images/reward',
    items: {
        A: 'reward-1',
        B: 'reward-2',
        C: 'reward-3',
        D: 'reward-4',
        E: 'reward-5',
        F: 'reward-6',
        G: 'reward-7',
        H: 'reward-8',
        I: 'reward-9',
        J: 'reward-10',
        K: 'reward-11',
        L: 'reward-12',
        M: 'reward-13',
        N: 'reward-14',
        O: 'reward-15',
        P: 'reward-16',
        Q: 'reward-17',
        R: 'reward-18',
        S: 'reward-19',
        T: 'reward-20',
        U: 'reward-21',
        /////
        length: 21,
        type: 'png' 
    },
    el: {
        cp: '.pm__point',
        returnPrize: '#returnPrize',
        action: '.pm__rut',
        reward: '.reward',
        inform: '#popup_inform',
        informContent: '.pm__inform-text',
        rewardContainer: '#rewardContainer'
    },
    variable: {
        spinable: true
    }
};

const dndPromotion = function(options){
    var defaults = dndpDefault;
    var settings = $.extend(defaults, options);


    var _CheckSO = "";
    var Key128Bytesold = "";
    var DataKey128 = "";

    var cp = parseInt($(".pm__point").html());

    const closeAllPopup = () => {
        $(".popup").removeClass("active");
        $("html").removeClass("popup-opened");
    }

    const activePopup = (id) => {
        $(id).addClass("active");
        $("html").addClass("popup-opened");
    }

    const informError = (content) => {
        $(settings.el.informContent).html(content);
        activePopup(settings.el.inform);
    }

    const nameToSrc = (name) => {
        return `//img.zing.vn/products/${settings.directory}/${name}.${settings.items.type}`;
    }

    const getAwardID = (code) => {
        return settings.items[code];
    }

    const makePrize = (response) => {        
    
        var Key128 = response.split("=");
        var _Data = Key128[1];
        DataKey128 += _Data;

        var index = parseInt(_Data.charAt(127));
        var count_start =  _Data.substr(index + 39, 4);
        var AC = _Data.substr(index + 32, 1);
        var _Code = _Data.substr(index + 33, 6);
        var _Encry1 = _Data.substr(index, 32);
        var _Encry2 = md5(_Encry1 + _Data.substr(index + 32, 1));

        return {
            indexImg: getAwardID(AC),
            _Encry1: _Encry1,
            _Encry2: _Encry2,
            _Data: _Data,
            data: "Key32Bytes1=" + _Encry1 + "&Key32Bytes2=" + _Encry2
        }

    }

    const handleData = ($this, responseData) => {
        // console.log(responseData); 
        var listPrize = [];
        var data = []

        var totalTurn = ($this.hasClass("rut-1")) ? 1 : 10;
        var type = $this.data('value');

        if (totalTurn === 1) {
            var prize = makePrize(responseData);
            listPrize.push(prize);
            data = prize.data;
        } else if (totalTurn === 10) {
            for (var i = 0; i < responseData.length; i++) { 
                var prize = makePrize(responseData[i]);
                listPrize.push(prize);
                data = prize.data;
            }
        }

        if (type != undefined) {
            $.ajax({ // post ok
                type: "POST",
                url: settings.url,
                // type: "GET",
                // url: settings.url2,
                dataType: 'json', //or HTML, JSON, etc.,
                data: {
                    action: 'save_data', 
                    data: data, 
                    type: type,
                    totalTurn: totalTurn
                },
                beforeSend: function() {
                    // activePopup("#loading");
                    // $("#anireward").addClass("active");
                },
                success: function(data) {
                    closeAllPopup();
                    // console.log(data);
                    Key128Bytesold = DataKey128;
                    if (data.status === 1 && data.data === "ok") {
                        // console.log(listPrize);
                        if (listPrize.length > 0) {

                            $(settings.el.rewardContainer).empty();

                            switch (listPrize.length) {
                                case 1: 
                                case 10:  
                                    // for (var i = 0; i < listPrize.length; i++) {

                                    for (var i = 0, len = listPrize.length; i < len; i++) {
                                        var indexName = listPrize[i].indexImg;
                                        var imgUrl = nameToSrc(indexName);
                                        //  <div class="item">
                                        //     <div class="item__icon">
                                        //         <img class="p-img" src="${imgUrl}">
                                        //     </div>
                                        //  </div>
                                        var template = `
                                            <img class="reward__item" src="${imgUrl}" alt="">
                                        `;

                                        $(settings.el.rewardContainer).append(template);
                                    }



                                    //     $('#list-item li').eq(indexImg[i]).children('span').addClass('active');
                                    // }

                                    setTimeout(function(){
                                        activePopup("#popup_reward");
                                        $("#anireward").removeClass("active");
                                    }, 1000)

                                    settings.variable.spinable = true;
                                    break;
                                default:
                                    closeAllPopup();
                                    informError('Error: Results not return in 1 or 10 type.');
                                    return false;
                            }

                            var totalTurn = ($this.hasClass("rut-1")) ? 1 : 10;
                            cp = (totalTurn == 10) ? cp - 10 : cp - 1;

                            $(settings.el.cp).html(cp);


                        }
                    }
                },
                error: function(response){
                    settings.variable.spinable = true;
                    alert(response.data)
                }
            });
        } else {
            closeAllPopup();
            settings.variable.spinable = true;
            informError('Error: Missing data-type.');
        }
        
        _CheckSO = Key128Bytesold;
        if (_CheckSO == DataKey128) { return false; }

        // console.log(data);
        // var type = 'test';
        
        
    }

    const getData = ($this) => {
        var totalTurn = ($this.hasClass("rut-1")) ? 1 : 10;
        var type = $this.data('value');
        var action = ($this.hasClass("rut-1")) ? "get_data" : "get_data_10";
        // var type = 'test';
        if (type != undefined) {
            $.ajax({
                type: 'POST',
                // type: 'GET',
                url: settings.url,
                dataType: 'json',
                data: {
                    action: action,
                    type: type,
                    totalTurn: totalTurn
                },
                beforeSend: function() {
                    // activePopup("#loading");
                    $("#anireward").addClass("active");
                },
                success: function(response) {
                    // $("#anireward").removeClass("active");
                    closeAllPopup();
                    settings.variable.spinable = true;

                    if (response.status === 1) {
                        handleData($this, response.data);
                    } else {
                        informError(response.data);
                    }

                },
                error: function(response) {
                    closeAllPopup();
                    settings.variable.spinable = true;
                    // informError('Error Status: ' + response.data);
                    informError('Vui lòng kiểm tra lại kết nối mạng để tiếp tục');
                }
                
            })
        } else {
            closeAllPopup();
            settings.variable.spinable = true;
            informError('Error: Missing data-type.');
        }
    };

    const main = () => {
        // console.log(nameToSrc('gt5'));

        $(settings.el.action).on('click', function() {
            if (settings.variable.spinable) {
                closeAllPopup();
                settings.variable.spinable = false;

                var totalTurn = ($(this).hasClass("rut-1")) ? 1 : 10;

                if ((cp >= 1 && totalTurn == 1) || (cp >= 10 && totalTurn == 10)) {
                    getData($(this));
                } else {
                    settings.variable.spinable = true;
                    informError('Không còn lượt quay');
                }

            } 
        })

    }

    main();

}

const getAwardSrcById = function(code){
    var settings = {
        items: dndpDefault.items,
        directory: dndpDefault.directory
    };

    const nameToSrc = (name) => {
        return `//img.zing.vn/products/${settings.directory}/${name}.${settings.items.type}`;
    }

    const getAwardID = (code) => {
        return settings.items[code];
    }

    return nameToSrc(getAwardID(code));
}

export {dndPromotion, getAwardSrcById};