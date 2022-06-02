import React from "react";
import threads_and_knitting from "./images/k1.jpg";
import relief_and_knitting from "./images/k2.jpg";

let k1 = <img src={threads_and_knitting} alt="Threads and Knitting" width="500" height="350" />;
let k2 = <img src={relief_and_knitting} alt="Knitting gives Relief" width="500" height="350" />;

function Home(props){
    return <main>
        <header>
            <h1>Fremont Knitting Club</h1>
        </header>

        <section className="first">
            <figure className="figStyle1">
                {k1}
                <figcaption>Figure 1. Threads and Knitting.</figcaption>
            </figure>
            <h2>What is Knitting?</h2>
            <p>Knitting is a method by which yarn is manipulated to create a textile or fabric. </p>
            <p>Knitting creates stitches or loops of yarn in a row. There may be a couple of active stitches on the knitting needle at one time. Knitted fabric consists of several consecutive rows of connected loops that intermesh with the next and previous rows. As each row is formed, each newly created loop is pulled through one or more loops from the prior row and placed on the gaining needle so that the loops from the prior row can be pulled off the other needle without unraveling. You can create infinite number of patterns with knitting. </p>
        </section>

        <figure className="figStyle2">
            {k2}
            <figcaption>Figure 2. Knitting gives Relief.</figcaption>
        </figure>

        <section>
            <h2>Benefits of Knitting</h2>
            <ul>
                <li>Knitting is fun.</li>
                <li>Knitting reduces stress.</li>
                <li>Knitting increases focus and concentration.</li>
                <li>Knitting teaches important life skills.</li>
                <li>Knitting may reduce certain brain disorders.</li>
                <li>Knitting helps community.</li>
            </ul>
        </section>

        <section>
            <h2>Who all can Knit?</h2>
            <p>Everyone. Almost everyone can knit. At first it may be intimidating, but with practice, you can ace this nifty skill!</p>
        </section>

        <section>
            <h2>Knitting Requirements</h2>
            <p>For knitting, you need atleast the following:</p>
            <ul>
                <li> Yarn </li>
                <li> Scissors </li>
                <li> Knitting needles </li>
            </ul>
        </section>

        <section>
            <h2>Fremont Knitters</h2>
            <p>At Fremont Knitting Club, you will meet people with the same passion as you. There are multiple groups and you can join the one based on your skill level and preferred timings. So even if you are a newbie, at FKC we welcome you with open arms. </p>
            <p><em>Hope to see you soon!</em> </p>
        </section>

    </main>;
}

export default Home;