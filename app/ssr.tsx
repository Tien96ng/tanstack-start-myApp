// app/ssr.tsx
import {
	createStartHandler,
	defaultStreamHandler,
} from "@tanstack/react-start/server";
import { getRouterManifest } from "@tanstack/react-start/router-manifest";

import { createRouter } from "./router";

export default createStartHandler({
	createRouter,
	getRouterManifest, // generate router manifest, determine aspects of asset management / preloading in app.
})(defaultStreamHandler); // render app to a stream, can also use `defaultRenderHandler` or build your own.
