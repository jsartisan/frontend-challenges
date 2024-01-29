"use client";

import * as React from "react";
import { MDXComponent } from "@/components/common/MDXComponent";
import Footer from "@/components/layout/Footer";

export default function Client(props: any) {
  const { blog } = props;
  const { code, ...rest } = blog;

  return (
    <>
      <main className="mx-auto h-full max-w-screen-xl grow px-4 sm:px-6 md:order-1">
        <div className="flex flex-col gap-2 space-y-2 pt-10">
          <div className="text-2xl">{rest.emoji}</div>
          <h1 className="text-3xl font-bold">{rest.title}</h1>
          <p>{rest.published_at}</p>
        </div>
        <div className="prose my-6 dark:prose-invert">
          <MDXComponent code={code} />
        </div>
      </main>
      <Footer />
    </>
  );
}
