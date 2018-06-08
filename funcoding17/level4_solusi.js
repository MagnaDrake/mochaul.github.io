/*
perintah yang tersedia:
    diam();
    maju();
    belokKanan();
    belokKiri();
    bicara();

status yang tersedia:
    bisaMaju ?
*/
var balikBadan = function(){
    belokKiri();
    belokKiri();
}
var majuSebanyak = function(n){
	for(var i = 0; i<n; i++){
		maju();
	}
}
majuSebanyak(2);
while (!bisaMaju) diam();
majuSebanyak(3);
belokKanan();
majuSebanyak(4);
belokKiri();
maju()
balikBadan();
var kunci = ambil();
majuSebanyak(2);
while (!bisaMaju) diam();
majuSebanyak(4);
belokKiri()
gunakan(kunci)
majuSebanyak(2);