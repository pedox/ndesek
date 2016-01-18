/**
 * List general pharse !
 * @type {Array}
 */
var _pharse = [
  {
    index: 0,
    pattern: /^h{1,}((e|a){1,})(l{1,})(o{1,})/i,
    repeatGila: 5,
    ifrepeat: [
      {text: '._.'},
      {text: 'lu kenapa gand :('},
      {text: 'kenapa mas ? :('},
      {text: 'gila ya :( ?'}
    ],
    response: [
      {text: 'Apa kabar !'},
    ]
  },
  {
    index: 0,
    pattern: /^(kamu|lagi|kamu lagi) (apa|ngapain)/i,
    repeatGila: 5,
    ifrepeat: [
      {text: 'lu kenapa gand :('},
      {text: 'kenapa mas ? :('},
      {text: 'gila ya :( ?'}
    ],
    reply: [

    ],
    response: [
      {text: 'sedang menjawab pertanyaan anda !'},
      {text: 'aku ga ngapa ngapain aku cuma robot hehe'},
    ]
  },
  {
    index: 0,
    pattern: /^(kok|galau|kok galau|kenapa) (galau|melulu|mulu)/i,
    repeatGila: 2,
    ifrepeat: [
      {text: 'hufff ngeledek aja nih :('}
    ],
    response: [
      {text: 'ya abis ya gitu huhuhu :('},
    ]
  },
  {
    index: 0,
    pattern: /^(pes(?:a|e)n)(?: )(minum|makan(?:|an))(?: )([a-z ,]+)/i,
    repeatGila: 3,
    ifrepeat: [
      {text: 'udah kebelet yahh... :v'},
    ],
    response: [
      {text: 'Laper yak ? :p'},
      {text: 'ciye ada yang laper ? :p'},
    ]
  },
  {
    index: 0,
    pattern: /^(pes(?:a|e)n)/i,
    repeatGila: false,
    ifrepeat: [
      {text: 'Hadeh -_-'},
    ],
    response: [
      {text: 'mau pesen apa kak ? kalo pesen makan tinggal bilang "pesen makan trus nama makanan nya hehe" kalo minum demikian kak hehe'},
    ]
  },

  {
    index: 0,
    pattern: /^(bawel|rese)/i,
    repeatGila: false,
    isMovie: true,
    ifrepeat: [],
    response: [
      {text: 'hahahahah !'},
      {text: 'wkwkwkwkwkwkwk :p'},
    ]
  },

  {
    index: 0,
    pattern: /^(puter|setel|pasang) musik galau/i,
    repeatGila: false,
    isMovie: true,
    ifrepeat: [],
    response: [
      {text: 'hufff kasian galau :( sebentar aku cariin dulu'},
      {text: 'huff kasian :( galau kenapa kak'},
      {text: 'ckckckc puk puk puk aku cariin dlu ya kak'},
    ]
  },

  {
    index: 0,
    pattern: /^(puter|setel|pasang) musik senang/i,
    repeatGila: false,
    isMovie: true,
    ifrepeat: [],
    response: [
      {text: 'widih !! ini mungkin musik yang cocok buat kamu hehe'},
    ]
  },

  {
    index: 0,
    pattern: /^kambing/i,
    repeatGila: false,
    ifrepeat: [],
    response: [
      {text: 'Mbeeeeee !'},
      {text: 'Kambing itu Riski !'}
    ]
  },
  {
    index: 0,
    pattern: /^liburan enak nya kemana/i,
    repeatGila: false,
    ifrepeat: [],
    response: [
      {text: 'ane ga ke mana mana gand'}
    ]
  },

  {
    index: 0,
    pattern: /^dota y(o|u)k/i,
    repeatGila: 2,
    ifrepeat: [
      {text: 'bawel --"'},
      {text: 'buset !'},
      {text: 'bodo amaat !'}
    ],
    response: [
      {
        text: 'MMR gua kegedean',
        reply: [
          {
            pattern: /MMR (.*) (be|b)rapa/i,
            response: [
              {text: 'pokoknya banyak'},
              {text: 'ada deh takut sombong'},
              {text: 'mau tau banget ?'}
            ]
          }
        ]
      }
    ]
  },
  {
    index: 0,
    pattern: /^csgo y(o|u)k/i,
    repeatGila: 2,
    ifrepeat: [
      {text: 'bawel --"'},
      {text: 'buset !'},
      {text: 'bodo amaat !'}
    ],
    response: [
      {
        text: 'yah robot mana bisa main csgo',
      }
    ]
  },
  {
    index: 0,
    pattern: /^halte (busway|transjakarta) (sekitar|dekat|di sekitar) (di sini|sini)/i,
    repeatGila: false,
    isBusway: true,
    ifrepeat: [],
    response: [{
      text: 'sedang mencari'
    }]
  },
  {
    index: 0,
    pattern: /^rute (busway|transjakarta) dari (.*) (sampai|ke) (.*)/i,
    repeatGila: false,
    isBuswayRoute: true,
    ifrepeat: [],
    response: [{
      text: 'sedang mencari'
    }]
  },
  {
    index: 0,
    pattern: /^apa lagu favorit mu/i,
    repeatGila: false,
    ifrepeat: [],
    response: [{
      text: 'saya robot saya tida suka musik !'
    }]
  },
  {
    index: 0,
    pattern: /^(aku|saya) (be|b)lajar ai/i,
    repeatGila: false,
    ifrepeat: [],
    response: [
      {text: 'matkul keren tuh !'},
      {text: 'matkul keren sih tapi susah banget !'},
      {text: 'keren !!'}
    ]
  },
  {
    index: 0,
    pattern: /^(aku|saya) (be|b)lajar (calculus|kalkulus)/i,
    repeatGila: false,
    ifrepeat: [],
    response: [
      {text: 'Matkul macam apa itu ! ._.'},
      {text: 'Kepala ga pecah gand ? ._.'}
    ]
  },
  {
    index: 0,
    pattern: /^(aku|saya) (be|b)lajar (.*)/i,
    repeatGila: false,
    ifrepeat: [],
    response: [
      {text: 'wih anak rajin'},
      {text: 'Semangat !!'},
      {text: 'wih anak rajin'}
    ]
  },
  {
    index: 0,
    pattern: /^apakah (.*)/i,
    repeatGila: false,
    ifrepeat: [],
    response: [
      {text: 'iya !!'},
      {text: 'mungkin'},
      {text: 'tidaa !'}
    ]
  }
];


/* Pharse for Movie in each time */
var _pMovie = [
  'ada film apa aja',
  'film di bioskop hari ini',
  'daftar film di bioskop hari ini',
  /^film apa aja (yang ){0,}di puter di bioskop/i
];
for(var i = 0;i < _pMovie.length; i++)
{
  _pharse.push({
      index: 0,
      pattern: _pMovie[i],
      repeatGila: 2,
      isMovie: true,
      ifrepeat: [
        {text: 'itu kan di atas udah -_-'},
        {text: 'haduh itu di atas udah kak -_-'},
        {text: 'haduh .... itu di atas udah kak aku capek !'},
      ],
      response: [
        {text: 'hmm... ini ada daftar film nya kak :)'},
      ]
  });
}

/* Pharse for Music in each time */
var _pMusic = [
  'musik ngetop',
  'daftar billboard',
  'list musik terkini'
];
for(var i = 0;i < _pMusic.length; i++)
{
  _pharse.push({
      index: 0,
      pattern: _pMusic[i],
      repeatGila: 2,
      isBilboard: true,
      ifrepeat: [
        {text: 'itu kan di atas udah -_-'},
        {text: 'haduh itu di atas udah kak -_-'},
        {text: 'haduh .... itu di atas udah kak aku capek !'},
      ],
      response: [
        {text: 'ini ada daftar billboad nya :)'},
      ]
  });
}
