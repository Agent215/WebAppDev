//makeTypeFlipCard.js
//Abraham Schultz
// CIS 3308 

// parameter object expected to have these properties:
// a object containg json data pulled from a database or elsewhere
// an id of the DOM element we want this to be created inside of
// size of card  medium, large, x-large

"use strict";
function makeTypeFlipCard(params) {

    // object to return
    var o = {};
    //declare vars that can change;
    var imageSize;
    var cardStyle;
    // iterators for the typewriter
    var i = 0;
    var j = 0;
    var n = 0;
    //total number of stars a burge can get
    const totStars = 5;
    //default values
    var backgroundColor = "dodgerblue";
    var speed = 50;
    var fontSize = "12px";
    var fontColor = "white";

    //check to make sure params contains a json object with data to display
    if (!params.obj) {
        alert("parameter object must have an 'obj' property");
        return;
    }

    // check to make sure that we have an id for the DOM element this new flipcard will be created in
    if (!params.id) {
        alert("parameter object must have an 'id' property");
        return;
    }

    // set inner html to nothing
    document.getElementById(params.id).innerHTML = "";

    // add data from json/javascript object
    var obj = params.obj;

    console.log(obj);
    //paramaterize object list so that this is not dependent on specific object key values
    // we should probably make this a loop based on object length for better reusbility
    var firstKey = Object.keys(obj)[0];
    var secondKey = Object.keys(obj)[1];
    var thirdKey = Object.keys(obj)[2];
    var fourthKey = Object.keys(obj)[3];
    var fifthKey = Object.keys(obj)[4];


    // set container id 
    var flipCardDiv = document.getElementById(params.id);
    var flipCard = document.createElement("div");
    var focusing = false;
    // Event handler for when we are focusing on this card to start typing text
    flipCard.addEventListener('click', function () {

        // if we are not focusing then focus other wise unfocus
        if (focusing === false) {
            console.log("focusing");
            focusing = true;
            flipCard.classList.add("onFocus");
            typeWriter();
        } else {


            console.log("clicked outside");
            flipCard.classList.remove("onFocus");
            focusing = false;
            resetText();
        }

    }
    );

    // even handlers to listen for click outside of element
    document.addEventListener('click', function (event) {
        var isClickInside = flipCardDiv.contains(event.target);

        if (!isClickInside) {
            //the click was outside 
            console.log("clicked outside");
            flipCard.classList.remove("onFocus");
            resetText();
            focusing = false;

        } else if ((!isClickInside )&& (focusing === true)) {

            console.log("clicked outside");
            flipCard.classList.remove("onFocus");
            resetText();
            focusing = false;



        }
    });

    flipCardDiv.appendChild(flipCard);

    // if no size is provided then set default css size and style
    // other wise set to assinged css styles
    if (!params.size) {
        flipCard.classList.add("flip-card-med");
        imageSize = "med";
        cardStyle = "flip-card-med";
    } else
    if (params.size === "large") {
        flipCard.classList.add("flip-card-large");
        cardStyle = "flip-card-large";
        imageSize = "large";

    } else
    if (params.size === "xlarge") {
        flipCard.classList.add("flip-card-xlarge");
        cardStyle = "flip-card-xlarge";
        imageSize = "xlarge";

    }

    // add inner div which contains the front and back
    var flipCardInner = document.createElement("div");
    flipCard.appendChild(flipCardInner);
    flipCardInner.classList.add("flip-card-inner");

    //check that DOM element exists
    if (!flipCardDiv) {
        alert("parameter object must have an 'id' property that references a valid DOM element");
        return;
    }


    // create front of card div to hold image
    var front = document.createElement("div");
    front.classList.add("flip-card-front");
    front.classList.add(imageSize);
    flipCardInner.appendChild(front);
    // create back of card div to hold data
    var flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardBack.style.backgroundColor = backgroundColor;
    flipCardInner.appendChild(flipCardBack);

    //create image
    var img = document.createElement("img");
    img.src = obj["" + secondKey];
    img.classList.add(imageSize);

    // add name description email and rating
    var name = document.createElement("h1");
    var desc = document.createElement("p");
    var email = document.createElement("p");
    var rating = document.createElement("h2");

    // append DOM elements in order we want them to appear
    front.appendChild(img);
    flipCardBack.appendChild(name);
    flipCardBack.appendChild(desc);
    flipCardBack.appendChild(email);
    flipCardBack.appendChild(rating);
    rating.innerHTML = "Rating";
    email.style.margin = "0px";
    rating.style.margin = "0px";

    // add the filled in stars
    for (var k = 0; k < obj["" + fifthKey]; k++) {

        var star = document.createElement("span");
        star.classList.add("fa");
        star.classList.add("fa-star");
        star.classList.add("checked");
        flipCardBack.appendChild(star);
    }

    // if it is not a 5 star burger then add empty stars after
    if ((totStars - obj["" + fifthKey]) > 0) {
        var emptyStars = totStars - obj["" + fifthKey];
        for (var h = 0; h < emptyStars; h++) {
            var star = document.createElement("span");
            star.classList.add("fa");
            star.classList.add("fa-star");
            flipCardBack.appendChild(star);
        }
    }

    // type writer function types data
    function typeWriter() {

        console.log("typeWriter function active");
        if (i < obj["" + firstKey].length) {
            name.innerHTML += obj["" + firstKey].charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else
        if (j < obj["" + thirdKey].length) {

            desc.innerHTML += obj["" + thirdKey].charAt(j);
            j++;
            setTimeout(typeWriter, speed);
        } else
        if (n < obj["" + fourthKey].length) {
            email.innerHTML += obj["" + fourthKey].charAt(n);
            n++;
            setTimeout(typeWriter, speed);
        }

    } // end typewriter


    // reset the typewriter text here
    function resetText() {
        console.log("reseting text");
        name.innerHTML = "";
        desc.innerHTML = "";
        email.innerHTML = "";
        i = 0;
        j = 0;
        n = 0;
    }

    // public functions *******************************************************************************
    //set speed of typewriter text
    o.setSpeed = function (speedin) {

        speed = speedin;
    };

    //set color of back of card
    o.setBackColor = function (colorin) {

        console.log("changing background color to :" + colorin);
        backgroundColor = colorin;
        flipCardBack.style.backgroundColor = backgroundColor;
    };

    //TODO set font size on back of card
    o.setFontSize = function (sizein) {
        fontSize = sizein;
    };

    //TODO set font color
    o.setFontColor = function (colorin) {
        fontColor = colorin;
        console.log("changing font color to :" + colorin);
        name.style.color = fontColor;
        desc.style.color = fontColor;
        email.style.color = fontColor;
        rating.style.color = fontColor;
    };

    return o;

} // end makeTypeFlipCard
