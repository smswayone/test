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

  // Assurez-vous que l'ID 'addToQuoteAudio' correspond à votre bouton dans le HTML
  const addToQuoteAudio = document.getElementById('addToQuoteAudio');
  if (addToQuoteAudio) {
    addToQuoteAudio.addEventListener('click', function() {
      const serviceName = "Livre d'or audio";
      let services = localStorage.getItem('services') ? JSON.parse(localStorage.getItem('services')) : [];

      if (!services.includes(serviceName)) {
        services.push(serviceName);
        localStorage.setItem('services', JSON.stringify(services));
        displayNotification(serviceName + " ajouté au devis!");
      } else {
        displayNotification(serviceName + " est déjà dans le devis!");
      }
    });
  }

  // Supposons que vous avez une fonction pour mettre à jour et afficher la liste des services sur la page
  function updateServicesList() {
    // Logique pour mettre à jour l'affichage de la liste des services
  }

  // Supposons également que vous avez une logique pour supprimer un service du devis
  function removeServiceFromQuote(index) {
    // Logique pour supprimer un service de la liste et mettre à jour le localStorage
  }
});
