/*
* WebD6201
* Name - Prerakkumar Patel (100846056)
* DATE - FEB 24, 2023
* * */
"use strict";
/// IIFE Function
(function () {
    // Display home page
   function DisplayHomePage():void {
        console.log("home page called");
        $("#AboutUsBtn").on("click", () => location.href = "about"
        );
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is Article paragraph</p> </article>`)
        $("main").append(`<p class="mt-3" id="MainParagraph">This is jquery generated paragraph</p> `);

    }


    // Loading header for ajax
    function LoadHeader(){
        $.get("./views/components/header.html",function (html_data){

            $("header").html(html_data);
            $(`li>a:contains(${document.title})`).addClass("active");
            CheckLogin();
            console.log("load header called");
        });


    }

    // Displaying product page
    function DisplayProjectPage() :void{
        console.log("Display project page called");

    }

    // Displaying service page
    function DisplayServicePage():void {
        console.log("Display Service page called");
    }


    // Displaying about page
    function DisplayAboutPage():void {
        console.log("Display About page called");

    }

    // Validations for register page
    function RegisterFormValidation():void{
        // passing regEX parameters in function to validate input fields with appropriate error messages.
        ValidateField("#firstName",/^[a-zA-Z]{2,}$/,"Please enter valid first name more than 1 letter");
        ValidateField("#lastName",/^[a-zA-Z]{2,}$/,"Please enter valid  last name more than 1 letter");
        ValidateField("#emailAddress",/^([a-zA-Z0-9._-]{3,20})+(@[a-zA-Z0-9._-]{2,20})+\.[a-zA-Z]{3,20}$/,"Please enter valid email address");

    }

    // Validations for contact form
    function ContactFormValidation():void{
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter valid first and last name as ( first last )  ");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter valid contact number as (xxx-xxx-xxxx) ");
        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter valid email address");
    }

    // Dispalying contact page
    function DisplayContactPage():void {
        console.log("Display Contact page called");

        let sendButton = document.getElementById("sendButton") as HTMLElement ;
        let subscribeCheckbox = document.getElementById("subscribeCheckbox") as HTMLInputElement;
        sendButton.addEventListener("click",  ()=> {

            if (subscribeCheckbox.checked ) {
                let fullName = document.forms[0].fullName.value;
                let contactNumber = document.forms[0].contactNumber.value;
                let emailAddress = document.forms[0].emailAddress.value;
                AddContact(fullName,contactNumber,emailAddress);
                 location.href="contact-list";
            }

        });
        ContactFormValidation();
    }

    // Adding contact
     function AddContact(fullName:string,contactNumber:string,emailAddress:string):void{
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize() as string);
        }

    }

    // Displaying Contact list Page
    function DisplayContactListPage():void {
        console.log("Display Contact List page called");

        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList") as HTMLElement;
            let data = "";

            let keys = Object.keys(localStorage) ;
            let index = 1;
            for (const key of keys) {

                let contactData = localStorage.getItem(key) as string;
                let contact = new core.Contact();
                contact.deserialize(contactData);
                data += `
                <tr>
                    <th scope="row" class="text-center">${index}</th>
                    <td>${contact.FullName}</td>
                    <td>${contact.ContactNumber}</td>
                    <td>${contact.EmailAddress}</td>
                    <td class="text-center">
                        <button value="${key}" class="btn btn-primary btn-sm edit">                          
                            <i class="fas fa-edit fa-sm"> Edit</i>
                        </button>           
                    </td>
                    <td class="text-center">
                        <button value="${key}" class="btn btn-danger btn-sm delete">                          
                            <i class="fas fa-trash-alt fa-sm"> Delete</i>
                        </button>           
                    </td>
                  
                </tr>`;
                index++;
            }
            contactList.innerHTML = data;
        }
            $("button.delete").on("click", function () {
                if (confirm("Delete contact ,are you sure?")) {
                    localStorage.removeItem($(this).val() as string);
                }
                location.href = "contact-list";
            });
            $("button.edit").on("click", function () {
                location.href = "edit#" + $(this).val();
            });

        $("#addButton").on("click", (event) => {
            event.preventDefault();
            console.log("add c");
            location.href = "edit#add";

        });

    }

    // Validating fields using regEX
    function ValidateField(input_field_id: string, regular_expression: RegExp, error_message: string): void {
        const messageArea = $("#messageArea").hide();
        $(input_field_id).on("blur", function () {
            const inputFieldText = $(this).val() as string;
            if (!regular_expression.test(inputFieldText)) {
                $(this).trigger("focus").trigger("select");
                messageArea.addClass("alert alert-danger").text(error_message).show();
            } else {
                messageArea.removeAttr("class").hide();
            }
        });

        // Validating password field
        $("#password").on("blur", function () {
            if (($("#password").val()as string).length  < 0 ) {
                messageArea.removeAttr("class").hide();
            } else if (($("#password").val() as string).length < 6 ) {
                messageArea.addClass("alert alert-danger").text("Password must be at least 6 letters").show();
            }  else {
                messageArea.removeAttr("class").hide();
            }
        });
        $("#confirmPassword").on("blur", function () {
            if (($("#confirmPassword").val()as string).length < 0 ) {
                messageArea.removeAttr("class").hide();
            } else if (($("#confirmPassword").val() as string).length < 6 ) {
                messageArea.addClass("alert alert-danger").text("Confirm password must be at least 6 letters").show();
            } else if ($("#confirmPassword").val() !== $("#password").val()) {
                messageArea.addClass("alert alert-danger").text("Passwords must match").show();
            } else {
                messageArea.removeAttr("class").hide();
            }
        });
    }




    // Displaying edit page
    function DisplayEditPage():void{
        console.log("Edit Contact Page ");
        ContactFormValidation();

        let page = location.hash.substring(1);
        switch (page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"> Add</i>`);
                $("#editButton").on("click",(event)=>{
                    event.preventDefault()

                    let fullName = document.forms[0].fullName.value;
                    let contactNumber = document.forms[0].contactNumber.value;
                    let emailAddress = document.forms[0].emailAddress.value;
                    AddContact(fullName,contactNumber,emailAddress);
                    location.href="contact-list";
                });
                $("#cancelButton").on("click",()=>{
                    location.href="contact-list";
                });
                break;
            default:{

                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"> Save</i>`);
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page) as string);
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);
                $("#editButton").on("click",(event)=>{
                    event.preventDefault();
                    contact.FullName= $("#fullName").val() as string;
                    contact.ContactNumber= $("#contactNumber").val() as string;
                    contact.EmailAddress= $("#emailAddress").val() as string;
                    localStorage.setItem(page,contact.serialize() as string)  ;
                    location.href ="contact-list";
                });
                $("#cancelButton").on("click",()=>{
                    location.href="contact-list";
                });
            }
            break;
        }

    }

    // displaying login page
    function  DisplayLoginPage()
    {
        console.log("DisplayLoginPageCalled");

         let messageArea= $("#messageArea");
         messageArea.hide();
        $("#loginButton").on("click",function (){

            let success = false;
            let newUser = new core.User();
            $.get("./data/user.json",function (data){

                let username = document.forms[0].username.value;
                let password = document.forms[0].password.value;
               for(const user of data.users){

                   if(username === user.Username && password === user.Password){
                       newUser.fromJSON(user);
                       success=true;
                       break;
                   }
               }

               if(success){
                   sessionStorage.setItem("user",newUser.serialize() as string);
                   messageArea.removeAttr("class").hide();

                   location.href="contact-list";


               }else {
                   $("#username").trigger("focus").trigger("select");
                   messageArea.addClass("alert alert-danger").text("user is not exists").show();

               }
            });
        });
        $("#cancelButton").on("click",function (){
            document.forms[0].reset();
            location.href ="/";
        });


    }

    // Checking for user login
    function CheckLogin():void{
        if(sessionStorage.getItem("user")) {
            console.log("check login called");

            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt "></i>Logout</a>`)

            let linkItem = $("<li>").addClass("nav-item");
            let user: string | null = sessionStorage.getItem("user")?.split(" ")[0] ?? null;

            console.log(user);
            let a = $("<a>").addClass("nav-link border border-danger border-2 rounded ").text(user as string);

            $("ul li:last-child").before(linkItem.add(a));

        }
        $("#logout").on("click",function () {
            console.log("logout clicked");
            sessionStorage.clear();
            location.href = "/";

        });
    }

    // Displaying register page
    function  DisplayRegisterPage()
    {
        // displaying function name in console
        console.log("DisplayRegisterPageCalled");
        // submit button clicked
        $("#submitButton").on("click",(event)=>{
            event.preventDefault();

            let firstName = document.forms[0].firstName.value;
            let emailAddress = document.forms[0].emailAddress.value;
            let lastName = document.forms[0].lastName.value;
            let password = document.forms[0].password.value;

            let newUser = new core.User(firstName ,emailAddress,firstName+lastName,password);
            console.log(newUser.toString());
            ($("form")[0] as HTMLFormElement).reset();

        });
        // calling function to validate the form
        RegisterFormValidation();

        //
    }
    function  ActiveLinkCallback():Function{
        switch (router.ActiveLink)
        {
            case "home":return DisplayHomePage;
            case "about":return DisplayAboutPage;
            case "services":return DisplayServicePage;
            case "contact":return  DisplayContactPage;
            case "contact-list":return  DisplayContactListPage;
            case "edit":return DisplayEditPage;
            case "projects":return  DisplayProjectPage;
            case "register":return  DisplayRegisterPage;
            case "login":return  DisplayLoginPage;
            case "404":return  Display404;
            default:
                console.error("Error: callback does not "+ router.ActiveLink);
                return new Function();

        }
    }
    function Display404():void
    {
        console.log("4o4 called")
    }
    function LoadContent():void{
        let pageName = router.ActiveLink;
        let pageTitle = pageName.charAt(0).toUpperCase() + pageName.slice(1);
     let callback =  ActiveLinkCallback();
        $.get(`./views/components/${pageName}.html`,function (html_data){

            $("main").html(html_data);
            callback();

        });

        $("title").text(pageTitle);

        console.log(`load content called for ${pageName}`);


    }
    function LoadFooter():void{
        $.get("./views/components/footer.html",function (html_data){

            $("footer").html(html_data);
            console.log("load footer called");
        });

    }
    // Start Function
    function Start():void {

        console.log("app started");

        LoadHeader();
        LoadFooter();
            LoadContent();

    }

    window.addEventListener("load", Start);


})()