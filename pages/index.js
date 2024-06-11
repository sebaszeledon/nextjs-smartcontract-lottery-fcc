import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Smart Contract Lottery</title>
        <meta name="description" content="Lottery Web3 App"></meta>
        <link rel="icon" href="/favicon.ico"></link>
      </Head>
      Smart Contract Lottery App!
    </div>
  );
}
