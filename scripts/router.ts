"use strict";
namespace core {
    export class Router {
        private m_activeLink: string;
        private m_routingTable: string[];
        constructor() {
            this.m_activeLink = "";
            this.m_routingTable=[];
        }

        /**
         * @constructor
         */
        public get ActiveLink():string {
            return this.m_activeLink;
        }

        /**
         *
         * @param link
         * @constructor
         */
         public set ActiveLink(link:string) {
            this.m_activeLink = link;
        }

        public Add (route:string):void {
            this.m_routingTable.push(route);
        }

        public Find(route:string):number {
            return this.m_routingTable.indexOf(route);
        }

        public Remove(route:string):boolean {
            if (this.Find(route) > -1) {
                this.m_routingTable.splice(this.Find(route), 1);
                return true;
            }return false;
        }

       public AddTable(routingTable:string[]):void {
            this.m_routingTable = routingTable;
        }

        /**
         *
         */
        public  toString():string {
            return this.m_routingTable.toString();
        }
    }
}
let router:core.Router = new  core.Router();
router.AddTable([
    "/",
    "/home",
    "/about",
    "/contact",
    "/contact-list",
    "/edit",
    "/login",
    "/projects",
    "/register",
    "/services"
]);
let route:string = location.pathname;
 router.ActiveLink=(router.Find(route)>-1)
     ?(route === "/")?"home":route.substring(1)
     :("404");
 // console.log(router.Ac);
