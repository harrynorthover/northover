"use client";

import Prism from "prismjs";
import { useEffect } from "react";

import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-css";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";

export default function PrismLoader() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return <div className="hidden"></div>;
}
