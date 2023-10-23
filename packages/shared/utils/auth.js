// import cookie from "js-cookie";
// import nextCookie from "next-cookies";
// import Router from "next/router";
// import { useEffect } from "react";
// import ROUTES from "./routes";

// export const login = ({ token }) => {
//   cookie.set("token", token, { expires: 1 });
//   Router.push("/profile");
// };

// export const isTokenExists = () => {
//   return cookie.get("token") ? true : false;
// };

// export const authenticateRoute = ctx => {
//   console.log("ctx ==========> ", ctx )
//   let currentPathObject = ROUTES.routes.filter(route => {
//     return route.path.toUpperCase() == ctx.pathname.toUpperCase();
//   });

//   if (currentPathObject && currentPathObject.length > 0) {
//     currentPathObject = currentPathObject[0];
//     const { token } = nextCookie(ctx);
//     switch (currentPathObject.type) {
//       case "private":
//         if (!token) {
//           if (typeof window !== "undefined") {
//             Router.push("/");
//           } else {
//             ctx.res.writeHead(302, { Location: "/" }).end();
//           }
//         }

//         break;
//       case "guest":
//         if (token) {
//           if (typeof window !== "undefined") {
//             Router.push("/");
//           } else {
//             ctx.res.writeHead(302, { Location: "/" }).end();
//           }
//         }
//         break;
//     }
//   } else {
//     if (typeof window !== "undefined") Router.push("/");
//   }
// };

// export const auth = ctx => {
//   const { token } = nextCookie(ctx);

//   /*
//    * If `ctx.req` is available it means we are on the server.
//    * Additionally if there's no token it means the user is not logged in.
//    */
//   if (ctx.req && !token) {
//     ctx.res.writeHead(302, { Location: "/login" });
//     ctx.res.end();
//   }

//   // We already checked for server. This should only happen on client.
//   if (!token) {
//     Router.push("/login");
//   }

//   return token;
// };

// export const logout = () => {
//   cookie.remove("token");
//   // to support logging out from all windows
//   // window.localStorage.setItem("logout", Date.now());
//   Router.push("/login");
// };

// export const withAuthSync = WrappedComponent => {
//   const Wrapper = props => {
//     const syncLogout = event => {
//       if (event.key === "logout") {
//         Router.push("/login");
//       }
//     };

//     useEffect(() => {
//       window.addEventListener("storage", syncLogout);

//       return () => {
//         window.removeEventListener("storage", syncLogout);
//         window.localStorage.removeItem("logout");
//       };
//     }, [null]);

//     return <WrappedComponent {...props} />;
//   };

//   Wrapper.getInitialProps = async ctx => {
//     const token = auth(ctx);

//     const componentProps =
//       WrappedComponent.getInitialProps &&
//       (await WrappedComponent.getInitialProps(ctx));

//     return { ...componentProps, token };
//   };

//   return Wrapper;
// };

//helper function for returning headers
// export const headerConfig = nextCtxOrToken => {
//   // Get token from cookie
//   // console.log("nextCtxOrToken",nextCtxOrToken);
//   let { token } = "";
//   if (nextCtxOrToken) {
//     if (
//       typeof nextCtxOrToken === "string" ||
//       nextCtxOrToken instanceof String
//     ) {
//       token = nextCtxOrToken;
//     } else {
//       token = nextCookie(nextCtxOrToken).token;
//     }
//   } else {
//     token = null// cookie.get("token");
//   }

//   // Headers
//   const config = {
//     headers: {
//       "Content-type": "application/json",
//       "Authorization":"Bearer " + token // token from nextCookie
//      }
//   };
//   if (token) {
//     config.headers["Authorization"] = "Bearer " + token;
//   }
//   return config;
// };
