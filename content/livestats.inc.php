<h1>Live</h1>
<p>
	Kein Spiel ohne Bestenliste! Hier siehst Du wer gerade die Top-Liste anführt und was die anderen Spieler zuletzt so getrieben haben, um die Spitze zu erklimmen.
</p>

<div class="row">
	<div class="span6">
		<h2>Die monatlichen Top-Makler</h2>
		<table id="top_list" class="table-striped table-bordered table-condensed"> 
			 <colgroup>
					 <col class="rank"></col>
					 <col class="name"></col>
					 <col class="balance"></col>
					 <col class="balanceMonth"></col>
			 </colgroup> 
			 <thead> 
					 <tr> 
							 <th>Platz</th> 
							 <th>Name</th> 
							 <th>Kontostand</th>
							 <th>monatl. Umsatz</th>
					 </tr>
			 </thead>
			 <tbody>
					 <tr class="loading">
							 <td colspan="5" class="center">
									 <img src="img/layout/ajax-loader.gif" alt="Lade..."/>
									 <p>Lade Daten...</p>
							 </td>
					 </tr>
			 </tbody>
	 	</table>
	</div>
	<div class="span6">
		<h2>Die letzten Aktionen im Spiel (Gesamthistorie)</h2>

		 <table id="history_list"  class="table-striped history table-bordered table-condensed"> 
				 <colgroup>
						 <col class="name"></col>
						 <col class="date"></col>
						 <col class="event"></col>
				 </colgroup>
				 <thead> 
						 <tr> 
								 <th>Name</th> 
								 <th>Datum</th> 
								 <th>Ereignis</th> 
						 </tr>
				 </thead>
				 <tbody>
						 <tr class="loading">
								 <td colspan="3" class="center">
										 <img src="img/layout/ajax-loader.gif" alt="Lade..."/>
										 <p>Lade Daten...</p>
								 </td>
						 </tr>
				 </tbody>
		 </table>
	</div>
</div>
<hr/>
<div class="row">
	<div class="span10 offset1 center">
		<h2>Immopoly - Deutschlandweit die neuesten 250 Wohnungen unserer Makler</h2>
		<div id="heatmapArea">
			
		</div>
	</div>
</div>	