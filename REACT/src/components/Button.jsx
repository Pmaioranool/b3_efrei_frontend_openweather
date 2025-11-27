export default function Button({ type, id, children, onClick }) {
  return (
    <button type={type} id={id} onClick={onClick}>
      {children}
    </button>
  );
}
