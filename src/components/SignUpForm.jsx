import { useState } from "react";
export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    if (password.length < 8) {
      setError("Password must be 8 characters");
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
            placeholder="e.g. username121"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
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
