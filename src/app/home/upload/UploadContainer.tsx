import Head from "next/head";
import { Upload } from "./Upload";

export const UploadContainer = () => {
  return (
    <>
      <Head>
        <title>BAR | Blockchain Asset Registry</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/dropzone/basic.min.css" />
        <link rel="stylesheet" href="/dropzone/dropzone.min.css" />
      </Head>

      <Upload />
    </>
  );
};
