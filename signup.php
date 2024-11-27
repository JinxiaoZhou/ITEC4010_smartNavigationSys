<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {

  $mysqli = require __DIR__ . "/db.php";

  $sql = "INSERT INTO login_info (username, password)
          VALUES (?,?)";

  $stmt = $mysqli->stmt_init();

  if (!$stmt->prepare($sql)) {
    die("SQL err" . $mysqli->error);
  }

  $stmt->bind_param(
    "ss",
    $_POST["username"],
    $_POST["password"]
  );

  if ($stmt->execute()) {
    echo '<script>alert("Signed up sucessfuly!");
            window.location.href="/ITEC4010_smartNavigationSys/login.php";
            </script>';
  }
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Signup Page</title>
</head>

<body>
  <div class="signup-container">
    <h2>Signup</h2>
    <form action="" method="post">
      <div>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Username" required>
      </div>
      <div>
        <label for="password">Password</label>
        <input type="text" id="password" name="password" placeholder="Password" required>
      </div>
      <button type="submit">Signup</button>
    </form>
    <a href="login.php">Already have an account? Login</a>
  </div>

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

  .signup-container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .signup-container h2 {
    margin-bottom: 20px;
  }

  .signup-container input {
    width: 95%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
  }

  .signup-container button {
    width: 100%;
    padding: 10px;
    background-color: #28a745;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .signup-container button:hover {
    background-color: #218838;
  }
</style>