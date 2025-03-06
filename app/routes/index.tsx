// app/routes/index.tsx
import * as fs from "node:fs";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";

/*

- Routes are defined using createFileRoute fn.
- Routes auto code-split + lazy-loaded.
- Crit data fetching is coordinated from a Route's loader.
- More: https://tanstack.com/router/latest/docs/framework/react/routing/file-based-routing

*/

const filePath = "count.txt";

async function readCount() {
    return parseInt(
        await fs.promises.readFile(filePath, "utf-8").catch(() => "0")
    );
}

/*

- Server functions are created using `createServerFn` function.
- Can be called from both server during SSR + client.
- Fetch data from server, or perform other server side actions.

More: https://tanstack.com/start/latest/docs/framework/react/server-functions
*/

const getCount = createServerFn({
    method: "GET",
}).handler(() => {
    return readCount();
});

const updateCount = createServerFn({ method: "POST" })
    .validator((d: number) => d)
    .handler(async ({ data }) => {
        const count = await readCount();
        await fs.promises.writeFile(filePath, `${count + data}`);
    });


/*

- `loader` fn fetches data for ssr + preload route data before render.
- Data loaders are ISOMORPHIC --> exec on both server + client.
- Re-used + re-fetched in bckgrnd when data is stale.

More: https://tanstack.com/router/latest/docs/framework/react/guide/data-loading

*/
export const Route = createFileRoute("/")({
    component: Home,
    loader: async () => await getCount(),
});

function Home() {
    const router = useRouter();
    const state = Route.useLoaderData();

    return (
        <button
            type="button"
            onClick={() => {
                updateCount({ data: 1 }).then(() => {
                    router.invalidate();
                });
            }}
        >
            Add 1 to {state}?
        </button>
    );
    /*

	Commented out below is example of TanStack Router nav features available.
	- <Link /> nav to a new route
	- <useNavigate /> hook nav imperatively
	- <useRouter /> hook anywhere in app to access router instance + perform invalidations

	More: https://tanstack.com/router/latest/docs/framework/react/guide/navigation

	*/
    // return <Link to="/about">About</Link>;
}
