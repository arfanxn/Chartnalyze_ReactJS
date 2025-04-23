import Home from "@/features/home/pages/Home";
import RootLayout from "@/layouts/RootLayout";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout,
		handle: {
			title: "Home",
		},
		children: [
			{
				index: true,
				Component: Home,
			},
		],
	},
]);
