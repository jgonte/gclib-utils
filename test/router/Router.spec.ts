import Subscriber from "../../src/observer/Subscriber";
import Router, { Route } from "../../src/router/Router";

const values: any[] = [];

beforeEach(() => {

    values.length = 0;
})

describe('Router test', () => {

    class Subscriber1 implements Subscriber {

        onRouteChanged(...args: any[]) {

            values.push({
                args
            });
        }
    }

    class Subscriber2 implements Subscriber {

        onRouteChanged(...args: any[]) {

            values.push({
                args
            });
        }
    }

    it('Router subscribes and notify subscribers', async () => {

        const router = new Router([
            {
                path: '/', view: './home.html', default: true
            },
            {
                path: '/about', view: './about.html'
            },
            {
                path: '/contact', view: './contact.html'
            }
        ]);

        router.subscribe(new Subscriber1());

        router.subscribe(new Subscriber2());

        router.navigate();

        expect(window.location.hash).toEqual('#/');

        let route = router.routes.filter(r => r.path === '/')[0];

        router.notify(route);

        expect(values).toEqual([
            {
                args: [
                    {
                        "default": true,
                        "path": "/",
                        "view": "./home.html",
                    },
                    router
                ]
            },
            {
                args: [
                    {
                        "default": true,
                        "path": "/",
                        "view": "./home.html",
                    },
                    router
                ]
            }
        ]);

        router.navigate('/xxx');

        expect(window.location.hash).toEqual('#/notFound');
    });

    it('Router initializes to one existing view', async () => {

        const router = new Router([
            {
                path: '/', view: './home.html', default: true
            },
            {
                path: '/about', view: './about.html'
            },
            {
                path: '/contact', view: './contact.html'
            }
        ]);

        router.subscribe(new Subscriber1());

        router.subscribe(new Subscriber2());

        window.location.hash = '#/contact';

        router.initialize();

        expect(values).toEqual([
            {
                args: [
                    {
                        "path": "/contact",
                        "view": "./contact.html",
                    },
                    router
                ]
            },
            {
                args: [
                    {
                        "path": "/contact",
                        "view": "./contact.html",
                    },
                    router
                ]
            }
        ]);
    });

    it('Router initializes to default view when the path does not exist in the routes', async () => {

        const router = new Router([
            {
                path: '/', view: './home.html', default: true
            },
            {
                path: '/about', view: './about.html'
            },
            {
                path: '/contact', view: './contact.html'
            }
        ]);

        router.subscribe(new Subscriber1());

        router.subscribe(new Subscriber2());

        window.location.hash = '#/i_do_not_exist';

        router.initialize();

        // Verify the hash was fixed
        expect(window.location.hash).toEqual('#/');

        // expect(values).toEqual([
        //     {
        //         args: [
        //             {
        //                 "default": true,
        //                 "path": "/",
        //                 "view": "./home.html",
        //             },
        //             router
        //         ]
        //     },
        //     {
        //         args: [
        //             {
        //                 "default": true,
        //                 "path": "/",
        //                 "view": "./home.html",
        //             },
        //             router
        //         ]
        //     }
        // ]);
    });

});
