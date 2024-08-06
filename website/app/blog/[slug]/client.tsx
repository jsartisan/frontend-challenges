"use client";

import * as React from "react";
import { Card } from "@/website/components/ui";
import Footer from "@/website/components/layout/Footer";
import { Layout } from "@/website/components/layout/Layout";
import { MDXComponent } from "@/website/components/common/MDXComponent";

export default function Client(props: any) {
  const { blog } = props;
  const { code, ...rest } = blog;

  return (
    <>
      <Layout>
        <div className="flex flex-col gap-2 space-y-2 pt-10">
          <div className="text-2xl">{rest.emoji}</div>
          <h1 className="text-3xl font-bold">{rest.title}</h1>
        </div>
        <div className="overflow-y-auto">
          <Card className="mb-10 mt-6 max-w-screen-lg p-6">
            <MDXComponent code={code} />
          </Card>
        </div>
      </Layout>
      <Footer />
    </>
  );
}
