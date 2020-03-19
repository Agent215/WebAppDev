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

    // add burger data from json object
    var burgerObj = params.obj;
    // get rating of burger , our of 5 stars
    var numberOfStars = burgerObj.stars;

    // check to make sure that we have an id for the DOM element this new flipcard will be created in
    if (!params.id) {
        alert("parameter object must have an 'id' property");
        return;
    }

    // set container id 
    var flipCardDiv = document.getElementById(params.id);
    var flipCard = document.createElement("div");

    // Event handler for when we are focusing on this card to start typing text
    flipCard.addEventListener('click', function () {

        console.log("focusing");
        flipCard.classList.add("onFocus");
        typeWriter();
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
        } else {
            console.log("clicked inside");
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

    console.log(burgerObj);
    //make sure we have a burger object with an image
    if (!burgerObj.image) {
        alert("parameter object must have an burger Object with an image");
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
    img.src = burgerObj.image;
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

    // add the filled in stars
    for (var k = 0; k < numberOfStars; k++) {

        var star = document.createElement("span");
        star.classList.add("fa");
        star.classList.add("fa-star");
        star.classList.add("checked");
        flipCardBack.appendChild(star);
    }

    // if it is not a 5 star burger then add empty stars after
    if ((totStars - numberOfStars) > 0) {
        var emptyStars = totStars - numberOfStars;
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
        if (i < burgerObj.burgerName.length) {
            name.innerHTML += burgerObj.burgerName.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else
        if (j < burgerObj.burgerDescription.length) {

            desc.innerHTML += burgerObj.burgerDescription.charAt(j);
            j++;
            setTimeout(typeWriter, speed);
        } else
        if (n < burgerObj.userEmail.length) {
            email.innerHTML += burgerObj.userEmail.charAt(n);
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

        console.log("changing background color to :" + colorin)
        backgroundColor = colorin;
        flipCardBack.style.backgroundColor = backgroundColor;
    };

    //set font size on back of card
    o.setFontSize = function (sizein) {
        fontSize = sizein;
    };
    
    //set font color
    o.setFontColor = function (colorin) {
        fontColor = colorin;
    };

    return o;

}
