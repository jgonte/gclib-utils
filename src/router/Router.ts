export interface Route {

    path: string;

    view: string;

    default: boolean;
}

export default class Router {

    routes: Route[] = [];

    constructor(routes: Route[]) {
        
        this.routes = routes;
    }

    getRoute() {

        const currentPath = window.location.pathname;

        return this.routes.filter(r => r.path === currentPath)[0];
    }

    navigate(event: any) {

        const path = event.target.attributes[0].value;

        let route = this.routes.filter(r => r.path === path)[0];

        if (!route) {

            window.history.pushState({}, '', '404');

            //root.innerHTML = `This route is not Defined`;

        } else {

            window.history.pushState({}, '', route.path);

            //root.innerHTML = `You are on the ${route.name} path`
        }
    }
}