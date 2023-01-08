$(document).ready(function () {
  //   gnb

  if ($(window).width() < 768) {
    // 모바일사이즈
    $(".gnb_depth_2_wrap").hide();
    $(".header_wrap").click(function () {
      $(".gnb_depth_2_wrap").toggle(0);
    });
    $(".gnb_depth_2_wrap").mouseleave(function () {
      $(this).slideUp();
    });
  } else if ($(window).width() >= 768) {
    $(".gnb_depth_2_wrap").hide();
    $(".header_wrap").mouseenter(function () {
      $(".gnb_depth_2_wrap").slideDown(300);
    });
    $(".gnb_depth_2_wrap").mouseleave(function () {
      $(this).slideUp();
    });
  }

  //aside banner
  $(".banner_ad").hide();
  $(window).scroll(function () {
    if ($(window).width() < 1024) {
      $(".banner_ad").hide();
    } else {
      if (window.scrollY > 200) {
        $(".banner_ad").fadeIn(300);
      } else if (window.scrollY <= 200) {
        $(".banner_ad").fadeOut(200);
      }
    }
  });

  //mv_1 scroll

  window.onresize = function () {
    Mv1resizeWidth();
  };

  let list;
  let whiteline;
  let redLineLocation;
  Mv1resizeWidth();
  //  화면 로드시 빨간 바 길이 지정
  let count = 0;
  function mvScroll() {
    Mv1resizeWidth();
    count++;
    //작동회수 count에 할당
    if (count < list.length) {
      // 등록 영화의 개수보다 작동회수가 적을경우
      for (i = 1; i < list.length; i++) {
        $(`.movie_bg_list>li:eq(${i})`)
          .finish()
          .animate(
            { left: `-=${$(".movie_bg_list li").width()}` },
            "swing"
            //등록 영화이미지의 넓이만큼 좌측으로 이동
          );
      }

      $(".red_line")
        .finish()
        .animate({ left: `+=${redLineLocation}` }, "swing");
    } else {
      $(`.movie_bg_list li`).finish().animate({ left: `0` });
      $(".red_line").finish().animate({ left: `0` }, "swing");
      count = 0;
      //   등록한 영화의 개수만큼 작동한 경우 left를 0으로 지정 후
      //   작동 회수를 초기화
    }
  }
  $(".white_click").click(function (e) {
    Mv1resizeWidth();
    let clickLocation = e.pageX;
    // 클릭한 위치는 document의 x좌표
    let whiteLocation = $(".white_line").offset().left;
    // 흰색 선의 좌측 끝 x 좌표
    let redLineWidth = Math.floor(
      `${$(".white_line").width()}` / `${$(".movie_bg_list li").length}`
    );
    // 빨간 선의 넓이
    let locationDiff = clickLocation - whiteLocation;
    // document가 아닌 흰색 선의 실질적인 x 좌표
    for (i = 1; i < $(".movie_bg_list li").length + 1; i++) {
      if (locationDiff < redLineWidth * i) {
        // x좌표의 흰색 선을 n등분 했을때의 위치
        /* 
            ex) 영화가 6개인 경우 
            1 ,2 ,3, 4, 5, 6로 구획을 나눔
        */
        count = i - 1;
        // 작동회수는 0부터 시작하므로 1차감
        $(".red_line")
          .finish()
          .animate({ left: `${redLineWidth * count}` }, "swing");
        // 나눈 구획의 위치로 이동
        $(`.movie_bg_list>li`)
          .finish()
          .animate(
            { left: `-${$(".movie_bg_list li").width() * count}` },
            "swing"
          );
        break;
        // for문 작동의 중단
      }
    }
  });
  setInterval(mvScroll, 5000);
  //mv_2 scroll

  let movieListCount = 0;
  $(".movie_wrap_left_btn").click(function () {
    if (movieListCount >= 1) {
      movieListCount--;
      $(".movie_list li").finish().animate({
        left: `+=654px`,
      });
    }
  });
  $(".movie_wrap_right_btn").click(function () {
    movieListCount++;
    let movieListLength = $(".movie_list>li").length;
    let movieListWidth = $(window).width() * (66.66 / 100);
    if (
      movieListCount < Math.floor(movieListLength - 1 - movieListWidth / 218)
    ) {
      $(".movie_list li").finish().animate({
        left: `-=654px`,
      });
    } else {
      $(".movie_list li").finish().animate({
        left: `0px`,
      });
      movieListCount = 0;
    }
  });

  // MV1 리사이징 대비 함수
  function Mv1resizeWidth() {
    list = $(".movie_bg_list li");
    list.width($(document).width());
    whiteline = $(".white_line").width();
    redLineLocation = whiteline / list.length;
    $(".red_line").width(redLineLocation);
  }
});
