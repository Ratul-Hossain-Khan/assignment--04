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
  {
    id: 2,
    company: "TechNova Solutions",
    position: "Frontend Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$95,000",
    description:
      "Build modern user interfaces using React and Tailwind CSS.",
    status: "not_applied"
  },
  {
    id: 3,
    company: "Cloudify",
    position: "DevOps Engineer",
    location: "Texas, USA",
    type: "Full-time",
    salary: "$120,000",
    description:
      "Maintain CI/CD pipelines and manage cloud servers.",
    status: "not_applied"
  },
  {
    id: 4,
    company: "BrightSoft",
    position: "UI/UX Designer",
    location: "California, USA",
    type: "Contract",
    salary: "$80,000",
    description:
      "Design clean and user-friendly web interfaces.",
    status: "not_applied"
  },
  {
    id: 5,
    company: "SkyNet Systems",
    position: "Backend Engineer",
    location: "New York, USA",
    type: "Full-time",
    salary: "$110,000",
    description:
      "Develop secure and scalable REST APIs.",
    status: "not_applied"
  },
  {
    id: 6,
    company: "InnovaTech",
    position: "Software Engineer",
    location: "Toronto, Canada",
    type: "Remote",
    salary: "$105,000",
    description:
      "Build scalable backend systems and services.",
    status: "not_applied"
  },
  {
    id: 7,
    company: "CyberCore",
    position: "Security Engineer",
    location: "Berlin, Germany",
    type: "Full-time",
    salary: "$115,000",
    description:
      "Ensure application and network security standards.",
    status: "not_applied"
  },
  {
    id: 8,
    company: "Appify",
    position: "Mobile Developer",
    location: "London, UK",
    type: "Full-time",
    salary: "$100,000",
    description:
      "Develop cross-platform mobile applications.",
    status: "not_applied"
  }
];

let currentTab = "all";



function getStatusBadge(status) {
  if (status === "interview") {
    return `<span class="inline-block bg-green-100 text-green-700 text-xs px-3 py-1 rounded font-semibold">INTERVIEW</span>`;
  } 
  else if (status === "rejected") {
    return `<span class="inline-block bg-red-100 text-red-700 text-xs px-3 py-1 rounded font-semibold">REJECTED</span>`;
  } 
  else {
    return `<span class="inline-block bg-gray-200 text-gray-600 text-xs px-3 py-1 rounded font-semibold">NOT APPLIED</span>`;
  }
}

function updateCounts() {
  totalCount.innerText = jobs.length;
  interviewCount.innerText = jobs.filter(job => job.status === "interview").length;
  rejectedCount.innerText = jobs.filter(job => job.status === "rejected").length;

  const filtered =
    currentTab === "all"
      ? jobs
      : jobs.filter(job => job.status === currentTab);

  tabCount.innerText = filtered.length + " Jobs";
}

function renderJobs() {
  jobContainer.innerHTML = "";

  const filtered =
    currentTab === "all"
      ? jobs
      : jobs.filter(job => job.status === currentTab);

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

      card.querySelector(".interviewBtn").onclick = () => {
        job.status = "interview";
        updateCounts();
        renderJobs();
      };

      card.querySelector(".rejectBtn").onclick = () => {
        job.status = "rejected";
        updateCounts();
        renderJobs();
      };

      card.querySelector(".delete").onclick = () => {
        const index = jobs.findIndex(job => job.id === job.id);
        jobs.splice(index, 1);
        updateCounts();
        renderJobs();
      };

      jobContainer.appendChild(card);
    });
  }

  updateCounts();
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