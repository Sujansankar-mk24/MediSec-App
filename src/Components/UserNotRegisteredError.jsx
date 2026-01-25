export default function UserNotRegisteredError() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f1f5f9"
    }}>
      <div style={{
        background: "white",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "420px",
        textAlign: "center",
        boxShadow: "0 10px 30px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ marginBottom: "1rem", color: "#7F1D1D" }}>
  Access Restricted
</h1>

        <p>
          You are not registered to use this application.
          Please contact the administrator.
        </p>
      </div>
    </div>
  );
}
