import SigninPage from "./pages/SigninPage";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const getStartPage = () => {
  const loggedIn = localStorage.getItem("token") ? true : false;
  if (loggedIn) {
    return <HomePage/>;
  } else {
    return <SigninPage/>;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: getStartPage(),
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/:id",
    element: <HomePage />,
  },
]);

function App() {
  return (
    <div className="bg-[#D1E7E0]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
