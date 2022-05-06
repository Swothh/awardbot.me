module.exports = {
  overview: require("../locales.config.js")["tr"],
  navbar: {
    home: 'Ana sayfa',
    dashboard: 'Yönetim Paneli',
    discover: 'Keşfet',
    partners: 'Ortaklar',
    team: 'Ekip',
    support: 'Destek Sunucusu',
    invite: 'Botu Davet Et',
    login: 'Giriş yap'
  },
  footer: {
    rights: 'Tüm hakları saklıdır.',
    description: 'Discord\'daki en iyi çekiliş botu. Çekilişler oluşturarak sosyal medya hesaplarınızı organik olarak iyileştirin. senin elinde...',
    menus: {
      first: {
        title: 'Önemli',
        items: {
          home: 'Ana Sayfa',
          dashboard: 'Yönetim Paneli',
          support: 'Destek Sunucusu',
          add: 'Botu davet et'
        }
      },
      second: {
        title: 'Award',
        items: {
          partners: 'Ortaklar',
          team: 'Ekip'
        }
      },
      third: {
        title: 'Şirket',
        items: {
          tos: 'Kullanım Koşulları',
          privacy: 'Gizlilik Politikası'
        }
      },
    },
    developedWith: 'clqu & Swôth tarafından ❤️ ile geliştirildi.',
    allServices: 'Tüm hizmetler çalışıyor.',
    someServices: 'Bazı hizmetler çalışmıyor.'
  },
  index: {
    title: 'Discord\'daki en iyi çekiliş botu!',
    description: 'Award ile gelişmiş çekilişler oluşturarak sosyal medya hesaplarınızı iyileştirebilir ve organik artış elde edebilirsiniz!',
    buttons: {
      dashboard: 'Yönetim Paneli',
      support: 'Destek Sunucusu',
      with_discord: 'Discord ile devam et'
    },
    features: {
      title: 'Neden <span class="text-amber-500 font-bold">Award</span>',
      description: 'Award ile gelişmiş çekilişler oluşturarak sosyal medya hesaplarınızı iyileştirebilir ve organik artış elde edebilirsiniz!',
      buttonText: 'Discord\'a ekle',
      items: [
        { icon: 'fal fa-star', title: 'Kolayca Şartlı Çekiliş Oluşturun', description: 'Hayallerinizdeki üyelere kısa bir sürede sahip olabilirsiniz.Award üzerinden youtube,twitch,tiktok gibi sosyal medya hesaplarınızı takip şartlı çekilişler açarak organik artış elde edebilirsiniz.Daha fazla bilgi için neden bir tane çekiliş açmayı denemiyorsun ki?' },
        { icon: 'fal fa-star', title: 'Kendi Çekişinizi Oluşturun', description: 'Hızlıca botu sunucuna eklerek site üzerinden kendi çekişinizi oluşturabilir özelleştirebilirsiniz.Detaylı olarak çekilişe kimin katıldığını Gösterge paneli üzerinden kontrol edebilirsiniz. '},
        { icon: 'fal fa-star', title: 'Çekilişleri Keşfedin', description: 'Keşfet kısmından kendinize göre olan çekilişlere katılabilir ve ödüller kazanabilir ve bitmesine kalan süreyi ve detaylı bilgileri panel üstünden görebilirsiniz.' },
        { icon: 'fal fa-star', title: 'Kendinizi özel hissedin', description: 'Boost satın alarak sunucunuzda 20 dan fazla aynı anda çekiliş yapabilir bununla birlikte bir çekiliş üzerinde 20 kere tekrarlayabilir ve embed düzenliyebilirsiniz. çekilişerinize şifre ekleyerek güvenli bir hale getirebilirsiniz.' }
      ]
    },
    advanced: [
      { placement: "left", imageUrl: 'https://i.imgur.com/YY3hwTn.png', title: 'Hesaplarınızı büyütün', description: 'Award ile hesaplarınızı organik olarak geliştirin ve büyütün.' },
      { placement: "right", imageUrl: 'https://i.imgur.com/5X0ha3F.png', title: 'Çekilişlerinizi kilitleyin', description: 'Award\'in kilit sistemiyle çekilişlerinizi özel olarak şifreleyin.' },
      { placement: "left", imageUrl: 'https://i.imgur.com/RPomYws.png', title: 'Sunucunuzu büyütün', description: "Çekilişlerine davetiye şartı ekleyerek sunucularınızı daha hızlı büyütebilirsiniz." },
    ],
    statistics: {
      chosen: '<span class="text-amber-500">{server_count}</span> sunucu tarafından seçildi',
      labels: {
        guilds: 'Sunucu',
        members: 'Üye',
        giveaways: 'Çekiliş',
        joins: 'Katılımcı'
      }
    }
  },
  discover: {
    title: 'Keşfet',
    description: 'Herkese açık çekilişleri burada keşfedin ve ihtiyacınız olan ödülü bulmak ve kazanmak için çekilişlere katılın!',
    searchInput: 'Ödül, başlık, sunucu adı vb. ile arama yapın.',
    settings: {
      title: 'Ayarlar',
      description: 'Çekiliş, sıralama ayarlarıdır.',
      amount: {
        title: 'Miktar',
        description: 'Listelenecek çekiliş miktarını değiştirmenizi sağlar.'
      },
      sort: {
        title: 'Sıralama',
        miniNote: 'ödüle göre sıralanır',
        description: 'Listeleme sırasını değiştirmenizi sağlar.'
      }
    },
    az: '(A-Z) Alfabetik',
    za: '(Z-A) Alfabetik',
    noreq: 'Şart gerektirmiyor.',
    reqs: 'Şartlar'
  },
  spotify: {
    not: "Spotify'da hiçbir şey dinlemiyor.",
    current: 'Spotify\'da dinliyor.'
  },
  team: {
    title: 'Kahramanlarımız',
    description: 'Award\'e çalışan ve katkıda <br> bulunan herkesi bulabilirsiniz. Ekibimize çok teşekkürler. <3',
    linkcordLang: 'tr',
    noWidget: 'Araç bulunamadı.',

    roles: {
      'Founder': 'Kurucu',
      'Co-Founder': 'Ortak Kurucu',
      'Community-Manager': 'Topluluk Yöneticisi',
      'Developer': 'Geliştirici',
      'Designer': 'Tasarımcı',
      'Moderator': 'Moderatör'
    }
  },
  create: {
    title: 'Çekiliş oluştur!',
    description: 'Bir çekiliş oluşturarak üyelerinize hediyeler dağıtın!',
    inputs: {
      title: {
        title: 'Başlık',
        description: 'Çekiliş başlığını girin'
      },
      description: {
        title: 'Açıklama',
        description: 'Çekiliş açıklamasını girin'
      },
      prize: {
        title: 'Ödül',
        description: 'Çekiliş ödülünü girin'
      },
      enddate: {
        title: 'Bitiş Tarihi',
        description: 'Çekilişin bitiş tarihi seçin'
      },
      winners: {
        title: 'Kazanan Sayısı',
        description: 'Çekilişi kazanacak kullanıcı sayısını belirleyin'
      },
      channel: {
        title: 'Kanal',
        description: 'Çekiliş mesajının gideceği kanalı seçin'
      },
      requirements: {
        title: 'Şartlar',
        description: 'Çekilişe katılacak üyelerin yapacağı şartları belirleyin'
      },
      role: {
        title: 'Zorunlu Rol',
        description: 'Çekilişe katılabilecek rolü seçin'
      },
      invite: {
        title: 'Gerekli Davet Sayısı',
        description: 'Çekilişe katılması için gerekli davet sayısını belirleyiniz. (Ör: 3)'
      },
      presentation: {
        title: 'Görünüm',
        description: 'Eğer gizliyi seçerseniz çekiliş keşfet kısmında gözükmeyecektir, ama açığı seçerseniz çekiliş keşfette gözükecektir.'
      },
    },
    button: "Oluştur",
    presentationPrivate: 'Gizli',
    presentationPublic: 'Açık',
    requirementsDropdownText: 'Daha fazla seçenek mi arıyorsun? Hesaplarına göz at.',
    presentationTippy: 'Öneml Ayar',
    unReachTippy: 'Bu sizin çekiliş oluşturma hakkınızdır. Daha {MORE} çekiliş oluşturabilirsiniz.',
    reachTippy: 'Yapma ya! Çekiliş oluşturma sınırınıza ulaşmışsınız.',
    reachedText: 'Çekiliş oluşturma sınırına ulaştınız.<br /> <span class="text-amber-400/50 ml-1 hover:underline cursor-pointer"><i class="fad fa-diamond"></i> Takviye</span> satın alarak çekiliş limitinizi arttırabilirsiniz.'
  },
  user: {
    profile: {
      giveaways: {
        title: '{USER} adlı kullanıcının katıldığı çekilişler'
      }
    },
    dropdown: {
      profile: 'Profil',
      guilds: 'Sunucularım',
      connections: 'Bağlantılar',
      panel: 'Panel',
      redeem: 'Kod Bozdur',
      logout: 'Çıkış yap',
      _profile: 'Profilini görüntüle!',
      _guilds: 'Sunucunu seç!',
      _connections: 'Bağlantıları yönet!',
      _panel: 'Çok, çok gizli :)',
      _redeem: 'Kod bozdur!',
      _logout: 'Website oturumunu sonlandır!'
    },
    connections: {
      title: 'Bağlantılar',
      description: 'Award\'e bağlamış olduğunuz sosyal medya hesaplarını buradan yönetebilirsiniz.',
      button: {
        logout: 'Çıkış yapmak için tıkla',
        connect: '<b>{PROVIDER}</b> ile bağlan',
        connectMini: 'Bağlamak için tıkla',
        logged: '<b>{ACCOUNT}</b> olarak bağlandınız'
      }
    },
    redeem: {
      title: 'Kod Bozdur',
      description: 'Kodunuzu burada bozdurabilirsiniz.',
      inputPlaceholder: 'Hediye kodu buraya',
      button: 'Kod Bozdur',
      didntWork: 'Kodunuz çalışmadı mı?',
      success: '🎉 Harika! {COUNT} takviyeyi hesabına ekledik, güle güle bas :)'
    }
  },
  dashboard: {
    selectServer: {
      title: 'Sunucu seç',
      description: 'Sunucunu bulamadın mı? <u>Tekrar giriş</u> yapmayı dene!',
      serverUnderText: 'Tıkla ve seç.',
      buttons: {
        manage: 'Yönet',
        add: 'Kurulum'
      }
    },
    stats: {
      total: 'Toplam Çekilişler',
      active: 'Aktif Çekilişler',
      activeTippy: 'Limiti artırmak için takviye yapmalısınız!',
      ended: 'Bitmiş Çekilişler',
      participants: 'Toplam Katılımcı'
    },
    auditLog: {
      title: 'Denetim Kaydı',
      description: 'Bu sunucuda Award\'te üzerinde yapılan değişikliklerin denetim kaydı burada görülebilir.',
      table: {
        user: 'Kullanıcı',
        date: 'Tarih',
        action: 'İşlem',
        message: 'Mesaj'
      },
      boost: 'Sunucuya takviye yaptı.',
      unboost: 'Sunucudaki takviyesini geri çekti.',
      giveaway_delete: 'Bir çekilişi sildi.',
      giveaway_create: 'Bir çekiliş başlattı.',
      giveaway_finish: 'Bir çekiliş sona erdi.',
      giveaway_join: 'Çekilişe katıldı.',
      giveaway_reroll: 'Bir çekilişte kazananları yeniledi.'
    },
  },
};
