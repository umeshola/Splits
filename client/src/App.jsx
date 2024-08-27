import { useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import Landing from "./Components/Landing";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Signup from "./Components/Signup";
import Faq from "./Components/Faq";
import Contact from "./Components/Contact";
import Price from "./Components/Price";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import Dashboard from "./Components/Dashboard";
import Waiting from "./Components/Waiting";
import NotFoundShow from "./Components/NotFoundShow";

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem("token") || ""
  },
});

function App() {
  useLayoutEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on load
  }, []);

  const location = useLocation(); // Get the current location
  const shouldRenderNavbarAndFooter = !(["/singup", "/login", "/profile", '/waiting', "/dashboard", "/dashboard/queue", "/dashboard/groups", "/dashboard/refund", '/dashboard/help'].includes(location.pathname) || location.pathname.startsWith("/profile/"));

  return (
    <>
      <div>
        <div>
          <ApolloProvider client={client}>
            <div className="relative z-50">
              {shouldRenderNavbarAndFooter && <Navbar />}
            </div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/singup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/price" element={<Price />} />
              <Route path="/waiting" element={<Waiting />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/queue" element={<Dashboard />} />
              <Route path="/dashboard/groups" element={<Dashboard />} />
              <Route path="/dashboard/refund" element={<Dashboard />} />
              <Route path="/dashboard/help" element={<Dashboard />} />
              <Route path="*" element={<NotFoundShow />} />
            </Routes>
            {shouldRenderNavbarAndFooter && <Footer />}
          </ApolloProvider>
        </div>
      </div>
    </>
  );
}

export default App;