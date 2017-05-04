<?php include("include/header.php"); ?>
<?php include("include/dashboard.php");?>
<section class="container">
<button disabled class="mdl-button mdl-js-button mdl-button--raised" id="quickstart-sign-in">Sign in with Google</button>

<div class="quickstart-user-details-container">
  Firebase sign-in status: <span id="quickstart-sign-in-status">Unknown</span>
  <div>Firebase auth <code>currentUser</code> object value:</div>
  <pre><code id="quickstart-account-details">null</code></pre>
  <div>Google OAuth Access Token:</div>
  <pre><code id="quickstart-oauthtoken">null</code></pre>
</section>


<?php
include("firebaseconn.php");
include("include/footer.php"); ?>
