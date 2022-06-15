import React from 'react';
import Head from 'next/head';

const Header = () => {
    return (
        <div>
            <Head>
                <title>Syndicate Protocol</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta name="description" content="Playground for Web3/Dai." />
                <meta property="og:url" content="https://syndicate.io/" />
                <meta property="og:type" content="website" />
            </Head>
        </div>
    )
};
export default Header;