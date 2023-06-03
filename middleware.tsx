import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
	if (!request.nextUrl.pathname.includes("/auth")) {
		const token = request.cookies.get("jwt");
		if (!token) {
			const res = NextResponse.redirect(new URL("/auth/login", request.url));
			res.cookies.delete("jwt");
			res.cookies.delete("user");
			return res;
		}

		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
			method: "GET",
			headers: {
				Cookie: `jwt=${token.value}`,
			},
		});

		if (res.ok) {
			const data = await res.json();
			if (data.id) {
				const res = NextResponse.next();
				res.cookies.set({
					name: "user",
					value: `${JSON.stringify(data)}`,
					path: "/",
				});
				return res;
			} else {
				const res = NextResponse.redirect(new URL("/auth/login", request.url));
				res.cookies.delete("jwt");
				return res;
			}
		}
	} else {
		const token = request.cookies.get("jwt");

		if (token) {
			const res = NextResponse.redirect(new URL("/", request.url));
			return res;
		}

		return NextResponse.next();
	}
}

// export const config = {
// 	matcher: "/",
// };
