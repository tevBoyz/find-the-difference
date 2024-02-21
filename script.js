var uniqueBox = 0;
var level = 0

var commonColor = "";
var uniqueColor = "";

startGame();


function startGame(){
    level = 0;
    commonColor = getRandomColor();
    uniqueColor = changeHue(commonColor, mapLevel(level));

    fillCommonColor(commonColor);
    fillRandomUniqueBox(uniqueColor);
    document.getElementsByClassName("levelDispSpan")[0].style.color = commonColor;
    document.getElementsByClassName("levelDispSpan")[1].style.color = commonColor;
    document.getElementsByClassName("levelDispSpan")[2].style.color = commonColor;
}

function levelUp(){
    if(level < 25){
        level ++;
        uniqueColor = changeHue(commonColor, mapLevel(level));

        fillCommonColor(commonColor);
        fillRandomUniqueBox(uniqueColor);
        document.getElementById("levelNum").innerHTML = level;
    }
    else{
        alert("Congrats, You have amazing eyes! Play again?")
        restart();
    }
}


function mapLevel(level) {
    let degree;
    switch (level) {
    case 0: 
        degree = 50;
        break;
    case 1:
        degree = 45;
        break;
    case 2:
        degree = 40;
        break;
    case 3: 
        degree = 35;
        break;
    case 4:
        degree = 30;
        break;
    case 5:
        degree = 25;
        break;
    case 6: 
        degree = 20;
        break;
    case 7:
        degree = 15;
        break;
    case 8:
        degree = 12;
        break;
    case 9: 
        degree = 11;
        break;
    case 10:
        degree = 10;
        break;
    case 11:
        degree = 9.5;
        break;
    case 12:
        degree = 9;
        break;
    case 13:
        degree = 8.5;
        break;
    case 14:
        degree = 8;
        break;
    case 15:
        degree = 7.5;
        break;
    case 16: 
        degree = 7;
        break;
    case 17:
        degree = 6.5;
        break;
    case 18:
        degree = 6;
        break;
    case 19:
        degree = 5;
        break;
    case 20:
        degree = 4;
        break;
    case 21: 
        degree = 3.5;
        break;
    case 22: 
        degree = 3;
        break;
    case 23: 
        degree = 2.5;
        break;
    case 24: 
        degree = 2;
        break;
    case 25: 
        degree = 1;
        break;
    default:
        degree = 1;
        break;
}
return degree;
}


function boxClicked(id){
    if(id == uniqueBox){
        levelUp();
    }
    else{
        revealUniqueBox();
        setTimeout(failed, 1000);
    }
}

function failed(){
    alert( "Failed at level: "+level+". You clicked the wrong box! Try again?");
    restart();
}

function revealUniqueBox(){
    document.getElementById("matrix").style.gap = 0;
    let box = document.querySelectorAll("box");
    for (let i=0;i<box.length;i++){
        box[i].removeAttribute("border");
    }
}

// Changes the RGB/HEX temporarily to a HSL-Value, modifies that value 
// and changes it back to RGB/HEX.

function changeHue(rgb, degree) {
    var hsl = rgbToHSL(rgb);
    hsl.h += degree;
    if (hsl.h > 360) {
        hsl.h -= 360;
    }
    else if (hsl.h < 0) {
        hsl.h += 360;
    }
    return hslToRGB(hsl);
}

// exepcts a string and returns an object
function rgbToHSL(rgb) {
    // strip the leading # if it's there
    rgb = rgb.replace(/^\s*#|\s*$/g, '');

    // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
    if(rgb.length == 3){
        rgb = rgb.replace(/(.)/g, '$1$1');
    }

    var r = parseInt(rgb.substr(0, 2), 16) / 255,
        g = parseInt(rgb.substr(2, 2), 16) / 255,
        b = parseInt(rgb.substr(4, 2), 16) / 255,
        cMax = Math.max(r, g, b),
        cMin = Math.min(r, g, b),
        delta = cMax - cMin,
        l = (cMax + cMin) / 2,
        h = 0,
        s = 0;

    if (delta == 0) {
        h = 0;
    }
    else if (cMax == r) {
        h = 60 * (((g - b) / delta) % 6);
    }
    else if (cMax == g) {
        h = 60 * (((b - r) / delta) + 2);
    }
    else {
        h = 60 * (((r - g) / delta) + 4);
    }

    if (delta == 0) {
        s = 0;
    }
    else {
        s = (delta/(1-Math.abs(2*l - 1)))
    }

    return {
        h: h,
        s: s,
        l: l
    }
}

// expects an object and returns a string
function hslToRGB(hsl) {
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        c = (1 - Math.abs(2*l - 1)) * s,
        x = c * ( 1 - Math.abs((h / 60 ) % 2 - 1 )),
        m = l - c/ 2,
        r, g, b;

    if (h < 60) {
        r = c;
        g = x;
        b = 0;
    }
    else if (h < 120) {
        r = x;
        g = c;
        b = 0;
    }
    else if (h < 180) {
        r = 0;
        g = c;
        b = x;
    }
    else if (h < 240) {
        r = 0;
        g = x;
        b = c;
    }
    else if (h < 300) {
        r = x;
        g = 0;
        b = c;
    }
    else {
        r = c;
        g = 0;
        b = x;
    }

    r = normalize_rgb_value(r, m);
    g = normalize_rgb_value(g, m);
    b = normalize_rgb_value(b, m);

    return rgbToHex(r,g,b);
}

function normalize_rgb_value(color, m) {
    color = Math.floor((color + m) * 255);
    if (color < 0) {
        color = 0;
    }
    return color;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getRandomColor(){
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return '#' + n.slice(0, 6);
}

function fillRandomUniqueBox(uniqueColor){
    uniqueBox = Math.floor(Math.random() * (25 - 1 + 1) + 1);
    document.getElementById(""+uniqueBox+"").style.backgroundColor = uniqueColor;
}

function fillCommonColor(commonColor){
    let x = document.querySelectorAll(".box");
    for(let i=0 ;i<x.length; i++){
        x[i].style.backgroundColor = commonColor;
    }
}


function restart(){
    location.reload();
}