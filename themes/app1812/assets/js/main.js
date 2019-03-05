$('form').submit(function () {
    $('#dangtai').show();
});

$(document).ajaxStop(function () {
    $("img.luoi").lazyload();
});

$.fn.clickOut = function (parent, fn) {
    var context = this;
    fn = (typeof parent === 'function') ? parent : fn;
    parent = (parent instanceof jQuery) ? parent : $(document);

    context.each(function () {
        var that = this;
        parent.on('click', function (e) {
            var clicked = $(e.target);
            if (!clicked.is(that) && !clicked.parents().is(that)) {
                if (typeof fn === 'function') {
                    fn.call(that, clicked);
                }
            }
        });

    });
    return context;
};

$(function () {
    $("img.luoi").lazyload();
    // Tien ich an va hien
    $('[dulieu-hanhdong="an-hien"]').on('click', function (event) {
        dich = $(this).attr('href');

        if ($(this).hasClass('hien'))
        {
            $(this).removeClass('hien');
            $(dich).removeClass('hien');
        } else
        {
            nhom = $(this).attr('dl-nhom');
            if (nhom)
            {
                $(nhom).find('.hien').removeClass('hien');
            }
            $(this).addClass('hien');
            $(dich).addClass('hien');
            dau = $(this).attr('dl-cach-tren') ? $(this).attr('dl-cach-tren') : 0;
            if (dau !== 'khong')
            {
                var x = $(dich).position();
                window.scroll(0, x.top - dau);
            }
        }
        event.preventDefault();
    });
    $('[dl-hanhdong="kh"]').on('click', function (event) {
        dich = $(this).attr('href');

        if (!$(this).hasClass('kh'))
        {
            nhom = $(this).attr('dl-nhom');
            if (nhom)
            {
                $(nhom).find('.kh').removeClass('kh');
            }
            $(this).addClass('kh');
            $(dich).addClass('kh');
        }
        event.preventDefault();
    });

    // Tien ich an va hien
    $('[dl-hanhdong="chon"]').on('click', function (event) {
        chonvung = $(this).closest('.chon-vung');
        if (chonvung.hasClass('mo'))
        {
            chonvung.removeClass('mo');
            if ($(this).attr('dl-cuon'))
            {
                $($(this).attr('dl-cuon')).removeClass('khong-cuon');
            }
        } else
        {
            chonvung.addClass('mo');
            dau = $(this).attr('dl-cach-tren') ? $(this).attr('dl-cach-tren') : 0;
            if (dau !== 'khong')
            {
                var x = chonvung.position();
                window.scroll(0, x.top - dau);
            }

            if ($(this).attr('dl-cuon'))
            {
                $($(this).attr('dl-cuon')).addClass('khong-cuon');
            }
        }
        event.preventDefault();
    });

    // Tien ich an bang
    $('[dl-an="bang"]').on('click', function (event) {
        bang('an');
        event.preventDefault();
    });


    $('.bang-khung').clickOut(function () {
        bang('an');
    });

    $(window).keydown(function (event) {
        if (event.which === 27) {
            bang('an');
        }
    });

    window.onscroll = function () {
        myFunction();
        cuonTieude();
    };

    function myFunction() {
        $('[dl-hanhdong="codinh"]').each(function () {
            dau = $(this).attr('dl-cach-tren');
            cuoi = $(this).attr('dl-cach-duoi');
            if ($(window).scrollTop() > dau) {
                $(this).addClass('codinh');
            } else {
                $(this).removeClass('codinh');
            }
        });
    }

    $('.mo-lienket-con').on('click', function () {
        window.location.replace($(this).find('a').attr('href'));
    });
    $('.gui-tin-nhan').on('click', function (e) {
        e.preventDefault();
    });

    var iScrollPos = 0;
    function cuonTieude() {
        var iCurScrollPos = $(this).scrollTop();
        if (iCurScrollPos > iScrollPos) {
            $('body').addClass('cuon-xuong');
            $('body').removeClass('cuon-len');
        } else {
            //Scrolling Up
            $('body').removeClass('cuon-xuong');
            $('body').addClass('cuon-len');
        }
        if(iScrollPos < 50)
        {
            $('body').removeClass('cuon-xuong');
            $('body').removeClass('cuon-len');
        }
        iScrollPos = iCurScrollPos;
    };
    
    $('body').on('click', '#taisao-mo',function(){
        $('#taisao').addClass('hien');
        $('.nen-mo').addClass('hien');
    });
    
    $('body').on('click', '#taisao-dong',function(){
        $('#taisao').removeClass('hien');
        $('.nen-mo').removeClass('hien');
    });
    
    $('body').on('click', '.nen-mo',function(){
        $('#taisao').removeClass('hien');
    });
    
});

function getClinicCalendar(el)
{
    href = el.attr('href');
    device = el.attr('data-device');
    $.post(href, {device: device}, function (data) {
        $('#ds_bacsi').html(data);
    });
    $.post(href, {device: device, 'head': 1}, function (data) {
        $('#lichkham_dieuhuong').html(data);
    });
    $.post(href, {device: device, 'paging': 1}, function (data) {
        $('#lichkham_trang').html(data);
    });
    return false;
}

function layLichKham(el)
{
    href = el.attr('href');
    $.post(href, function (data) {
        $('#lichkham').html(data);
    });
    return false;
}

function bang(hanhdong, noidung, tieude)
{
    if (hanhdong === 'an')
    {
        $('body').removeClass('bang-hien');
        $('.bang-nen').remove();
        $('.bang').removeClass('hien');
    } else
    {
        $('body').addClass('bang-hien');
        $('.bang').addClass('hien');
        $('body').append('<div class="bang-nen mo hien"></div>');
        if (noidung)
        {
            $('.bang-than').html(noidung);
        }
        if (tieude)
        {
            $('.bang-tieude').html(tieude);
        }
    }
}