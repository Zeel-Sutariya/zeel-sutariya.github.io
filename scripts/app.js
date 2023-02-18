/*
* Prerakkumar Patel
* 100846056
* WebD6201
* * */
"use strict";
(function () {
    function DisplayHomePage() {
        $("#AboutUsBtn").on("click", () => location.href = "about.html");
        $("body").append(`<article class="container"><p id="ArticleParagraph" class="mt-3">This is Article paragraph</p> </article>`)
        $("main").append(`<p class="mt-3" id="MainParagraph">This is jquery generated paragraph</p> `);
        // let XHR =  new XMLHttpRequest();
        // XHR.addEventListener(("readystatechange"),()=>{
        //     if(XHR.readyState === 4 && XHR.status ===200)
        //     {
        //         $("header").html(XHR.responseText);
        //         $(`li>a:contains(${document.title})`).addClass("active");
        //     }
        // });
        // XHR.open("GET","header.html");
        // XHR.send();
    }

    function AjaxRequest(method,url,callback){
        let XHR =  new XMLHttpRequest();
        XHR.addEventListener(("readystatechange"),()=>{
            if(XHR.readyState === 4 && XHR.status ===200)
            {
                if(typeof callback === "function"){
                    callback(XHR.responseText);

                }else {
                    console.log("Error: callback not a function");
                }
            }
        });
        XHR.open(method,url);
        XHR.send();

    }
    function LoadHeader(html_data)
    {
        $("header").html(html_data);
        $(`li>a:contains(${document.title})`).addClass("active");
        CheckLogin();
    }
    function DisplayProductPage() {
        console.log("Display Product page called");
        CreateProjectPage();
    }

    function DisplayServicePage() {
        console.log("Display Service page called");
        CreateServicesPage();
    }
    function CreateServicesPage() {
        let container = document.createElement("div");
        container.classList.add("container", "justify-content-center", "ms-auto");


        let ServicesDiv = document.createElement("div");
        ServicesDiv.id = "Service";
        ServicesDiv.classList.add("justify-content-center", "d-flex");

        let Services = [
            {
                description: "We provide you a unique website design that is ideal for your personal or company website.",
                image: "./images/services_web_design.jpg"
            },
            {
                description: "we provide end-to-end organization, conceptualization, design, optimization, and maintenance of your mobile app project.",
                image: "./images/services_app_development.png"
            },
            {
                description: "We are capable of handling the design, creation, and release of a video game.",
                image: "./images/services_game_development.jpeg"
            }
        ];

        Services.forEach(function(service){
            let ServiceDiv = document.createElement("div");
            ServiceDiv.classList.add("m-3", "d-block", "text-center");

            let serviceInfo = document.createElement("p");
            serviceInfo.classList.add("text-lg-center");
            serviceInfo.innerHTML = service.description;
            ServiceDiv.appendChild(serviceInfo);

            ServicesDiv.appendChild(ServiceDiv);
        });

        container.appendChild(ServicesDiv);

        document.body.appendChild(container);
    }
    function DisplayAboutPage() {
        console.log("Display About page called");
        CreateAboutUsPage();
    }

    function RegisterFormValidation(){


        ValidateField("#firstName",/^[a-zA-Z]{2,}$/,"Please enter valid first name more than 1 letter");
        ValidateField("#lastName",/^[a-zA-Z]{2,}$/,"Please enter valid  last name more than 1 letter");
        ValidateField("#emailAddress",/^([a-zA-Z0-9._-]{3,20})+(@[a-zA-Z0-9._-]{2,20})+\.[a-zA-Z]{3,20}$/,"Please enter valid email address");

    }
    function ContactFormValidation(){
        ValidateField("#fullName",/^([A-Z][a-z]{1,3}\.?\s)?([A-Z][a-z]+)+([\s,-]([A-z][a-z]+))*$/,"Please enter valid first and last name as ( first last )  ");
        ValidateField("#contactNumber", /^(\+\d{1,3}[\s-.])?\(?\d{3}\)?[\s-.]?\d{3}[\s-.]\d{4}$/,"Please enter valid contact number as (xxx-xxx-xxxx) ");
        ValidateField("#emailAddress",/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,10}$/,"Please enter valid email address");
    }
    function DisplayContactPage() {
        console.log("Display Contact page called");

        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");
        sendButton.addEventListener("click",  ()=> {

            if (subscribeCheckbox.checked) {
                AddContact(fullName.value,contactNumber.value,emailAddress.value);
                 location.href="contact-list.html";
            }

        });
        ContactFormValidation();
    }

    function AddContact(fullName,contactNumber,emailAddress){
        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0,1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }

    }
    function DisplayContactListPage() {
        console.log("Display Contact List page called");

        if (localStorage.length > 0) {
            let contactList = document.getElementById("contactList");
            let data = "";

            let keys = Object.keys(localStorage);
            let index = 1;
            for (const key of keys) {

                let contactData = localStorage.getItem(key);
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
                    localStorage.removeItem($(this).val());
                }
                location.href = "contact-list.html";
            });
            $("button.edit").on("click", function () {
                location.href = "edit.html#" + $(this).val();
            });

        $("#addButton").on("click", (event) => {
            event.preventDefault();
            console.log("add c");
            location.href = "edit.html#add";

        });

    }

    function ValidateField(input_field_id,regular_expression,error_message){
     let messageArea = $("#messageArea").hide();
     $(input_field_id).on("blur",function (){
         let inputFieldText = $(this).val();
         if(!regular_expression.test(inputFieldText)){
             $(this).trigger("focus").trigger("select");
             messageArea.addClass("alert alert-danger").text(error_message).show();
         }else {
             messageArea.removeAttr("class").hide();
         }
     });
        $("#password,#confirmPassword").on("blur",function () {
            // console.log("onblur call");
            if (($("#password").val().length < 0) || ($("#confirmPassword").val().length < 0))
            {
                messageArea.removeAttr("class").hide();
            }
             else
            {if (($("#password").val().length < 6) || ($("#confirmPassword").val().length < 6)) {
                messageArea.addClass("alert alert-danger").text("password must be greter then 6 letter").show();

            } else if ($("#password").val() != $("#confirmPassword").val()) {
                messageArea.addClass("alert alert-danger").text("password must be same ").show();
                // $("#password").val("");
                // $("#confirmPassword").val("");
            } else {
                messageArea.removeAttr("class").hide();
            }}
        });
    }


    function CreateAboutUsPage() {
        let container = document.createElement("div");
        container.classList.add("container", "justify-content-center", "ms-auto");

        let h1 = document.createElement("h1");
        h1.textContent = "About Us";
        container.appendChild(h1);

        let h2 = document.createElement("h2");
        h2.classList.add("text-center");
        h2.textContent = "Team Members";
        container.appendChild(h2);

        let teamDiv = document.createElement("div");
        teamDiv.id = "team";
        teamDiv.classList.add("justify-content-center", "d-flex");

        let teamMembers = [
            {
                name: "Sanya Singhal",
                email: "sanya.singhal@dcmail.ca",
                phone: "437-286-1739",
                image: "./dp/dp_sanya.jpeg"
            },
            {
                name: "Prerakkumar Patel",
                email: "prerakkumar.patel@dcmail.ca",
                phone: "905-922-8135",
                image: "./dp/dp_prerak.jpeg"
            },
            {
                name: "Zeel Sutariya",
                email: "zeel.sutariya@dcmail.ca",
                phone: "905-922-8577",
                image: "./dp/dp_zeel.jpeg"
            }
        ];

        teamMembers.forEach(function(member) {
            let memberDiv = document.createElement("div");
            memberDiv.classList.add("m-3", "d-inline-block");

            let memberImg = document.createElement("img");
            memberImg.src = member.image;
            memberImg.width = "304";
            memberImg.height = "228";
            memberImg.alt = member.name + "'s DP";
            memberDiv.appendChild(memberImg);

            let memberInfo = document.createElement("p");
            memberInfo.classList.add("text-lg-center");
            memberInfo.innerHTML = member.name + "<br/>" + member.email + "<br/>" + member.phone;
            memberDiv.appendChild(memberInfo);

            teamDiv.appendChild(memberDiv);
        });

        container.appendChild(teamDiv);

        document.body.appendChild(container);
    }
    function DisplaynavbarBottom(){
        let currentDate = new Date();
        let year = currentDate.getFullYear();
        let navbar = document.createElement("nav");
        navbar.setAttribute("class", "navbar justify-content-center fixed-bottom navbar-light bg-light");
        let copyright = document.createElement("div");
        copyright.setAttribute("class", "navbar-text ");
        copyright.innerHTML = "3Dev &copy; " +year;
        navbar.appendChild(copyright);
        document.body.appendChild(navbar);
    }
    function CreateProjectPage() {
        let container = document.createElement("div");
        container.classList.add("container", "justify-content-center", "ms-auto");

        let h1 = document.createElement("h1");
        h1.textContent = "Project";
        container.appendChild(h1);

        let h2 = document.createElement("h2");
        h2.classList.add("text-center");
        h2.textContent = "Top project that are adding values in tech world";
        container.appendChild(h2);
        //
        let projectDiv = document.createElement("div");
        projectDiv.id = "project";
        projectDiv.classList.add("justify-content-center", "d-flex");

        let projects = [
            {
                name: "ASP Payrolletor",
                email: "sanya.singhal@dcmail.ca",
                phone: "437-286-1739",
                image: "./projectsphoto/paycalculator.jpeg"
            },
            {
                name: "Prerakkumar Patel",
                email: "prerakkumar.patel@dcmail.ca",
                phone: "905-922-8135",
                image: "./projectsphoto/pizzashop.jpeg"
            },
            {
                name: "Zeel Sutariya",
                email: "zeel.sutariya@dcmail.ca",
                phone: "905-922-8577",
                image: "./projectsphoto/salescompany.jpeg"
            }
        ];

        projects.forEach(function(project) {
            let projectDetailsDiv = document.createElement("div");
            projectDetailsDiv.classList.add("m-3", "d-inline-block");

            let projectImg = document.createElement("img");
            projectImg.src = project.image;
            projectImg.width = "304";
            projectImg.height = "228";
            projectImg.alt = project.name + "'s DP";
            projectDetailsDiv.appendChild(projectImg);

            let projectInfo = document.createElement("p");
            projectInfo.classList.add("text-lg-center");
            projectInfo.innerHTML = project.name + "<br/>" + project.email + "<br/>" + project.phone;
            projectDetailsDiv.appendChild(projectInfo);

            projectDiv.appendChild(projectDetailsDiv);
        });

        container.appendChild(projectDiv);

        document.body.appendChild(container);
    }


    function DisplayEditPage(){
        console.log("Edit Contact Page ");
        ContactFormValidation();

        let page = location.hash.substring(1);
        switch (page){
            case "add":
                $("main>h1").text("Add Contact");
                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"> Add</i>`);
                $("#editButton").on("click",(event)=>{
                    event.preventDefault()
                    AddContact(fullName.value,contactNumber.value,emailAddress.value);
                    location.href="contact-list.html";
                });
                $("#cancelButton").on("click",()=>{
                    location.href="contact-list.html";
                });
                break;
            default:{

                $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"> Save</i>`);
                let contact = new core.Contact();
                contact.deserialize(localStorage.getItem(page));
                $("#fullName").val(contact.FullName);
                $("#contactNumber").val(contact.ContactNumber);
                $("#emailAddress").val(contact.EmailAddress);
                $("#editButton").on("click",(event)=>{
                    event.preventDefault();
                    contact.FullName= $("#fullName").val();
                    contact.ContactNumber= $("#contactNumber").val();
                    contact.EmailAddress= $("#emailAddress").val();
                    localStorage.setItem(page,contact.serialize());
                    location.href ="contact-list.html";
                });
                $("#cancelButton").on("click",()=>{
                    location.href="contact-list.html";
                });
            }
            break;
        }

    }

    function  DisplayLoginPage()
    {
        console.log("DisplayLoginPageCalled");

         let messageArea= $("#messageArea");
         messageArea.hide();
        $("#loginButton").on("click",function (){

            let success = false;
            let newUser = new core.User();
            $.get("./data/user.json",function (data){
               for(const user of data.users){
                   if(username.value === user.Username && password.value === user.Password){
                       newUser.fromJSON(user);
                       success=true;
                       break;
                   }
               }

               if(success){
                   sessionStorage.setItem("user",newUser.serialize());
                   messageArea.removeAttr("class").hide();
                   location.href="contact-list.html";
               }else {
                   $("#username").trigger("focus").trigger("select");
                   messageArea.addClass("alert alert-danger").text("user is not exists").show();

               }
            });
        });
        $("#cancelButton").on("click",function (){
            document.forms[0].reset();
            location.href ="index.html";
        });


    }
    function CheckLogin(){
        if(sessionStorage.getItem("user")) {

            $("#login").html(`<a id="logout" class="nav-link" href="#"><i class="fas fa-sign-out-alt "></i>Logout</a>`)
        }
        $("#logout").on("click",function () {
            sessionStorage.clear();
            location.href = "index.html";

        });
    }
    function  DisplayRegisterPage()
    {
        console.log("DisplayRegisterPageCalled");
        $("#submitButton").on("click",(event)=>{
            event.preventDefault();
        });
        RegisterFormValidation();
    }
    function Start() {

        console.log("app started");
        AjaxRequest("GET","header.html",LoadHeader);


        switch (document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case "Products":
                DisplayProductPage();
                break;
            case "About":
                DisplayAboutPage();
                break;
            case "Services":
                DisplayServicePage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
            case "ContactList":
                DisplayContactListPage();
                 break;
            case "EditContact":
                DisplayEditPage();
                break;
            case "Register":
                DisplayRegisterPage();
                break;
            case "Login":
                DisplayLoginPage();
                break;
            default :{
                console.log("Not registered");
            }
        }


    }
    window.addEventListener("load", Start);

    window.addEventListener("load", DisplaynavbarBottom);

})()