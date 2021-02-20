import { AuthProvider } from "../../../src/auth/Interfaces";

export default class TestAuthProvider implements AuthProvider {

    login() {
        // Do nothing
    }

    logout() {
        // Do nothing
    }

    async authorize() {

        return new Promise<Record<string, string>>((resolve, reject) => {

            resolve({
                "Authorization": "Bearer eyJhGci0i"
            });
        });
    }

    onNotLoggedIn() {
        // Do nothing
    }

}