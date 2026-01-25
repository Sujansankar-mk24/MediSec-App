export function Badge({ children, className }) {
  return (
    <span
      className={className}
      style={{
        padding: '4px 8px',
        background: '#0fabc0',
        color: 'white',
        borderRadius: '6px',
        fontWeight: '600',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      {children}
    </span>
  );
}
