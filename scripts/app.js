"use strict";

//IIFE - Immediately Invoked Function Expression
//AKA - Anonymous Self-Executing Function
(function(){

    /**
     * Instantiate and contact to LocalStorage.
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     * @constructor
     */
    function AddContact(fullName,contactNumber,emailAddress) {

        let contact = new core.Contact(fullName, contactNumber, emailAddress);
        if (contact.serialize()) {
            let key = contact.FullName.substring(0, 1) + Date.now();
            localStorage.setItem(key, contact.serialize());
        }
    }

    function DisplayHomePage(){
        console.log("Display Home Page called");

        $("#AboutUsBtn").on("click", () => {
            location.href = "about.html"
        });
        $("main").append(`<p class="mt-3" id="MainParagraph">This is jquery generated paragraph</p> `);
        $("body").append(`<article class="container">
        <p id="ArticleParagraph" class="mt-3">This is Article paragraph</p>
        </article>`)

    }


    function DisplayProductsPage(){
        console.log("Display Products Page called");

    }

    function DisplayServicesPage(){
        console.log("Display Services Page called");

    }

    function DisplayAboutUsPage(){
        console.log("Display About Page called");

    }
    function DisplayContactUsPage(){
        console.log("Display Contact Page called");
        let sendButton = document.getElementById("sendButton");
        let subscribeCheckbox = document.getElementById("subscribeCheckbox");

        sendButton.addEventListener("click", function (event ){
            if(subscribeCheckbox.checked){
                AddContact(fullName.value,contactNumber.value,emailAddress.value);
                location.href="contact-list.html";

                }
        });

    }

    function DisplayContactListPage() {
        console.log("Display Contact List Page called");

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
                  
                    <td></td>
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

        function DisplayEditPage() {
            console.log("Edit Contact Page ");


            let page = location.hash.substring(1);
            switch (page) {
                case "add":
                    $("main>h1").text("Add Contact");
                    $("#editButton").html(`<i class="fas fa-plus-circle fa-sm"> Add</i>`);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault()
                        AddContact(fullName.value, contactNumber.value, emailAddress.value);
                        location.href = "contact-list.html";
                    });
                    $("#cancelButton").on("click", () => {
                        location.href = "contact-list.html";
                    });
                    break;
                default: {
                    let contact = new core.Contact();
                    contact.deserialize(localStorage.getItem(page));
                    $("#fullName").val(contact.FullName);
                    $("#contactNumber").val(contact.ContactNumber);
                    $("#emailAddress").val(contact.EmailAddress);
                    $("#editButton").on("click", (event) => {
                        event.preventDefault();
                        contact.FullName = $("#fullName").val();
                        contact.ContactNumber = $("#contactNumber").val();
                        contact.EmailAddress = $("#emailAddress").val();
                        localStorage.setItem(page, contact.serialize());
                        location.href = "contact-list.html";
                    });
                    $("#cancelButton").on("click", () => {
                        location.href = "contact-list.html";
                    });
                }
                    break;
            }
        }




    function Start()
    {
        console.log("Application Started!")
        switch(document.title)
        {
            case "Home":
                DisplayHomePage();
                break;
            case "Our Products":
                DisplayProductsPage();
                break;
            case "About Us":
                DisplayAboutUsPage();
                break;
            case "Our Services":
                DisplayServicesPage();
                break;
            case "Contact":
                DisplayContactUsPage();
                break;
            case "Contact List":
                DisplayContactListPage();
                break;
            case "Edit Contact":
                DisplayEditPage();
        }



    }
    window.addEventListener("load", Start)
})();




