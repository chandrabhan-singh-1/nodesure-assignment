import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("animal/:id", "routes/animal.$id.tsx"),
] satisfies RouteConfig;
