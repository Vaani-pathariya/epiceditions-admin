import { NextRequest, NextResponse } from "next/server";
import { tokenexpiry } from "./helpers/tokenexpiry";

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("token")?.value || "";

    try {
        // If no token and not on the root page, redirect to root ("/")
        if (path !== "/" && !token) {
            return NextResponse.redirect(new URL("/", request.nextUrl));
        }

        // If token exists, check if it has expired
        if (token) {
            const expired = await tokenexpiry({ token });

            // If token is expired and not on root page, redirect to root ("/")
            if (expired && path !== "/") {
                return NextResponse.redirect(new URL("/", request.nextUrl));
            }

            // If token is valid and user is on root page, redirect to another page (e.g., /allbooks)
            if (!expired && path === "/") {
                return NextResponse.redirect(new URL("/allbooks", request.nextUrl));
            }
        }

        // If no redirection is required, proceed normally
        return NextResponse.next();
    } catch (error: any) {
        console.error("Error in middleware:", error);
        return NextResponse.redirect(new URL("/", request.nextUrl));
    }
}

export const config = {
    matcher: ["/","/allbooks","/profile","/createreview","/users"],
};