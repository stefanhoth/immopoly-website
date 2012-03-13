<style type="text/css">
	body{
		background-color: black; 
		color: #DDD;
		padding: 10px;
	}

	h2, h2 a{
		color: #ff7500;
		clear: both;
	}

	ul {
		padding: 0;
		margin: 0;
	}

	li {
		list-style-type: none;
	}

	li img {
		vertical-align: middle;
		height: 40px;
	}

	li span {
		vertical-align: middle;
		font-weight: bold;
	}		

	li a.btn {
		width: 120px;
		text-align: left;
		margin-bottom: 10px;
		margin-right: 10px;
		float: left;
	}
	
</style>
<script type="text/javascript">
	// anchors ala href="#map" klappen nur einmal, wenn man zurückscrollt und nochmal 
	// den selben link klickt passiert nüscht - deshalb so:
	function go2anchor( anchor ) {
		document.location.hash = "";
		document.location.hash = anchor;
	}
</script>

	<h2>Hauptnavigation</h2>
	<p>In der obersten Zeile der App findest Du folgende Symbole. Klicke auf eines, um mehr über dessen Funktion zu erfahren.</p>
	<ul>
			<li>
				<a class="btn" onclick="go2anchor('#map');">
					<img src="img/helpandroid/ic_tab_map.png" />
					<span>Suchkarte</span>
				</a>
			</li>
			<li>
				<a class="btn" onclick="go2anchor('#portfolio');">
					<img src="img/helpandroid/ic_tab_portfolio.png"    />
					<span>Portfolio</span>
				</a>
			</li>
			<li>
				<a class="btn" onclick="go2anchor('#profile');">
					<img src="img/helpandroid/ic_tab_profile.png"    />
					<span>Profil</span>
				</a>
			</li>
			<li>
				<a class="btn" onclick="go2anchor('#history');">
					<img src="img/helpandroid/ic_tab_history.png"    />
					<span>Historie</span>
				</a>
			</li>
		</ul>

	<h2><a name="map">Suchkarte</a></h2>
	Hier kannst du nach Wohnungen in deiner Umgebung suchen und
	versuchen, diese zu übernehmen.
	
	<ul>
		<li><img src="img/helpandroid/house_old.png"    /><span>Altes Wohnungsangebot (älter als 30 Tage)</span></li>
		<li><img src="img/helpandroid/house.png"        /><span>Mittelaltes Wohnungsangebot (7 bis 30 Tage alt)</span></li>
		<li><img src="img/helpandroid/house_new.png"    /><span>Neues Wohnungsangebot (max. 7 Tage alt)</span></li>
		<li><img src="img/helpandroid/house_mine.png"   /><span>Deine Wohnung</span></li>
		<li><img src="img/helpandroid/house_cluster.png"/><span>mehrere Wohnungsangebote (Auswahlansicht)</span></li>
	</ul>

	<h2><a name="portfolio">Portfolio</a></h2>
	Verwalte deinen Wohnungsbestand und gib unrentable Wohnungen wieder ab. 
	Mit dem Knopf unten rechts kannst du zwischen Listen- und Kartenansicht umschalten. 		
	
	<h2><a name="profile">Profil</a></h2>
	Zeigt dir Infos zu deinem Avatar und deinen Errungenschaften.

	<h2><a name="history">Historie</a></h2>
	Hier werden die letzten Spielereignisse angezeigt.
