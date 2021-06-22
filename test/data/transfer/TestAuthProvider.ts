import { AuthProvider } from "../../../src/auth/Interfaces";

export default class TestAuthProvider implements AuthProvider {
    
    login() {
        // Do nothing
    }

    onLogin (success?: Function) {
        // Do nothing
    }

    logout() {
        // Do nothing
    }

    async getUser() {

        return new Promise<any | null>((resolve, reject) => {

            resolve({
                "fullName": "The user"
            });
        });
    }

    async authorize() {

        return new Promise<Record<string, string>>((resolve, reject) => {

            resolve({
                "Authorization": "Bearer eyJhGci0i"
            });
        });
    }
}