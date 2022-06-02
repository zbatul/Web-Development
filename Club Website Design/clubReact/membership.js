import React from "react";

function Membership(props){
    return <main>
        <header>
            <h1>Membership Form</h1>
        </header>
        <form>
            <div className="FormDiv">
                <label>Name: </label>
                <input id="name" type="text" minLength="2" maxLength="26" required="required" />
                <label>Email: </label>
                <input id="email" type="email" minLength="3" maxLength="64" required="required" />
                <label>Password: </label>
                <input id="pwd" type="password" minLength="8" maxLength="26" required="required" />
                <label>Skill Level: </label>
                <select name="skillLevel" id="skillLevel">
                    <option value="beginner">New to Knitting</option>
                    <option value="intermediate">Have done some Knitting</option>
                    <option value="advanced">Knitted a lot</option>
                </select>
                <label>Where did you hear about us: </label>
                <select name="hearAboutUs" id="hearAboutUs">
                    <option value="browsing">Browsing the Internet</option>
                    <option value="friend">Friend</option>
                    <option value="socialMedia">Social Media</option>
                    <option value="flyer">Flyer/Pamphlet</option>
                    <option value="other">Other</option>
                </select>
                <label>Comments: </label>
                <textarea cols="30" rows="3" placeholder="Anything else you want us to know..."></textarea>
                <button type="button" id="applyButton">Apply</button>
            </div>
        </form>
        <section id="ThanksDialog">
        </section>
    </main>;
}

export default Membership;