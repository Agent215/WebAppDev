//makeTypeFlipCard.js
//Abraham Schultz
// CIS 3308 

//TODO : fix so that we can refrence outside ajax and jsp scripts without including in folder
//TODO : fix focus out so that card flips around
//TODO : add public method to change size by reassinging classes
//TODO : fix typewriter function

// parameter object expected to have these properties:
// a object containg json data pulled from a database or elsewhere
// an id of the DOM element we want this to be created inside of
// size of card , x-small, small , medium, large, x-large
function makeTypeFlipCard(params) {

    //declare vars that can change;
    var flipDataSize = 5;
    var imageSize;
    var cardStyle;

//check to make sure params contains a json object with data to display
    if (!params.obj) {
        alert("parameter object must have an 'obj' property");
        return;
    }

    // add burger data from json object
    var burgerObj = params.obj;

    // check to make sure that we have an id for the DOM element this new flipcard will be created in
    if (!params.id) {
        alert("parameter object must have an 'id' property");
        return;
    }

    var flipCardDiv = document.getElementById(params.id);
    var flipCard = document.createElement("div");

    // Event handler for when we are focusing on this card to start typing text
    flipCard.addEventListener('click', function () {

        console.log("focusing");
        flipCard.classList.add("onFocus");
        // typeWriter();
    }
    );

    // Event handler to reset text if we focus elsewhere
    flipCard.addEventListener('focusout', function () {
        console.log("Unfocusing");
        flipCard.classList.remove("onFocus");
        //  resetText();
    }
    );

    flipCardDiv.appendChild(flipCard);

    // if no size is provided then set default css size
    if (!params.size) {
        flipCard.classList.add("flip-card-med");
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
    flipCardInner.appendChild(front);
    // create back of card div to hold data
    var flipCardBack = document.createElement("div");
    flipCardBack.classList.add("flip-card-back");
    flipCardInner.appendChild(flipCardBack);

    //create image
    var img = document.createElement("img");


    img.src = burgerObj.image;

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

    var numberOfStars = burgerObj.stars;

    //TODO add stars here


    name.innerHTML = burgerObj.burgerName;
    desc.innerHTML = burgerObj.burgerDescription;
    email.innerHTML = burgerObj.userEmail;


    var i = 0;
    var j = 0;
    var n = 0;
    var speed = 50;
    // type writer function types data
    //TODO fix 
    function typeWriter() {

        console.log("typeWriter function active");
        if (i < name.innerHTML.length) {
            this.parentElement.getElementsByTagName("h1")[0].innerHTML += name.innerHTML.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else
        if (j < desc.innerHTML.length) {

            this.parentElement.getElementsByTagName("p")[0].innerHTML += desc.innerHTML.charAt(i);
            j++;
            setTimeout(typeWriter, speed);
        } else
        if (n < email.innerHTML.length) {
            this.parentElement.getElementsByTagName("p")[2].innerHTML += email.innerHTML.charAt(i);
            n++;
            setTimeout(typeWriter, speed);
        }

    } // end typewriter


    var div = document.createElement("div");
    div.classList.add("stopFloat");
    flipCard.appendChild(div);



}
