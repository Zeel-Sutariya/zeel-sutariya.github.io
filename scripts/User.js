
(function (core){


    class User{
        constructor(displayName="",emailAddress =" ",username="",password=""){
            this.DisplayName =displayName;
            this.Username =username;
            this.Password = password;
            this.EmailAddress = emailAddress;
        }
        set EmailAddress(emailAddress)
        {
            this.m_emailaddress = emailAddress;
        }
        get EmailAddress(){
            return  this.m_emailaddress;
        }
        toString(){
            return `Display Name:${this.DisplayName}  \n Email Address :${this.EmailAddress} \n Username :${this.Username}`;
        }

       toJSON(){
            return{
            "DisplayName":this.DisplayName,
                "EmailAddress":this.EmailAddress,
                "Username":this.Username,
                "Password": this.Password
            }
       }
        fromJSON(data){
            this.DisplayName =data.DisplayName;
            this.EmailAddress = data.EmailAddress;
            this.Username =data.Username;
            this.Password = data.Password;
        }
        serialize(){
            if(this.DisplayName !==""&& this.EmailAddress!== ""&& this.Username !== ""&& this.Password !== ""){
                return `${this.DisplayName},${this.EmailAddress},${this.Username},${this.Password}`;
            }
            console.error("one or more of the contact attribute is empty or missing");
            return null;
        }
        deserialize(data){
            let propertyArray = data.split(",");
            this.DisplayName  = propertyArray[0];
            this.EmailAddress  = propertyArray[1];
            this.Username  = propertyArray[2];
            this.Password  = propertyArray[3];
        }

    }

    core.User=User;

})(core||(core={}));
