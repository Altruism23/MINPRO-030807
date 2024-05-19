import jwt from 'jsonwebtoken';
import { NextResponse, NextRequest } from 'next/server';
import { getSession } from './lib/session';

const protectedPages = {
    user: ['/dashboard/user/profile', '/dashboard/user'],
    organizer: ['/dashboard/organizer/profile', '/dashboard/organizer', '/dashboard/organizer/events']
};

export async function middleware(request: NextRequest) {
    const cookieSession = request.cookies.get('session');
    const url = request.nextUrl.pathname;
    
    if (protectedPages.user.includes(url) || protectedPages.organizer.includes(url)) {
        if (!cookieSession) {
            return NextResponse.redirect(new URL ('/', request.url));
        }
        
        const token = cookieSession.value;
        
        try {
            const decodedToken : any = jwt.decode(token);
            const role = decodedToken.role;
            
            if (role === 'user' && !protectedPages.user.includes(url)) {
                return NextResponse.redirect(new URL('/', request.url));
            } else if (role === 'organizer' && !protectedPages.organizer.includes(url)) {
                return NextResponse.redirect(new URL('/', request.url));
            }
        } catch (error) {
            console.error('Error decoding JWT token:', error);
            return NextResponse.redirect(new URL ('/', request.url)); // Redirect jika terjadi kesalahan dalam dekode token
        }
    }
    
    return NextResponse.next();
}
