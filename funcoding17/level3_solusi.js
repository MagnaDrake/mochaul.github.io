/*
perintah yang tersedia:
    diam();
    maju();
    belokKanan();
    belokKiri();
    ambil();
    bayar();
    keluar();

status yang tersedia:
    bisaMaju ?
*/
var balikBadan = function(){
    belokKiri();
    belokKiri();
}
var maju3kali= function(){
	for(var i = 0; i<3; i++){
		maju()
	}
}

maju();
belokKanan();
maju3kali()
belokKiri();
maju3kali();
var kuncis = [];
kuncis[0] = ambil();
balikBadan();
maju3kali();
belokKiri();
gunakan(kuncis[0]);
maju();
belokKanan();
maju();
kuncis[1] = ambil();
balikBadan();
maju();
belokKiri();
maju3kali();
maju();
belokKanan();
gunakan(kuncis[1]);
maju3kali();
maju3kali();