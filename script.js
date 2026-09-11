const feeds = [
  {
    name: "PUBG MOBILE",
    query: "PUBG Mobile esports game"
  },
  {
    name: "MOBILE LEGENDS",
    query: "Mobile Legends esports"
  },
  {
    name: "FREE FIRE",
    query: "Free Fire esports game"
  },
  {
    name: "GENSHIN IMPACT",
    query: "Genshin Impact game"
  },
  {
    name: "VALORANT",
    query: "Valorant esports game"
  },
  {
    name: "DOTA 2",
    query: "Dota 2 esports game"
  }
];

const newsContainer = document.getElementById("newsContainer");

async function loadNews() {

  newsContainer.innerHTML = `
    <div class="loading">
      Memuat berita terbaru...
    </div>
  `;

  let allNews = [];

  for (const feed of feeds) {

    try {

      const rssUrl =
        "https://news.google.com/rss/search?q=" +
        encodeURIComponent(feed.query) +
        "&hl=id&gl=ID&ceid=ID:id";

      const apiUrl =
        "https://api.rss2json.com/v1/api.json?rss_url=" +
        encodeURIComponent(rssUrl);

      const response = await fetch(apiUrl);

      const data = await response.json();

      if (data.status === "ok") {

        data.items.slice(0, 3).forEach(item => {

          allNews.push({
            game: feed.name,
            title: item.title,
            description: cleanText(item.description),
            link: item.link,
            date: item.pubDate
          });

        });

      }

    } catch (error) {

      console.log(
        "Gagal mengambil berita:",
        feed.name,
        error
      );

    }

  }

  allNews.sort(
    (a, b) =>
      new Date(b.date) - new Date(a.date)
  );

  displayNews(allNews);

}


function displayNews(news) {

  if (!news.length) {

    newsContainer.innerHTML = `
      <p>Berita belum berhasil dimuat.</p>
    `;

    return;
  }

  newsContainer.innerHTML = "";

  news.slice(0, 12).forEach(item => {

    const card = document.createElement("article");

    card.className = "news-card";

    card.dataset.search =
      `${item.game} ${item.title}`.toLowerCase();

    card.innerHTML = `

      <div class="news-image">
        <span>${item.game}</span>
      </div>

      <div class="news-content">

        <small>
          GAME • BERITA TERBARU
        </small>

        <h3>
          ${item.title}
        </h3>

        <p>
          ${item.description}
        </p>

        <a
          href="${item.link}"
          target="_blank"
          rel="noopener noreferrer"
          class="read-news"
        >
          Baca berita →
        </a>

      </div>

    `;

    newsContainer.appendChild(card);

  });

}


function cleanText(text) {

  const temp = document.createElement("div");

  temp.innerHTML = text || "";

  return temp.textContent
    .replace(/\s+/g, " ")
    .trim()
    .substring(0, 180);

}


function toggleMenu() {

  const nav =
    document.getElementById("navMenu");

  nav.classList.toggle("active");

}


function searchContent() {

  const input =
    document.getElementById("searchInput");

  const keyword =
    input.value.toLowerCase();

  const cards =
    document.querySelectorAll(".news-card");

  cards.forEach(card => {

    const text =
      card.innerText.toLowerCase();

    const data =
      card.dataset.search || "";

    card.style.display =
      text.includes(keyword) ||
      data.includes(keyword)
        ? ""
        : "none";

  });

}


function showAllNews() {

  document
    .querySelectorAll(".news-card")
    .forEach(card => {

      card.style.display = "";

    });

  document.getElementById(
    "searchInput"
  ).value = "";

}


// Jalankan otomatis saat website dibuka
loadNews();
