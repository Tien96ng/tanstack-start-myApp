// app/router.tsx

/*

File dictates behavior of TanStack Router in the Start App.
Configure everything from default `preloading functionality` to `caching staleness`

*/
import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function createRouter() {
    const router = createTanStackRouter({
        routeTree,
        scrollRestoration: true, // used to restore scroll pos of page when nav betwn routes.
    })

    return router
    }

    declare module '@tanstack/react-router' {
    interface Register {
        router: ReturnType<typeof createRouter>
    }
}