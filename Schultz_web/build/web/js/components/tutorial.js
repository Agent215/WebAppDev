/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var tutorial = {};

tutorial.display = function (id) {

    // ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `  
    <div class="row">
                <div class='column column90'>
                    <h2>TypeWriter Flipcard Component</h2>
                    <p>
                        The Typewriter Flipcard component is a neat component i created to display dynamic text data in an 
                        interesting and fun way. 
                    </p>


                    <p>
                        This component is a combination of three separate code snippets that i found on W3schools.
                        I was inspired by the following bits of code:
                        <br>
                        <a href="https://www.w3schools.com/howto/howto_css_flip_card.asp">Flipcard code snippet</a>
                        <br>
                        <a href="https://www.w3schools.com/howto/howto_js_typewriter.asp">Typewriter code snippet</a>
                        <br>
                        <a href="https://www.w3schools.com/howto/howto_css_star_rating.asp">Star Rating code snippet</a>

                    </p>
                    <p>
                        First i created a <a href="proposal.pdf"> proposal</a> for this component where i thought about how to create a reusable and
                        useful component.
                        Next i published a <a href="http://cis-linux2.temple.edu:8080/SP20_3308_tuk85386/tutorial/poc.html">proof of concept</a> of how this component should operate. This was hacked together with hard coded
                        Id's, and did not have modular code or encapsulation . 
                    </p>
                    <p>

                    </p>
                </div>
                <div class='stopFloat'></div>
            </div>

            <div class="row">
                <div class='column column90'>
                    <h2>Instructions For Use</h2>
                    <p>
                        Here is a <a href="download/demo.html">demo</a>  of how to use the component, along with some of its public functions being called.
                        <br>
                        To download zip file containing the runnable demo click <a href="download.zip">here</a>
                    </p>
                    <p>
                        In order to create an instance of the component the makeTypeFlipCard.js script should be linked too in your HTML header.
                        Then you can create card objects passing in javascript object. The object should have 5 key value pairs.
                        <br>

                        You can name them what ever you want but know that the order which you place them in the object does matter!
                        <br>
                        <br>
                        In my example i use an ajax call to grab a json file and parse it to a javascript array object. But you can use a singular 
                        object or even use an ajax call to a database. As long as the object follows parameters as described below.
                    </p>

                    <ol>
                        <li>first parameter we will assume is text and make a header on reverse side of card </li>
                        <li>second parameter we assume is an image</li>
                        <li>third parameter we assume is text and make a paragraph element on reverse side of card  </li>
                        <li>fourth parameter we assume is text and make a paragraph element on reverse side of card  </li>
                        <li>fifth parameter we assume is an integer value. This is used to display a star rating of n out of 5 stars where
                            n is the integer supplied </li>
                    </ol>

                    <br>
                    When creating the component you must at least pass the object list to be used as well as an id of a DOM element
                    where you would like the object to render.
                    <br>
                    But you can optionally pass the size you would like it to be.
                    If no size is passed we default to medium size.
                    <br>
                    <br>
                    med= 300px * 300px
                    <br>
                    large= 450px * 450px
                    <br>
                    xlarge= 600px * 600px
                    <br>
                    <br>
                    The code snippet below shows how to do this:

                    <pre>  
                    // create flip card objects
                    // we can pass it list item representing a burger object
                    // we can pass it a dom element to display in
                    card1 = makeTypeFlipCard({
                        obj: burgerList[1],
                        id: "burger1"}
                    );

                    card2 = makeTypeFlipCard({
                        obj: burgerList[0],
                        id: "burger2",
                        size: "large"});

                    card3 = makeTypeFlipCard({
                        obj: burgerList[2],
                        id: "burger3",
                        size: "xlarge"});
                    </pre>
                    <br>
                    <p>
                        Below is an example of the type of data the object expects
                    </p>
                    <pre>
                    {
                    "burgerName": "Bacon Cheese Burger",
                    "image": "https://www.seriouseats.com/recipes/images/2013/07/20130723-bacon-weave-food-lab-burger-step-by-step-27.jpg",
                    "burgerDescription": "beef cheese and bacon with a bun",
                    "userEmail": "abraham.schultz@gmail.com",
                    "stars": "3",
                    }
                    </pre>


                    <br>
                    In addition to the contructors for this object ther are a two  public methods the HTML coder can call to
                    effect the style and behavior of the flip card.
                    <ul>
                        <li>You can change the color by typing its name or Hex value.</li>
                        <li> You can also change the speed the text types across the card, higher is slower</li>
                    </ul>

                    <br>
                    <br>

                    <pre>
           
            &lt; type="button" onclick="card1.setSpeed(300)">slow text&gt;
            &lt; type="button" onclick="card1.setSpeed(20)">fast text&gt;
            &lt; type="button" onclick="card1.setBackColor('red')">Red&gt;
            &lt; type="button" onclick="card1.setBackColor('ff0000')">Red&gt;
            &lt; type="button" onclick="card1.setBackColor('black')">Black&gt;
   
                    </pre>



                </div>
                <div class='stopFloat'></div>
            </div> `;
    document.getElementById(id).innerHTML = content;

    // use strict to help with debugging 
    "use strict";

   
    
    


    
}
;
