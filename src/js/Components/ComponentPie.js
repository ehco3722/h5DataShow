require('../../less/ComponentPie.less');
let ComponentBaseFactory = require('./ComponentBase.js');


let ComponentPieFactory = (config) => {
    let Component = ComponentBaseFactory(config).addClass('ComponentPie');
    const Data = config.data;

    let oCanvas = $('<canvas/>').get(0);
    Component.append(oCanvas);

    let [w, h] = [config.width, config.height];
    [oCanvas.width, oCanvas.height] = [w, h];

    let oContext = oCanvas.getContext('2d');
    oContext.fillStyle = '#eee';

    let r = w / 2;
    oContext.beginPath();
    oContext.arc(r, r, r, 0, Math.PI * 2);
    oContext.fill();
    

    let oCavsData = $('<canvas/>').get(0);
    [oCavsData.width, oCavsData.height] = [w, h]
    Component.append(oCavsData);
    let oCxtData = oCavsData.getContext('2d');
    
    let sAngle = 1.5 * Math.PI;
    let eAngle = 0;
    let aAngle = 2 * Math.PI;
    Data.forEach((ele, index) => {
        oCxtData.beginPath();
        eAngle = sAngle + ele[1] * aAngle;
        oCxtData.fillStyle = ele[2];
        oCxtData.moveTo(r, r);
        oCxtData.arc(r, r, r, sAngle, eAngle);
        oCxtData.fill();

        var trueR = w / 4;  //125  w500
        let textAngle = sAngle + (eAngle - sAngle) / 2;
        //console.log(aAngle); //2pi
        //console.log(textAngle);//s旧 e新
        let x = Math.abs( trueR * Math.cos(aAngle - (sAngle + (eAngle - sAngle) / 2 ) ) );
        let y = Math.abs( trueR * Math.sin(aAngle - (sAngle + (eAngle - sAngle) / 2 ) ) );

        let oText = $('<div/>').addClass('text').css('position', 'absolute').text(ele[0]);
// console.log(x);
        if (textAngle >= 1.5 * Math.PI && textAngle < 2.5 * Math.PI) {
            oText.css({left: trueR + x});//右面
        }else if (textAngle >= 2.5 * Math.PI && textAngle <= 3.5 * Math.PI) {
            oText.css({right: trueR + x});//左面
        }

        if ( (textAngle >= 1.5 * Math.PI && textAngle < 2 * Math.PI) || (textAngle >= 3 * Math.PI && textAngle < 3.5 * Math.PI)  ){
            oText.css({bottom: trueR + y});//上面
        }else if (textAngle >= 2 * Math.PI &&  textAngle < 3 * Math.PI) {
            oText.css({top: trueR + y});//下面
        }

        oText.appendTo(Component);
        sAngle = eAngle;
    });

    let oMask = $('<canvas/>').get(0);
    [oMask.width, oMask.height] = [w, h];

    let oMCxt = oMask.getContext('2d');
    Component.append(oMask);
    oMCxt.fillStyle = '#7aa899';

    function draw (percent) {
        oMCxt.clearRect(0, 0, w, h);
        oMCxt.beginPath();
        oMCxt.moveTo(r, r);
        oMCxt.arc(r, r, r, 1.5 * Math.PI, 1.5 * Math.PI - aAngle * percent, 1);
        oMCxt.fill();
    }
   
    draw(1);

    Component.on('loadComponent', () => {
        var index = 1;
        setTimeout (() => {
            for (let i = 0; i < 100; i++) {
                setTimeout(() => {
                    index -= 0.01;
                    draw(index)  
                }, i * 20);
            }
        }, 1000) 
    });


    Component.on('leaveComponent', () => {
        draw(1);
    });







    return Component;
}

module.exports = ComponentPieFactory;
