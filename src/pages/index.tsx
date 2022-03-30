import Head from 'next/head'
import { SubscribeButton } from '../components/SubscribeButton';
import { GetStaticProps } from 'next';

import styles from './home.module.scss';

import { stripe } from '../services/stripe';

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product}: HomeProps) {

  
  return (
    <>
      <Head>
        <title>Home | ig.News</title>
      </Head>
     <main className={styles.contentContainer}>
       <section className={styles.hero}>
        <span>👏 Hey, welcome</span>
        <h1>News about the <span>React</span> world.</h1>
        <p>
          Get access to all the publications <br />
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton priceId={product.priceId}/>
       </section>

       <img src="images/avatar.svg" alt="Girl coding" />

     </main>
    </>
  );
}


export const getServerSideProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1Kj6KEC6JMZ5zLaG1jnR0Q97')

  const product =  {
    priceId: price.id,
    amount: new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price.unit_amount / 100)
  }
  return {
    props: {
     product
    },

    revalidade:  60 * 60 * 24

  }
}