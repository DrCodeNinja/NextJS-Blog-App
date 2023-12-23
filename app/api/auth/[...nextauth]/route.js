import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDB } from "@utils/database";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOLE_CLIENT_SECRET,
    }),
  ],
  async session({ session }) {},
  async signIn({ profile }) {
    try {
    } catch (error) {}
  },
});
export { handler as GET, handler as POST };