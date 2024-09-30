"use client";

import * as React from "react";
import {
  FluentProvider,
  SSRProvider,
  RendererProvider,
  createDOMRenderer,
  renderToStyleElements,
  teamsLightTheme,
} from "@fluentui/react-components";
import { useServerInsertedHTML } from "next/navigation";
import Navbar from "./organisms/navbar";

export function Providers({ children }: { children: React.ReactNode }) {
  const [renderer] = React.useState(() => createDOMRenderer());
  const didRenderRef = React.useRef(false);

  useServerInsertedHTML(() => {
    if (didRenderRef.current) {
      return;
    }
    didRenderRef.current = true;
    return <>{renderToStyleElements(renderer)}</>;
  });

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <FluentProvider theme={teamsLightTheme}>
          <Navbar />
          {children}
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}
