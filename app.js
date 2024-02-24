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
        let currentBackdrop = localStorage.getItem('backdrop');
        if (currentBackdrop && currentBackdrop !== backdropName) {
            displayNotification(`Votre choix de backdrop a été changé pour ${backdropName}. Un seul backdrop peut être sélectionné.`);
        } else if (!currentBackdrop) {
            displayNotification(`${backdropName} a été ajouté à votre devis.`);
        }
        localStorage.setItem('backdrop', backdropName);
    }

    document.querySelectorAll('.services__card').forEach(card => {
        card.addEventListener('click', function() {
            const backdropName = this.getAttribute('data-backdrop-name');
            selectBackdrop(backdropName);
        });
    });

});
  
  function updateServicesList() {
    // Logique pour mettre à jour l'affichage de la liste des services
  }

  function removeServiceFromQuote(index) {
    // Logique pour supprimer un service de la liste et mettre à jour le localStorage
  }
});
