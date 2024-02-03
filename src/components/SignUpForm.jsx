import { useState } from "react";
export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameValidation, setUsernameValidation] = useState(null);
  const [passwordValidation, setPasswordValidation] = useState(null);
  async function handleSubmit(event) {
    event.preventDefault();
    if (username.length < 8) {
      setError("Username must be 8 characters");
      setUsernameValidation(false);
      return;
    } else {
      setUsernameValidation(true);
      setError("");
    }
    if (password.length < 8) {
      setError("Password must be 8 characters");
      setPasswordValidation(false);
      return;
    } else {
      setPasswordValidation(true);
      setError("");
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const result = await response.json();
      setPassword("");
      setUsername("");
      console.log(result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2 className="sign-up">Sign Up!</h2>
      {error && <p>{error}</p>}
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            className={
              usernameValidation === null
                ? " "
                : usernameValidation
                ? "username-validated"
                : "username-not-validated"
            }
            placeholder="e.g. username121"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            className={
              passwordValidation === null
                ? " "
                : passwordValidation
                ? "username-validated"
                : "username-not-validated"
            }
            type="password"
            placeholder="Must include 8 characters "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
