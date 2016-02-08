'use strict';

/**
 * @ngdoc directive
 * @name moneyBestBeforeApp.directive: calendar
 * @description
 * # calendar
 */
angular.module('moneyBestBeforeApp')
  .directive('calendar', function(){
    return {
      template: ''
        + ''
        + '<div id="calendar"></div>'
      ,
      restrict: 'E',
      link: function postLink(){
        // element.text('this is the calendar directive');
        var event = function(){
          return  [
            {
              'id': '293',
              'title': 'This is warning class event with very long title to check how it fits to evet in day view',
              'url': 'http://www.example.com/',
              'class': 'event-warning',
              'start': '1362938400000',
              'end':   '1363197686300'
            },
            {
              'id': '256',
              'title': 'Event that ends on timeline',
              'url': 'http://www.example.com/',
              'class': 'event-warning',
              'start': '1363155300000',
              'end':   '1363227600000'
            },
            {
              'id': '276',
              'title': 'Short day event',
              'url': 'http://www.example.com/',
              'class': 'event-success',
              'start': '1363245600000',
              'end':   '1363252200000'
            },
            {
              'id': '294',
              'title': 'This is information class ',
              'url': 'http://www.example.com/',
              'class': 'event-info',
              'start': '1363111200000',
              'end':   '1363284086400'
            },
            {
              'id': '297',
              'title': 'This is success event',
              'url': 'http://www.example.com/',
              'class': 'event-success',
              'start': '1363234500000',
              'end':   '1363284062400'
            },
            {
              'id': '54',
              'title': 'This is simple event',
              'url': 'http://www.example.com/',
              'class': '',
              'start': '1363712400000',
              'end':   '1363716086400'
            },
            {
              'id': '532',
              'title': 'This is inverse event',
              'url': 'http://www.example.com/',
              'class': 'event-inverse',
              'start': '1364407200000',
              'end':   '1364493686400'
            },
            {
              'id': '548',
              'title': 'This is special event',
              'url': 'http://www.example.com/',
              'class': 'event-special',
              'start': '1363197600000',
              'end':   '1363629686400'
            },
            {
              'id': '295',
              'title': 'Event 3',
              'url': 'http://www.example.com/',
              'class': 'event-important',
              'start': '1364320800000',
              'end':   '1364407286400'
            }
          ];
        };
        var calendar = $('#calendar').calendar(
          {
            events_source: event,
            view: 'month',
            tmpl_cache: false,
            day: '2013-03-12',
            tmpl_path: '/views/calendar_tmpls/',
            // events_source: function(){ return []; },
            language: 'ja-JP',
            onAfterEventsLoad: function(events) {
              if(!events) {
                return;
              }
              var list = $('#eventlist');
              list.html('');

              $.each(events, function(key, val) {
                $(document.createElement('li'))
                  .html('<a href="' + val.url + '">' + val.title + '</a>')
                  .appendTo(list);
              });
            },
            onAfterViewLoad: function(view) {
              $('.page-header h3').text(this.getTitle());
              $('.btn-group button').removeClass('active');
              $('button[data-calendar-view="' + view + '"]').addClass('active');
            }
          });

        $('.btn-group button[data-calendar-nav]').each(function() {
          var $this = $(this);
          $this.click(function() {
            calendar.navigate($this.data('calendar-nav'));
          });
        });

        $('.btn-group button[data-calendar-view]').each(function() {
          var $this = $(this);
          $this.click(function() {
            calendar.view($this.data('calendar-view'));
          });
        });

        $('#first_day').change(function(){
          var value = $(this).val();
          value = value.length ? parseInt(value) : null;
          calendar.setOptions({first_day: value});
          calendar.view();
        });

        $('#language').change(function(){
          calendar.setLanguage($(this).val());
          calendar.view();
        });

        $('#events-in-modal').change(function(){
          var val = $(this).is(':checked') ? $(this).val() : null;
          calendar.setOptions({modal: val});
        });
        $('#format-12-hours').change(function(){
          var val = $(this).is(':checked') ? true : false;
          calendar.setOptions({format12: val});
          calendar.view();
        });
        $('#show_wbn').change(function(){
          var val = $(this).is(':checked') ? true : false;
          calendar.setOptions({display_week_numbers: val});
          calendar.view();
        });
        $('#show_wb').change(function(){
          var val = $(this).is(':checked') ? true : false;
          calendar.setOptions({weekbox: val});
          calendar.view();
        });
        $('#events-modal .modal-header, #events-modal .modal-footer').click(function(e){
          //e.preventDefault();
          //e.stopPropagation();
        });


      }
    };
  });
