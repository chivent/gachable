import classes from "../UI/UI.module.css"
import about from "./About.module.css"

const About = () => {
  return (
    <div className={`${classes.textPrimaryDark} ${about.container}`}>
      <div className={about.title}>
        <h2> Welcome to Gachable! </h2>
        <div className={classes.textPrimary}> <i> A gachapon lover's creation. </i> </div>
      </div>

      <div>
        I've always been a fan of gachapon machines. The anticipation while turning the dial, the suspense of not knowing what you'll receive, and finally the disappointment of getting something you already have.
      </div>

      <div>
        Gachable was conceptualized with the sudden thought <i>"I wonder if I can create my own custom gachapon machine?"</i>. 
        I couldn't find any online platform readily available (or maybe just didn't look hard enough), and as such made the decision to create a platform of my own.
      </div> 

      <div>
        Gachable is meant to be a place where people can mimic and share the gachapon experience.
        You can make a machine filled with memories and share it with loved ones, enjoying the hits of nostalgia. Or simulate a real-life gachapon, and try your luck out to see what you might get.
        Perhaps even fill it with a list of ideas, and use it to decide what to work on.
        There's no limit to what you can fill your machine with, as everything is gachable.
      </div>

      <div>
        The platform is still under development, and I'll be working to add features and improve the play and create experience.
        If you'd like to peruse the code or follow up on upcoming improvements, feel free to take a look at the Gachable repo.
      </div>

      <div>
        Thank you for taking an interest in Gachable, and happy spinning!
      </div>
    </div>
  );
}

export default About