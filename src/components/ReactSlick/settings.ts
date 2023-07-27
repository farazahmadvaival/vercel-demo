export const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      arrows:false,
      vertical: false,
      responsive: [
        {
          breakpoint: 1359,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          }
        },
        {
          breakpoint: 815,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
          }
        },
        {
          breakpoint: 509,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };  