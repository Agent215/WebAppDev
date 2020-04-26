
var home = {};
home.display = function (id) {
    //global variables to hold burger list data to call make flip cards from
    var card1 = [];
    var card2 = [];
    var card3 = [];
    var card4 = [];

    ajax2({
        // you can pass a .jsp file or anything else here that returns Json
        url: "webAPIs/listBurgersAPI.jsp",
        successFn: processData,
        errorId: "listHere"
    });

    function processData(obj) {

        // do some checking for database errors 
        // uncomment code below when using with database
        if (obj.dbError.length > 0) {
            document.getElementById("listHere").innerHTML = obj.dbError;
            return;
        }
        console.log(obj);  // burger list as an array of objects

        // build new list as we want the fields to appear in the HTML table
        // we can decide the order we want the fields to appear (first property defined is shown first)
        // we can combine, decide to exclude etc...
        var burgerList = [];
        var list = [];

        // uncomment code below to use with database
        list = obj.burgerList;
        //list = obj;
        // modify properties (image and price) of the array of objects so it will look 
        // better on the page.
        for (var i = 0; i < list.length; i++) {
            burgerList[i] = {};

            // add burger data to list
            burgerList[i].burgerName = list[i].burgerName;
            burgerList[i].image = list[i].image;
            burgerList[i].burgerDescription = list[i].burgerDescription;
            burgerList[i].userEmail = list[i].userEmail;
            burgerList[i].stars = list[i].stars;
        }

        // generate random burger numbers to choose fromS
        var min = 0;
        var randNums = [];

        var max = burgerList.length ;
        function getRndInteger(min, max) {

            while (randNums.length < 4) {
                var rand1 = Math.floor(Math.random() * (max - min)) + min;
                var rand2 = Math.floor(Math.random() * (max - min)) + min;
                var rand3 = Math.floor(Math.random() * (max - min)) + min;
                var rand4 = Math.floor(Math.random() * (max - min)) + min;

                // only add randoms if they are unique
                if (rand1 === rand2 || rand2 === rand3 || rand3 === rand4 || rand4 === rand1 || rand1 === rand3 || rand2 === rand4) {
                    // do nothing

                } else {
                    randNums.push(rand1, rand2, rand3, rand4);
                    console.log("random nums" + rand1 + rand2 +  rand3 + rand4);
                }
            }

            return "randomo nums generated";

        }
        getRndInteger(min, max);



        // create flip card objects
        // we can pass it list item representing a burger object
        // we can pass it a dom element to display in
        card1 = makeTypeFlipCard({
            obj: burgerList[randNums[0]],
            id: "burger1"}
        );
        card2 = makeTypeFlipCard({
            obj: burgerList[randNums[1]],
            id: "burger2"}
        );
        card3 = makeTypeFlipCard({
            obj: burgerList[randNums[2]],
            id: "burger3"}
        );
        card4 = makeTypeFlipCard({
            obj: burgerList[randNums[3]],
            id: "burger4"}


        );

        card1.setBackColor('#F0D665');
        card2.setBackColor('#e0b08b');
        card3.setBackColor('#F0D665');
        card4.setBackColor('#e0b08b');
        
        card1.setFontColor('black');
        card2.setFontColor('white');
        card3.setFontColor('black');
        card4.setFontColor('white');


    } // end success function
// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
    var content = `
     <div id="topIcon" >

      </div>
    <div id="featuredBurgers">
                            <strong>Featured Burgers</strong> 
                        </div>
            <div class="row">
                <div class='column column70 burgerComps'>
                     
                    
                        <div class="burgers" id="burger1">
                        </div>
                        <div class="burgers" id="burger2">
                        </div>
                        <div class="burgers" id="burger3">
                        </div>
                        <div class="burgers" id="burger4">
                        </div>
                 
                </div>
                <div class='stopFloat'></div>
            </div>


            <!--  intro section -->
            <div class="row">
                <div class='column column90'>
                    <div>
                        <div id="intro">
                            <strong>What's it all About?</strong> 
                        </div>
                        <p>
                            This site is a homage to the greatest culinary contribution The United States has ever made. 
                            The Hamburger! So come on in and make a profile! Once you have signed in you will be able to upload
                            your very own burger recipes and pictures! Show your friends and link to social media sites!
                            <br> The burger recipes and data will be stored in an SQL table called burgers. <br> This 
                            table will contain a description of the burger, an image of the burger and the user id of the user
                            who submitted it.
                        </p>
                        <strong>Current Functionality</strong> 
                        <ul>
                            <li>Navigation bar</li>
                            <li>Responsive design</li>
                            <li>java script routing between nav bar links</li>
                            <li>Link to Burger wikipedia (click the large burger icon)</li>
                            <li>Data tables for Chefs and Burgers</li>
                            <li>Data tables are click sortable</li>
                            <li>Data tables sortable by search field</li>
                            <li>Logon functionality</li>
                            <li>SQL database backend </li>
                        </ul>
                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
            
    `;
    document.getElementById(id).innerHTML = content;
};