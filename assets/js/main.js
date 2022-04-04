$(document).ready(function(){
    $('.lazy').lazy();


    
    //Smooth Scrolling Using Navigation Menu
    $('a[href*="#"]').on('click', function(e){
        $('html,body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        },500);
        e.preventDefault();
    });

});
 


$( () => {
	
 
});