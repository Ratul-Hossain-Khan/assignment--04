
document.querySelectorAll(".tabBtn").forEach(btn => {
  btn.onclick = () => {
    document.querySelectorAll(".tabBtn").forEach(b =>
      b.classList.remove("border-blue-600", "text-blue-600")
    );
    btn.classList.add("border-blue-600", "text-blue-600");
    currentTab = btn.dataset.tab;
    renderJobs();
  };
});

renderJobs();