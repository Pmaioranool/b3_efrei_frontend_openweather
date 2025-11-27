export function toast(message, type = "info", duration = 3000) {
  const toastContainer = document.querySelector("#toast");
  toastContainer.className = `toast ${type} show`;
  toastContainer.innerText = message;
  if (duration === "always") return;
  setTimeout(() => {
    toastContainer.className = "toast";
  }, duration);
}
