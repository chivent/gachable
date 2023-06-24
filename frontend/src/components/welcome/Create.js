import classes from "../UI/UI.module.css"
import create from "./Create.module.css"

const Create = (props) => {
  return (
    <div className={`${create.container} ${classes.textPrimaryDark}`}>
      <div className={create.title}>
        <h2> Gachable Creation Guide </h2>
        <div className={classes.textPrimary}> <i> All about creating your own machine link to use with Gachable. </i> </div>
      </div>

      <div className={create.chunk}>
        <div> The process consists of creating a list of machine items, and storing it on a data platform online. You'll end up with a link like this: <span className={classes.textHelp}> <i>"https://gachable-play-default-rtdb.asia-southeast1.firebasedatabase.app/"</i> </span>.</div>
        <div> If you haven't seen how Gachable works yet, try using the link above to start a machine on the play page. </div>
      </div>
      <hr />
      <div className={create.chunk}>
        <h3> Creating a list of machine items </h3>
        <div className={classes.textHelp}> The item creation process is still under improvement for now, thus will require more work to make your own machine items. The method will be updated for convenience soon. </div>
        <div> Download this <a href="/app/assets/site/template.json" download="template.json" className={classes.textSecondary}>template</a> on click. You will be editing this file, but do not change anything other that what is mentioned below. </div> 
        
        <div> <b> Open the file, and begin filling machine details. </b> </div> 
        <ol>
          <li> Under <span className={create.code}>"machine": &#x7B;... &#x7D;</span>, replace the display name for your machine. </li> 
          <li> Fill items for your machine. An item's template is as per <span className={create.code}>"replace_item_key": &#x7B;... &#x7D;</span> in file.
            <ul className={create.sublist}>
              <li>Fill <i>"replace_item_key"</i> with a unique value. It can include any character, but must be one continuous word without spaces. This value must be unique for each item you create.</li>
              <li>Fill <i>"REPLACE NAME"</i> with a name for the item.</li>
              <li>Fill <i>"REPLACE DESCRIPTION"</i> with a description of any length.</li>
              <li>Fill <i>"REPLACE IMAGE LINK"</i> with an image link. If you're using images uploaded to your Google Drive or any other storage platform, make sure that the link it is accessible to anyone who visits it.</li>
              <li>All replaced values above should be encased within quotation marks.</li>
            </ul>
          </li> 
          <li> To add more items, simply copy the item template and paste it directly below the previous item. Make sure each item has a comma in between them. </li>
        </ol>
        
        <div> Save the file when you're done, and that's the list of your machine items! </div>
      </div>

      <hr />

      <div className={create.chunk}>
        <h3> Storing the list of items on a data plaform </h3>
        <div> We'll be using Firebase (a Google owned platform) to host the file you edited, and this requires a Gmail account. For those who are familiar with the concept of databases and don't want to use Firebase, other readable NoSQL real-time databases should theoretically work as well. </div>
        <div className={classes.textHelp}> Following the guide creates at the free tier which has a limited capacity. It is non-chargable and sufficient for most cases, unless creating extremely large machines or expecting multiple users per day i.e 1000+ items/200+ users, where it might fail to work if it hits capacity. </div>

        <div> <b> Visit Firebase, click go to console and login to your Google account. </b> </div> 
        <ol>
          <li> Once in console, click add a project and create a project with your name of choice. </li> 
          <li> After creation, expand build on the sidebar and click realtime database. </li> 
          <li> While creating, select a location and start security rules in locked mode. </li> 
        </ol>
        
        <div> <b> You've just created a place to store your item list. </b> </div> 
        <ol>
          <li> Click the three dots icon at the side, and click import JSON. Upload your edited template file. </li> 
          <li> Click on rules, and replace the <span className={create.code}>false</span> to <span className={create.code}>true</span> for ".read" in the area below. Click Publish to save. </li> 
          <li> Complete! If you return to the data page of the database, you'll see the machine link on the page. </li>
        </ol>
      </div>

      <hr />

      <div className={classes.textSecondary}> Share the link with anyone, and they can use it to spin your gachable. They'll get a random item from your list on each spin. Enjoy creating!</div> 
    </div>
  );
}

export default Create