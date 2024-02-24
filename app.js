document.addEventListener('DOMContentLoaded', function() {
  const menu = document.querySelector('#mobile-menu');
  const menuLinks = document.querySelector('.navbar__menu');

  // Gestionnaire d'événements pour le menu
  menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
  });

  // Gestionnaire d'événements pour le scroll fluide
  document.querySelectorAll('.scroll-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth"
        });
      }
    });
  });

  // Fonction pour afficher les notifications
  function displayNotification(message) {
    const notificationElement = document.getElementById('notification');
    if (!notificationElement) {
      console.error('Élément de notification manquant dans le HTML');
      return;
    }
    notificationElement.textContent = message;
    notificationElement.style.display = 'block';
    setTimeout(() => {
      notificationElement.style.display = 'none';
    }, 5000); // La notification disparaît après 5 secondes
  }

  // Fonction générique pour ajouter un service au devis
  function addToQuote(serviceName, redirectUrl) {
    let services = localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')) : [];
    if (!services.includes(serviceName)) {
      services.push(serviceName);
      localStorage.setItem('services', JSON.stringify(services));
      displayNotification(serviceName + " ajouté au devis!");
      setTimeout(() => {
        window.location.href = redirectUrl; // Redirection après l'affichage de la notification
      }, 2000); // Attend 2 secondes avant de rediriger
    } else {
      displayNotification(serviceName + " est déjà dans le devis!");
    }
  }

  // Attachez ici les gestionnaires d'événements pour les boutons spécifiques
  // Exemple pour Photobooth
  const addToQuotePhotobooth = document.getElementById('addToQuotePhotobooth');
  if (addToQuotePhotobooth) {
    addToQuotePhotobooth.addEventListener('click', function() {
      addToQuote("Photobooth", "backdrop.html");
    });
  }

  // Gestionnaire d'événements pour "Livre d'or audio"
  const addToQuoteAudio = document.getElementById('addToQuoteAudio');
  if (addToQuoteAudio) {
    addToQuoteAudio.addEventListener('click', function() {
      addToQuote("Livre d'or audio", ""); // Remplacez "votreURLDeRedirection.html" par l'URL réelle
    });
  }
// Fonction pour ajouter un backdrop au devis, remplaçant tout choix précédent
function selectBackdrop(backdropName) {
    // Récupère le service 'backdrop' actuel, s'il existe
    let currentBackdrop = localStorage.getItem('backdrop');

    // Vérifie si un backdrop est déjà sélectionné
    if (currentBackdrop) {
        // Si le même backdrop est sélectionné, affiche une notification sans changer le choix
        if (currentBackdrop === backdropName) {
            displayNotification(backdropName + " est déjà sélectionné pour le devis.");
        } else {
            // Remplace le backdrop existant par le nouveau choix
            localStorage.setItem('backdrop', backdropName);
            displayNotification("Votre choix de backdrop a été changé pour " + backdropName + ". Un seul backdrop peut être sélectionné.");
        }
    } else {
        // Aucun backdrop n'est encore sélectionné, ajoute le choix actuel
        localStorage.setItem('backdrop', backdropName);
        displayNotification(backdropName + " a été ajouté à votre devis.");
    }
}

// Exemple d'utilisation dans un gestionnaire d'événements pour un backdrop spécifique
document.querySelectorAll('.services__card').forEach(card => {
    card.addEventListener('click', function() {
        const backdropName = this.getAttribute('data-backdrop-name'); // Assurez-vous que chaque .services__card a un attribut data-backdrop-name
        selectBackdrop(backdropName);
    });
});
  
  function updateServicesList() {
    // Logique pour mettre à jour l'affichage de la liste des services
  }

  function removeServiceFromQuote(index) {
    // Logique pour supprimer un service de la liste et mettre à jour le localStorage
  }
});
