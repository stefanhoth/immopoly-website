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
  				entry = objectToArrayVar(callType, jsonData[intIndex], intIndex);
  				
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


        if(callType == "history"){
          $('#history_list td a').each(function(){
              $this = $(this);

              if($this.hasClass("btn-small")){
                return;
              }
              $this.addClass("btn btn-small pull-right");
              $this.html("");
          });
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
			
			entryData.push( intIndex+1 ); //Rank is index+1
			entryData.push( user.username );
			entryData.push( formatMoney(user.info.balance) );
			entryData.push( formatMoney(user.info.balanceMonth) );
						
			break;
		case "history":
			history = jsonData["org.immopoly.common.History"];
			
			date = new Date(history.time);
			dateString =  date.getDate() + "." + pad((date.getMonth() + 1),2) + "." + date.getFullYear() + "&nbsp;" + date.getHours() + ":" + pad(date.getMinutes(),2);
			
			logger(history);
			logger(history.username);
			
			if(typeof history == "undefined" || typeof history.username == "undefined"){
				return null;
			}
			
			entryData.push(history.username);
			entryData.push(dateString);
			text = history.text;
			if(history.exposeId && history.type != 2)
				text=text+" <a class='btn btn-small pull-right' href='http://www.immobilienscout24.de/expose/"+history.exposeId+"' target='_new'>Exposé öffnen &raquo;</a>"
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
  	 * @returns formatted value
  	 */
  	function formatMoney(number,currency){
  		
  		if(typeof currency == "undefined"){
  			currency = "Eur";
  		}
  		
  		if(isNaN(parseFloat(number))){
  			return number;
  		}

  		return parseFloat(number).toFixed(2)+ " " + currency;
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
  
  	//do on start
    $(document).ready(function() 
      { 
		updateTable("#top_makler","top");
		updateTable("#history_list","history");
      } 
    ); 
    
