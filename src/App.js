import md5 from "md5";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import client from "./sanity/config";
import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

const Auth = lazy(() => import("./features/auth"));
const Story = lazy(() => import("./features/story"));
const User = lazy(() => import("./features/user"));

const queryClient = new QueryClient();

function App() {
  // useEffect(() => {
  //   client.createIfNotExists({
  //     _id: md5("thom1622000@gmail.com"),
  //     _type: "user",
  //     role: {
  //       _type: "reference",
  //       _ref: "aff61f2f-184c-47ad-9856-a8b28010b379",
  //     },
  //   });
  // }, []);
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="auth" element={<Auth />} />
            <Route path="/" element={<Layout />}>
              <Route path="story/*" element={<Story />} />
              <Route path="user/*" element={<User />} />
            </Route>
            <Route path="error" element={<Error />} />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

const Error = () => {
  return <div>Error</div>;
};
