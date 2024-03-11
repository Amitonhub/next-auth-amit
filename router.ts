/**
 * an array of routes that are accessible to the public
 * these Routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes: string[] = [
    "/",
    "/auth/new-verification"
]

/**
 * an array of routes that are not accessible to the public
 * these Routes do require authentication
 * @type {string[]}
 */

export const authRoutes: string[] = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]

/**
 * the prefix for api routes Authentication
 * Routes that starts with this prefix are user for API authentication purposes
 * @type {string}
 */


export const apiAuthPrefix: string = "/api/auth"

/**
 * the default redirect path after logged in 
 * @type {string}
 */


export const DEFAULT_LOGIN_REDIRECT: string = "/settings"
