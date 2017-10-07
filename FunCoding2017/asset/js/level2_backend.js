// require jquery
// require funcoding

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
        console.log("tes")
        return (0 <= r && r < 8 && 0 <= c && c < 8 && obstacle[r][c] == 0);
    }
    // static image
    (function() {
        new FunCoding.GameObject(
            $('<image style="width:400px;height:400px" src="asset/img/Lantai_Rumah 8x8.png"/>')
        ).addTo(root);

        for (r in obstacle)
            for (c in obstacle[r]) {
                if (obstacle[r][c] == 1) {
                    new FunCoding.GameObject(
                        $('<image style="top:8px;width:50px" src="asset/img/table.png"/>'),
                        (c * 50), (r * 50)
                    ).addTo(root);
                }

            }

        new FunCoding.GameObject(
            $('<img src="asset/img/Mat.png" style="height:40px;left:5px;top:12px;"/>'),
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
                    alert('Membuka Pintu');
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
                    alert('Membuka Pintu');
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 4);
    var pintuC = (function(r, c) {
        var tmp =
            new FunCoding.PintuKuning(r, c, root,
                function(finish) {
                    addStatus('Membuka pintu');
                    alert('Membuka Pintu');
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 5);
    var pintuD = (function(r, c) {
        var tmp =
            new FunCoding.PintuKuning(r, c, root,
                function(finish) {
                    addStatus('Membuka pintu');
                    alert('Membuka Pintu');
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
                    alert('Kunci pintu berhasil diambil');
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
                    alert('Kunci pintu berhasil diambil');
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
            new FunCoding.KunciKuning(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci pintu diambil');
                    alert('Kunci pintu berhasil diambil');
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
            new FunCoding.KunciKuning(r, c, root, tag,
                function(finish) {
                    addStatus('Kunci pintu diambil');
                    alert('Kunci pintu berhasil diambil');
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
        console.log("lol");
        player.freeze = true;
        if (retVal) retVal[0] = true;
        return FunCoding.sequence([
            player.majuAnim(),
            function(finish) {
                finish();
                addStatus([
                    'Menggunakan kunci untuk keluar <br>',
                    '<strong>Game Selesai, silahakan ke level selanjutnya</strong>'
                ].join(''));
                window.location = "level3.html";
            },
        ]);
    }

    var player = new FunCoding.Player(
        new FunCoding.DirectionalObject(FunCoding.Player.getNormalFace()).addTo(root),
        endpoint.sr, endpoint.sc, endpoint.sd
    );

    addStatus([
        'Berada di baris ', player.r + 1, ', kolom ', player.c + 1,
        ', <br>menghadap ', ["utara", "barat", "selatan", "timur"][player.d],
        '<br><strong>Game Mulai</strong>'
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