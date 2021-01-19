$(function(){
    $(".sidebar-nav").hover(function () {
        console.log("expcol - hover")
        console.log("Hide Hover")

        $("#contentBox").toggleClass("toggled");
        $('.submenu').toggleClass("toggled");
        $('.contractmenu').toggleClass("toggled");
        $('.requestmenu').toggleClass("toggled");
        $('.signedmenu').toggleClass("toggled");
        $('.searchmenu').toggleClass("toggled");
        $('.logoimg').toggleClass("toggled");
        $('.logoimg1').toggleClass("toggled");
        $('.oblmenu').toggleClass("toggled");
        $('#sideNavBox').toggleClass("toggled");
        $('.lbldesp').toggleClass("toggled");
        $('.expcol').toggleClass('expandclass');
        $('.main-menu').toggleClass('mainmenuexpandclass');

    })
    console.log("component load")
    $('#divadd, #divaddother').click(function(){
        console.log("Modal Open");
       $(".formmodal").modal("show");
    })

    $('#closebtntmp').click(function(){
        console.log("Modal close");
        setTimeout(() => {
            $(".formmodal").modal("hide");
        }, 1000);
        
    })

    $('#saveebtntmp').click(function(){
        console.log("saveebtntmp");
        $(".formmodal").modal("show");
    })

    $('#closebtntmp2').click(function(){
        console.log("Modal close");
        setTimeout(() => {
            $(".formmodal").modal("hide");
        }, 1000);
    })
})

function test(){
    console.log("test call");
}