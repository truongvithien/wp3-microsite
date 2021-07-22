// TEST
// 
// var serverTime = new Date().getTime();
// var serverTime = new Date(2021,3, 3).getTime();
// 

const milestonesSimulator = {
    data: {
        value: {
            serverTime: new Date().getTime(),  
            // serverTime: new Date(2021,3, 5).getTime()
        },
        el: {
            milestonesValue: '#milestonesValue',
            milestonesCheatAdd: '#milestonesCheatAdd',
            milestonesCheatMultiply: '#milestonesCheatMultiply',
            milestonesBar: '#milestonesBar',
            milestonesBarActive: '#milestonesBarActive'
        },
        target: [
            //   / \
            //  / ! \  Remember month starts by 0 instead of 1.
            // /_____\
            {
                time: new Date(2021, 5, 30), // <-- open promotion time
                gain: 0 
            },
            {
                time: new Date(2021, 6, 3),
                gain: 5000
            },
            {
                time: new Date(2021, 6, 11), 
                gain: 10000
            },
            { 
                time: new Date(2021, 6, 18),
                gain: 20000
            }
        ],
        milestonesDisplay: {
            attribute: {
                desktop: 'width',
                mobile: 'width',
            },
            unit: {
                desktop: '%',
                mobile: '%',
            }
        },
        milestones: [
            {
                gain: 0,
                value: {
                    desktop: 0,
                    mobile: 0
                }
            },
            {
                gain: 10000,
                value: {
                    desktop: 16,
                    mobile: 18
                }
            },
            {
                gain: 30000,
                value: {
                    desktop: 50,
                    mobile: 50
                }
            },
            {
                gain: 100000,
                value: {
                    desktop: 84,
                    mobile: 82
                }
            },
            {
                gain: 999999,
                value: {
                    desktop: 100,
                    mobile: 100
                }
            }
        ]
    },
    util: {
        isMobile: () => () => {
            var width = $(window).outerWidth(),
                height = $(window).outerHeight();

            return ((width <= 700) || (width < height));
        },
        getCurrentTime: (serverTime) => 
            (serverTime.toString().length < 12) ? serverTime * 1000 : serverTime,
        getCurrentStage: (serverTime) => {
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
        getSubscriptions: (serverTime) => {
            let currentTime = milestonesSimulator.util.getCurrentTime(serverTime);
            let stages = milestonesSimulator.data.target;
            let [before, after] = milestonesSimulator.util.getCurrentStage(milestonesSimulator.data.value.serverTime);

            if (before < 0) return stages[0].gain;
            if (after < 0) return stages[stages.length - 1].gain;

            let middlePercentage = (currentTime - stages[before].time.getTime()) / 
                                    (stages[after].time.getTime() - stages[before].time.getTime());

        
            // console.log(currentTime - stages[before].time.getTime());
            // console.log(stages[after].time.getTime() - stages[before].time.getTime());
            // console.log(timePercentage);

            return (stages[before].gain + middlePercentage * (stages[after].gain - stages[before].gain))

        },
        displaySubscriptions: (milestonesValue) => {
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
        displayMilestones: (milestonesValue) => {                
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
                    [milestonesSimulator.data.milestonesDisplay.attribute[deviceType]] : 0 + milestonesSimulator.data.milestonesDisplay.unit[deviceType]
                });
                return;
            };
            if (after < 0) {
                $(milestonesSimulator.data.el.milestonesBarActive).css({
                    [milestonesSimulator.data.milestonesDisplay.attribute[deviceType]] : milestonesSimulator.data.milestones[milestonesSimulator.data.milestones.length - 1].value[deviceType] + milestonesSimulator.data.milestonesDisplay.unit[deviceType]
                });
                return;
            };


            let middlePercentage = (milestonesValue - stages[before].gain) / 
                                    (stages[after].gain - stages[before].gain); 

            let displayPercentage = stages[before].value[deviceType] + 
                                    middlePercentage * (stages[after].value[deviceType] - stages[before].value[deviceType]);
            
            // console.log(displayPercentage);

            if ($(milestonesSimulator.data.el.milestonesBarActive).length > 0) {
                $(milestonesSimulator.data.el.milestonesBarActive).css({
                    [milestonesSimulator.data.milestonesDisplay.attribute[deviceType]] : displayPercentage + milestonesSimulator.data.milestonesDisplay.unit[deviceType]
                });
            }

            // console.log(before, after);


        }        
    },
    before: function(){},
    after: function(){},
    init: function(data){

        milestonesSimulator.data.value.serverTime = data.serverTime;

        console.log(milestonesSimulator.data.value)

        milestonesSimulator.before(); 

        // 

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

        subs = (subs < 0) ? 0 : subs;

        milestonesSimulator.util.displaySubscriptions(subs);
        milestonesSimulator.util.displayMilestones(subs);
        //  

        milestonesSimulator.after();
    }
}

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
                mobile: 'width',
            },
            unit: {
                desktop: '%',
                mobile: '%',
            }
        },
        milestonesRunDisplay: {
            attribute: {
                desktop: 'left',
                mobile: 'left',
            },
            unit: {
                desktop: '%',
                mobile: '%',
            }
        },
        milestones: [
            {
                gain: 0,
                value: {
                    desktop: 0,
                    mobile: 0
                }
            },
            {
                gain: 10000,
                value: {
                    desktop: 16,
                    mobile: 18
                }
            },
            {
                gain: 30000,
                value: {
                    desktop: 50,
                    mobile: 50
                }
            },
            {
                gain: 100000,
                value: {
                    desktop: 84,
                    mobile: 82
                }
            },
            {
                gain: 999999,
                value: {
                    desktop: 100,
                    mobile: 100
                }
            }
        ]
    },
    util: {
        isMobile: () => () => {
            var width = $(window).outerWidth(),
                height = $(window).outerHeight();

            return ((width <= 700) || (width < height));
        },
        getSubscriptions: (callback = function(data){}) => {

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
                }

                // console.log(elSubs.prop("tagName"));

                callback(parseInt(subscriptions));

            } else {

                $.ajax({
                    url: milestonesHybrid.data.value.ajax,   
                    dataType: 'json', 
                    success: function(data) {
                        // console.log(data);
                        if (data.status != undefined && data.status == 1) {
                            callback(parseInt(data.data));
                        }
                    }
                })
            }
        },
        displaySubscriptions: (milestonesValue) => {
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
        displayMilestones: (milestonesValue) => {                
            let before = -1,
                after = -1;
            let stages = milestonesHybrid.data.milestones;
            for (let i = 0, len = stages.length; i < len; i++) {

                let stage = stages[i];

                // console.log(milestonesValue, stage.gain);

                if (milestonesValue >= stage.gain) before = i;
                if (milestonesValue < stage.gain) {
                    after = i; 
                    break;
                } 
            } 
            // console.log(before, after);

            let deviceType = milestonesHybrid.util.isMobile() ? "mobile" : "desktop";


            if (before < 0) {
                $(milestonesHybrid.data.el.milestonesBarActive).css({
                    [milestonesHybrid.data.milestonesDisplay.attribute[deviceType]] : 0 + milestonesHybrid.data.milestonesDisplay.unit[deviceType]
                });
                // return;
            };
            if (after < 0) {
                $(milestonesHybrid.data.el.milestonesBarActive).css({
                    [milestonesHybrid.data.milestonesDisplay.attribute[deviceType]] : milestonesHybrid.data.milestones[milestonesHybrid.data.milestones.length - 1].value[deviceType] + milestonesHybrid.data.milestonesDisplay.unit[deviceType]
                });
                // return;
            };

            // console.log(before, after); 

            let middlePercentage = (milestonesValue - stages[before].gain) / 
                                    (stages[after].gain - stages[before].gain); 

            let displayPercentage = stages[before].value[deviceType] + 
                                    middlePercentage * (stages[after].value[deviceType] - stages[before].value[deviceType]);
            
            // console.log(displayPercentage);

            if ($(milestonesHybrid.data.el.milestonesBarActive).length > 0) {
                $(milestonesHybrid.data.el.milestonesBarActive).css({
                    [milestonesHybrid.data.milestonesDisplay.attribute[deviceType]] : displayPercentage + milestonesHybrid.data.milestonesDisplay.unit[deviceType]
                });
            }

            if ($(milestonesHybrid.data.el.milestonesRun).length > 0) {
                $(milestonesHybrid.data.el.milestonesRun).css({
                    [milestonesHybrid.data.milestonesRunDisplay.attribute[deviceType]] : displayPercentage + milestonesHybrid.data.milestonesRunDisplay.unit[deviceType]
                });
            }


            // console.log(after);

            if ($(milestonesHybrid.data.el.milestonesIcon).length > 0) {
                for (let i = 0; i < before; i++) {
                    // console.log(i);
                    $(milestonesHybrid.data.el.milestonesIcon + " > li").eq(i).addClass("active");
                }


            }





        }        
    },
    before: function(){},
    after: function(){},
    init: function(data){

        // milestonesHybrid.data.value.serverTime = data.serverTime;

        // console.log(milestonesHybrid.data.value)

        milestonesHybrid.before(); 

        // 

        milestonesHybrid.util.getSubscriptions(
            function(subs){
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
                milestonesCheatMultiply = parseInt(milestonesCheatMultiply);
        
                // console.log(subs, milestonesCheatMultiply, milestonesCheatAdd); 
        
                // subs = subs * milestonesCheatMultiply + milestonesCheatAdd;
        
                subs = (subs < 0) ? 0 : subs;
        
                milestonesHybrid.util.displaySubscriptions(subs);
                milestonesHybrid.util.displayMilestones(subs);
                //  
        
                milestonesHybrid.after();
            }
        );
    }
}

export {
    milestonesSimulator, 
    milestonesHybrid
};