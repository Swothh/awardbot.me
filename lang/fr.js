module.exports = {
  overview: require("../locales.config.js")["fr"],
  navbar: {
    home: "Accueil",
    dashboard: "Tableau de bord",
    discover: "Découvrir",
    partners: "Les partenaires",
    team: "Équipe",
    support: "Serveur d'assistance",
    invite: "Inviter un bot",
    login: "Connexion",
  },
  footer: {
    rights: "Tous les droits sont réservés.",
    description:
      "Le meilleur bot cadeau sur Discord. Améliorez organiquement vos comptes de médias sociaux en créant des cadeaux.",
    menus: {
      first: {
        title: "Important",
        items: {
          home: "Accueil",
          dashboard: "Tableau de bord",
          support: "Serveur d'assistance",
          add: "Ajouter un bot",
        },
      },
      second: {
        title: "Award",
        items: {
          partners: "Les partenaires",
          team: "Équipe",
        },
      },
      third: {
        title: "Company",
        items: {
          tos: "Conditions d'utilisation",
          privacy: "Politique de confidentialité",
        },
      },
    },
    developedWith: "Développé avec ❤️ par clqu & Swôth.",
    allServices: "Tous les services sont en ligne.",
    someServices: "Certains services sont en panne.",
  },
  index: {
    title: "Le meilleur bot giveaway sur Discord.",
    description:
      "En créant des cadeaux avancés avec Award, vous pouvez améliorer vos comptes de médias sociaux et gagner en visibilité organique !",
    buttons: {
      dashboard: "Tableau de bord",
      support: "Serveur d'assistance",
      with_discord: "Se connecter avec Discord",
    },
    features: {
      title: 'Pourquoi <span class="text-amber-500 font-bold">Award</span>',
      description: 'Vous pouvez améliorer vos comptes de médias sociaux et obtenir une augmentation organique en créant des tirages au sort avancés avec Award!',
      buttonText: 'Ajouter au Discord',
      items: [
          { icon: 'fal fa-star', title: 'Créer facilement un cadeau conditionnel', description: "Vous pouvez avoir les membres de vos rêves en peu de temps. Vous pouvez obtenir une augmentation organique en ouvrant des tirages au sort conditionnels en suivant vos comptes de médias sociaux tels que youtube, twitch, tiktok sur Award. Pourquoi ne pas essayer d'ouvrir une tombola pour plus d'informations ?"},
          { icon: 'fal fa-star', title: 'Créez vos propres cadeaux', description: 'Vous pouvez rapidement ajouter le bot au serveur et créer et personnaliser votre propre tirage sur le site.Vous pouvez vérifier qui a participé au tirage en détail via le tableau de bord.' },
          { icon: 'fal fa-star', title: 'Découvrez les cadeaux', description: 'Vous pouvez participer au tirage au sort selon vous dans la section Découvrir et gagner des prix, et vous pouvez voir le temps restant et des informations détaillées sur le panneau.' },
          { icon: 'fal fa-star', title: 'Se sentir spécial', description: 'En achetant Boost, vous pouvez tirer plus de 20 tirages simultanés sur votre serveur, cependant, vous pouvez répéter et intégrer 20 fois sur un tirage. Vous pouvez le sécuriser en ajoutant un mot de passe à votre tirage au sort.' }
      ]
  },
  advanced: [
      { placement: "left", imageUrl: 'https://i.imgur.com/YY3hwTn.png', title: 'Développez vos comptes', description: 'Avec Award, vous pouvez développer vos comptes de manière organique.'},
      { placement: "right", imageUrl: 'https://i.imgur.com/5X0ha3F.png', title: 'Verrouillez vos tirages au sort', description: 'Chiffrez vos tirages au sort en privé avec le système de verrouillage de Award.' },
      { placement: "left", imageUrl: 'https://i.imgur.com/RPomYws.png', title: "Développez votre serveur.", description: "Vous pouvez développer vos serveurs en ajoutant une condition d'invitation à leurs cadeaux." }
  ],
    statistics: {
      chosen: 'Choisi par <span class="text-amber-500">{server_count}</span> guildes',
      labels: {
        guilds: "Guildes",
        members: "Membres",
        giveaways: "Cadeaux",
        joins: "Jointures",
      },
    },
  },
  discover: {
    title: "Découvrir",
    description:
      "Découvrez les cadeaux publics ici et participez aux cadeaux pour trouver et gagner le prix dont vous avez besoin !",
    searchInput: "Recherche par cadeaux, titre, nom de serveur, etc.",
    settings: {
      title: "Réglages",
      description: "Le cadeau sont les paramètres de tri.",
      amount: {
        title: "Montant",
        description:
          "Vous permet de modifier le nombre de cadeaux à répertorier.",
      },
      sort: {
        title: "Sorte",
        miniNote: "tri par prix",
        description: "Vous permet de modifier l'ordre de la liste.",
      },
    },
    az: "(A-Z) Alphabétique",
    za: "(Z-A) Alphabétique",
    noreq: "Aucune exigence",
    reqs: "Exigences",
  },
  spotify: {
      not: "Je n'écoute rien sur Spotify.",
      current: 'En écoute sur Spotify.'
    },
  team: {
    title: "Dites bonjour aux héros !",
    description:
      "Vous pouvez trouver tous ceux qui travaillent et contribuent <br> à Award. Un grand merci à notre équipe. <3",
    linkcordLang: "en",
    noWidget: "Aucun widget",
    roles: {
      Founder: "Fondateur",
      "Co-fondateur": "Co-Co-fondateur",
      "Gestionnaire de communauté": "Gestionnaire de communauté",
      Developer: "Développeur",
      Designer: "Désigner",
      Moderator: "Modérateur",
    },
  },
  create: {
    title: "Créez un cadeau!",
    description: "Distribuez des cadeaux à vos membres en créant un cadeau !",
    inputs: {
      title: {
        title: "Titre",
        description: "Entrez le titre de votre cadeau",
      },
      description: {
        title: "La description",
        description: "Entrez la description de votre cadeau",
      },
      prize: {
        title: "Prix",
        description: "Entrez votre cadeau",
      },
      enddate: {
        title: "Date de fin",
        description: "Entrez la date de fin du cadeau",
      },
      winners: {
        title: "Winners Le nombre de gagnants",
        description: "Entrez le décompte des gagnants",
      },
      channel: {
        title: "Salon",
        description: "Le message cadeau sera envoyé dans ce salon",
      },
      requirements: {
        title: "Exigences",
        description:
          "Une fois que vos membres remplissent les conditions que vous avez définies, ils pourront participer au cadeau",
      },
      role: {
        title: "Rôle requis",
        description:
          "Sélectionnez le rôle discord qui peut participer au cadeau.",
      },
      invite: {
        title: "Nombre d'invitations requis",
        description: "Déterminez le nombre d'invitations requises pour participer au tirage. (Ex : 3)"
      },
      presentation: {
        title: "Présentation",
        description:
          "Si vous sélectionnez 'Privé', votre cadeau n'apparaîtra pas dans Découvrir, mais si vous sélectionnez 'Public', votre cadeau apparaîtra dans la découverte.",
      },
    },
    button: "Soumettre",
    presentationPrivate: "Privé",
    presentationPublic: "Public",
    requirementsDropdownText:
      "Vous cherchez plus d'options ? Recherchez vos connexions.",
    presentationTippy: "Réglage important",
    unReachTippy:
      "C'est votre droit d'ouvrir un cadeau. Vous avez le droit d'ouvrir {MORE} plus de cadeaux.",
    reachTippy: "Vous avez atteint votre limite de cadeau.",
    reachedText:
      'Vous avez atteint la limite des cadeaux.<br /> <span class="text-amber-400/50 ml-1 hover:underline cursor-pointer"><i class="fad fa-diamond"></i > Boost</span> le serveur à plus de limite.',
  },
  user: {
    profile: {
      giveaways: {
        title: "{USER} a rejoint les cadeaux",
      },
    },
    dropdown: {
      profile: "Profil",
      guilds: "Guildes",
      connections: "Connexions",
      panel: "Panneau",
      redeem: "Racheter",
      logout: "Se déconnecter",
      _profile: "Consultez votre profil !",
      _guilds: "Sélectionnez un serveur!",
      _connections: "Gérez vos connexions !",
      _panel: "Très, très secrète :)",
      _redeem: "Utilisez le code promotionnel !",
      _logout: "Terminez la session du site !",
    },
    connections: {
      title: "Connexions",
      description:
        "Vous pouvez gérer les comptes de médias sociaux sur Award ici.",
      button: {
        logout: "Cliquez pour vous déconnecter",
        connect: "Connectez-vous à <b>{PROVIDER}</b>",
        connectMini: "Cliquez pour vous connecter",
        logged: "Connecté en tant que <b>{ACCOUNT}</b>",
      },
    },
    redeem: {
      title: "Racheter",
      description: "Vous pouvez échanger votre code ici !",
      inputPlaceholder: "Votre code cadeau ici",
      button: "Racheter",
      didntWork: "Le code n'a pas fonctionné ?",
      success: "🎉 Félicitations ! {COUNT} boosts ajoutés à votre compte !",
    },
  },
  dashboard: {
    selectServer: {
      title: "Sélectionnez le serveur",
      description:
        "Si votre serveur n'est pas là, <u>connectez-vous</u> à nouveau !",
      serverUnderText: "Cliquez pour sélectionner!",
      buttons: {
        manage: "Faire en sorte",
        add: "Bot de configuration",
      },
    },
    stats: {
      total: "Total des cadeaux",
      active: "Cadeaux actifs",
      activeTippy: "Boostez pour augmenter la limite !",
      ended: "Cadeaux terminés",
      participants: "Participants totaux",
    },
    auditLog: {
      title: "Journal d'audit",
      description:
        "Le journal d'audit des modifications apportées à Award sur ce serveur peut être consulté ici.",
      table: {
        user: "Utilisateur",
        date: "Date",
        action: "Action",
        message: "Message",
      },
      boost: "Boosté le serveur.",
      unboost: "Déboosté le serveur.",
      giveaway_delete: "Supprimé un cadeau.",
      giveaway_create: "A commencé un cadeau.",
      giveaway_finish: "Giveaway un fini.",
      giveaway_join: "A rejoint le cadeau.",
      giveawaY_reroll: "Relancer un cadeau.",
    },
  },
};
