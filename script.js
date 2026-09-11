function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

function searchContent() {
  const input = document.getElementById("searchInput");
  const keyword = input.value.toLowerCase();

  const cards = document.querySelectorAll(".news-card");

  cards.forEach(card => {
    const text = card.innerText.toLowerCase();
    const data = card.dataset.search.toLowerCase();

    if (text.includes(keyword) || data.includes(keyword)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

function showAllNews() {
  const cards = document.querySelectorAll(".news-card");

  cards.forEach(card => {
    card.style.display = "";
  });

  document.getElementById("searchInput").value = "";
}
