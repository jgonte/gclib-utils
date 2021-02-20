/**
 * Defines the functionality of an authentication/authorization provider
 */
export interface AuthProvider {
    /**
     * The function that does the login
     */
    login: () => void

    /**
     * The function that does the logout
     */
    logout: () => void

    /**
     * The function that sets up the authorization header
     */
    authorize: () => Promise<Record<string, string> | undefined>

    /**
     * Handler when the user is not logged in while trying to authorize
     */
    onNotLoggedIn: () => void
}