import NextAuth, { AuthOptions } from "next-auth";

import { options } from "./options";
// import { options } from "./options";

// const handler = NextAuth(options);
// export { handler as GET, handler as POST };

const handler = NextAuth(options);

export { handler as GET, handler as POST };
