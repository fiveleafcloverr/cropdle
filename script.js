
const form = document.getElementById("form");
const input = document.getElementById("input");

const guesses = document.getElementById("guesses");


const cgrey = "rgba(255, 255, 255, 0.3)";
const cyellow = "rgba(247, 222, 59, 0.5)";
const cgreen = "rgba(56, 235, 86, 0.5)";


let pulsetime = 0;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function getObject(list, index) {
    for (var i = 0; i < Object.entries(list).length; i++) {
        if (Object.entries(list)[i][1].index == index) {
            return Object.entries(list)[i][1];
            break;
        }
    }

    return undefined;
}

function getObjectName(list, name) {
    for (var i = 0; i < Object.entries(list).length; i++) {
        if (Object.entries(list)[i][1].name.toLowerCase() == name.toLowerCase()) {
            return Object.entries(list)[i][1];
            break;
        }
    }

    return undefined;
}


function resetGuesses() {
    let g = document.getElementById("guesses");
    g.replaceChildren();
}

function randomCrop() {
    resetGuesses();
    let i = Math.round(Math.random() * Object.entries(CROPS).length);
    while (i == Object.entries(CROPS).length) {
        i = Math.round(Math.random() * Object.entries(CROPS).length);
    }
    targetCrop = getObject(CROPS, i);
    input.focus();
}

function dailyCrop() {
    let date = new Date();
    let seed = date.getUTCFullYear() * 100 + date.getUTCMonth() * 100 + date.getUTCDate();
    let rand = seed * 16807 % 2147483647;
    resetGuesses();
    targetCrop = getObject(CROPS, rand == 0 ? 0 : (rand % Object.entries(CROPS).length));
    input.focus();
}

function giveup() {
    appendCrop(targetCrop, true, true);
    input.focus();
}


class Crop {

    constructor(name, index, seasons, sell, time, regrow, from, atlasx = 0, atlasy = 0) {
        this.name = name;
        this.index = index;
        this.seasons = seasons;
        this.sell = sell;
        this.time = time;
        this.regrow = regrow;
        this.from = from;
        this.atlasx = atlasx;
        this.atlasy = atlasy;
    }
    
}


const SEASONS = {
    SPRING: 0,
    SUMMER: 1,
    AUTUMN: 2,
    WINTER: 3,
}


const SOURCES = {
    PIERRE: 0,
    JOJA: 1,
    CART: 2,
    OASIS: 3,
    FORAGE: 4,
}


const CROPS = {          // name              i   seasons
                         // sell time regrows sources                      atlasx atlasy
    
    BLUEJAZZ:      new Crop("Blue Jazz",      0,  [ SEASONS.SPRING ], 
                            50,  7,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 21, 24),
    CARROT:        new Crop("Carrot",         1,  [ SEASONS.SPRING ], 
                            35,  3,  false, [ SOURCES.FORAGE ], 24, 10),
    CAULIFLOWER:   new Crop("Cauliflower",    2,  [ SEASONS.SPRING ], 
                            175, 12, false, [ SOURCES.PIERRE, SOURCES.JOJA ], 22, 7),
    COFFEE:        new Crop("Coffee Bean",    3,  [ SEASONS.SPRING, SEASONS.SUMMER ], 
                            15,  10, true,  [ SOURCES.CART ], 1, 18),
    GARLIC:        new Crop("Garlic",         4,  [ SEASONS.SPRING ], 
                            60,  4,  false, [ SOURCES.PIERRE ], 8, 10),
    GREENBEAN:     new Crop("Green Bean",     5,  [ SEASONS.SPRING ], 
                            40,  10, true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 20, 7),
    KALE:          new Crop("Kale",           6,  [ SEASONS.SPRING ], 
                            110, 6,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 10, 10),
    PARSNIP:       new Crop("Parsnip",        7,  [ SEASONS.SPRING ], 
                            35,  4,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 0, 1),
    POTATO:        new Crop("Potato",         8,  [ SEASONS.SPRING ], 
                            80,  6,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 0, 8),
    RHUBARB:       new Crop("Rhubarb",        9,  [ SEASONS.SPRING ], 
                            220, 13, false, [ SOURCES.OASIS ], 12, 10),
    STRAWBERRY:    new Crop("Strawberry",     10, [ SEASONS.SPRING ], 
                            120, 8,  true,  [ SOURCES.PIERRE ], 16, 16),
    TULIP:         new Crop("Tulip",          11, [ SEASONS.SPRING ], 
                            30,  6,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 15, 24),
    RICE:          new Crop("Rice",  12, [ SEASONS.SPRING ], 
                            30,  8,  false, [ SOURCES.PIERRE ], 7, 11),
    BLUEBERRY:     new Crop("Blueberry",      13, [ SEASONS.SUMMER ], 
                            50,  13, true,  [ SOURCES.PIERRE ], 18, 10),
    CORN:          new Crop("Corn",           14, [ SEASONS.SUMMER, SEASONS.AUTUMN ], 
                            50,  14, true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 6, 11),
    HOPS:          new Crop("Hops",           15, [ SEASONS.SUMMER ], 
                            25,  11, true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 16, 12),
    PEPPER:        new Crop("Hot Pepper",     16, [ SEASONS.SUMMER ], 
                            40,  5,  true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 20, 10),
    MELON:         new Crop("Melon",          17, [ SEASONS.SUMMER ], 
                            250, 12, false, [ SOURCES.PIERRE, SOURCES.JOJA ], 14, 10),
    POPPY:         new Crop("Poppy",          18, [ SEASONS.SUMMER ], 
                            140, 7,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 16, 15),
    RADISH:        new Crop("Radish",         19, [ SEASONS.SUMMER ], 
                            90,  6,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 0, 11),
    REDCABBAGE:    new Crop("Red Cabbage",    20, [ SEASONS.SUMMER ], 
                            260, 9,  false, [ SOURCES.PIERRE ], 2, 11),
    STARFRUIT:     new Crop("Starfruit",      21, [ SEASONS.SUMMER ], 
                            750, 13, false, [ SOURCES.OASIS ], 4, 11),
    SUMMERSPANGLE: new Crop("Summer Spangle", 22, [ SEASONS.SUMMER ], 
                            90,  8,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 17, 24),
    SQUASH:        new Crop("Summer Squash",  23, [ SEASONS.SUMMER ], 
                            45,  6,  true,  [ SOURCES.FORAGE ], 25, 10),
    SUNFLOWER:     new Crop("Sunflower",      24, [ SEASONS.SUMMER, SEASONS.AUTUMN ], 
                            80,  8,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 13, 17),
    TOMATO:        new Crop("Tomato",         25, [ SEASONS.SUMMER ], 
                            60,  11, true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 16, 10),
    WHEAT:         new Crop("Wheat",          26, [ SEASONS.SUMMER, SEASONS.AUTUMN ], 
                            25,  4,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 22, 10),
    AMARANTH:      new Crop("Amaranth",       27, [ SEASONS.AUTUMN ], 
                            150, 7,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 12, 12),
    ARTICHOKE:     new Crop("Artichoke",      28, [ SEASONS.AUTUMN ], 
                            160, 8,  false, [ SOURCES.PIERRE ], 10, 11),
    BEET:          new Crop("Beet",           29, [ SEASONS.AUTUMN ], 
                            100, 6,  false, [ SOURCES.OASIS ], 20, 11),
    BOKCHOY:       new Crop("Bok Choy",       30, [ SEASONS.AUTUMN ], 
                            80,  4,  false, [ SOURCES.PIERRE, SOURCES.JOJA ], 14, 11),
    BROCCOLI:      new Crop("Broccoli",       31, [ SEASONS.AUTUMN ], 
                            70,  8,  true,  [ SOURCES.FORAGE ], 26, 10),
    CRANBERRIES:   new Crop("Cranberries",    32, [ SEASONS.AUTUMN ], 
                            75,  7,  true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 18, 11),
    EGGPLANT:      new Crop("Eggplant",       33, [ SEASONS.AUTUMN ], 
                            60,  5,  true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 8, 11),
    FAIRYROSE:     new Crop("Fairy Rose",     34, [ SEASONS.AUTUMN ], 
                            290, 12, false, [ SOURCES.PIERRE, SOURCES.JOJA ], 19, 24),
    GRAPES:        new Crop("Grapes",         35, [ SEASONS.AUTUMN ], 
                            80,  10, true,  [ SOURCES.PIERRE, SOURCES.JOJA ], 14, 16),
    PUMPKIN:       new Crop("Pumpkin",        36, [ SEASONS.AUTUMN ], 
                            320, 13, false, [ SOURCES.PIERRE, SOURCES.JOJA ], 12, 11),
    YAM:           new Crop("Yam",            37, [ SEASONS.AUTUMN ], 
                            160, 10, false, [ SOURCES.PIERRE, SOURCES.JOJA ], 16, 11),
    POWDERMELON:   new Crop("Powdermelon",    38, [ SEASONS.WINTER ], 
                            60,  7,  false, [ SOURCES.FORAGE ], 27, 10),
    ANCIENTFRUIT:  new Crop("Ancient Fruit",  39, [ SEASONS.SPRING, SEASONS.SUMMER, SEASONS.AUTUMN ], 
                            550, 28, true,  [ SOURCES.FORAGE ], 22, 18),
    PINEAPPLE:     new Crop("Pineapple",      40, [ SEASONS.SUMMER ], 
                            300, 14, true,  [ SOURCES.FORAGE ], 16, 34),
    QIFRUIT:       new Crop("Qi Fruit",       41, [ SEASONS.SPRING, SEASONS.SUMMER, SEASONS.AUTUMN, SEASONS.WINTER ], 
                            1  , 4,  true,  [ SOURCES.FORAGE ], 1, 37),
    SWEETGEMBERRY: new Crop("Sweet Gem Berry",42, [ SEASONS.AUTUMN ], 
                            3000,24, false, [ SOURCES.CART ], 9, 17),
    CACTUSFRUIT:   new Crop("Cactus Fruit",   43, [  ], 
                            75,  12, false, [ SOURCES.PIERRE, SOURCES.JOJA ], 18, 3),
    APPLE:         new Crop("Apple",          44, [ SEASONS.AUTUMN ], 
                            100, 28, true,  [ SOURCES.PIERRE ], 13, 25),
    APRICOT:       new Crop("Apricot",        45, [ SEASONS.SPRING ], 
                            50,  28, true,  [ SOURCES.PIERRE ], 10, 26),
    CHERRY:        new Crop("Cherry",         46, [ SEASONS.SPRING ], 
                            80,  28, true,  [ SOURCES.PIERRE ], 14, 26),
    ORANGE:        new Crop("Orange",         47, [ SEASONS.SUMMER ], 
                            100, 28, true,  [ SOURCES.PIERRE ], 11, 26),
    PEACH:         new Crop("Peach",          48, [ SEASONS.SUMMER ], 
                            140, 28, true,  [ SOURCES.PIERRE ], 12, 26),
    POMEGRANATE:   new Crop("Pomegranate",    49, [ SEASONS.AUTUMN ], 
                            140, 28, true,  [ SOURCES.PIERRE ], 13, 26),
    CHERRY:        new Crop("Cherry",         50, [ SEASONS.SPRING ], 
                            80,  28, true,  [ SOURCES.PIERRE ], 14, 26),
    MANGO:         new Crop("Mango",          51, [ SEASONS.SUMMER ], 
                            130, 28, true,  [ SOURCES.FORAGE ], 18, 34),
    BANANA:        new Crop("Banana",         52, [ SEASONS.SUMMER ], 
                            150, 28, true,  [ SOURCES.FORAGE ], 19, 3),
    TEALEAVES:     new Crop("Tea Leaves",     53, [ SEASONS.SPRING, SEASONS.SUMMER, SEASONS.AUTUMN ], 
                            50,  20, true,  [ SOURCES.FORAGE ], 23, 33),
    
}


let targetCrop;
dailyCrop();


function getSellColour(crop) {
    if (crop.sell == targetCrop.sell) { return cgreen; }
    if (Math.abs(crop.sell - targetCrop.sell) <= 30) { return cyellow; }
    return cgrey;
}

function getTimeColour(crop) {
    if (crop.time == targetCrop.time) { return cgreen; }
    if (Math.abs(crop.time - targetCrop.time) <= 2) { return cyellow; }
    return cgrey;
}

function getSeasonColour(crop) {
    let valid = true;
    if (crop.seasons.length == targetCrop.seasons.length) {
        for (let i = 0; i < crop.seasons.length; i++) {
            if (crop.seasons[i] != targetCrop.seasons[i]) { valid = false; }
        }
    } else { valid = false; }
    if (valid) { return cgreen; }

    let found = false;
    for (let i = 0; i < crop.seasons.length; i++) {
        for (let j = 0; j < targetCrop.seasons.length; j++) {
            if (crop.seasons[i] == targetCrop.seasons[j]) {
                found = true;
            }
        }
    }
    if (found) { return cyellow; }
    return cgrey;
}

function getSourceColour(crop) {
    let valid = true;
    if (crop.from.length == targetCrop.from.length) {
        for (let i = 0; i < crop.from.length; i++) {
            if (crop.from[i] != targetCrop.from[i]) { valid = false; }
        }
    } else { valid = false; }
    if (valid) { return cgreen; }

    let found = false;
    for (let i = 0; i < crop.from.length; i++) {
        for (let j = 0; j < targetCrop.from.length; j++) {
            if (crop.from[i] == targetCrop.from[j]) {
                found = true;
            }
        }
    }
    if (found) { return cyellow; }
    return cgrey;
}
    

function addBox(element, colour = cgrey, lose = false) {
    let div = document.createElement("div");
    div.className = "crop";
    let col = colour;
    /*if (lose) {
        col = "rgba(255, 0, 0, 0.6)";
    }*/
    div.style.backgroundColor = col;
    div.style.boxShadow = "0px 0px 12px " + col;
    div.appendChild(element);
    return div;
}

function appendCrop(crop, win = false, lose = false) {

    let div = document.createElement("div");
    div.className = "container";

    let name = document.createElement("p");
    name.innerHTML = crop.name;
    name.style.fontSize = "20px";
    let icon = document.createElement("img");
    let idiv = document.createElement("div");
    icon.src = "./crops.png";
    idiv.style.verticalAlign = "middle";
    icon.style.width = "1024px";
    icon.style.marginLeft = (-crop.atlasx * 32) + "px";
    icon.style.marginTop = (-crop.atlasy * 32) + "px";
    icon.style.imageRendering = "pixelated";
    icon.style.padding = "0px"
    idiv.style.overflow = "hidden";
    idiv.style.width = "32px";
    idiv.style.height = "32px";
    idiv.style.display = "inline-block";
    idiv.style.marginLeft = "8px";
    let icon2 = icon.cloneNode();
    let idiv2 = idiv.cloneNode();
    idiv.appendChild(icon);
    idiv2.appendChild(icon2);
    idiv2.style.marginRight = "8px";
    name.insertAdjacentElement("afterBegin", idiv2);
    name.insertAdjacentElement("beforeEnd", idiv);

    //let img = document.createElement("img");
    //img.src = "https://fiveleafcloverr.github.io/Balatno/sprites/enhancements.png";

    let sell = document.createElement("p");
    sell.innerHTML = "Sell Price<br>" + (targetCrop.sell < crop.sell ? "&#x1f81f; $" : targetCrop.sell > crop.sell ? "&#x1f81d; $" : "$") + crop.sell;
    sell.style.margin = "0px";

    let time = document.createElement("p");
    time.innerHTML = "Grow Time<br>" + (targetCrop.time < crop.time ? "&#x1f81f; " : targetCrop.time > crop.time ? "&#x1f81d; " : "") + crop.time + " days";

    let regrow = document.createElement("p");
    regrow.innerHTML = "Regrows<br>" + (crop.regrow ? "Yes" : "No");
    regrow.style.margin = "0px";

    let seasons = document.createElement("p");
    seasons.innerHTML = "Seasons<br>";// + crop.seasons;
    let icons = document.createElement("div");
    for (let i = 0; i < crop.seasons.length; i++) {
        let s = document.createElement("img");
        let sd = document.createElement("div");
        s.src = "./seasons.png";
        s.style.width = "262px";
        s.style.imageRendering = "pixelated";
        s.style.padding = "0px";
        s.style.marginLeft = -(160 + 26 * crop.seasons[i]) + "px";
        sd.style.overflow = "hidden";
        sd.style.width = "24px";
        sd.style.height = "16px";
        sd.style.marginLeft = "4px";
        sd.style.marginTop = "2px";
        sd.style.marginBottom = "-3px";
        sd.style.display = "inline-block";
        sd.appendChild(s);
        icons.appendChild(sd);
    }
    if (crop.seasons.length == 0) {
        seasons.innerHTML += "(none)";
        
    }
    icons.style.margin = "auto";
    seasons.style.margin = "0px";
    seasons.appendChild(icons);
    
    let sources = document.createElement("p");
    sources.innerHTML = "Sources<br>";// + crop.from;
    icons = document.createElement("div");
    for (let i = 0; i < crop.from.length; i++) {
        let s = document.createElement("img");
        let sd = document.createElement("div");
        s.src = "./heads.png";
        s.style.width = "150px";
        s.style.imageRendering = "pixelated";
        s.style.padding = "0px";
        s.style.marginLeft = -(30 * crop.from[i]) + "px";
        sd.style.overflow = "hidden";
        sd.style.width = "30px";
        sd.style.height = "28px";
        sd.style.marginLeft = "4px";
        sd.style.marginTop = "-6px";
        sd.style.marginBottom = "-10px";
        sd.style.display = "inline-block";
        sd.appendChild(s);
        icons.appendChild(sd);
    }
    icons.style.margin = "auto";
    sources.style.margin = "0px";
    sources.appendChild(icons);


    let space1 = 31;
    let space2 = 48;
    
    div.appendChild(addBox(name, win ? cgreen : cgrey, lose));
    //div.appendChild(addBox(img, win ? cgreen : cgrey));
    
    let box = addBox(sell, getSellColour(crop), lose);
    box.style.width = space1 + "%";
    box.style.float = "left";
    box.style.marginTop = "0px";
    div.appendChild(box);
    
    box = addBox(regrow, crop.regrow == targetCrop.regrow ? cgreen : cgrey, lose);
    box.style.width = space1 + "%";
    box.style.float = "right";
    box.style.marginTop = "0px";
    div.appendChild(box);
    
    box = addBox(time, getTimeColour(crop), lose);
    box.style.width = space1 + "%";
    box.style.margin = "auto";
    div.appendChild(box);

    box = addBox(seasons, getSeasonColour(crop), lose);
    box.style.width = space2 + "%";
    box.style.float = "left";
    box.style.margin = "auto";
    div.appendChild(box);

    box = addBox(sources, getSourceColour(crop), lose);
    box.style.width = space2 + "%";
    box.style.float = "right";
    box.style.margin = "auto";
    div.appendChild(box);
    
    guesses.appendChild(div);
    
}


function guess() {

    let g = input.value;
    form.reset();
    if (g == "r") { randomCrop(); return; }
    if (g == "d") { dailyCrop(); return; }
    if (g == "g") { giveup(); return; }
    let crop = getObjectName(CROPS, g);

    if (crop == undefined) {
        pulsetime = 1;
    } else {
        appendCrop(crop, targetCrop == crop);
    }
    
}

function update() {
    pulsetime *= 0.85;
    let col = [lerp(255, 255, pulsetime), lerp(255, 0, pulsetime), lerp(255, 0, pulsetime), lerp(0.3, 0.6, pulsetime)];
    let c = "rgba(" + col[0] + ", " + col[1] + ", " + col[2] + ", " + col[3] + ")";
    input.style.backgroundColor = c;
    input.style.boxShadow = "0px 0px 12px " + c;
    
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);















