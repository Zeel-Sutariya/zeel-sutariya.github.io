"use strict";

(function(){

    function DisplayHomePage(){
        let AboutUsButton = document.getElementById("AboutUsBtn");
        AboutUsButton.addEventListener("click",function ()
        {
            //console.log("About Us Button Clicked");
            location.href = "about.html";
        });
    }

    // STEP 3
    let MainContent = document.getElementsByTagName("main")[0];
    let MainParagraph = document.createElement("p");

    // STEP 5
    //MainParagraph.setAttribute("id", "MainParagraph");
    //MainParagraph.setAttribute("class", "mt-3");
    //MainParagraph.textContent = "This is the main Paragraph!";

    let FirstString = "This is";
    let SecondString = `${FirstString} the Main Paragraph.`;
    MainParagraph.textContent = SecondString;

    //STEP 6
    MainContent.appendChild(MainParagraph);
    let Article = document.createElement("article");
    let ArticleParagraph = `<p id="ArticleParagraph" class="mt-3">This is my article paragraph</p>`;
    Article.setAttribute("class", "container");
    Article.innerHTML = ArticleParagraph;
    // DocumentBody.appendChild(Article);
    document.body.appendChild(Article);

    function DisplayProductsPage(){}
    function DisplayServicesPage(){}
    function DisplayContactPage(){}

    function Start()
    {
        console.log("App Started!")
        switch (document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
        }
    }
    window.addEventListener("load", Start)

})();