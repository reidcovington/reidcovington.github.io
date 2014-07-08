$(document).ready(function(){
  $( document ).tooltip({
    toggle:   'fade',
    content: function(){
    var element = $( this );
    var title = element.attr( 'title' );
      return '<img src="/assets/' + title + '">';
      }
    });
});

