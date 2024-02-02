export default function Authenticate({ token }) {
  async function handleClick() {
    console.log("button has been clicked");
    try {
    } catch (error) {
      error.message;
    }
  }
  return (
    <>
      <div></div>
      <h2>Authenticate</h2>
      {}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
