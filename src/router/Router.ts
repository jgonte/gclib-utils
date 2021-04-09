import Observer from "../observer/Observer";

export interface Route {

    path: string;

    view: string;

    default?: boolean;
}

export default class Router extends Observer {

    routes: Route[] = [];

    constructor(routes: Route[]) {

        super('onRouteChanged');

        this.routes = routes;

        this.onRouteChange = this.onRouteChange.bind(this);

        window.addEventListener('hashchange', this.onRouteChange);
    }

    /**
     * Notify the subscribers to select/load the default route
     */
    initialize() {

        const currentPath = window.location.hash.substr(1);

        let route = this.routes.filter(r => r.path === currentPath)[0];

        if (route === undefined) { // Did not find the route entered

            route = this.routes.filter(r => r.default === true)[0];

            window.location.hash = `#${route.path}`; // Fix the hash
        }
        else { // Set the current route

            this.notify(route);
        }        
    }

    onRouteChange(event: Event) {

        const currentPath = window.location.hash.substr(1);

        const route = this.routes.filter(r => r.path === currentPath)[0];

        this.notify(route);
    }

    navigate(path?: string) {

        if (path === undefined) {

            const route = this.routes.filter(r => r.default === true)[0];

            window.location.hash = `#${route.path}`;
        }
        else {

            const route = this.routes.filter(r => r.path === path)[0];

            window.location.hash = route !== undefined ? `#${route.path}` : '#/notFound';
        }
    }
}

// export default class Router {

//     routes: Route[] = [];

//     constructor(routes: Route[]) {
        
//         this.routes = routes;
//     }

//     getRoute() {

//         const currentPath = window.location.pathname;

//         return this.routes.filter(r => r.path === currentPath)[0];
//     }

//     navigate(event: any) {

//         const path = event.target.attributes[0].value;

//         let route = this.routes.filter(r => r.path === path)[0];

//         if (!route) {

//             window.history.pushState({}, '', '404');

//             //root.innerHTML = `This route is not Defined`;

//         } else {

//             window.history.pushState({}, '', route.path);

//             //root.innerHTML = `You are on the ${route.name} path`
//         }
//     }
// }