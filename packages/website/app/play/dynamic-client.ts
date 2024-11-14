"use client";

import Loading from "./loading";
import dynamic from "next/dynamic";

const DynamicClient = dynamic(() => import("./client"), { ssr: false, loading: Loading });

export default DynamicClient;
