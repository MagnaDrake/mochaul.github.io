// require jquery
// require game
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


    var endpoint = { sr: 0, sc: 6, sd: FunCoding.DirectionalObject.DOWN, er: 0, ec: 0 };

    var obstacle = [
        [0, 2, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 0, 1, 1, 1, 0, 1]
    ];

    function checkPosition(mode, r, c) {
        return (0 <= r && r < 8 && 0 <= c && c < 8 && obstacle[r][c] == 0);
    }

    // static object
    (function() {
        new FunCoding.GameObject(
            $('<image style="width:400px;height:400px" src="asset/img/lvl4.png"/>')
        ).addTo(root);
        new FunCoding.GameObject(
            $('<img src="asset/img/finish-red.png" style="height:33px;width:15px;left:2px;top:9px;"/>'),
            (endpoint.ec * 50), (endpoint.er * 50)
        ).addTo(root)
    })();

    var items = {};
    var pintuA = (function(r, c) {
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
    })(0, 1);


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
                    if (player.r == pintuA.r && player.c == pintuA.c + 1) {
                        if (retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuA.take(),
                            obstacle[0][1] = 0
                        ]);
                    }
                }
            );
    })(6, 2);

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
                    text: '<strong>Selamat! Ini adalah akhir dari Game</strong>, silakan kembali ke awal.',
                    timeout: false,
                    callbacks: {
                        onClose: function() {
                            window.location = "index.html";
                        }
                    },
                    buttons: [
                        Noty.button('Level 1', 'oh-btn-blue', function() {
                            n.close();
                        }),
                    ]
                }).show();
            },
        ]);
    }
    var lampuMerah = new FunCoding.LampuMerah(3, 6, root, 10, 7, Math.floor(Math.random() * 10), function(r, c, what) {
        obstacle[r][c] = what ? 0 : 1;
    });

    var lampuMerah2 = new FunCoding.LampuMerah(3, 2, root, 10, 7, Math.floor(Math.random() * 10), function(r, c, what) {
        obstacle[r][c] = what ? 0 : 1;
    });

    var player = new FunCoding.Player(
        new FunCoding.DirectionalObject(FunCoding.Player.getNormalFace()).addTo(root),
        endpoint.sr, endpoint.sc, endpoint.sd
    );
    player.normalFace = new FunCoding.DirectionalObject(
        FunCoding.Player.getNormalFace()
    ).addTo(root).hide();

    function updater() {
        return FunCoding.paraller([
            (player.r == lampuMerah.r && player.c == lampuMerah.c) ? null : lampuMerah.update(),
            (player.r == lampuMerah2.r && player.c == lampuMerah2.c) ? null : lampuMerah2.update(),
            FunCoding.delay(FunCoding.STEP_SPEED),
        ]);
    }

    new Noty({
        text: '<strong>Game Mulai</strong>',
    }).show();

    addStatus([
        'Berada di baris ', player.r + 1, ', kolom ', player.c + 1,
        ', menghadap ', ["utara", "barat", "selatan", "timur"][player.d]
    ].join(''));

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
    var controller = new FunCoding.Controller(player, items, moves, updater);
    var queue = new FunCoding.AnimationQueue();

    FunCoding.registerAPI(
        window,
        controller,
        queue,
        function() {
            console.log("lol");
            return checkPosition(player.mode, player.r, player.c);
        },
        function() {
            var dd = FunCoding.DirectionalObject.dd;
            return !player.freeze && checkPosition(player.mode, player.r + dd[player.d].y, player.c + dd[player.d].x);
        },
        addStatus,
        alert
    );

    FunCoding.includeScript('level4_solusi.js');

    queue.start(updater);
});