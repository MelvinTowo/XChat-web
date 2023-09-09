// This file helps with redirect to the login screen after sign out / logout
import {withAuth} from "next-auth/middleware"


export default withAuth({
    pages: {
        signIn: "/"
    }
})

export const config = { 
    matcher: [
        "/users/:path"
    ]
}