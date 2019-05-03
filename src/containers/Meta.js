import React, { memo } from "react";
import { Head } from "react-static";

export default memo(({ meta }) => (
  <Head>
    <title>{meta.meta_title}</title>
    <meta name="description" content={meta.meta_decription} />
    <meta property="og:image" content={`https://cedmax.com${meta.image}`} />
    <meta property="og:url" content="https://cedmax.com/" />
    <meta property="og:title" content={meta.meta_title} />
    <meta property="og:description" content={meta.meta_decription} />
    <meta name="twitter:site" content="@cedmax" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" type="image/x-icon" />
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  </Head>
));
