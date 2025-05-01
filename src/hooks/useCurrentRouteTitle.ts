// hooks/useCurrentRouteTitle.ts
import { useEffect } from 'react'
import { useMatches } from 'react-router'
import { hasTitleHandle } from '@/helpers/routerHelpers'

/**
 * Custom hook to set the document title based on the current route matches.
 *
 * This hook uses the `useMatches` hook from `react-router` to get the current
 * route matches and filters them for those with a title handle. It then sets
 * the document title to the last matching route's title followed by the
 * application name. If no route has a title handle, the document title
 * defaults to the application name.
 */
export const useCurrentRouteTitle = () => {
    const appName = import.meta.env.VITE__APP_NAME as string
    const matches = useMatches()

    useEffect(() => {
        const titles = matches
            .filter(hasTitleHandle)
            .map((match) => match.handle.title)
        const title = titles.at(-1)
        document.title = title ? `${title} | ${appName}` : appName
    }, [matches, appName])
}
