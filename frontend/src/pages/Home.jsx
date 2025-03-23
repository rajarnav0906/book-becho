import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CardSlider from "../components/CardSlider";
import Footer from "../components/Footer";




function Home(){
    return (
        <>
            <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            >
                <Navbar />
                <Hero />

                <motion.div
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                >
                    <CardSlider />
                </motion.div>

                <Footer />
            </motion.div>
        </>
    );
}

export default Home;