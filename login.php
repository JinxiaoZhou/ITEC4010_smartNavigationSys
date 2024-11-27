<?php
$login_fail = false;
$login_msg = "Wrong Username";

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $mysqli = require __DIR__ . "/db.php";

  $sql = sprintf(
    "SELECT * FROM login_info WHERE username ='%s'",
    $mysqli->real_escape_string($_POST["username"])
  );
  $result = $mysqli->query($sql);
  $user = $result->fetch_assoc();

  if ($user) {
    if (($_POST["password"] === $user["password"])) {
      header("https://raw.githack.com/JinxiaoZhou/ITEC4010_smartNavigationSys/main/indexStructure.html?username=" . $user["username"]);
    } else {
      $login_msg = "Wrong password";
    }
  }

  $login_fail = true;
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>

</head>

<body>
  <div class="login-container">
    <h2>Login</h2>
    <form method="post">
      <input type="text" id="username" name="username" placeholder="Username" required>
      <input type="password" id="password" name="password" placeholder="Password" required>

      <button type="submit">Login</button>
    </form>
    <a href="signup.php">Don't have an account? Signup</a>
  </div>

  <?php if ($login_fail): ?>
    <script>
      alert("Username or password is incorrect");
    </script>';
  <?php endif ?>

</body>

</html>

<style>
  body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }

  .login-container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .login-container h2 {
    margin-bottom: 20px;
  }

  .login-container input {
    width: 95%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .login-container button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .login-container button:hover {
    background-color: #218838;
  }
</style>