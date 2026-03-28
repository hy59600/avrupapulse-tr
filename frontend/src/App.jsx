import { useEffect, useState } from "react";
import {
  createArticle,
  deleteArticle,
  getDraftArticles,
  getPublishedArticle,
  getPublishedArticles,
  publishArticle,
  updateArticle
} from "./services/articles";

const copyByLanguage = {
  tr: {
    eyebrow: "Avrupa'daki Turkler Icin Dijital Gazete",
    heroCopy:
      "Almanya basta olmak uzere Avrupa'da yasayan Turk toplumu icin gundemi, toplumsal gelismeleri ve gunluk hayati takip etmeyi kolaylastiran bir haber platformu.",
    badges: ["Guncel Haberler", "Turkce Icerik", "Mobil Uyumlu Deneyim"],
    featuredStory: "One Cikan Haber",
    editorialFocus: "Yayin Odagi",
    latestHeadlines: "Son Mansetler",
    focusItems: [
      "Gundem, Almanya ve Avrupa dosyalari",
      "Ekonomi, gecim ve is hayati",
      "Egitim, saglik ve sosyal haklar",
      "Diaspora odakli toplumsal analizler"
    ],
    miniNote:
      "Bu ilk surum, yayinlanmis icerikleri dogrudan backend API uzerinden getirir.",
    source: "Kaynak",
    openEditor: "Editor",
    openAuthors: "Yazarlar",
    openVideos: "Videolar",
    readArticle: "Haberi Ac",
    backToHome: "Ana Sayfaya Don",
    backToNews: "Haberlere Don",
    noDate: "Tarih yok",
    loadingArticles: "Haberler yukleniyor...",
    loadingHeadlines: "Son mansetler hazirlaniyor...",
    loadingArticleDetail: "Haber yukleniyor...",
    editorTitle: "Yeni Haber Olustur",
    editorIntro:
      "Buradan Turkce ve Almanca haber icerigini girip yeni bir taslak olusturabilir, mevcut taslaklari duzenleyebilir veya silebilirsin.",
    formTitleTr: "Baslik (TR)",
    formTitleDe: "Baslik (DE)",
    formSummaryTr: "Ozet (TR)",
    formSummaryDe: "Ozet (DE)",
    formContentTr: "Icerik (TR)",
    formContentDe: "Icerik (DE)",
    formSourceName: "Kaynak Adi",
    formSourceUrl: "Kaynak Linki",
    formCategory: "Kategori",
    submitArticle: "Taslagi Kaydet",
    updateArticle: "Degisiklikleri Kaydet",
    submitPending: "Kaydediliyor...",
    submitSuccess: "Taslak kaydedildi. Artik publish etmeye hazir.",
    updateSuccess: "Taslak guncellendi.",
    submitError: "Haber kaydedilemedi.",
    draftsTitle: "Taslak Haberler",
    noDrafts: "Henuz taslak haber yok.",
    publishArticle: "Publish Et",
    publishPending: "Publish Ediliyor...",
    publishSuccess: "Haber publish edildi.",
    publishError: "Haber publish edilemedi.",
    editArticle: "Duzenle",
    deleteArticle: "Sil",
    deletePending: "Siliniyor...",
    deleteSuccess: "Taslak silindi.",
    deleteError: "Taslak silinemedi.",
    noPublishedArticles:
      "Henuz yayinlanmis haber yok. Backend uzerinden bir haberi yayinlayinca burada goreceksin.",
    onlyOneArticle: "Su anda yalnizca bir yayinlanmis haber var.",
    fallbackError: "Beklenmeyen bir hata olustu.",
    articleNotFound: "Bu haber bulunamadi ya da henuz yayinlanmadi.",
    languageLabel: "Dil",
    authorsTitle: "Yazarlar",
    authorsIntro:
      "Bu bolumde haftalik olarak saglik, egitim, sosyal guvenlik ve toplumsal hayat alanlarinda uzman yazilar yayinlanir.",
    videosTitle: "Videolar",
    videosIntro:
      "Komik videolar, roportajlar ve okuyuculardan gelen seckiler icin hazirlanan video vitrini.",
    weeklyColumn: "Haftalik Kose",
    expertiseLabel: "Uzmanlik Alani",
    videoDuration: "Sure",
    categories: {
      ALL: "Tum Kategoriler",
      AGENDA: "Gundem",
      GERMANY: "Almanya",
      EUROPE: "Avrupa",
      ECONOMY: "Ekonomi",
      HEALTH: "Saglik",
      EDUCATION: "Egitim",
      SOCIAL_SECURITY: "Sosyal Guvenlik",
      SPORTS: "Spor"
    }
  },
  de: {
    eyebrow: "Digitale Zeitung Fuer Menschen In Europa",
    heroCopy:
      "Eine Nachrichtenplattform, die vor allem fuer in Deutschland und Europa lebende Menschen aktuelle Entwicklungen, gesellschaftliche Themen und den Alltag leichter zugaenglich macht.",
    badges: ["Aktuelle Nachrichten", "Deutsch Und Turkisch", "Mobil Optimiert"],
    featuredStory: "Titelgeschichte",
    editorialFocus: "Redaktioneller Fokus",
    latestHeadlines: "Aktuelle Schlagzeilen",
    focusItems: [
      "Aktuelle Themen aus Deutschland und Europa",
      "Wirtschaft, Alltag und Arbeitsleben",
      "Bildung, Gesundheit und soziale Rechte",
      "Analysen fuer die Diaspora in Europa"
    ],
    miniNote:
      "Diese erste Version liest veroeffentlichte Inhalte direkt aus der Backend-API.",
    source: "Quelle",
    openEditor: "Editor",
    openAuthors: "Autorinnen Und Autoren",
    openVideos: "Videos",
    readArticle: "Artikel Oeffnen",
    backToHome: "Zur Startseite",
    backToNews: "Zurueck Zu Den Nachrichten",
    noDate: "Kein Datum",
    loadingArticles: "Artikel werden geladen...",
    loadingHeadlines: "Schlagzeilen werden vorbereitet...",
    loadingArticleDetail: "Artikel wird geladen...",
    editorTitle: "Neuen Artikel Erstellen",
    editorIntro:
      "Hier kannst du tuerkische und deutsche Inhalte eingeben, bestehende Entwuerfe bearbeiten oder loeschen.",
    formTitleTr: "Titel (TR)",
    formTitleDe: "Titel (DE)",
    formSummaryTr: "Zusammenfassung (TR)",
    formSummaryDe: "Zusammenfassung (DE)",
    formContentTr: "Inhalt (TR)",
    formContentDe: "Inhalt (DE)",
    formSourceName: "Quellenname",
    formSourceUrl: "Quellenlink",
    formCategory: "Kategorie",
    submitArticle: "Entwurf Speichern",
    updateArticle: "Aenderungen Speichern",
    submitPending: "Wird gespeichert...",
    submitSuccess: "Entwurf gespeichert. Er kann jetzt veroeffentlicht werden.",
    updateSuccess: "Entwurf wurde aktualisiert.",
    submitError: "Artikel konnte nicht gespeichert werden.",
    draftsTitle: "Entwuerfe",
    noDrafts: "Noch keine Entwuerfe vorhanden.",
    publishArticle: "Veroeffentlichen",
    publishPending: "Wird veroeffentlicht...",
    publishSuccess: "Artikel wurde veroeffentlicht.",
    publishError: "Artikel konnte nicht veroeffentlicht werden.",
    editArticle: "Bearbeiten",
    deleteArticle: "Loeschen",
    deletePending: "Wird geloescht...",
    deleteSuccess: "Entwurf wurde geloescht.",
    deleteError: "Entwurf konnte nicht geloescht werden.",
    noPublishedArticles:
      "Noch keine veroeffentlichten Artikel. Veroeffentliche zuerst einen Artikel im Backend.",
    onlyOneArticle: "Zurzeit ist nur ein veroeffentlichter Artikel verfuegbar.",
    fallbackError: "Ein unerwarteter Fehler ist aufgetreten.",
    articleNotFound: "Dieser Artikel wurde nicht gefunden oder ist noch nicht veroeffentlicht.",
    languageLabel: "Sprache",
    authorsTitle: "Autorinnen Und Autoren",
    authorsIntro:
      "In diesem Bereich erscheinen woechentliche Fachbeitraege zu Gesundheit, Bildung, sozialer Sicherheit und gesellschaftlichem Leben.",
    videosTitle: "Videos",
    videosIntro:
      "Eine kuratierte Videoauswahl mit lustigen Clips, Interviews und Einsendungen aus der Community.",
    weeklyColumn: "Woechentliche Kolumne",
    expertiseLabel: "Fachgebiet",
    videoDuration: "Dauer",
    categories: {
      ALL: "Alle Kategorien",
      AGENDA: "Aktuelles",
      GERMANY: "Deutschland",
      EUROPE: "Europa",
      ECONOMY: "Wirtschaft",
      HEALTH: "Gesundheit",
      EDUCATION: "Bildung",
      SOCIAL_SECURITY: "Soziale Sicherheit",
      SPORTS: "Sport"
    }
  }
};

const categoryOrder = [
  "AGENDA",
  "GERMANY",
  "EUROPE",
  "ECONOMY",
  "HEALTH",
  "EDUCATION",
  "SOCIAL_SECURITY",
  "SPORTS"
];

const emptyFormState = {
  id: "",
  category: "AGENDA",
  titleTr: "",
  titleDe: "",
  summaryTr: "",
  summaryDe: "",
  contentTr: "",
  contentDe: "",
  sourceName: "",
  sourceUrl: ""
};

const authors = [
  {
    slug: "aylin-demir",
    name: "Dr. Aylin Demir",
    titleTr: "Saglik Yazari",
    titleDe: "Gesundheitskolumnistin",
    expertiseTr: "Kadin sagligi, koruyucu tip ve aile sagligi",
    expertiseDe: "Frauengesundheit, Praevention und Familiengesundheit",
    bioTr:
      "Haftalik saglik yazilarinda gunluk yasami etkileyen tibbi konulari sade ve guvenilir bir dille anlatiyor.",
    bioDe:
      "In ihren woechentlichen Gesundheitsbeitraegen erklaert sie medizinische Themen alltagsnah und verstaendlich."
  },
  {
    slug: "mehmet-kaya",
    name: "Mehmet Kaya",
    titleTr: "Sosyal Guvenlik Uzmani",
    titleDe: "Experte fuer soziale Sicherheit",
    expertiseTr: "Emeklilik, sigorta sistemleri ve sosyal haklar",
    expertiseDe: "Rente, Versicherungssysteme und soziale Rechte",
    bioTr:
      "Almanya'daki sosyal guvenlik sistemi, emeklilik haklari ve resmi basvuru sureclerini haftalik olarak degerlendiriyor.",
    bioDe:
      "Er beleuchtet jede Woche das deutsche Sozialversicherungssystem, Rentenansprueche und behoerdliche Verfahren."
  },
  {
    slug: "selin-arslan",
    name: "Selin Arslan",
    titleTr: "Egitim ve Kariyer Yazari",
    titleDe: "Kolumnistin fuer Bildung und Karriere",
    expertiseTr: "Denklik, meslek egitimi ve kariyer planlamasi",
    expertiseDe: "Anerkennung, Berufsausbildung und Karriereplanung",
    bioTr:
      "Avrupa'da egitim firsatlari ve mesleki gelisim yollarini gencler ve aileler icin yorumluyor.",
    bioDe:
      "Sie schreibt ueber Bildungswege und berufliche Chancen in Europa fuer junge Menschen und Familien."
  }
];

const videos = [
  {
    slug: "berlin-sokak-roportaji",
    titleTr: "Berlin'de sokak roportaji",
    titleDe: "Strasseninterview in Berlin",
    categoryTr: "Roportajlar",
    categoryDe: "Interviews",
    summaryTr:
      "Berlin'de yasayan Turklerle gundelik hayat, ekonomi ve uyum deneyimleri uzerine kisa bir sokak roportaji.",
    summaryDe:
      "Ein kurzes Strasseninterview mit in Berlin lebenden Tuerkinnen und Tuerken ueber Alltag, Wirtschaft und Integration.",
    source: "Avrupapulse Video",
    duration: "08:40"
  },
  {
    slug: "haftanin-komik-videosu",
    titleTr: "Haftanin komik videosu",
    titleDe: "Das lustige Video der Woche",
    categoryTr: "Komik Videolar",
    categoryDe: "Lustige Videos",
    summaryTr:
      "Haftanin dikkat ceken eglenceli anlari ve sosyal medyada konusulan kisa video secmeleri.",
    summaryDe:
      "Eine Auswahl unterhaltsamer Momente der Woche und kurzer Videos, ueber die in den sozialen Medien gesprochen wird.",
    source: "Topluluk Seckisi",
    duration: "03:15"
  },
  {
    slug: "okuyucudan-gelen-video",
    titleTr: "Okuyucudan gelen video",
    titleDe: "Video aus der Community",
    categoryTr: "Okuyucudan Gelenler",
    categoryDe: "Aus der Community",
    summaryTr:
      "Okuyucularin gonderdigi, toplumsal hayati ve gundelik deneyimleri gosteren secilmis videolar.",
    summaryDe:
      "Ausgewaehlte Videos aus der Community, die gesellschaftliches Leben und alltaegliche Erfahrungen zeigen.",
    source: "Okuyucu Gonderisi",
    duration: "05:05"
  }
];

function formatDate(value, language) {
  if (!value) {
    return copyByLanguage[language].noDate;
  }

  return new Intl.DateTimeFormat(language === "de" ? "de-DE" : "tr-TR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(new Date(value));
}

function getLocalizedArticleContent(article, language) {
  if (language === "de") {
    return {
      title: article.titleDe || article.titleTr,
      summary: article.summaryDe || article.summaryTr,
      content: article.contentDe || article.contentTr || article.summaryDe || article.summaryTr
    };
  }

  return {
    title: article.titleTr || article.titleDe,
    summary: article.summaryTr || article.summaryDe,
    content: article.contentTr || article.contentDe || article.summaryTr || article.summaryDe
  };
}

function getRoute() {
  const path = window.location.pathname.replace(/\/+$/, "");

  if (path === "/admin/new") {
    return {
      page: "admin",
      articleId: null
    };
  }

  if (path === "/authors") {
    return {
      page: "authors",
      articleId: null
    };
  }

  if (path === "/videos") {
    return {
      page: "videos",
      articleId: null
    };
  }

  if (path.startsWith("/sections/")) {
    return {
      page: "home",
      articleId: null,
      category: path.split("/").pop()
    };
  }

  if (path.startsWith("/articles/")) {
    return {
      page: "detail",
      articleId: path.split("/").pop()
    };
  }

  return {
    page: "home",
    articleId: null,
    category: "ALL"
  };
}

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState("tr");
  const [route, setRoute] = useState(getRoute);
  const [formState, setFormState] = useState(emptyFormState);
  const [submitState, setSubmitState] = useState({
    loading: false,
    error: "",
    success: "",
    createdId: ""
  });
  const [drafts, setDrafts] = useState([]);
  const [draftState, setDraftState] = useState({
    loading: false,
    error: "",
    success: "",
    publishingId: "",
    deletingId: ""
  });
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  useEffect(() => {
    function handlePopState() {
      setRoute(getRoute());
    }

    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (route.page === "home") {
      setSelectedCategory(route.category || "ALL");
    }
  }, [route]);

  useEffect(() => {
    async function loadContent() {
      setLoading(true);
      setError("");

      try {
        if (route.page === "detail" && route.articleId) {
          const article = await getPublishedArticle(route.articleId);
          setSelectedArticle(article);
          setArticles([]);
        } else if (route.page === "admin") {
          setSelectedArticle(null);
          setArticles([]);
          const draftData = await getDraftArticles();
          setDrafts(Array.isArray(draftData) ? draftData : []);
        } else {
          const data = await getPublishedArticles();
          setArticles(Array.isArray(data) ? data : []);
          setSelectedArticle(null);
        }
      } catch (loadError) {
        setError(loadError.message || copyByLanguage[language].fallbackError);
      } finally {
        setLoading(false);
      }
    }

    loadContent();
  }, [language, route]);

  function navigateTo(path) {
    window.history.pushState({}, "", path);
    setRoute(getRoute());
  }

  function navigateToCategory(category) {
    navigateTo(category === "ALL" ? "/" : `/sections/${category}`);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormState((current) => ({
      ...current,
      [name]: value
    }));
  }

  async function refreshDrafts() {
    const draftData = await getDraftArticles();
    setDrafts(Array.isArray(draftData) ? draftData : []);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitState({
      loading: true,
      error: "",
      success: "",
      createdId: ""
    });

    try {
      const payload = {
        category: formState.category,
        titleTr: formState.titleTr,
        titleDe: formState.titleDe,
        summaryTr: formState.summaryTr,
        summaryDe: formState.summaryDe,
        contentTr: formState.contentTr,
        contentDe: formState.contentDe,
        sourceName: formState.sourceName,
        sourceUrl: formState.sourceUrl
      };

      const savedArticle = formState.id
        ? await updateArticle(formState.id, payload)
        : await createArticle(payload);

      await refreshDrafts();
      setSubmitState({
        loading: false,
        error: "",
        success: formState.id ? copy.updateSuccess : copy.submitSuccess,
        createdId: savedArticle.id
      });
      setFormState(emptyFormState);
    } catch (submitError) {
      setSubmitState({
        loading: false,
        error: submitError.message || copy.submitError,
        success: "",
        createdId: ""
      });
    }
  }

  async function handlePublish(id) {
    setDraftState({
      loading: true,
      error: "",
      success: "",
      publishingId: id,
      deletingId: ""
    });

    try {
      await publishArticle(id);
      await refreshDrafts();
      setDraftState({
        loading: false,
        error: "",
        success: copy.publishSuccess,
        publishingId: "",
        deletingId: ""
      });
    } catch (publishError) {
      setDraftState({
        loading: false,
        error: publishError.message || copy.publishError,
        success: "",
        publishingId: "",
        deletingId: ""
      });
    }
  }

  function handleEdit(draft) {
    setSubmitState({
      loading: false,
      error: "",
      success: "",
      createdId: ""
    });

    setFormState({
      id: draft.id,
      category: draft.category || "AGENDA",
      titleTr: draft.titleTr || "",
      titleDe: draft.titleDe || "",
      summaryTr: draft.summaryTr || "",
      summaryDe: draft.summaryDe || "",
      contentTr: draft.contentTr || "",
      contentDe: draft.contentDe || "",
      sourceName: draft.sourceName || "",
      sourceUrl: draft.sourceUrl || ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(id) {
    setDraftState({
      loading: true,
      error: "",
      success: "",
      publishingId: "",
      deletingId: id
    });

    try {
      await deleteArticle(id);
      await refreshDrafts();
      setFormState((current) => (current.id === id ? emptyFormState : current));
      setDraftState({
        loading: false,
        error: "",
        success: copy.deleteSuccess,
        publishingId: "",
        deletingId: ""
      });
    } catch (deleteError) {
      setDraftState({
        loading: false,
        error: deleteError.message || copy.deleteError,
        success: "",
        publishingId: "",
        deletingId: ""
      });
    }
  }

  const copy = copyByLanguage[language];
  const filteredArticles =
    selectedCategory === "ALL"
      ? articles
      : articles.filter((article) => article.category === selectedCategory);
  const featuredArticle = filteredArticles[0];
  const latestArticles = filteredArticles.slice(1);
  const featuredContent = featuredArticle
    ? getLocalizedArticleContent(featuredArticle, language)
    : null;
  const detailedContent = selectedArticle
    ? getLocalizedArticleContent(selectedArticle, language)
    : null;

  return (
    <div className="page-shell">
      <div className="page-glow page-glow-left" />
      <div className="page-glow page-glow-right" />

      <header className="hero">
        <div className="hero-topbar">
          <div className="eyebrow">{copy.eyebrow}</div>
          <div className="language-switcher" aria-label={copy.languageLabel}>
            <button
              className={language === "tr" ? "language-button active" : "language-button"}
              onClick={() => setLanguage("tr")}
              type="button"
            >
              TR
            </button>
            <button
              className={language === "de" ? "language-button active" : "language-button"}
              onClick={() => setLanguage("de")}
              type="button"
            >
              DE
            </button>
          </div>
        </div>
        <h1>Avrupapulse</h1>
        <p className="hero-copy">{copy.heroCopy}</p>
        <div className="hero-meta">
          {copy.badges.map((badge) => (
            <span key={badge}>{badge}</span>
          ))}
          <button className="nav-pill" onClick={() => navigateTo("/videos")} type="button">
            {copy.openVideos}
          </button>
          <button className="nav-pill" onClick={() => navigateTo("/authors")} type="button">
            {copy.openAuthors}
          </button>
          <button className="nav-pill" onClick={() => navigateTo("/admin/new")} type="button">
            {copy.openEditor}
          </button>
        </div>
        <nav className="main-nav" aria-label="Main navigation">
          {categoryOrder.map((category) => (
            <button
              className={selectedCategory === category ? "main-nav-link active" : "main-nav-link"}
              key={category}
              onClick={() => navigateToCategory(category)}
              type="button"
            >
              {copy.categories[category]}
            </button>
          ))}
        </nav>
      </header>

      {route.page === "videos" ? (
        <main className="detail-layout">
          <section className="panel panel-detail">
            <button className="back-link" onClick={() => navigateTo("/")} type="button">
              {copy.backToHome}
            </button>
            <div className="section-label">{copy.videosTitle}</div>
            <h2 className="editor-title">{copy.videosTitle}</h2>
            <p className="editor-intro">{copy.videosIntro}</p>

            <div className="author-grid">
              {videos.map((video) => (
                <article className="author-card" key={video.slug}>
                  <div className="author-badge">
                    {language === "de" ? video.categoryDe : video.categoryTr}
                  </div>
                  <h3>{language === "de" ? video.titleDe : video.titleTr}</h3>
                  <p className="story-source">{video.source}</p>
                  <p className="author-bio">
                    {language === "de" ? video.summaryDe : video.summaryTr}
                  </p>
                  <div className="mini-note">
                    <strong>{copy.videoDuration}: </strong>
                    {video.duration}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      ) : route.page === "authors" ? (
        <main className="detail-layout">
          <section className="panel panel-detail">
            <button className="back-link" onClick={() => navigateTo("/")} type="button">
              {copy.backToHome}
            </button>
            <div className="section-label">{copy.authorsTitle}</div>
            <h2 className="editor-title">{copy.authorsTitle}</h2>
            <p className="editor-intro">{copy.authorsIntro}</p>

            <div className="author-grid">
              {authors.map((author) => (
                <article className="author-card" key={author.slug}>
                  <div className="author-badge">{copy.weeklyColumn}</div>
                  <h3>{author.name}</h3>
                  <p className="story-category">
                    {language === "de" ? author.titleDe : author.titleTr}
                  </p>
                  <p className="author-bio">
                    {language === "de" ? author.bioDe : author.bioTr}
                  </p>
                  <div className="mini-note">
                    <strong>{copy.expertiseLabel}: </strong>
                    {language === "de" ? author.expertiseDe : author.expertiseTr}
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>
      ) : route.page === "admin" ? (
        <main className="detail-layout">
          <section className="panel panel-detail">
            <button className="back-link" onClick={() => navigateTo("/")} type="button">
              {copy.backToNews}
            </button>
            <div className="section-label">{copy.openEditor}</div>
            <h2 className="editor-title">{copy.editorTitle}</h2>
            <p className="editor-intro">{copy.editorIntro}</p>

            <form className="editor-form" onSubmit={handleSubmit}>
              <label className="form-field">
                <span>{copy.formCategory}</span>
                <select name="category" onChange={handleInputChange} value={formState.category} required>
                  {categoryOrder.map((category) => (
                    <option key={category} value={category}>
                      {copy.categories[category]}
                    </option>
                  ))}
                </select>
              </label>

              <label className="form-field">
                <span>{copy.formTitleTr}</span>
                <input name="titleTr" onChange={handleInputChange} value={formState.titleTr} required />
              </label>

              <label className="form-field">
                <span>{copy.formTitleDe}</span>
                <input name="titleDe" onChange={handleInputChange} value={formState.titleDe} />
              </label>

              <label className="form-field">
                <span>{copy.formSummaryTr}</span>
                <textarea name="summaryTr" onChange={handleInputChange} value={formState.summaryTr} required rows="3" />
              </label>

              <label className="form-field">
                <span>{copy.formSummaryDe}</span>
                <textarea name="summaryDe" onChange={handleInputChange} value={formState.summaryDe} rows="3" />
              </label>

              <label className="form-field">
                <span>{copy.formContentTr}</span>
                <textarea name="contentTr" onChange={handleInputChange} value={formState.contentTr} required rows="7" />
              </label>

              <label className="form-field">
                <span>{copy.formContentDe}</span>
                <textarea name="contentDe" onChange={handleInputChange} value={formState.contentDe} rows="7" />
              </label>

              <label className="form-field">
                <span>{copy.formSourceName}</span>
                <input name="sourceName" onChange={handleInputChange} value={formState.sourceName} required />
              </label>

              <label className="form-field">
                <span>{copy.formSourceUrl}</span>
                <input name="sourceUrl" onChange={handleInputChange} value={formState.sourceUrl} required />
              </label>

              <button className="submit-button" disabled={submitState.loading} type="submit">
                {submitState.loading
                  ? copy.submitPending
                  : formState.id
                    ? copy.updateArticle
                    : copy.submitArticle}
              </button>

              {submitState.success ? (
                <div className="form-message form-message-success">
                  {submitState.success}
                  {submitState.createdId ? ` ID: ${submitState.createdId}` : ""}
                </div>
              ) : null}

              {submitState.error ? (
                <div className="form-message form-message-error">{submitState.error}</div>
              ) : null}
            </form>

            <div className="drafts-section">
              <div className="section-label">{copy.draftsTitle}</div>
              {draftState.success ? (
                <div className="form-message form-message-success">{draftState.success}</div>
              ) : null}
              {draftState.error ? (
                <div className="form-message form-message-error">{draftState.error}</div>
              ) : null}
              {drafts.length > 0 ? (
                <div className="draft-list">
                  {drafts.map((draft) => {
                    const localizedDraft = getLocalizedArticleContent(draft, language);

                    return (
                      <article className="draft-card" key={draft.id}>
                        <div className="draft-copy">
                          <p className="story-source">{draft.sourceName}</p>
                          <p className="story-category">{copy.categories[draft.category] || draft.category}</p>
                          <h3>{localizedDraft.title}</h3>
                          <p>{localizedDraft.summary}</p>
                        </div>
                        <div className="draft-actions">
                          <span>{formatDate(draft.createdAt, language)}</span>
                          <div className="draft-button-group">
                            <button className="read-more-button" onClick={() => handleEdit(draft)} type="button">
                              {copy.editArticle}
                            </button>
                            <button
                              className="read-more-button danger-button"
                              disabled={draftState.loading && draftState.deletingId === draft.id}
                              onClick={() => handleDelete(draft.id)}
                              type="button"
                            >
                              {draftState.loading && draftState.deletingId === draft.id
                                ? copy.deletePending
                                : copy.deleteArticle}
                            </button>
                            <button
                              className="submit-button"
                              disabled={draftState.loading && draftState.publishingId === draft.id}
                              onClick={() => handlePublish(draft.id)}
                              type="button"
                            >
                              {draftState.loading && draftState.publishingId === draft.id
                                ? copy.publishPending
                                : copy.publishArticle}
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="state-card">{copy.noDrafts}</div>
              )}
            </div>
          </section>
        </main>
      ) : route.page === "detail" ? (
        <main className="detail-layout">
          <section className="panel panel-detail">
            <button className="back-link" onClick={() => navigateTo("/")} type="button">
              {copy.backToHome}
            </button>
            {loading ? (
              <div className="state-card">{copy.loadingArticleDetail}</div>
            ) : error ? (
              <div className="state-card state-card-error">{copy.articleNotFound}</div>
            ) : selectedArticle ? (
              <article className="detail-story">
                <p className="story-source">{selectedArticle.sourceName}</p>
                <h2>{detailedContent.title}</h2>
                <p className="detail-date">{formatDate(selectedArticle.createdAt, language)}</p>
                <p className="detail-summary">{detailedContent.summary}</p>
                <div className="detail-body">
                  {detailedContent.content.split(/\n+/).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <div className="story-footer">
                  <span>{selectedArticle.id}</span>
                  <a href={selectedArticle.sourceUrl} target="_blank" rel="noreferrer">
                    {copy.source}
                  </a>
                </div>
              </article>
            ) : (
              <div className="state-card">{copy.articleNotFound}</div>
            )}
          </section>
        </main>
      ) : (
        <main className="content-grid">
          <section className="category-strip">
            {["ALL", ...categoryOrder].map((category) => (
              <button
                className={selectedCategory === category ? "category-pill active" : "category-pill"}
                key={category}
                onClick={() => navigateToCategory(category)}
                type="button"
              >
                {copy.categories[category]}
              </button>
            ))}
          </section>

          <section className="panel panel-featured">
            <div className="section-label">{copy.featuredStory}</div>
            {loading ? (
              <div className="state-card">{copy.loadingArticles}</div>
            ) : error ? (
              <div className="state-card state-card-error">{error}</div>
            ) : featuredArticle ? (
              <article className="featured-story">
                <p className="story-source">{featuredArticle.sourceName}</p>
                <p className="story-category">{copy.categories[featuredArticle.category] || featuredArticle.category}</p>
                <h2>{featuredContent.title}</h2>
                <p className="story-summary">{featuredContent.summary}</p>
                <div className="story-footer">
                  <span>{formatDate(featuredArticle.createdAt, language)}</span>
                  <div className="story-actions">
                    <button
                      className="read-more-button"
                      onClick={() => navigateTo(`/articles/${featuredArticle.id}`)}
                      type="button"
                    >
                      {copy.readArticle}
                    </button>
                    <a href={featuredArticle.sourceUrl} target="_blank" rel="noreferrer">
                      {copy.source}
                    </a>
                  </div>
                </div>
              </article>
            ) : (
              <div className="state-card">{copy.noPublishedArticles}</div>
            )}
          </section>

          <aside className="panel panel-side">
            <div className="section-label">{copy.editorialFocus}</div>
            <ul className="focus-list">
              {copy.focusItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="mini-note">{copy.miniNote}</div>
          </aside>

          <section className="panel panel-latest">
            <div className="section-label">{copy.latestHeadlines}</div>
            {loading ? (
              <div className="state-card">{copy.loadingHeadlines}</div>
            ) : latestArticles.length > 0 ? (
              <div className="headline-list">
                {latestArticles.map((article) => (
                  <article className="headline-card" key={article.id}>
                    <p className="story-source">{article.sourceName}</p>
                    <p className="story-category">{copy.categories[article.category] || article.category}</p>
                    <h3>{getLocalizedArticleContent(article, language).title}</h3>
                    <p>{getLocalizedArticleContent(article, language).summary}</p>
                    <div className="story-footer">
                      <span>{formatDate(article.createdAt, language)}</span>
                      <div className="story-actions">
                        <button
                          className="read-more-button"
                          onClick={() => navigateTo(`/articles/${article.id}`)}
                          type="button"
                        >
                          {copy.readArticle}
                        </button>
                        <a href={article.sourceUrl} target="_blank" rel="noreferrer">
                          {copy.source}
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="state-card">{copy.onlyOneArticle}</div>
            )}
          </section>
        </main>
      )}
    </div>
  );
}

export default App;
