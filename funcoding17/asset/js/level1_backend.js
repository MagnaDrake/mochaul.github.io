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

    var endpoint = { sr: 7, sc: 0, sd: FunCoding.DirectionalObject.UP, er: 1, ec: 7 };

    var obstacle = [
        [0, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 0, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 1],
        [0, 1, 1, 1, 0, 0, 0, 1],
        [0, 1, 1, 1, 9, 1, 1, 1],
    ];

    function checkPosition(r, c) {
        return (0 <= r && r < 8 && 0 <= c && c < 8 && obstacle[r][c] == 0);
    }

    // static image
    (function() {
        new FunCoding.GameObject(
            $('<image style="width:400px;height:400px" src="asset/img/lvl1.png"/>')
        ).addTo(root);

        for (r in obstacle)
            for (c in obstacle[r]) {
                if (obstacle[r][c] == 9) {
                    new FunCoding.GameObject(
                        $('<image src="asset/img/booth.png" style="height:40px;left:5px;top:5px;"/>'),
                        (c * 50), (r * 50)
                    ).addTo(root);
                }
            }

        new FunCoding.GameObject(
            $('<img src="asset/img/pintu-kuning.png" style="height:40px;left:25px;top:5px;"/>'),
            (endpoint.ec * 50), (endpoint.er * 50)
        ).addTo(root)
    })();


    var items = {};

    var mamaPoint = (function(r, c) {
        return items[[r, c].join()] =
            new FunCoding.ExclamationMark(r, c, root,
                function(finish) {
                    addStatus('Berbicara dengan penjaga labirin');
                    new Noty({
                        text: '<strong>Penjaga labirin</strong>, yang berada dalam ruangannya, memberitahu Anda untuk menggunakan <strong>kunci labirin</strong> untuk keluar dari labirin',
                    }).show();
                    finish();
                }
            );
    })(6, 4);

    var key = (function(r, c) {
        var tag = FunCoding.uniqueTag(items);
        return items[[r, c].join()] = items[tag] =
            new FunCoding.KunciKuning(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci labirin diambil');

                    new Noty({
                        text: '<strong>Kunci labirin</strong> berhasil diambil',
                    }).show();

                    finish();
                },
                function(retVal) {
                    if (player.r == endpoint.er && player.c == endpoint.ec) {
                        if (mamaPoint.taken) {
                            player.freeze = true;
                            if (retVal) retVal[0] = true;
                            return FunCoding.sequence([
                                player.majuAnim(),
                                function(finish) {
                                    addStatus('Menggunakan kunci untuk keluar');
                                    var n = new Noty({
                                        text: '<strong>Game Selesai</strong>, silakan ke level selanjutnya',
                                        timeout: false,
                                        callbacks: {
                                            onClose: function() {
                                                window.location = "level2.html";
                                            }
                                        },
                                        buttons: [
                                            Noty.button('Level 2', 'oh-btn-blue', function() {
                                                n.close();
                                            }),
                                        ]
                                    }).show();
                                    finish();
                                },
                            ]);
                        } else {
                            return FunCoding.sequence([
                                FunCoding.delay(FunCoding.STEP_SPEED),
                                function(finish) {
                                    addStatus('Tidak bisa keluar');
                                    new Noty({
                                        text: 'Tidak bisa keluar, silahkan tanya penjaga labirin dulu',
                                    }).show();
                                    finish();
                                }
                            ]);
                        }
                    }
                }
            );
    })(1, 4);

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

    var controller = new FunCoding.Controller(player, items);
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

    FunCoding.includeScript('level1_solusi.js');
});