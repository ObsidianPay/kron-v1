import React from 'react';
import  Image from 'next/image';

const Footer = () => {
    return (
        <footer className='flex justify-center items-center'>
            <p>Powered by </p>
            <Image src={"/images/brand/brandx.png"} alt='' height={60} width={60}/>
        </footer>
    );
};

export default Footer;