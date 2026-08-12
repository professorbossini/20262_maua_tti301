//var contGlob = 1;
//let contGlob = 1;

function eAgora() {
    let cont = 1;

    function f1() {
        console.log(cont);
        //        console.log(contGlob);
    }
    cont++;
    //    contGlob++;
    function f2() {
        console.log(cont);
        //        console.log(contGlob);
    }
    return { f1, f2 }
}

// let contGlob = 1;
// var contGlob = 1;
let eAgoraResult = eAgora();
// let contGlob = 1;
// var contGlob = 1;
eAgoraResult.f1();
eAgoraResult.f2();
