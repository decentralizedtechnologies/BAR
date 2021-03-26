import Head from "next/head";
import { Upload } from "../app/home/upload/Upload";

export const Home = () => (
  <>
    <Head>
      <title>BAR | Blockchain Asset Registry</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/dropzone/basic.min.css" />
      <link rel="stylesheet" href="/dropzone/dropzone.min.css" />
      <meta
        name="description"
        content="Upload any file type to IPFS, Arweave and others and do things with it."
      />
    </Head>
    <Upload />
  </>
);

export default Home;
