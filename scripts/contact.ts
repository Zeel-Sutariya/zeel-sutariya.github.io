"use strict";
namespace core {
    export class Contact {
        private m_fullname: string;
        private m_contactnumber: string;
        private m_emailaddress: string;

        constructor(fullName: string="", contactNumber: string="", emailAddress: string="") {
            this.m_fullname = fullName;
            this.m_contactnumber = contactNumber;
            this.m_emailaddress = emailAddress;
        }

        public set FullName(fullName) {
            this.m_fullname = fullName;
        }

        public get FullName() {
            return this.m_fullname;
        }

        public set ContactNumber(contactNumber: string) {
            this.m_contactnumber = contactNumber;
        }

        public get ContactNumber() {
            return this.m_contactnumber;
        }

        public set EmailAddress(emailAddress: string) {
            this.m_emailaddress = emailAddress;
        }

        public get EmailAddress() {
            return this.m_emailaddress;
        }

        public toString() {
            return `FullName:${this.FullName} \n Contact Number:${this.ContactNumber} \n Email Address :${this.EmailAddress} `;
        }

        serialize() :string|null{
            if (this.FullName !== "" && this.ContactNumber !== "" && this.EmailAddress !== "") {
                return `${this.FullName},${this.ContactNumber},${this.EmailAddress}`;
            }
            console.error("one or more of the contact attribute is empty or missing");
            return null;
        }

        deserialize(data: string): void {
            const propertyArray: string[] = data.split(",");
            this.m_fullname = propertyArray[0];
            this.m_contactnumber = propertyArray[1];
            this.m_emailaddress = propertyArray[2];
        }


    }
}