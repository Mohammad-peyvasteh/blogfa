import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // بررسی credentials از json-server
        const res = await fetch("https://api-production-a41c.up.railway.app/users");
        const users = await res.json();
        const user = users.find(
          (u) =>
            u.email === credentials.email &&
            u.password === credentials.password
        );
        if (user) return user;
        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
