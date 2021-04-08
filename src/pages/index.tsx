import { NextPage } from "next";
import Head from "next/head";
import { Upload } from "../app/upload/Upload";

const Home: NextPage = () => (
  <>
    <Head>
      <title>BAR | Blockchain Asset Registry</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="/dropzone/basic.min.css" />
      <link rel="stylesheet" href="/dropzone/dropzone.min.css" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <meta
        name="description"
        content="Upload any file type to IPFS, Arweave and others and do things with it."
      />
    </Head>
    <Upload />
  </>
);

export default Home;
