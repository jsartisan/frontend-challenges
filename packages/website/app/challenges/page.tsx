import { getChallenges } from "@frontend-challenges/backend";

import Client from "./client";
import Footer from "../../components/layout/Footer";

export default async function Page() {
  const challenges = await getChallenges();

  return (
    <>
      <Client challenges={challenges} scope="all" />
      <Footer />
    </>
  );
}
