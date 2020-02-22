
var home = {};
        home.display = function(id) {

// ` this is a "back tick". Use it to define multi-line strings in JavaScript.
        var content = `
     <div id="topIcon" >
                <div>
                    <a  href="https://en.wikipedia.org/wiki/Hamburger" ><img id="mainIcon" title="burger" src="pics/burgerIcon.png" alt="burgerLink"></a>
                </div>
            </div>
     <div class='stopFloat'></div>
            <!--  intro section -->
            <div class="row">
                <div class='column column90'>
                    <div>
                        <div id="intro">
                            <strong>Whats it all About?</strong> 
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
                        </ul>
                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
            
    `;
                document.getElementById(id).innerHTML = content;
        };