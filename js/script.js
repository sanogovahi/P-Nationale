// ==========================================
// SCRIPT PRINCIPAL - POLICE NATIONALE
// ==========================================

// ==========================================
// RÉGLAGES PROGRAMMEUR
// ==========================================
// true  = activé
// false = désactivé
//
// Ces réglages sont uniquement dans le code.
// Aucun bouton n'est visible par le public.
// ==========================================

const SITE_DISPLAY_CONFIG = {

  // PUBLICITÉS
  adsEnabled: false,

  // BANDE D'URGENCE + SON TEXTE
  emergencyEnabled: false

};


// ==========================================
// APPLICATION DES RÉGLAGES D'AFFICHAGE
// ==========================================

function appliquerReglagesAffichage() {

  // ========================================
  // PUBLICITÉS
  // ========================================

  const publicites = document.querySelectorAll(".ad");

  publicites.forEach(pub => {

    if (SITE_DISPLAY_CONFIG.adsEnabled) {

      pub.style.setProperty(
        "display",
        "block",
        "important"
      );

    } else {

      pub.style.setProperty(
        "display",
        "none",
        "important"
      );

    }

  });


  // ========================================
  // BANDE D'URGENCE
  // ========================================

  const emergencyBanner =
    document.getElementById("emergency-banner");

  if (emergencyBanner) {

    if (SITE_DISPLAY_CONFIG.emergencyEnabled) {

      emergencyBanner.style.setProperty(
        "display",
        "block",
        "important"
      );

    } else {

      emergencyBanner.style.setProperty(
        "display",
        "none",
        "important"
      );

    }

  }

}


// ==========================================
// INITIALISATION
// ==========================================

document.addEventListener("DOMContentLoaded", async function () {

  // Appliquer immédiatement les réglages
  appliquerReglagesAffichage();


  // ========================================
  // MENU HAMBURGER
  // ========================================

  const hamburger =
    document.querySelector(".hamburger");

  const nav =
    document.querySelector("nav");

  if (hamburger && nav) {

    hamburger.addEventListener("click", function () {

      hamburger.classList.toggle("active");

      nav.classList.toggle("active");

    });

  }


  // ========================================
  // CHARGEMENT COMMISSARIATS
  // ========================================

  const commissariatsContainer =
    document.getElementById("commissariats-list");

  if (commissariatsContainer) {

    try {

      const commissariats =
        await getCommissariats();

      if (commissariats.length > 0) {

        commissariatsContainer.innerHTML =
          commissariats.map(c => `

          <div class="commissariat-item">

            <h3>${c.nom}</h3>

            <p>
              <strong>📍</strong>
              ${c.adresse}
            </p>

            <p>
              <strong>📞</strong>
              ${c.telephone}
            </p>

            <p>
              <strong>⏰</strong>
              ${c.horaires || "Non disponible"}
            </p>

          </div>

        `).join("");

      }

    } catch (error) {

      console.error(
        "Erreur chargement commissariats :",
        error
      );

    }

  }


  // ========================================
  // CHARGEMENT URGENCES
  // ========================================

  const urgencesContainer =
    document.getElementById("urgences-list");

  if (urgencesContainer) {

    try {

      const urgences =
        await getUrgences();

      if (urgences.length > 0) {

        urgencesContainer.innerHTML =
          urgences.map(u => `

          <div class="urgence-item">

            <h3>${u.nom}</h3>

            <p class="urgence-number">
              <strong>${u.numero}</strong>
            </p>

            <p>
              ${u.description || ""}
            </p>

          </div>

        `).join("");

      }

    } catch (error) {

      console.error(
        "Erreur chargement urgences :",
        error
      );

    }

  }


  // ========================================
  // CHARGEMENT ACTUALITÉS
  // ========================================

  const newsGrid =
    document.querySelector(".news-grid");

  if (
    newsGrid &&
    newsGrid.id !== "news-grid-home"
  ) {

    try {

      const actualites =
        await getActualites();

      if (actualites.length > 0) {

        newsGrid.innerHTML =
          actualites.map(a => `

          <article class="news-card">

            <div class="news-image">

              <img
                src="${a.image_url || "images/default.jpg"}"
                alt="${a.titre}"
                loading="lazy"
              >

            </div>

            <div class="news-content">

              <span class="news-date">
                ${new Date(
                  a.date_publication
                ).toLocaleDateString("fr-FR")}
              </span>

              <h3 class="news-title">
                ${a.titre}
              </h3>

              <p class="news-description">
                ${a.contenu.substring(0, 150)}...
              </p>

              <a
                href="actualite-detail.html?id=${a.id}"
                class="read-more"
              >
                Lire la suite →
              </a>

            </div>

          </article>

        `).join("");

      }

    } catch (error) {

      console.error(
        "Erreur chargement actualités :",
        error
      );

    }

  }


  // ========================================
  // FORMULAIRE CONTACT
  // ========================================

  const contactForm =
    document.getElementById("contact-form");

  if (contactForm) {

    contactForm.addEventListener(
      "submit",
      async function (e) {

        e.preventDefault();

        const formData = {

          nom:
            document.getElementById("nom").value,

          email:
            document.getElementById("email").value,

          sujet:
            document.getElementById("sujet").value,

          message:
            document.getElementById("message").value,

          telephone:
            document.getElementById("telephone")?.value || ""

        };

        try {

          const result =
            await sendContact(formData);

          if (result.id) {

            alert(
              "Message envoyé avec succès!"
            );

            contactForm.reset();

          } else {

            alert(
              "Erreur lors de l'envoi du message."
            );

          }

        } catch (error) {

          console.error(error);

          alert(
            "Erreur lors de l'envoi du message."
          );

        }

      }
    );

  }


  // ========================================
  // FORMULAIRE DÉCLARATION
  // ========================================

  const declarationForm =
    document.getElementById(
      "declaration-form"
    );

  if (declarationForm) {

    declarationForm.addEventListener(
      "submit",
      async function (e) {

        e.preventDefault();

        const formData = {

          type:
            document.getElementById("type").value,

          nom:
            document.getElementById("nom-decl").value,

          email:
            document.getElementById("email-decl").value,

          telephone:
            document.getElementById("tel-decl")?.value || "",

          description:
            document.getElementById("description").value,

          lieu:
            document.getElementById("lieu")?.value || "",

          date_incident:
            document.getElementById(
              "date-incident"
            )?.value || null

        };

        try {

          const result =
            await sendDeclaration(formData);

          if (result.id) {

            alert(
              `Déclaration enregistrée! Numéro de dossier: ${result.id}`
            );

            declarationForm.reset();

          } else {

            alert(
              "Erreur lors de l'enregistrement."
            );

          }

        } catch (error) {

          console.error(error);

          alert(
            "Erreur lors de l'enregistrement."
          );

        }

      }
    );

  }


  // ========================================
  // RECHERCHE COMMISSARIATS
  // ========================================

  const searchButton =
    document.querySelector(".search-button");

  const searchInput =
    document.querySelector(".search-input");

  const resultsSection =
    document.getElementById("results");

  if (
    searchButton &&
    searchInput &&
    resultsSection
  ) {

    searchButton.addEventListener(
      "click",
      async function () {

        const query =
          searchInput.value.trim();

        if (!query) return;

        try {

          const results =
            await searchCommissariats(query);

          if (results.length > 0) {

            resultsSection.innerHTML =
              results.map(c => `

              <div class="commissariat-item">

                <h3>${c.nom}</h3>

                <p>
                  <strong>📍</strong>
                  ${c.adresse}
                </p>

                <p>
                  <strong>📞</strong>
                  ${c.telephone}
                </p>

                <p>
                  <strong>⏰</strong>
                  ${c.horaires || "Non disponible"}
                </p>

              </div>

            `).join("");

          } else {

            resultsSection.innerHTML =
              "<p>Aucun résultat trouvé.</p>";

          }

          resultsSection.style.display = "block";

          resultsSection.scrollIntoView({
            behavior: "smooth"
          });

        } catch (error) {

          console.error(error);

          resultsSection.innerHTML =
            "<p>Erreur lors de la recherche.</p>";

          resultsSection.style.display =
            "block";

        }

      }
    );

  }


  // ========================================
  // CAROUSELS PUBLICITÉS
  // ========================================

  function createCarousel(containerId) {

    const container =
      document.getElementById(containerId);

    if (!container) return;

    const track =
      container.querySelector(".ad-track");

    const slides =
      container.querySelectorAll(".ad-slide");

    if (
      !track ||
      slides.length === 0
    ) {
      return;
    }

    let index = 0;

    let interval = null;


    function move() {

      index =
        (index + 1) %
        slides.length;

      track.style.transform =
        `translateX(-${index * 100}%)`;

    }


    function start() {

      if (interval) {
        clearInterval(interval);
      }

      interval =
        setInterval(move, 3000);

    }


    function stop() {

      if (interval) {

        clearInterval(interval);

        interval = null;

      }

    }


    container.addEventListener(
      "mouseenter",
      stop
    );

    container.addEventListener(
      "mouseleave",
      start
    );


    start();

  }


  // Les carousels ne sont démarrés
  // que si les publicités sont activées.

  if (SITE_DISPLAY_CONFIG.adsEnabled) {

    createCarousel("adLeft");

    createCarousel("adRight");

  }

});