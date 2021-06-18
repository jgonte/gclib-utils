import { UserManager } from "oidc-client";
import { AuthProvider } from "./Interfaces";

export default class OidcProvider implements AuthProvider {

    _userManager: UserManager;

    constructor(cfg: any) {

        this._userManager = new UserManager(cfg);
    }

    login(): void {

        this._userManager.signinRedirect();
    }

    logout(): void {

        this._userManager.signoutRedirect();
    }

    async authorize(): Promise<Record<string, string> | undefined> {

        const user = await this._userManager.getUser();

        if (user !== undefined) {

            return {
                "Authorization": "Bearer " + user!.access_token
            };
        }
    }
}