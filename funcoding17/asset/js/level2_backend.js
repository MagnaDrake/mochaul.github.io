// require jquery
// require funcoding
// require noty
Noty.overrideDefaults({
    theme: 'metroui',
    layout: 'bottomRight',
    timeout: 3500,
    progressBar: true,
});

// init
$(function() {
    var root = $('#game-root');
    var status = $('#game-status');

    function addStatus(what) {
        status.prepend('<div>' + what + '</div>');
        status.scrollTop(status.prop('scrollHeight'));
    }

    var endpoint = { sr: 1, sc: 0, sd: FunCoding.DirectionalObject.RIGHT, er: 1, ec: 7 };

    var obstacle = [
        [1, 1, 1, 0, 1, 1, 1, 1],
        [0, 0, 2, 0, 2, 2, 2, 0],
        [1, 0, 1, 0, 1, 1, 1, 1],
        [1, 0, 1, 0, 1, 1, 1, 1],
        [1, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 1, 0, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ];

    function checkPosition(r, c) {
        return (0 <= r && r < 8 && 0 <= c && c < 8 && obstacle[r][c] == 0);
    }
    // static image
    (function() {
        new FunCoding.GameObject(
            $('<image style="width:400px;height:400px" src="asset/img/lvl2.png"/>')
        ).addTo(root);
        new FunCoding.GameObject(
            $('<img src="asset/img/finish-blue.png" style="height:33px;width:15px;left:35px;top:9px;"/>'),
            (endpoint.ec * 50), (endpoint.er * 50)
        ).addTo(root)
    })();
    var items = {};

    var pintuA = (function(r, c) {
        var tmp =
            new FunCoding.PintuKuning(r, c, root,
                function(finish) {
                    obstacle[1, 2] = 0
                    addStatus('Membuka pintu');
                    new Noty({
                        text: '<strong>Membuka pintu</strong>',
                    }).show();
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 2);

    var pintuB = (function(r, c) {
        var tmp =
            new FunCoding.PintuKuning(r, c, root,
                function(finish) {
                    addStatus('Membuka pintu');
                    new Noty({
                        text: '<strong>Membuka pintu</strong>',
                    }).show();
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 4);
    var pintuC = (function(r, c) {
        var tmp =
            new FunCoding.PintuBiru(r, c, root,
                function(finish) {
                    addStatus('Membuka pintu');
                    new Noty({
                        text: '<strong>Membuka pintu</strong>',
                    }).show();
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 5);
    var pintuD = (function(r, c) {
        var tmp =
            new FunCoding.PintuMerah(r, c, root,
                function(finish) {
                    addStatus('Membuka pintu');
                    new Noty({
                        text: '<strong>Membuka pintu</strong>',
                    }).show();
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 6);

    var keyA = (function(r, c) {
        var tag = FunCoding.uniqueTag(items);
        return items[[r, c].join()] = items[tag] =
            new FunCoding.KunciKuning(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci pintu diambil');
                    new Noty({
                        text: '<strong>Kunci pintu</strong> berhasil diambil',
                    }).show();
                    finish();
                },
                function(retVal) {
                    if (player.r == pintuA.r && player.c == pintuA.c - 1) {
                        if (retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuA.take(),
                            obstacle[1][2] = 0,
                        ]);
                    }
                }
            );
    })(3, 1);
    var keyB = (function(r, c) {
        var tag = FunCoding.uniqueTag(items);
        return items[[r, c].join()] = items[tag] =
            new FunCoding.KunciKuning(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci pintu diambil');
                    new Noty({
                        text: '<strong>Kunci pintu</strong> berhasil diambil',
                    }).show();
                    finish();
                },
                function(retVal) {
                    if (player.r == pintuB.r && player.c == pintuB.c - 1) {
                        if (retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuB.take(),
                            obstacle[1][4] = 0
                        ]);
                    }
                }
            );
    })(4, 2);
    var keyC = (function(r, c) {
        var tag = FunCoding.uniqueTag(items);
        return items[[r, c].join()] = items[tag] =
            new FunCoding.KunciBiru(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci pintu diambil');
                    new Noty({
                        text: '<strong>Kunci pintu</strong> berhasil diambil',
                    }).show();
                    finish();
                },
                function(retVal) {
                    if (player.r == pintuC.r && player.c == pintuC.c - 1) {
                        if (retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuC.take(),
                            obstacle[1][5] = 0
                        ]);
                    }
                }
            );
    })(5, 3);
    var keyD = (function(r, c) {
        var tag = FunCoding.uniqueTag(items);
        return items[[r, c].join()] = items[tag] =
            new FunCoding.KunciMerah(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci pintu diambil');
                    new Noty({
                        text: '<strong>Kunci pintu</strong> berhasil diambil',
                    }).show();
                    finish();
                },
                function(retVal) {
                    if (player.r == pintuD.r && player.c == pintuD.c - 1) {
                        if (retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuD.take(),
                            obstacle[1][6] = 0
                        ]);
                    }
                }
            );
    })(4, 4);

    var moves = {};
    moves[[endpoint.er, endpoint.ec].join()] = function(retVal) {
        player.freeze = true;
        if (retVal) retVal[0] = true;
        return FunCoding.sequence([
            player.majuAnim(),
            function(finish) {
                finish();
                addStatus('Menggunakan kunci untuk keluar');
                var n = new Noty({
                    text: '<strong>Game Selesai</strong>, silakan ke level selanjutnya',
                    timeout: false,
                    callbacks: {
                        onClose: function() {
                            window.location = "level3.html";
                        }
                    },
                    buttons: [
                        Noty.button('Level 3', 'oh-btn-blue', function() {
                            n.close();
                        }),
                    ]
                }).show();
            },
        ]);
    }

    var player = new FunCoding.Player(
        new FunCoding.DirectionalObject(FunCoding.Player.getNormalFace()).addTo(root),
        endpoint.sr, endpoint.sc, endpoint.sd
    );

    new Noty({
        text: '<strong>Game Mulai</strong>',
    }).show();

    addStatus([
        'Berada di baris ', player.r + 1, ', kolom ', player.c + 1,
        ', menghadap ', ["utara", "barat", "selatan", "timur"][player.d]
    ].join(''));

    var controller = new FunCoding.Controller(player, items, moves);
    var queue = new FunCoding.AnimationQueue().start()

    FunCoding.registerAPI(
        window,
        controller,
        queue,
        function() {
            return checkPosition(player.r, player.c);
        },
        function() {
            var dd = FunCoding.DirectionalObject.dd;
            return !player.freeze && checkPosition(player.r + dd[player.d].y, player.c + dd[player.d].x);
        },
        addStatus,
        alert
    );

    window.ambil = function() {
        if (player.freeze) return;
        var tmp = [];
        queue.add(FunCoding.sequence([
            controller.ambil(tmp),
            function(finish) {
                if (!tmp[0]) addStatus('Ooops, Tidak bisa');
                finish();
            }
        ]));
        return tmp[1];
    }

    window.gunakan = function(tag) {
        if (player.freeze) return;
        var tmp = [];
        queue.add(FunCoding.sequence([
            controller.gunakan(tag, tmp),
            function(finish) {
                if (!tmp[0]) addStatus('Ooops, Tidak bisa');
                finish();
            }
        ]));
        return tmp[0];
    }

    window.bicara = function() {
        window.ambil();
    }

    FunCoding.includeScript('level2_solusi.js');
});