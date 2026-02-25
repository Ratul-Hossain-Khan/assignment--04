const jobs = [
  {
    id: 1,
    company: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $165,000",
    description:
      "Transform complex data into compelling visualizations using D3.js and React.",
    status: "not_applied"
  },
];

let currentTab = "all";



function getStatusBadge(status) {
  if (status === "interview") {
    return `<span class="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded font-semibold">INTERVIEW</span>`;
  }
    else {
    return `<span class="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded font-semibold">NOT APPLIED</span>`;
  }
}


 
function renderJobs() {
  jobContainer.innerHTML = "";

  const filtered =
    currentTab === "all"
      ? jobs
      : jobs.filter(j => j.status === currentTab);

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");

    filtered.forEach(job => {
      const card = document.createElement("div");
      card.className = "border rounded-lg p-5 bg-gray-50 shadow-sm";

      card.innerHTML = `
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-bold text-lg">${job.company}</h3>
            <p class="text-gray-600">${job.position}</p>
            <p class="text-sm text-gray-500 mt-1">
              ${job.location} • ${job.type} • ${job.salary}
            </p>
            <div class="mt-3">
              ${getStatusBadge(job.status)}
            </div>
            <p class="text-sm mt-3 text-gray-600">
              ${job.description}
            </p>
          </div>

          <button class="delete text-gray-400 hover:text-red-600">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>

        <div class="mt-4 flex gap-3">
          <button class="interviewBtn border border-green-500 text-green-600 px-4 py-1 rounded text-sm hover:bg-green-50">
            INTERVIEW
          </button>

          <button class="rejectBtn border border-red-500 text-red-600 px-4 py-1 rounded text-sm hover:bg-red-50">
            REJECTED
          </button>
        </div>
      `;

      
     
    
      jobContainer.appendChild(card);
    });
  }

}

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