export function Progress({ step, totalSteps }) {
  const percent = (step / totalSteps) * 100;
  return (
    <div style={{ background: "#eee", borderRadius: "8px", height: "8px" }}>
      <div
        style={{
          width: `${percent}%`,
          background: "#0fabc0",
          height: "100%",
          borderRadius: "8px",
          transition: "width 0.3s",
        }}
      />
    </div>
  );
}
