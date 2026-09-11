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

const newsContainer =
  document.getElementById("newsContainer");

const searchInput =
  document.getElementById("searchInput");


// ===============================
// AMBIL BERITA
// ===============================

async function getNews(query, gameName = "") {

  try {

    const rssUrl =
      "https://news.google.com/rss/search?q=" +
      encodeURIComponent(query) +
      "&hl=id&gl=ID&ceid=ID:id";

    const apiUrl =
      "https://api.rss2json.com/v1/api.json?rss_url=" +
      encodeURIComponent(rssUrl);

    const response = await fetch(apiUrl);

    const data = await response.json();

    if (data.status !== "ok") {
      return [];
    }

    return data.items.slice(0, 5).map(item => ({

      game: gameName || "GAME",

      title: item.title,

      description: cleanText(
        item.description
      ),

      link: item.link,

      date: item.pubDate

    }));

  } catch (error) {

    console.log(
      "Gagal mengambil berita:",
      error
    );

    return [];
  }
}


// ===============================
// LOAD SEMUA BERITA
// ===============================

async function loadNews() {

  newsContainer.innerHTML = `
    <div class="loading">
      Memuat berita terbaru...
    </div>
  `;

  let allNews = [];

  for (const feed of feeds) {

    const news = await getNews(
      feed.query,
      feed.name
    );

    allNews.push(...news);
  }

  allNews.sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );

  displayNews(allNews);
}


// ===============================
// TAMPILKAN BERITA
// ===============================

function displayNews(news) {

  if (!news.length) {

    newsContainer.innerHTML = `
      <div class="loading">
        Berita tidak ditemukan.
      </div>
    `;

    return;
  }

  newsContainer.innerHTML = "";

  news.slice(0, 12).forEach(item => {

    const card =
      document.createElement("article");

    card.className = "news-card";

    card.dataset.search =
      `${item.game} ${item.title}`
      .toLowerCase();

    card.innerHTML = `

      <div class="news-image">
        <span>
          ${item.game}
        </span>
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


// ===============================
// P
