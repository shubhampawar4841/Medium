import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Blog from "./pages/Blog";
import Blogs from "./pages/Blogs";
import Editor from "./pages/Editor";
import Signin from "./pages/Signin";
import User from "./pages/User";
import UserBlogs from "./pages/UserBlogs";
import Settings from "./components/Settings";

function App() {
	const isLoggedIn =
		localStorage.token !== undefined && localStorage.token !== "";
	return (
		<BrowserRouter>
			<Routes>
				{!isLoggedIn ? (
					<>
						<Route
							path="/signup"
							element={<Signup></Signup>}></Route>
						<Route
							path="/signin"
							element={<Signin></Signin>}></Route>
						<Route
							path="*"
							element={<Navigate to="/signin" />}
						/>
					</>
				) : (
					<>
						<Route
							path="/"
							element={<Blogs></Blogs>}></Route>
						<Route
							path="/blogs"
							element={<Blogs></Blogs>}></Route>
						<Route
							path="/settings"
							element={<Settings></Settings>}></Route>
						<Route
							path="/write"
							element={<Editor edit={false}></Editor>}></Route>
						<Route
							path="/your-blogs"
							element={<UserBlogs></UserBlogs>}></Route>
						<Route
							path="/edit/:id"
							element={<Editor edit={true}></Editor>}></Route>
						<Route
							path="/blog/:id"
							element={<Blog></Blog>}></Route>
						<Route
							path="/user/:id"
							element={<User></User>}></Route>
						<Route
							path="*"
							element={<Navigate to="/blogs" />}
						/>
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
}

export default App;