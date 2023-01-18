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