fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const buttons = document.querySelectorAll(".time-filters a");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();

        buttons.forEach((btn) => btn.classList.remove("active"));
        e.target.classList.add("active");

        const defaultBtn = document.querySelector(".time-filters a.active");
        if (defaultBtn) {
          const defaultFilter = defaultBtn.textContent.trim().toLowerCase();
          updateUI(data, defaultFilter);
        }

        const filter = e.target.textContent.toLowerCase();
        updateUI(data, filter);
      });
    });

    function updateUI(data, filter) {
      const filterLabels = {
        daily: "Day",
        weekly: "Week",
        monthly: "Month",
      };
      data.forEach((activity, index) => {
        const card = document.querySelectorAll(".activity-content")[index];
        card.querySelector(".current-hours").textContent =
          activity.timeframes[filter].current + "hrs";
        card.querySelector(".previous-hours").textContent =
          "Last " +
          filterLabels[filter] +
          " - " +
          activity.timeframes[filter].previous +
          "hrs";
      });
    }
  })
  .catch((err) => console.error("Error loading data:", err));
