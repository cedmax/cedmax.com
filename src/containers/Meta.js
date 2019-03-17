import React from "react";
import { Head } from "react-static";
import Schema from "./Schema";

export default ({ meta }) => (
  <Head>
    <title>{meta.meta_title}</title>
    <description>{meta.meta_decription}</description>
    <meta property="og:image" content={`https://cedmax.com${meta.image}`} />
    <meta property="og:url" content="https://cedmax.com/" />
    <meta property="og:title" content={meta.meta_title} />
    <meta property="og:description" content={meta.meta_decription} />
    <meta name="twitter:site" content="@cedmax" />
    <Schema meta={meta.schema_org} />
  </Head>
);
