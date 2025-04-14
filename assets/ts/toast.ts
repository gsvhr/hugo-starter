export function showToast(message: string, type: "success" | "error") {
  const toast = document.getElementById("toast");
  const toastIcon = document.getElementById("toast-icon");
  const toastMessage = document.getElementById("toast-message");

  if (!toast || !toastIcon || !toastMessage) return;

  if (type === "success") {
    toastIcon.innerHTML = `
        <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
        </svg>
      `;
    toast.classList.remove("bg-red-50", "text-red-800");
    toast.classList.add("bg-green-50", "text-green-800");
  } else {
    toastIcon.innerHTML = `
        <svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      `;
    toast.classList.remove("bg-green-50", "text-green-800");
    toast.classList.add("bg-red-50", "text-red-800");
  }

  toastMessage.innerHTML = message;
  toast.classList.remove("hidden");
  toast.classList.add("animate-fade-in");

  setTimeout(() => {
    toast.classList.remove("animate-fade-in");
    toast.classList.add("animate-fade-out");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, 5000);
}
