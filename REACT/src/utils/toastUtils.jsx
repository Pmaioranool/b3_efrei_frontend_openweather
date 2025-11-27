import toast from "react-hot-toast";

export function infoToast(message) {
  toast.custom((t) => (
    <div
      style={{
        padding: "12px 16px",
        background: "#1e293b",
        color: "white",
        borderRadius: "10px",
        border: "1px solid #3b82f6",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      {/* Icône info */}
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "#3b82f6",
          borderRadius: "50%",
        }}
      ></div>

      <span>{message}</span>
    </div>
  ));
}

export function warningToast(message) {
  toast.custom((t) => (
    <div
      style={{
        padding: "12px 16px",
        background: "#1e1e2f",
        color: "white",
        borderRadius: "10px",
        border: "1px solid #f59e0b",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
      }}
    >
      {/* Icône warning */}
      <div
        style={{
          width: "10px",
          height: "10px",
          background: "#f59e0b",
          borderRadius: "50%",
        }}
      ></div>

      <span>{message}</span>
    </div>
  ));
}
