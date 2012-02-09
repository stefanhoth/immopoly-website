/**    	
 *  functions for main page	
 */ 

    //working without network traffic
    var localmode = false;

    if(window.location.hostname == "immopoly.local"){
    	localmode = true;
    }
    
    //activates debug output
    var debugmode = false;	
    
    /**
     * loads the data for the calltype via JSON-request and updates the given table-id with the data, if parseable
     * @param id table to update
     * @param callType type of call to make for JSON
     * @param startVal on list functions for paging results (default: 0)
     * @param endVal on list functions for paging results (default: 10)
     */
	function updateTable(id, callType, startVal, endVal){
  		
		//check values
  		if(typeof id == "undefined" || typeof callType == "undefined"){
  			return; 
  		}
  		
  		if(typeof startVal == "undefined"){
  			startVal = 0;
  		}
  		
  		if(typeof endVal == "undefined"){
  			endVal  = 10;
  		}
  		
  		if(localmode){
  			//load static files instead of connecting to the live server
  			url = "/"+callType+".json";
  		}else{
  			url = "ajaxproxy.php?mode=native&url="+escape("http://immopoly.appspot.com/user/"+callType+"?start="+startVal+"&end="+endVal);
  		}
  		
  		//alert("Loading data from '"+url+"'");
  		
  		$.getJSON(url, function(jsonData){
  			
  			logger(jsonData);
  			//alert(jsonData);
  			
  			runtimeError = false;

  			//test data before disable the loader
  			$(jsonData).each(function(intIndex){

  				entry = objectToArrayVar(callType, jsonData[intIndex], startVal+intIndex);
  				
  				if(entry == null){
  					runtimeError = true;
  				}

  				return;  				
  			});
  			
  			if(runtimeError){
  				return;
  			}
  			
  			//delete ajax indicator
  			$("#"+ callType +"_list tr.loading").remove();
  			
  			//add the entries
  			$(jsonData).each(function(intIndex){

  				entry = objectToArrayVar(callType, jsonData[intIndex], intIndex);
  				
  				if(entry == null){
  					runtimeError = true;
  					return;
  				}
  				
  				row = buildTableRow(entry)
  				logger(row);
  				$("#"+ callType +"_list tbody").append(row);
  			});
 			
  			//do nothing more on parse errors
  			if(runtimeError){
  				return;
  			}

        //reassign rank numbers
        if(callType == "top"){
          
          var rank = 1;

          $("#"+ callType +"_list tr td:first-child").each(function(){
            $(this).html(rank++);            
          });

          $("#"+ callType +"_list tr td:nth-child(3)").addClass("right");
          $("#"+ callType +"_list tr td:nth-child(4)").addClass("right");

        }

  		});
  		
  	}
	
	/**
	 * converts our json-objects into arrays of strings
	 * @param callType defines how the object should be handled
	 * @param jsonData the json-object to convert
	 * @param intIndex helper index to handle lists better
	 * @returns {Array} of object instances
	 */
	function objectToArrayVar(callType, jsonData, intIndex){
		
		var entryData = new Array();
		
		switch (callType) {
		case "top":
			
			user = jsonData["org.immopoly.common.User"];
			
			entryData.push( "" );
			entryData.push( user.username );
			entryData.push( formatMoney(user.info.balance) );
			entryData.push( formatMoney(user.info.balanceMonth) );
						
			break;
		case "history":
			historyObj = jsonData["org.immopoly.common.History"];
			
			dateString = new Date(historyObj.time).toRelativeTime();
			
			logger(historyObj);
			logger(historyObj.username);
			
			if(typeof historyObj == "undefined" || typeof historyObj.username == "undefined"){
				return null;
			}
			
			entryData.push(historyObj.username);
			entryData.push(dateString);
			text = historyObj.text;

      //coloring actions
      text = text.replace(/(Provision:.+Eur)/,"<span class=\"btn-success btn-small\">$1</span><br/>");
      text = text.replace(/(Belohnung:.+Eur)/,"<span class=\"btn-success btn-small\">$1</span><br/>");
      text = text.replace(/(Strafe:.+Eur)/,"<span class=\"btn-danger btn-small\">$1</span><br/>");
      text = text.replace(/(Miete:.+Eur)/,"<span class=\"btn-danger btn-small\">$1</span><br/>");
      text = text.replace(/(Übernahmekosten:.+Eur)/,"<span class=\"btn-warning btn-small\">$1</span><br/>");

			if(historyObj.exposeId && historyObj.type != 2)
				text=text+" <a class='btn btn-small pull-right' href='http://www.immobilienscout24.de/expose/"+historyObj.exposeId+"' target='_new'>Exposé öffnen &raquo;</a>"
			entryData.push(text);

			break;

		}
		
		return entryData;
	}
  	
	/**
	 * obvious function name is obvious
	 * @param entry String array, each entry will be wrapped in <td>-element
	 * @returns {String}
	 */
  	function buildTableRow(entry){
  		
  		var row = "<tr>";
  		$(entry).each(function(intIndex){
  			
  			row += "<td>"+entry[intIndex]+"</td>";
  		});
  		
  		return row+"</tr>"
  	}
  	
  	/**
  	 * formats the given field as currency value
  	 * @param number number to format
  	 * @param currency string for currency to attach
     * @param German format? Defaults to true
  	 * @returns formatted value
  	 */
  	function formatMoney(number, currency, isGerman){
  		
      if(typeof currency == "undefined"){
        currency = "Eur";
      }

  		if(typeof isGerman == "undefined"){
  			isGerman = true;
  		}
  		
  		if(isNaN(parseFloat(number))){
  			return number;
  		}


      number = parseFloat(number).toFixed(2);

      if(! isGerman){
        return number + " " + currency;
      }

      var numberString = ""+number; // make it a String
      numberString = numberString.replace(".",",");

      var s = 0;
      if( numberString.indexOf("-") > -1 ){
        s=1; // negative ?
      } 

      for( i = numberString.length-6; i > s; i-=3 ){ //Start at index 3 (+3 for decimal and comma) from the end, decrement 3 each loop
      
        numberString = numberString.substring( 0, i ) + "." + numberString.substring( i ); // insert dots
      }

  		return numberString + " " + currency;
  	}
  	  	
  	/**
  	 * adds a leading zeros to number
  	 * @param number
  	 * @param length
  	 * @returns {String}
  	 */
  	function pad(number, length) {
  	   
  	    var str = '' + number;
  	    while (str.length < length) {
  	        str = '0' + str;
  	    }
  	   
  	    return str;

  	}
  	
  	/**
  	 * links a username to his userprofile
  	 * @param field field to update with the link
  	 * @returns jQuery field on success, void otherwise
  	 */
  	function linkUserprofile(field){
  		
  		if(typeof field == "undefined"){
  			$this = $(this);
  		}else if($(field).length > 0){
  			$this = $(field).eq(0);  			
  		}else{
  			return;
  		}
  		
  		url = "/user/profile/"+$this.html();
  		$this.html('<a href="'+url+'" title="Userprofil anzeigen...">'+ $this.html()+ '</a>');
  		
  		return $this;
  	}
  	
  	/**
  	 * wrapper for safe logging (tests if console.log exists and if debugmode is true)
  	 * @param message
  	 */
  	function logger(messageObj){
  		
  		//make sure we have console attached
  		if(typeof console == "undefined" || typeof console.log == "undefined"){
  			return;
  		}
  		
  		if(typeof debugmode == undefined || debugmode == false){
  			return;
  		}
  		
  		console.log(messageObj);
  	}


    function initHeatmap(){
      
      var myLatlng = new google.maps.LatLng(51.522416,9.931641); //Göttingen
      var myOptions = {
        zoom: 5,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: false,
        scrollwheel: true,
        draggable: true,
        navigationControl: true,
        mapTypeControl: false,
        scaleControl: true,
        disableDoubleClickZoom: false
      };

      map = new google.maps.Map(document.getElementById("heatmapArea"), myOptions);
      heatmap = new HeatmapOverlay(map, {"radius":15, "visible":true, "opacity":60});
  
      //request immopoly
      $.ajax({
        url: "http://immopoly.org/ajaxproxy.php?mode=native&url"+escape("http://immopoly.appspot.com/statistic/heatmap?type=takeover"),
        context: document.body,
        data:{'type':'takeover'},
        dataType:"json",
          success: function(data){
            logger('login response '+JSON.stringify(data) );
            heatmap.setDataSet(data);
          },
          error: function(){
            logger('error initializing HeatMap');
          }
      });

  }



/**
 * Returns a description of this past date in relative terms.
 * Takes an optional parameter (default: 0) setting the threshold in ms which
 * is considered "Just now".
 *
 * Examples, where new Date().toString() == "Mon Nov 23 2009 17:36:51 GMT-0500 (EST)":
 *
 * new Date().toRelativeTime()
 * --> 'Just now'
 *
 * new Date("Nov 21, 2009").toRelativeTime()
 * --> '2 days ago'
 *
 * // One second ago
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime()
 * --> '1 second ago'
 *
 * // One second ago, now setting a now_threshold to 5 seconds
 * new Date("Nov 23 2009 17:36:50 GMT-0500 (EST)").toRelativeTime(5000)
 * --> 'Just now'
 *
 */
Date.prototype.toRelativeTime = function(now_threshold) {
  var delta = new Date() - this;

  now_threshold = parseInt(now_threshold, 10);

  if (isNaN(now_threshold)) {
    now_threshold = 0;
  }

  if (delta <= now_threshold) {
    return 'Gerade jetzt';
  }

  var units = null;
  var conversions = {
    Millisekunde: 1, // ms    -> ms
    Sekunde: 1000,   // ms    -> sec
    Minute: 60,     // sec   -> min
    Stunde:   60,     // min   -> hour
    Tag:    24,     // hour  -> day
    Monat:  30,     // day   -> month (roughly)
    Jahr:   12      // month -> year
  };

  for (var key in conversions) {
    if (delta < conversions[key]) {
      break;
    } else {
      units = key; // keeps track of the selected key over the iteration
      delta = delta / conversions[key];
    }
  }

  // pluralize a unit when the difference is greater than 1.
  delta = Math.floor(delta);
  if (delta !== 1) { 
    if(units.charAt(units.length-1) == "e"){
      units += "n";  
    }else{
      units += "en";
    }
  }
  return ["vor",delta, units].join(" ");
};

/*
 * Wraps up a common pattern used with this plugin whereby you take a String
 * representation of a Date, and want back a date object.
 */
Date.fromString = function(str) {
  return new Date(Date.parse(str));
};


