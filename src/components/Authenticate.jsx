import { useState } from "react";

export default function Authenticate({ token }) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function handleClick() {
    console.log("button has been clicked");
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      setSuccessMessage(result.message);
      console.log(result);
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <>
      <div>
        <h3>Authenticate</h3>
        {successMessage && <p>{successMessage}</p>}
        {error && <p>{error}</p>}
        <button onClick={handleClick}>Authenticate Token</button>
      </div>
    </>
  );
}
