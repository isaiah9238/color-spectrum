import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";
import App from "./App";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  );
}