import { ChallengePage, generateMetadata, generateStaticParams } from "~/screens/challenge/ui/ChallengePage";

export const revalidate = false;
export const dynamicParams = false;
export const dynamic = "force-static";

export default ChallengePage;
export { generateMetadata, generateStaticParams };
