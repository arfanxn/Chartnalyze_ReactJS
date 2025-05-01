import { ChildrenProps, ClassNameProps } from '@/types/componentTypes'
import classNames from 'classnames'
import { ReactNode } from 'react'
import { useCurrentRouteTitle } from '@/hooks/useCurrentRouteTitle'
import { useScrollToTopOnRouteChange } from '@/hooks/useScrollToTopOnRouteChange'

type Props = ClassNameProps & ChildrenProps & {}

/**
 * Layout component that sets the document title based on route match titles.
 *
 * @param {Object} props - The props object.
 * @param {ReactNode} props.children - The child components to render.
 *
 * @returns {ReactNode} Rendered children components.
 *
 * This component uses the `useMatches` hook from `react-router` to get the
 * current route matches and filter them for those with a title handle.
 * It then sets the document title to the last matching route's title, followed
 * by the application name. If no route has a title handle, the document title
 * defaults to the application name.
 */

const Layout = (props: Props): ReactNode => {
    useCurrentRouteTitle()
    useScrollToTopOnRouteChange()

    return <main className={classNames(props.className)}>{props.children}</main>
}

export default Layout
