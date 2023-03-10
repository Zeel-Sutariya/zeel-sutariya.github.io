
namespace core{

     export class User{
        private m_displayName: string;
        private m_userName: string;
        private m_password: string;
        private m_emailaddress: string;

        constructor(displayName:string="",emailAddress:string =" ",username:string="",password:string=""){
            this.m_displayName=displayName;
            this.m_userName =username;
            this.m_password = password;
            this.m_emailaddress = emailAddress;

        }
        public get DisplayName():string {
            return this.m_displayName;
        }

        public set DisplayName(value:string) {
            this.m_displayName = value;
        }
        public get Username():string {
            return this.m_userName;
        }

        public set Username(value:string) {
            this.m_userName = value;
        }
        public get Password():string {
            return this.m_password;
        }

        public set Password(value:string) {
            this.m_password = value;
        }
        public set EmailAddress(emailAddress:string)
        {
            this.m_emailaddress = emailAddress;
        }
        public  get EmailAddress():string{
            return  this.m_emailaddress;
        }
        public toString():string{
            return `Display Name:${this.DisplayName}  \n Email Address :${this.EmailAddress} \n Username :${this.Username}`;
        }

        public toJSON():{DisplayName:string,EmailAddress: string ,Username:string  }{
            return{
            "DisplayName":this.m_displayName,
                "EmailAddress":this.m_emailaddress,
                "Username":this.m_userName

            }
       }
        public fromJSON(data:User){
            this.m_displayName =data.DisplayName;
            this.m_emailaddress = data.EmailAddress;
            this.m_userName =data.Username;
            this.m_password = data.Password;
        }
        public serialize():string|null{
            if(this.DisplayName !==""&& this.EmailAddress!== ""&& this.Username !== ""&& this.Password !== ""){
                return `${this.DisplayName},${this.EmailAddress},${this.Username},${this.Password}`;
            }
            console.error("one or more of the contact attribute is empty or missing");
            return null;
        }
        public deserialize(data:string){
            let propertyArray:string[] = data.split(",");
            this.DisplayName  = propertyArray[0];
            this.EmailAddress  = propertyArray[1];
            this.Username  = propertyArray[2];
            this.Password  = propertyArray[3];
        }

    }}
