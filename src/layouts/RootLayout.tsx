import { hasTitleHandle } from "@/helpers/routerHelpers";
import { useEffect } from "react";
import { Outlet, useMatches } from "react-router";

function RootLayout() {
	const appName = import.meta.env.VITE__APP_NAME as string | undefined;
	const matches = useMatches();

	useEffect(() => {
		const titles = matches
			.filter(hasTitleHandle)
			.map((match) => match.handle.title);

		const documentTitle = titles.at(-1) ?? appName;
		document.title = `${documentTitle} | ${appName}`;
	}, [matches, appName]);

	return <Outlet />; // Render nested routes
}

export default RootLayout;
