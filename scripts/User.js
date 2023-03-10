"use strict";
var core;
(function (core) {
    class User {
        m_displayName;
        m_userName;
        m_password;
        m_emailaddress;
        constructor(displayName = "", emailAddress = " ", username = "", password = "") {
            this.m_displayName = displayName;
            this.m_userName = username;
            this.m_password = password;
            this.m_emailaddress = emailAddress;
        }
        get DisplayName() {
            return this.m_displayName;
        }
        set DisplayName(value) {
            this.m_displayName = value;
        }
        get Username() {
            return this.m_userName;
        }
        set Username(value) {
            this.m_userName = value;
        }
        get Password() {
            return this.m_password;
        }
        set Password(value) {
            this.m_password = value;
        }
        set EmailAddress(emailAddress) {
            this.m_emailaddress = emailAddress;
        }
        get EmailAddress() {
            return this.m_emailaddress;
        }
        toString() {
            return `Display Name:${this.DisplayName}  \n Email Address :${this.EmailAddress} \n Username :${this.Username}`;
        }
        toJSON() {
            return {
                "DisplayName": this.m_displayName,
                "EmailAddress": this.m_emailaddress,
                "Username": this.m_userName
            };
        }
        fromJSON(data) {
            this.m_displayName = data.DisplayName;
            this.m_emailaddress = data.EmailAddress;
            this.m_userName = data.Username;
            this.m_password = data.Password;
        }
        serialize() {
            if (this.DisplayName !== "" && this.EmailAddress !== "" && this.Username !== "" && this.Password !== "") {
                return `${this.DisplayName},${this.EmailAddress},${this.Username},${this.Password}`;
            }
            console.error("one or more of the contact attribute is empty or missing");
            return null;
        }
        deserialize(data) {
            let propertyArray = data.split(",");
            this.DisplayName = propertyArray[0];
            this.EmailAddress = propertyArray[1];
            this.Username = propertyArray[2];
            this.Password = propertyArray[3];
        }
    }
    core.User = User;
})(core || (core = {}));
//# sourceMappingURL=user.js.map