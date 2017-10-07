// require jquery
// require game

// init
$(function() {

    var root = $('#game-root');
    var status = $('#game-status');

    function addStatus(what) {
        status.prepend('<div>' + what + '</div>');
        status.scrollTop(status.prop('scrollHeight'));
    }


    var endpoint = { sr: 5, sc: 7, sd: FunCoding.DirectionalObject.LEFT, er: 0, ec: 0 };

    var obstacle = [
        [0, 0, 0, 1, 1, 1, 0, 1],
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
                    addStatus('Membuka pintu');
                    alert('Membuka Pintu');
                    finish();
                }
            )
        tmp.r = r;
        tmp.c = c;
        return tmp;
    })(1, 2);


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
<<<<<<< HEAD
                    if(player.r == pintuA.r+1 && player.c == pintuA.c) {
                        if(retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuA.take(),
                            obstacle[1][2]=0
=======
                    if (player.r == pintuA.r - 1 && player.c == pintuA.c) {
                        if (retVal) retVal[0] = true;
                        return FunCoding.paraller([
                            pintuA.take(),
                            obstacle[1, 2] = 0
>>>>>>> f67aecd10a017e8f525d2d8360434d3ac899a538
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
                addStatus([
                    'Menggunakan kunci untuk keluar <br>',
                    '<strong>Game Selesai</strong>'
                ].join(''));
                //window.location = "level3.html";
            },
        ]);
    }
    var lampuMerah = new FunCoding.LampuMerah(5, 6, root, 10, 7, Math.floor(Math.random() * 10), function(r, c, what) {
        obstacle[r][c] = what ? 0 : 1;
    });

    var lampuMerah2 = new FunCoding.LampuMerah(5, 3, root, 10, 7, Math.floor(Math.random() * 10), function(r, c, what) {
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

    addStatus([
        'Berada di baris ', player.r + 1, ', kolom ', player.c + 1,
        ', <br>menghadap ', ["utara", "barat", "selatan", "timur"][player.d],
        '<br><strong>Game Mulai</strong>'
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