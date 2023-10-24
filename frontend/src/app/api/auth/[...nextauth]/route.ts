import NextAuth from "next-auth";
import { authOptions } from "./options";
// import { options } from "./options";

// const handler = NextAuth(options);
// export { handler as GET, handler as POST };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
