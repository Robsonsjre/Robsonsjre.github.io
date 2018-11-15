$(document).ready(function(){

  // MODAL
  var modalText = {
    belugadb: {
      title: 'BelugaDB.com',
      tag: 'BUSINESS ANALYTICS TOOL.',
      detail: 'Developed in 6 months with one more person large part of the Data Visualization tool. A drag and droppable dashboard for querying, filtering, and showing the data in different forms like graphs and tables. Stack: React/Redux/Node/Mongo.',
      link: 'https://vimeo.com/216248196'
    },
    tekopora: {
      title: 'Teko Porã',
      tag: 'FULL RESPONSIBLE',
      detail: 'Teko Porãs band website, full reponsive with many effect using html5, css3, and gulp for performance',
      link: 'http://tekopora.com'
    },
    coins: {
      title: '314Coins',
      tag: 'VUE.JS + web3.js',
      detail: 'Connecting with bitcoin and ethereum blockchain to manage withdrawls and deposits from wallets',
      link: 'http://314coins.com'
    },
    coinmarketapp: {
      title: 'Coin Market App',
      tag: 'React Native App to check crypto prices',
      detail: 'Reat Native handling crypto APIs',
      link: 'https://play.google.com/store/apps/details?id=com.coinmarketcapunofficial'
    },
    cryptodoggies: {
      title: 'Crypto Doggies',
      tag: 'Truffle + Web3 + Solidity Project',
      detail: 'My first Dapp, very similar to crypto kitties on ethereum blockchain.',
      link: 'https://github.com/Robsonsjre/cryptodoggies'
    },
    themall: {
      title: 'The Mall',
      tag: 'PEER GUIDED SHOPPING.',
      detail: 'The Mall is a place to follow the latest fashion purchases of your friends and favorite celebrities. Built with Node.js and Handlebars. Features the ability to import thousands of top brands products into one shopping site.',
    }
  };

  $('#gallery .button').on('click', function(){
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function(){
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
      slideWidth = 700,
      threshold = slideWidth/3,
      dragStart,
      dragEnd;

  setDimensions();

  $('#next').click(function(){ shiftSlide(-1) })
  $('#prev').click(function(){ shiftSlide(1) })

  carousel.on('mousedown', function(){
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function(){
      dragEnd = event.pageX;
      $(this).css('transform','translateX('+ dragPos() +'px)');
    });
    $(document).on('mouseup', function(){
      if (dragPos() > threshold) { return shiftSlide(1) }
      if (dragPos() < -threshold) { return shiftSlide(-1) }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
     slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1)
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup')
    carousel.off('mousemove')
            .addClass('transition')
            .css('transform','translateX(' + (direction * slideWidth) + 'px)');
    setTimeout(function(){
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition')
      carousel.css('transform','translateX(0px)');
    },700)
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link) $('#modal .button').addClass('visible')
                                               .parent()
                                               .attr('href', modalText[id].link)

    $.each($('#modal li'), function(index, value ) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function(index, value) {
      $(this).css({
        background: "url('img/slides/" + id + '-' + index + ".jpg') center center/cover",
        backgroundSize: 'cover'
      });

    });
  }
})
