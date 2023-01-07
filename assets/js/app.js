$(document).ready(function () {
  //   gnb
  $(".gnb_depth_2_wrap").hide();
  $(".header_wrap").mouseenter(function () {
    $(".gnb_depth_2_wrap").slideDown(300);
  });
  $(".gnb_depth_2_wrap").mouseleave(function () {
    $(this).slideUp();
  });

  //aside banner
  $(".banner_ad").hide();
  $(window).scroll(function () {
    if (window.scrollY > 200) {
      $(".banner_ad").fadeIn(300);
    } else if (window.scrollY <= 200) {
      $(".banner_ad").fadeOut(200);
    }
  });
  //mv_1 scroll
  let count = 0;
  function mvScroll() {
    count++;
    let list = $(".movie_bg_list li");
    if (count < list.length) {
      for (i = 1; i < list.length; i++) {
        $(`.movie_bg_list>li:eq(${i})`).animate(
          { left: `-=${list.width()}` },
          "swing"
        );
      }
      let whiteline = $(".white_line").width();
      let redLineLocation = whiteline / list.length;
      $(".red_line").width(`${redLineLocation}`);
      $(".red_line").animate({ left: `+=${redLineLocation}` }, "swing");
    } else {
      $(`.movie_bg_list li`).animate({ left: `0` });
      $(".red_line").animate({ left: `0` }, "swing");
      count = 0;
    }
  }
  setInterval(mvScroll, 5000);
  //mv_2 scroll
  let movieListCount = 0;
  $(".movie_wrap_left_btn").click(function () {
    if (movieListCount >= 1) {
      movieListCount--;
      $(".movie_list li").animate({
        left: `+=218px`,
      });
    }
  });
  $(".movie_wrap_right_btn").click(function () {
    movieListCount++;
    let movieListLength = $(".movie_list>li").length;
    let movieListWidth = $(window).width() * (66.66 / 100);
    if (
      movieListCount < Math.floor(movieListLength + 1 - movieListWidth / 218)
    ) {
      $(".movie_list li").animate({
        left: `-=218px`,
      });
    } else {
      $(".movie_list li").animate({
        left: `0px`,
      });
      movieListCount = 0;
    }
  });
});
