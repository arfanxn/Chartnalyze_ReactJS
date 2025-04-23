import Home from "@/features/home/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: Home,
	},
]);
