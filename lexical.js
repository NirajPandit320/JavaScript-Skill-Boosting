function a(){
    var a = 1;

    b();

    function b() {
        console.log(a); // 1 (lexical scope allows access to 'a' in 'a')
    }
}
a();
