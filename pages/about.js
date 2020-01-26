import Link from 'next/link'
import Layout from '../components/Layout'

export default () => (

    <Layout title="About">

        <Link href="/">
            <a>Go to home</a>
        </Link>

        <p>A Programmer!</p>
        
        <img src="/static/logo.png" alt="University of Alberta logo" />

    </Layout>

);