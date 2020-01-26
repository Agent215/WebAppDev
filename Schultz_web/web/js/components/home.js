function home(id) {

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
                        </p>
                        <strong>Current Functionality</strong> 
                        <ul>
                            <li>Navigation bar</li>
                            <li>Responsive design</li>
                            <li>Link to Burger wikipedia (click the large burger icon)</li>
                        </ul>
                    </div>
                </div>
                <div class='stopFloat'></div>
            </div>
            <div class="row">
                <div class='column column90'>
                    <!--image of a classic burger along with a description and an link to an article from nbc-->
                    <div class='column column50'>
                        <a href="https://www.nbcnews.com/better/lifestyle/8-chefs-share-their-favorite-burger-recipes-summer-ncna1009186">
                            <img src='pics/Burger.jpg' alt='classic Burger'>
                        </a>
                    </div>
                    <div class="header">
                        <strong>Classic Burger</strong> 
                    </div>
                    <p>
                        The classic Burger is an all American Staple. Usually consisting
                        of Ground beef patty, lettuce, tomato, onion, cheese, pickles and ketchup or mustard.     
                    </p>
                </div>
                <div class='stopFloat'></div>
            </div>
    `;
    document.getElementById(id).innerHTML = content;
}