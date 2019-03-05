$(function(){
    $('.trinhdon-congtac').on('click', function(e){
        e.preventDefault();
        $('.trinhdon').addClass('mo');
        $('.nen-mo').addClass('hien');
    });
    
    $('.nen-mo').on('click', function(e){
        e.preventDefault();
        $('.trinhdon').removeClass('mo');
        $('.nen-mo').removeClass('hien');
    });
    
    $('.trinhdon-co-nhanh').children('a').on('click', function(e){
         e.preventDefault();
        $(this).parent().toggleClass('mo');
    });
});