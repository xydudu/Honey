
(function($){

  "use strict";

  // a unique id for each gdatepicker
  var uid = 0;


/*** 
* http://patorjk.com/software/taag/#p=display&h=2&v=2&c=c&f=Fraktur&t=test
*                                                                            
*       ..                                                        ..         
*      888>                 x.    .                   .u    .    @L          
*      "8P       .u@u     .@88k  z88u        .u     .d88B :@8c  9888i   .dL  
*       .     .zWF8888bx ~"8888 ^8888     ud8888.  ="8888f8888r `Y888k:*888. 
*     u888u. .888  9888    8888  888R   :888'8888.   4888>'88"    888E  888I 
*    `'888E  I888  9888    8888  888R   d888 '88%"   4888> '      888E  888I 
*      888E  I888  9888    8888  888R   8888.+"      4888>        888E  888I 
*      888E  I888  9888    8888 ,888B . 8888L       .d888L .+     888E  888I 
*      888E  `888Nx?888   "8888Y 8888"  '8888c. .+  ^"8888*"     x888N><888' 
*      888E   "88" '888    `Y"   'YP     "88888%       "Y"        "88"  888  
*      888E         88E                    "YP'                         88F  
*      888E         98>                                                98"   
*      888P         '8                                               ./"     
*    .J88" "         `                                              ~`       
*/


  $.fn.gdatepicker = function( settings ) {

    return this.each( function() {

      if( typeof( moment ) !== "function" ) {
        throw new Error( "Moment.js Library is required: http://momentjs.com/" );
      }

      var $el = $(this);
      var _settings =  $.extend({}, $.fn.gdatepicker.defaults, settings || {});

      // ====================================================================

      var plugin = new gDatepicker( _settings, $el, uid++ );
      plugin.init();

      // ====================================================================

      $el.data('gDatepicker', plugin);

    });

  };






/***
*                    ..                .x+=:.      .x+=:.   
*              x .d88"                z`    ^%    z`    ^%  
*               5888R                    .   <k      .   <k 
*          .    '888R         u        .@8Ned8"    .@8Ned8" 
*     .udR88N    888R      us888u.   .@^%8888"   .@^%8888"  
*    <888'888k   888R   .@88 "8888" x88:  `)8b. x88:  `)8b. 
*    9888 'Y"    888R   9888  9888  8888N=*8888 8888N=*8888 
*    9888        888R   9888  9888   %8"    R88  %8"    R88 
*    9888        888R   9888  9888    @8Wou 9%    @8Wou 9%  
*    ?8888u../  .888B . 9888  9888  .888888P`   .888888P`   
*     "8888P'   ^*888%  "888*""888" `   ^"F     `   ^"F     
*       "P'       "%     ^Y"   ^Y'                          
*                                                           
*/

  function gDatepicker(settings, $el, uid) {
    
    this.$el = $el;
    this.uid = uid;
    this.settings = settings;
    this.lang = this.settings.language;



    this.selected = { 
      first: null, last: null 
    };

    this.formatted = { 
      first: { edit: null, view: null, hidden: null }, 
      last: { edit: null, view: null, hidden: null }
    };


    return this;

  };






/***
*                                                s                
*                                               :8                
*     .d``            .u    .          u.      .88           u.   
*     @8Ne.   .u    .d88B :@8c   ...ue888b    :888ooo  ...ue888b  
*     %8888:u@88N  ="8888f8888r  888R Y888r -*8888888  888R Y888r 
*      `888I  888.   4888>'88"   888R I888>   8888     888R I888> 
*       888I  888I   4888> '     888R I888>   8888     888R I888> 
*       888I  888I   4888>       888R I888>   8888     888R I888> 
*     uW888L  888'  .d888L .+   u8888cJ888   .8888Lu= u8888cJ888  
*    '*88888Nu88P   ^"8888*"     "*888*P"    ^%888*    "*888*P"   
*    ~ '88888F`        "Y"         'Y"         'Y"       'Y"      
*       888 ^                                                     
*       *8E                                                       
*       '8>                                                       
*        "                                                        
*/

  gDatepicker.prototype = {
    







/***
*       .                     .         s    
*      @88>                  @88>      :8    
*      %8P      u.    u.     %8P      .88    
*       .     x@88k u@88c.    .      :888ooo 
*     .@88u  ^"8888""8888"  .@88u  -*8888888 
*    ''888E`   8888  888R  ''888E`   8888    
*      888E    8888  888R    888E    8888    
*      888E    8888  888R    888E    8888    
*      888E    8888  888R    888E   .8888Lu= 
*      888&   "*88*" 8888"   888&   ^%888*   
*      R888"    ""   'Y"     R888"    'Y"    
*       ""                    ""             
*/

  // initialize the plugin

    init: function() {

      var _self = this;


      // if the specified language has not been loaded correctly,
      // log an error and set back to default.
      if( moment().lang( this.lang )._lang === undefined ) {
        
        console.error(
          "The specified language ("+this.lang+") could not be " +
          "found, please make sure it's loaded correctly"
        );

        this.lang = moment.lang();

      }

      this._localLongFormat = moment().lang(this.lang)._lang._longDateFormat.L;




      // this is used for toggling if we selecting first or last
      // date in the ranged picker
      this._selectFirstToggle = true;




      // set the active month and year.
      this._active = { 
        month: moment().month(), 
        year: moment().year() 
      };




      // create the picker with the designated theme
      this._createPicker( this._getTheme() );
      this._bindEvents();
      this._initInputs();



    },


    // destroy the current instance
    destroy: function() {

      // get the current instance via it's data bind
      var currentInstance = this.$el.data("gDatepicker");

      // remove the elements stored in the data bind
      // all events should disappear, too.
      currentInstance._els.$picker.remove();
      currentInstance._els.$pickerInputWrapper.remove();
      currentInstance._els.$pickerSecondInputWrapper.remove();
      currentInstance._els.$pickerElement.removeClass("has-gdatepicker");

      currentInstance._els = null;

      // finally remove the data bind so it doesn't trip us up.
      this.$el.removeData("gDatepicker");

    },






/***
*                     ..                                   .x+=:.   
*               x .d88"                                   z`    ^%  
*                5888R                 ..    .     :         .   <k 
*         .u     '888R        .u     .888: x888  x888.     .@8Ned8" 
*      ud8888.    888R     ud8888.  ~`8888~'888X`?888f`  .@^%8888"  
*    :888'8888.   888R   :888'8888.   X888  888X '888>  x88:  `)8b. 
*    d888 '88%"   888R   d888 '88%"   X888  888X '888>  8888N=*8888 
*    8888.+"      888R   8888.+"      X888  888X '888>   %8"    R88 
*    8888L        888R   8888L        X888  888X '888>    @8Wou 9%  
*    '8888c. .+  .888B . '8888c. .+  "*88%""*88" '888!` .888888P`   
*     "88888%    ^*888%   "88888%      `~    "    `"`   `   ^"F     
*       "YP'       "%       "YP'                                    
*                                                                   *                                                                   
*/

  // -----------------------------------------------------------------------
  // generate HTML needed for creating Calendar,
  // and append them all to the this._$picker
    
    _createPicker: function( theme ) {

      var els = {

        // the main picker wrapper element
        $picker: $("<div class='ui-gdatepicker'/>") ,

        // the larger sections inside the wrapper
        $pickerInner: $("<div class='ui-gdatepicker-wrapper'/>") ,
        $pickerHead: $("<div class='ui-gdatepicker-head'/>") ,
        $pickerBody: $("<div class='ui-gdatepicker-body'/>") ,
        
        // a fragment cache we can use for generating the body
        $pickerCache: $() ,

        // other interface elements
        $pickerUpArrow: $("<div class='ui-gdatepicker-scroll-arrow ui-gdatepicker-scroll-arrow-up'><span>previous month</span></div>") ,
        $pickerDownArrow: $("<div class='ui-gdatepicker-scroll-arrow ui-gdatepicker-scroll-arrow-down'><span>next month</span></div>") ,
        $pickerUpArrowYear: $("<div class='ui-gdatepicker-scroll-arrow-year ui-gdatepicker-scroll-arrow-up-year'><span>previous year</span></div>") ,
        $pickerDownArrowYear: $("<div class='ui-gdatepicker-scroll-arrow-year ui-gdatepicker-scroll-arrow-down-year'><span>next year</span></div>") ,
        $pickerDateOverlay: $("<div class='ui-gdatepicker-overlay'/>") ,
        $pickerClose: $("<div class='ui-gdatepicker-close'>Close</div>") ,

        // the input element we"ve bound to
        $pickerElement: this.$el ,

        // a new input, its wrapper and a element for clearing it.
        $pickerInputWrapper: $("<div class='ui-gdatepicker-input-wrapper'/>") ,
        $pickerInput: $("<input class='ui-gdatepicker-input' type='text'/>") ,
        $pickerEmpty: $("<span class='ui-gdatepicker-empty'><span>Clear</span></span>"),
        
        // a new input, its wrapper and a element for clearing it.
        $pickerSecondInputWrapper: $("<div class='ui-gdatepicker-input-wrapper ui-gdatepicker-second-input-wrapper'/>") ,
        $pickerSecondInput: $("<input class='ui-gdatepicker-input ui-gdatepicker-second-input' type='text'/>") ,
        $pickerSecondEmpty: $("<span class='ui-gdatepicker-empty ui-gdatepicker-second-empty'><span>Clear</span></span>")

      };



      // give the picker a unique id, and a theme class,
      // also append the large inner wrapper.
      els.$picker
        .attr("id", "ui_gdatepicker_" + this.uid )
        .addClass( theme + " ui-gdatepicker-"+this.lang )
        .append( els.$pickerInner );



      // append all the children to the inner wrapper
      // head and body go first as they are position static.
      els.$pickerInner
        .append( 
          els.$pickerHead , els.$pickerBody ,
          els.$pickerUpArrow , els.$pickerDownArrow ,
          els.$pickerUpArrowYear , els.$pickerDownArrowYear ,
          els.$pickerDateOverlay , els.$pickerClose 
        );



      // give the original input a class for hiding/manip
      // tabindex stops it being tabbed to
      els.$pickerElement
        .addClass("has-gdatepicker")
        .attr("tabindex","-1");



      // create the wrapper heirarchy and give it a theme class
      els.$pickerInputWrapper
        .append( els.$pickerInput , els.$pickerEmpty )
        .addClass( theme );

      els.$pickerSecondInputWrapper
        .append( els.$pickerSecondInput , els.$pickerSecondEmpty )
        .addClass( theme );
      

      this.placeholder = this._getPlaceholder();

      els.$pickerInput
        .attr("id", "ui_gdatepicker_input_" + this.uid )
        .prop("placeholder", this.placeholder );

      // give the input a unique id
      els.$pickerSecondInput
        .attr("id", "ui_gdatepicker_second_input_" + this.uid )
        .prop("placeholder", this.placeholder );


      // give access to the els globally
      this._els = els;

      


      // append fragments to body.
      $("body").append( this._els.$picker );
      this._els.$pickerInputWrapper.insertAfter( this._els.$pickerElement );
      


      // if we've chosen dual outputs, then append second one.
      if( this.settings.selectRange ) {
        this._els.$pickerSecondInputWrapper.insertAfter( this._els.$pickerInputWrapper );
      }

      // collection holding both inputs for events and such.
      this._els.$pickerBothInputs = 
        $( this._els.$pickerInput ).add( this._els.$pickerSecondInput );


    },









/***
*                  _                                       s       .x+=:.   
*                 u                                       :8      z`    ^%  
*                88Nu.   u.                u.    u.      .88         .   <k 
*         .u    '88888.o888c      .u     x@88k u@88c.   :888ooo    .@8Ned8" 
*      ud8888.   ^8888  8888   ud8888.  ^"8888""8888" -*8888888  .@^%8888"  
*    :888'8888.   8888  8888 :888'8888.   8888  888R    8888    x88:  `)8b. 
*    d888 '88%"   8888  8888 d888 '88%"   8888  888R    8888    8888N=*8888 
*    8888.+"      8888  8888 8888.+"      8888  888R    8888     %8"    R88 
*    8888L       .8888b.888P 8888L        8888  888R   .8888Lu=   @8Wou 9%  
*    '8888c. .+   ^Y8888*""  '8888c. .+  "*88*" 8888"  ^%888*   .888888P`   
*     "88888%       `Y"       "88888%      ""   'Y"      'Y"    `   ^"F     
*       "YP'                    "YP'                                        
*                                                                           
*                                                                           
*                                                                           
*/

    _bindEvents: function() {

      var _self = this;



      $(window).on({
        
        // when we press ESC close the picker if it's open!
        "keyup.gdatepicker": function(e) {
          if( e.keyCode === 27 ) {
            _self.hide.apply( _self );
          }
        }

      });


      $("html").on({

        // when we click on page, if it wasn't a click on the
        // datepicker, then we close it.
        "mouseup.gdatepicker": function(e) {

          var $target = $(e.target);
          var $parents = $target.parents();

          // assume we are going to hide.
          var hide = true;

          // the datepicker itself and the input element exempt
          var $exempt = $()
                .add( _self._els.$picker )
                .add( _self._els.$pickerInputWrapper )
                .add( _self._els.$pickerSecondInputWrapper );


          // if the close button was _not_ clicked, and the
          // target or it's parent was one of the exempt, we
          // decide not to close.
          if( !$target.is( _self._els.$pickerClose ) ) {
            if( $target.filter( $exempt ).length > 0 ) {
              hide = false;
            } else if( $parents.filter( $exempt ).length > 0 ) {
              hide = false;
            }
          }

          // if we haven't set hide to false, hide calendar
          if( hide ) {
            _self.hide.apply( _self );
          }

        }

      });
      
      
      this._els.$pickerBody.on({

        "click.gdatepicker": function(e) {
          // if we clicked on a day
          if( $(e.target).is(".ui-gdatepicker-day") ) {
            
            var id = e.target.id;
            var $target = _self._els.$pickerCache.filter( "#"+id );

            _self.selectDate.apply( _self , [ $target ] );
            _self._highlightDates.apply( _self );
            _self._dimDates.apply( _self );

          }
        }

      })


      this._els.$pickerBothInputs.on({

        // run the "show" function on focus
        "focus.gdatepicker": function(e) {
          _self.show.apply( _self );
        },
        // run the "hide" function on tab 
        // (not blur, as that intercepts clicking on the calender)
        "keydown.gdatepicker": function(e) {
          switch( e.which ) {
            
            case 9:
              _self.hide.apply( _self );
              break;

            case 38:
              _self._selectDay.apply( _self , ["next"] );
              break;

            case 40:
              _self._selectDay.apply( _self , ["previous"] );
              break;             

          } 
        },
        // interrupt the interrupt for webkit on
        // select
        "mouseup.gdatepicker": function(e) {
          e.target.select();
          e.preventDefault();
        }

      });



      this._els.$pickerEmpty.on({
        "click.gdatepicker": function(e) {
          _self._clearOutputs.apply( _self , [ "first" ]);
        }
      });

      this._els.$pickerSecondEmpty.on({
        "click.gdatepicker": function(e) {
          _self._clearOutputs.apply( _self , [ "last" ]);
        }
      });





      // if mousewheel scroll plugin is present...
      if( $.event.special.mousewheel !== undefined ) {
        this._els.$picker.on({

          "mousewheel.gdatepicker": function(e,delta) {
            _self._handleMouseWheel.apply( _self , [ e, delta ]);
          }

        });
      }




      this._els.$pickerUpArrow.on({

        "click.gdatepicker": function(e) {
          _self._goBackAMonth.apply( _self );
          _self._showOverlay.apply( _self , [ "click" , "month" ] );
        }

      });

      this._els.$pickerDownArrow.on({

        "click.gdatepicker": function(e) {
          _self._goForwardAMonth.apply( _self );
          _self._showOverlay.apply( _self , [ "click" , "month" ] );
        }

      });

      this._els.$pickerUpArrowYear.on({

        "click.gdatepicker": function(e) {
          _self._goBackAYear.apply( _self );
          _self._showOverlay.apply( _self , [ "click" , "year" ] );
        }

      });

      this._els.$pickerDownArrowYear.on({

        "click.gdatepicker": function(e) {
          _self._goForwardAYear.apply( _self );
          _self._showOverlay.apply( _self , [ "click" , "year" ] );
        }

      });



    },









/***
 *                                                          s       .                                 .x+=:.   
 *       oec :                                             :8      @88>                              z`    ^%  
 *      @88888     x.    .        u.    u.                .88      %8P          u.      u.    u.        .   <k 
 *      8"*88%   .@88k  z88u    x@88k u@88c.       .     :888ooo    .     ...ue888b   x@88k u@88c.    .@8Ned8" 
 *      8b.     ~"8888 ^8888   ^"8888""8888"  .udR88N  -*8888888  .@88u   888R Y888r ^"8888""8888"  .@^%8888"  
 *     u888888>   8888  888R     8888  888R  <888'888k   8888    ''888E`  888R I888>   8888  888R  x88:  `)8b. 
 *      8888R     8888  888R     8888  888R  9888 'Y"    8888      888E   888R I888>   8888  888R  8888N=*8888 
 *      8888P     8888  888R     8888  888R  9888        8888      888E   888R I888>   8888  888R   %8"    R88 
 *      *888>     8888 ,888B .   8888  888R  9888       .8888Lu=   888E  u8888cJ888    8888  888R    @8Wou 9%  
 *      4888     "8888Y 8888"   "*88*" 8888" ?8888u../  ^%888*     888&   "*888*P"    "*88*" 8888" .888888P`   
 *      '888      `Y"   'YP       ""   'Y"    "8888P'     'Y"      R888"    'Y"         ""   'Y"   `   ^"F     
 *       88R                                    "P'                 ""                                         
 *       88>                                                                                                   
 *       48                                                                                                    
 *       '8                                                                                                    
 */

    // function for showing the calendar
    show: function() {

      if( this.selected.first !== null ) {
        this._active = { 
          month: this.selected.first[1], 
          year: this.selected.first[0] 
        };
      } else {
        this._active = { 
          month: moment().month(), 
          year: moment().year()
        };      
      }

      this._els.$picker.addClass("ui-gdatepicker-show");
      
      this._populatePicker();
      this.position();

    },

    // function for hiding the calendar
    hide: function() {

      this._els.$picker.removeClass("ui-gdatepicker-show");
      this._outputDates();

    },

    selectDate: function( what ) {

      // selectDate function takes parameter of either:
      // [yyyy,mm,dd] or $();
      
      // if what is supplied then we proceed
      // otherwise we just set to previously stored date.
      
      // selected will be a temp array;
      var selected = this._selectedDateArray( what );
      var range = this.settings.selectRange;

      // if we've chosen a ranged date picker,
      // we need to decide whether we are storing the first
      // date or the last date in the range.

      // also we need to avoid picking a reverse range
      // ie: second date must be after first date.

        // if we're picking the first date in range
        // then we want to clear the last date!
        
        if( this._selectFirstToggle ) {
          
          this.selected.first = selected;
          this.selected.last = null;

          if( range ) {
            this._selectFirstToggle = false;
          }
          
        } else {

          // if the last date is earlier than the first date.
          var earlier = 
            moment(selected)
              .isBefore(this.selected.first);

          if( earlier ) {

            this.selected.first = selected;
            this.selected.last = null;
            this._selectFirstToggle = false;

          } else {

            this.selected.last = selected;
            this._selectFirstToggle = true;

          }

        }

      if( range ) {

        // if we tried to select a range larger than the one
        // set in teh options, then we max it out and carry on.
        var diff = 
          this._getDifferenceInDays( this.selected.first , this.selected.last );
        
        if( diff > range ) {
          
          var end = 
            moment( this.selected.first )
              .add( range, "days")
              .toArray(3);

          this.selected.last = [ end[0] , end[1] , end[2] ];
          this._selectFirstToggle = true;

        }

      }

      this._outputDates();

    },


    _highlightDates: function() {


      var d = this.selected;
      //      { first: [year, month, day], last: [year, month, day] };

      // remove previously highlighted dates
      this._els.$pickerCache.removeClass("ui-gdatepicker-selected");
      if( d.first === null ) { return false; }



      if( !this.settings.selectRange || d.last === null ) {

        this._els.$pickerCache
          .filter( "#gdp-"+this.uid+"-"+d.first[2]+"-"+d.first[1]+"-"+d.first[0] )
          .addClass("ui-gdatepicker-selected");

      } else {

        var diff = this._getDifferenceInDays( d.first , d.last );

        if( diff !== undefined ) {

          // need to store the loop dates so we
          // can manipulate them
          var loopDay = d.last[2],
              loopMonth = d.last[1],
              loopYear = d.last[0];
          
          // this will hold all the dates we get
          var $collection = $();
          
          // THIS LOOP GETS HEAVY WHEN DIFF > 14.
          // TRY TO FIGURE LIGHT WAY TO DO THIS.
          
          // basically:
          // for all the dates between first and last
          // hilight them.
          for( var i = diff+1; i > 0; i-- ) {
             
            var $current = 
              this._els.$pickerCache.filter( 
                "#gdp-"+this.uid+"-"+loopDay+"-"+loopMonth+"-"+loopYear 
              );
            
            $collection = $collection.add( $current );
            
            loopDay--;
            if( loopDay === 0 ) {
              loopMonth--;
              if( loopMonth < 0 ) {
                loopYear--;
                loopMonth = 11;
              }
              loopDay = this._getDaysInMonth( loopMonth , loopYear );
            }
            
          }
          
          $collection.addClass('ui-gdatepicker-selected');

        }

      }

    },


    _dimDates: function() {

      var d = this.selected;
      //      { first: [year, month, day], last: [year, month, day] };

      // remove previously dimmed dates
      this._els.$pickerCache.removeClass("ui-gdatepicker-dim");
      if( d.first === null ) { return false; }


      // if we are in a range picker, and we have already
      // selected the first date

      if( this.settings.selectRange && !this._selectFirstToggle ) {

        var range = this.settings.selectRange;

        // need to store the loop dates so we
        // can manipulate them
        var loopDay = d.first[2],
            loopMonth = d.first[1],
            loopYear = d.first[0];
        
        // this will hold all the dates we get
        var $collection = $();
        
        // THIS LOOP GETS HEAVY WHEN DIFF > 14.
        // TRY TO FIGURE LIGHT WAY TO DO THIS.
        
        // basically:
        // for all the dates between first and first+range
        // dim them.
        for( var i = 0; i <= range; i++ ) {
          
          var lastDay = this._getDaysInMonth( loopMonth, loopYear );

          var $current = 
            this._els.$pickerCache.filter( 
              "#gdp-"+this.uid+"-"+loopDay+"-"+loopMonth+"-"+loopYear 
            );

          loopDay++;
          if( loopDay > lastDay ) {
            loopMonth++;
            if( loopMonth > 11 ) {
              loopYear++;
              loopMonth = 0;
            }
            loopDay = 1;
          }

          
          
          $collection = $collection.add( $current );
          
        }
        
        this._els.$pickerCache
          .not( $collection )
          .addClass("ui-gdatepicker-dim");

      }

    },


    _outputDates: function() {

      this._makeFormattedDates();

      var dates = this.formatted;
      var full;

      this._els.$pickerInput.val("");
      this._els.$pickerSecondInput.val("");

      this._els.$pickerInput.val( dates.first.view );

      if( this.settings.selectRange ) {
        if( this.selected.last !== null ) {
          this._els.$pickerSecondInput.val( dates.last.view );
          full = dates.first.hidden + this.settings.divider + dates.last.hidden;
        }
      } else {
        full = dates.first.hidden;
      }

      this._els.$pickerElement.val(full);

    },


    _clearOutputs: function( which ) {

      which = which || "first";

      this.selected.last = null;
      this._selectFirstToggle = false;

      if( which === "first" ) {

        this.selected.first = null;
        this._selectFirstToggle = true;

      }

      this._highlightDates();
      this._dimDates();
      this._outputDates();

    },


    _showOverlay: function( event , type ) {

      event = event || "click";
      type = type || "month";

      var click = this.settings.overlayClick;
      var wheel = this.settings.overlayWheel;

      var format;

      var show = false;

      var m = this._active.month , 
          y = this._active.year;

      var current = moment([y,m,1]).lang( this.lang );



      if( event === "wheel" ) {
        if( wheel ) { 
          if( wheel === type || wheel === true ) { show = true; }
        }
      }

      if( event === "click" ) {
        if( click ) { 
          if( click === type || click === true ) { show = true; }
        }
      }


      if( type === "month" ) {
        format = 
          this.settings.overlayMonthFormat + 
          " " + 
          this.settings.overlayYearFormat;
      }

      if( type === "year" ) {
        format = 
          this.settings.overlayYearFormat;
      }
      

      if( show ) { 

        var $overlay = this._els.$pickerDateOverlay
        var str = current.format( format );

        $overlay.text( str );

        clearTimeout( this.overlayTimer );
        $overlay.addClass("ui-gdatepicker-overlay-visible");
        this.overlayTimer = setTimeout( function() {
          $overlay.removeClass("ui-gdatepicker-overlay-visible");
        }, this.settings.overlayDuration);

      }

    },






/***
*                                                                                  s               
*                                                                                 :8               
*                              u.    u.                 .u    .                  .88               
*         uL          .u     x@88k u@88c.      .u     .d88B :@8c        u       :888ooo      .u    
*     .ue888Nc..   ud8888.  ^"8888""8888"   ud8888.  ="8888f8888r    us888u.  -*8888888   ud8888.  
*    d88E`"888E` :888'8888.   8888  888R  :888'8888.   4888>'88"  .@88 "8888"   8888    :888'8888. 
*    888E  888E  d888 '88%"   8888  888R  d888 '88%"   4888> '    9888  9888    8888    d888 '88%" 
*    888E  888E  8888.+"      8888  888R  8888.+"      4888>      9888  9888    8888    8888.+"    
*    888E  888E  8888L        8888  888R  8888L       .d888L .+   9888  9888   .8888Lu= 8888L      
*    888& .888E  '8888c. .+  "*88*" 8888" '8888c. .+  ^"8888*"    9888  9888   ^%888*   '8888c. .+ 
*    *888" 888&   "88888%      ""   'Y"    "88888%       "Y"      "888*""888"    'Y"     "88888%   
*     `"   "888E    "YP'                     "YP'                  ^Y"   ^Y'               "YP'    
*    .dWi   `88E                                                                                   
*    4888~  J8%                                                                                    
*     ^"===*"`                                                                                     
*/
    

    // function that allows us to populate the datepicker
    // according to the data supplied.
    _populatePicker: function( direction, fast ) {

      var tempBody = 
        this._generateBody();
      
      var tempHead =
        this._generateHead();

      this._appendHead( tempHead );
      this._appendBody( tempBody );

      this._positionCurrentMonth( direction, fast );

      this._dimDates();
      this._highlightDates();

    },



    _generateBody: function( month, year ) {

      var html = "";

      // if month isn't supplied correctly, we use the current month.
      if( typeof( month ) !== "number" || ( month > 11 || month < 0 ) ) {
        month = this._active.month;
      }

      // if year isn't supplied correctly, we use the current year.
      if( typeof( year ) !== "number" || ( year < 1000 ) ) {
        year = this._active.year;
      }


    // Basically we cheat and pad the visible area with a month before,
    // and a couple after. This is to save on generating dom elements.
    // So technically there's only ever 5 months in the calendar.
    // But this means we always start a month before the current month.
      
      // set month to the month before.
      if ( month === 0 ) { 
        month = 11; 
        year -= 1; 
      } else { 
        month -= 1; 
      }

      html += this._generateRemainderDays( month, year );
      html += this._generateMonths( month, year );

      return html;

    },

    _generateRemainderDays: function( month , year ) {

    // This function figures out the remainder days in the last week of
    // the month previous to the one supplied. 
    // (if month is march, generate the remainder days in last week of april)

      var html = "",
          previousMonth,
          previousMonthYear,
          daysInPreviousMonth;

      // we need the month and year of the previous month.
      // eg: supplied: Jan 2012... then we need Dec 2011.
      if( month === 0 ) {
        previousMonth = 11;
        previousMonthYear = year - 1;
      } else {
        previousMonth = month - 1;
        previousMonthYear = year;
      }

      // store how many days were in the previous month
      daysInPreviousMonth = 
        this._getDaysInMonth( previousMonth , previousMonthYear );

      // offset is the first day of the week (0=sunday, 1=monday, 2=tuesday...)
      // if the offset is 0 we actually want to count down from 7, because
      // we show sunday as the last day in the week, not the first.
      var offset = moment([year,month,1]).day();
      if (offset === 0) { offset = 7; }

      // count down from the offset to populate all days in previous month
      var oday; 
      for( var o = offset-1; o > 0; o-- ) {

        oday = daysInPreviousMonth-o+1;
        html += "<span class=\"ui-gdatepicker-day ui-gdatepicker-previous-month\">";
        html += oday;
        html += "</span>";  
        
      }

      return html;

    },

    _generateMonths: function( beginMonth, beginYear ) {

      var html = "",
          currentYear = moment().year(),
          y = beginYear;

      // because of the scroll animation requires a lot of
      // extra space to move around, we set the rendered months
      // to 4 or 5, it could be less if there was no animation.

      for( var mo = beginMonth; mo < beginMonth+5; mo++ ) {
        
        // for each month we loop through, we need
        // to make sure it isn't past December. if it is,
        // we take away 12 , and add a year so that it equates to the right
        // month at the beginning of the next year
        var m = mo;
        if (mo > 11) { var m = mo-12; y = beginYear+1; }
        
        // get the current month's name and year number to show in the side.
        // but we dont want to show this year's number as it's implied.
        var yearname = "";
        var monthname = "";
       
          monthname = 
            moment([y,m,1])
              .lang( this.lang )
              .format( this.settings.sidebarMonthFormat );
          
          if( y !== currentYear ) { 
            yearname = 
              moment([y,m,1])
              .lang( this.lang )
              .format( this.settings.sidebarYearFormat );
          }

        var realdate = moment().date();
        var realmonth = moment().month();
        var realyear = moment().year();


        // get the number of days in the currently looped month
        var daysInMonth = this._getDaysInMonth(m,y);
        
        // find out the first day of month(m) and call it offset
        var offset = moment([y,m,1]).day();
        if (offset === 0) { offset=7; }
        
        for( var d = 1; d <= daysInMonth; d++ ) {

          // set some variables for styling the calendar
          // previous defines if the day being shown is in the first month
          // vertical defines the first day of a month
          // horizontal defines first week of the month

          var previous = ( mo === beginMonth ) ? "ui-gdatepicker-previous-month" : "";
          var vertical = ( d === 1 && offset > 1 ) ? "ui-gdatepicker-divider-left" : "";
          var horizontal = ( d <= 7 ) ? "ui-gdatepicker-divider-top" : "";
          var real = ( y === realyear && m === realmonth ) ? "ui-gdatepicker-current-month" : "";
          var today = ( y === realyear && m === realmonth && d === realdate ) ? "ui-gdatepicker-today" : "";
          var even = ( (m+1)%2===0 ) ? "ui-gdatepicker-even-month" : "";

          // build a html-string for this day.

          html += 
            "<span " +
              "id=\"gdp-"+this.uid+"-"+d+"-"+m+"-"+y+"\" " +
              "class=\"ui-gdatepicker-day "+even+" "+vertical+" "+horizontal+" "+previous+" "+real+" "+today+"\"" +
              "data-day=\""+d+"\"" +
              "data-month=\""+m+"\"" +
              "data-year=\""+y+"\"" +
              ">" + 
              d + 
            "</span>";
          
          // At the end of the first week, show the Month/Year,
          // at the end of other weeks show nothing.
          if( (offset+(d-1))%7 === 0 ) {
            if( (offset+(d-1)) < 8 ) {
              html += "<span class=\"ui-gdatepicker-monthname ui-gdatepicker-divider-top ui-gdatepicker-newline "+real+"\">"+monthname+" "+yearname+"</span><br>";
            } else {
              html += "<span class=\"ui-gdatepicker-newline "+even+" "+real+"\"></span><br>";
            }
          }
          
        }
        
      }

      return html;

    },

    _generateHead: function() {

      var html = "";

      for( var i=0; i<7; i++ ) {
        html += "<span class='ui-gdatepicker-day ui-gdatepicker-header-day'>";
        html += moment().lang( this.lang ).day(i).format( this.settings.headerDayFormat );
        html += "</span>";
      };

      return html;

    },

    _appendBody: function( html ) {

        // store a cache of the appended days for highlighting against.
        this._els.$pickerCache = $( html );
        this._els.$pickerBody.html( this._els.$pickerCache );

    },

    _appendHead: function( html ) {

      this._els.$pickerHead.html( html );

    },






/***
*                                 ..                                          .x+=:.   
*      .uef^"               x .d88"                                          z`    ^%  
*    :d88E                   5888R    .d``                       .u    .        .   <k 
*    `888E            .u     '888R    @8Ne.   .u        .u     .d88B :@8c     .@8Ned8" 
*     888E .z8k    ud8888.    888R    %8888:u@88N    ud8888.  ="8888f8888r  .@^%8888"  
*     888E~?888L :888'8888.   888R     `888I  888. :888'8888.   4888>'88"  x88:  `)8b. 
*     888E  888E d888 '88%"   888R      888I  888I d888 '88%"   4888> '    8888N=*8888 
*     888E  888E 8888.+"      888R      888I  888I 8888.+"      4888>       %8"    R88 
*     888E  888E 8888L        888R    uW888L  888' 8888L       .d888L .+     @8Wou 9%  
*     888E  888E '8888c. .+  .888B . '*88888Nu88P  '8888c. .+  ^"8888*"    .888888P`   
*    m888N= 888>  "88888%    ^*888%  ~ '88888F`     "88888%       "Y"      `   ^"F     
*     `Y"   888     "YP'       "%       888 ^         "YP'                             
*          J88"                         *8E                                            
*          @%                           '8>                                            
*        :"                              "                                             
*/

    // http://stackoverflow.com/a/1811003/1121532
    // zero-index; return days in month; 0=jan, 11=dec.
    _getDaysInMonth: function(m,y) {
      return /8|3|5|10/.test(m)?30:m==1?(!(y%4)&&y%100)||!(y%400)?29:28:31;
    },

    // return the amount of days difference
    // takes two date arrays: [year,month,day]
    _getDifferenceInDays: function(first,second) {
      return ( second !== null ) ? (
        Date.UTC( second[0] , second[1] , second[2] , 0 , 0 , 0 ) - 
        Date.UTC( first[0] , first[1] , first[2] , 0 , 0 , 0 )
        ) / 86400000 : null;
    },

    _getPlaceholder: function() {
      var ret;
      if( this.settings.placeholder === true ) {
        ret = els.$pickerElement.attr("placeholder");
      } else if ( this.settings.placeholder !== false ) {
        ret = this.settings.placeholder;
      } else {
        ret = moment().lang(this.lang).format( this.settings.formatOutput );
      }
      return ret;
    },

    _getNextDay: function( dateArray ) {

      // dateArray should be: [yyyy,mm,dd];
      dateArray = dateArray || this.selected.first;

      var output
      var refreshView = false;
      var days = this._getDaysInMonth( dateArray[1], dateArray[0] );

      dateArray[2] += 1;
      if ( dateArray[2] > days ) {
        dateArray[2] = 1;
        dateArray[1] += 1;
        refreshView = true;
        if( dateArray[1] > 11 ) {
          dateArray[1] = 0;
          dateArray[0] += 1;
        }
      }

      return { date: dateArray , refresh: refreshView };

    },

    _getPrevDay: function( dateArray ) {

      // dateArray should be: [yyyy,mm,dd];
      dateArray = dateArray || this.selected.first;

      var output
      var refreshView = false;
      var days = this._getDaysInMonth( dateArray[1], dateArray[0] );

      dateArray[2] -= 1;
      if ( dateArray[2] < 1 ) {
        dateArray[1] -= 1;
        refreshView = true;
        if( dateArray[1] < 0 ) {
          dateArray[1] = 11;
          dateArray[0] -= 1;
        }
        var days = this._getDaysInMonth( dateArray[1], dateArray[0] );
        dateArray[2] = days;
      }
      return { date: dateArray , refresh: refreshView };

    },

    // little helper to return the theme.
    // used like: $el.addClass( this._getTheme() );
    _getTheme: function() {

      var theme = "";
      if( this.settings.theme ) { 
        theme = "ui-gdatepicker-theme-"+ this.settings.theme; 
      }
      return theme;

    },

    _handleMouseWheel: function( e, delta ) {


      var directionIsUp = true;
      if( delta < 0 ) { directionIsUp = false }

      // trigger the up/down arrow clicks
      if( directionIsUp ) { 
        if( e.shiftKey ) {
          this._goBackAYear();
          this._showOverlay("wheel","year");
        } else {
          this._goBackAMonth();
          this._showOverlay("wheel","month");
        }        
      } else { 
        if( e.shiftKey ) {
          this._goForwardAYear();
          this._showOverlay("wheel","year");
        } else {
          this._goForwardAMonth();
          this._showOverlay("wheel","month");
        }      
      }
      
      // we stop the main window scrolling, or it'll be annoying
      e.preventDefault();

    },

    _goBackAMonth: function() {

      // figure out what the new months will be
      // if we go below jan, set to dec of previous year

      if( this._active.month === 0 ) {
        this._active.year -= 1;
        this._active.month = 11;
      } else {
        this._active.month -=1;
      }

      this._populatePicker( "up" );

    },

    _goForwardAMonth: function() {

      // figure out what the new months will be
      // if we go above dec, set to jan of next year
      if( this._active.month === 11 ) {
        this._active.year += 1;
        this._active.month = 0;
      } else {
        this._active.month +=1;
      }
      
      this._populatePicker( "down" );

    },    

    _goBackAYear: function() {

      // figure out what the new year will be
      this._active.year -= 1;
      this._populatePicker( "up", true );   

    },

    _goForwardAYear: function() {

      // figure out what the new year will be
      this._active.year += 1;
      this._populatePicker( "down", true );

    },

    _selectDay: function( direction, which ) {

      // direction should be next/previous;
      direction = direction || "next";
      which = which || "both";

      // set the first and last days, if they are not set.
      if( this.selected.first === null ) {
        this.selected.first = [ moment().year(), moment().month(), moment().date() ];
      }

      if( this.selected.last === null ) {
        this.selected.last = [ this.selected.first[0], this.selected.first[1], this.selected.first[2], ];
        this._selectFirstToggle = true;
      }

      // should we refresh the calendar?
      var refreshView = false;
      if( direction === "next" ) {

        // figure out the next day, and if we need to refresh the
        // months displayed in calendar
        var firstNext = this._getNextDay( this.selected.first );
        var lastNext = this._getNextDay( this.selected.last );
        this.selected.first = firstNext.date;
        this.selected.last = lastNext.date;
        refreshView = firstNext.refresh;

      } else if( direction === "previous" ) {
        
        // figure out the next day, and if we need to refresh the
        // months displayed in calendar
        var firstPrev = this._getPrevDay( this.selected.first );
        var lastPrev = this._getPrevDay( this.selected.last );
        this.selected.first = firstPrev.date;
        this.selected.last = lastPrev.date;
        refreshView = firstPrev.refresh;

      }

      // set the active month and year.
      this._active.month = this.selected.first[1];
      this._active.year = this.selected.first[0];
      
      // now refresh the month if we set it.
      if( refreshView ) {
        var scroll = ( direction === "next" ) ? "down" : "up";
        this._populatePicker( scroll , true );
      }

      // update the UI;
      this._highlightDates();
      this._dimDates();
      this._outputDates();

    },


    // this helper create formatted dates for the inputs
    _makeFormattedDates: function() {


      if( this.selected.first !== null ) {

        this.formatted.first.edit = 
          moment( this.selected.first )
            .lang(this.lang)
            .format( this._localLongFormat );

        this.formatted.first.view = 
          moment( this.selected.first )
            .lang(this.lang)
            .format( this.settings.formatOutput );

        this.formatted.first.hidden = 
          moment( this.selected.first )
            .lang(this.lang)
            .format( this.settings.format );

      } else {

        this.formatted.first = { edit: null, view: null, hidden: null };

      }

      if( this.selected.last !== null ) {

        this.formatted.last.edit = 
          moment( this.selected.last )
            .lang(this.lang)
            .format( this._localLongFormat );

        this.formatted.last.view = 
          moment( this.selected.last )
            .lang(this.lang)
            .format( this.settings.formatOutput );

        this.formatted.last.hidden = 
          moment( this.selected.last )
            .lang(this.lang)
            .format( this.settings.format );

      } else {

        this.formatted.last = { edit: null, view: null, hidden: null };

      }

    },

    // function for positioning the calendar
    position: function( offsetTop , offsetLeft ) {

      var $input = this._els.$pickerInput;

      var offset = {
        top: offsetTop || this.settings.position.top,
        left: offsetLeft || this.settings.position.left
      };

      var origin = {
        top: $input.offset().top + $input.outerHeight() ,
        left: $input.offset().left
      };

      this._els.$picker.css({
        "top": offset.top + origin.top , "left": offset.left + origin.left
      });

    },

    // this function sets the calendar inner's position so that the
    // current month is the one being shown.
    // it can do this staticly or animated.

    _positionCurrentMonth: function( direction, fast ) {

      // determine direction (up/down); and speed;
      var dir = direction || false;
      var f = fast || false;
      var pos = [ this._active.year , this._active.month , 1 ];

      var $body = this._els.$pickerBody;
      var $firstday = $body.find("#gdp-"+this.uid+"-"+pos[2]+"-"+pos[1]+"-"+pos[0]);

      // we use a 'trick' to position the body if the datepicker
      // is hidden; this is because we cannot get positions of hidden elements
      var trick = this._els.$picker.is(':hidden');
      if( trick ) { 
        this._els.$picker.css({ display: 'block' , opacity: '0' }); 
      }

      // find out height of a day (can change via CSS)
      var height = $body.find(".ui-gdatepicker-day").first().outerHeight();
      // get the offset of first day of active month
      var offset = $firstday.position().top;
      // get current scrollTop of body
      var current = $body.scrollTop();
      // see if the body has padding at the top
      var padding = parseInt($body.css("padding-top"),10);
      // set the final scroll destination
      var destination = current + offset - height - padding;
      // set the speed and half it if we've set fast.
      var speed = this.settings.scrollSpeed;
      if( f ) {  speed *= 0.5; }

      if( dir === "up" ) {

        // we find out how many days there are before the current month
        // and then we find out how many days in current month
        // and then add them together and divide by 7 to find the
        // number of weeks/rows ... 
        var count = $firstday.prevAll(".ui-gdatepicker-day").length;
        var dim = this._getDaysInMonth( this._active.month , this._active.year );
        var rows = Math.floor((count + dim) / 7);

        // we then quickly scroll down to the nth row
        // and then animate back up to the current date.
        $body.scrollTop( (rows) * height );
        $body.stop().animate({ "scrollTop": destination }, speed );

      } else if( dir === "down" ) {

        // because we always have exactly one month placed
        // before the current month, we can just set the scroll
        // to the top, and scroll down to current date.
        $body.scrollTop( 0 );
        $body.stop().animate({ "scrollTop": destination }, speed );

      } else {

        // scroll the body statically to show the current month
        $body.scrollTop( destination );

      }

      // put things back how we found them. good boy.
      if( trick ) { this._els.$picker.css({ display: '' , opacity: '' }); }

    },



    // returns an array from either a previous array
    // or from a element using the elements data-tags.
    _selectedDateArray: function( what ) {

      var selectWhat;

      if( what ) {
        
        if( $.type( what ) === "array" ) {
          
          return what;
        


        } else if ( $.type( what ) === "object" ) {
          
          return [
            parseInt( $( what ).data('year') , 10 ) , 
            parseInt( $( what ).data('month') , 10 ) , 
            parseInt( $( what ).data('day') , 10 ) 
          ];   



        } else {
          
          throw new Error("Incorrect parameter: 'what' in function: _selectedDateArray();");
          
        }
        
      }

    },



    _initInputs: function() {

      // split the "hidden" input element's value
      var inputDate = 
        this._els.$pickerElement.val().split( this.settings.divider );
      
      var momentDate;

      // if we are range-inputting
      if( this.settings.selectRange ) {

        var pickLast = false;

        // store formatted moment() dates.
        momentDate = { 
          first: moment( inputDate[0] , this._localLongFormat ) , 
          last: moment( inputDate[1] , this._localLongFormat ) 
        };

        // if we don't supply 2 dates as the value="" in teh HTML,
        // then we want the "first pickable date" to be the "last date"
        if( !inputDate[1] ) { 
          momentDate.last = momentDate.first; 
          pickLast = true;
        }

        this._els.$pickerElement.val("");

        if( momentDate.first.isValid() ) {
          
          if( !momentDate.last.isValid() ) {
            momentDate.last = momentDate.first;
          }

          this.selectDate( momentDate.first.toArray() );
          this.selectDate( momentDate.last.toArray() );

          if( pickLast ) {
            this._selectFirstToggle = false;
          }

        }

      } else {
        
        // store formatted moment() date.
        momentDate = moment( inputDate[0] , this._localLongFormat );

        // if the input date is not falsey
        if( inputDate[0] ) {
          
          this._els.$pickerElement.val("");
          if( momentDate.isValid() ) {
            this.selectDate( momentDate.toArray() );
          }
        }
      }


    }




  };






/***
*       ..                                                            ..      s       .x+=:.   
*     dF                      oec :                             x .d88"      :8      z`    ^%  
*    '88bu.                  @88888                 x.    .      5888R      .88         .   <k 
*    '*88888bu        .u     8"*88%        u      .@88k  z88u    '888R     :888ooo    .@8Ned8" 
*      ^"*8888N    ud8888.   8b.        us888u.  ~"8888 ^8888     888R   -*8888888  .@^%8888"  
*     beWE "888L :888'8888. u888888> .@88 "8888"   8888  888R     888R     8888    x88:  `)8b. 
*     888E  888E d888 '88%"  8888R   9888  9888    8888  888R     888R     8888    8888N=*8888 
*     888E  888E 8888.+"     8888P   9888  9888    8888  888R     888R     8888     %8"    R88 
*     888E  888F 8888L       *888>   9888  9888    8888 ,888B .   888R    .8888Lu=   @8Wou 9%  
*    .888N..888  '8888c. .+  4888    9888  9888   "8888Y 8888"   .888B .  ^%888*   .888888P`   
*     `"888*""    "88888%    '888    "888*""888"   `Y"   'YP     ^*888%     'Y"    `   ^"F     
*        ""         "YP'      88R     ^Y"   ^Y'                    "%                          
*                             88>                                                              
*                             48                                                               
*                             '8                                                               
*/

  $.fn.gdatepicker.defaults = {

    placeholder: false,
    // boolean, string:  
    // eg: "Pick me!" / false / true
    // generated input's placeholder.
    // false (default) = match the desired input string (MM/DD/YYYY for US).
    // true = get placeholder from original input
    // string = use the supplied string
                            
    selectRange: false,
    // number, boolean
    // eg: 14,
    // maximum length of the range of dates allowed to pick.
    // a large number will result in slow performance

    divider: " - ",
    // string
    // eg: -
    // a string divider to put between ranged dates.
    
    language: "en",
    // string
    // eg: "cn",
    // language to use for date formatting,
    // make sure you've downloaded your language from momentjs.com

    sidebarMonthFormat: "MMMM",
    // string
    // eg: "MMM"
    // the format for the months in the sidebar
    // http://momentjs.com/docs/#/displaying/format/
        
    sidebarYearFormat: "YYYY",
    // string
    // eg: "YY"
    // the format for the years in the sidebar
    // http://momentjs.com/docs/#/displaying/format/
    
    overlayMonthFormat: "MMM",
    // string
    // eg: "MMM"
    // the format for the months in the overlay
    // http://momentjs.com/docs/#/displaying/format/
   
    overlayYearFormat: "YYYY",
    // string
    // eg: "YYYY"
    // the format for the years in the overlay
    // http://momentjs.com/docs/#/displaying/format/

    headerDayFormat: "dd",
    // string
    // eg: "ddd"
    // the format of the days in the column headers
    // http://momentjs.com/docs/#/displaying/format/

    format: "L",
    // string 
    // eg: "DD.MM.YY"
    // format of original input
    // http://momentjs.com/docs/#/displaying/format/
              
    formatOutput: "MMMM Do, YYYY",
    // string
    // eg: "dd of MMMM, yyyy" 
    // format of generated output(s)
    // http://momentjs.com/docs/#/displaying/format/
                            
    position: { top: 3, left: 0 },                  
    // array
    // eg: [0,0] 
    // offset position of calendar
              
    scrollSpeed: 300,                  
    // integer
    // eg: 300
    // how fast the calendar scrolls up and down
              
    overlayWheel: true,                 
    // string, bool
    // eg: true, false, "month", "year"
    // do we show the overlay for scrolling months/years on mousewheel
              
    overlayClick: "year",                 
    // string, bool
    // eg: true, false, "month", "year"
    // do we show the overlay for scrolling months/years on click
    
    overlayDuration: 1000,                 
    // number
    // eg: 500
    // how long to show the overlay
              
    theme: false,                  
    // string, bool
    // eg: false, "dark", "mint", "..."
    // sets the css theme style, supply your own string for custom

  };



})(jQuery);
