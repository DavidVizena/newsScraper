$(document).ready(function() {
  $(".downArrow").click(function() {
    $("html, body").animate(
      {
        scrollTop: $("#elementtoScrollToID").offset().top
      },
      2000
    );
  });
});
