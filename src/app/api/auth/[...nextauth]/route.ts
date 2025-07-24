import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        });
        if (!res.ok) return null;
        const data = await res.json();
        if (data && data.access_token) {
          // Return a minimal object, type-cast as any for NextAuth
          return { access_token: data.access_token } as any;
        }
        return null;
      }
    })
  ],
  session: { strategy: "jwt", maxAge: 1 * 24 * 60 * 60 }, // 7 days in seconds
  pages: {
    signIn: "/auth/login",
    error: "/auth/login"
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && (user as any).access_token) {
        token.accessToken = (user as any).access_token;
        // Define the expected payload type
        type JwtPayload = { sub: string; name: string; email: string };
        // Decode user info from token
        const decoded = jwtDecode<JwtPayload>(token.accessToken as string);
        token.id = decoded.sub;
        token.name = decoded.name;
        token.email = decoded.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).name = token.name;
        (session.user as any).email = token.email;
        (session as any).accessToken = token.accessToken;
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };