supplied_asset = "";
progress = "";
input_string = "";
compare = false;	

full_text = {
contents: "",
add:	function(x){
this.contents = this.contents.concat(x.toString() + "\n");
},
customize: function(player, island){
	this.contents = this.contents.replace(/\[PLAYER\]/g, player);
	this.contents = this.contents.replace(/\[ISLAND\]/g, island);
}
};

	
$(document).ready(function(){
	$('[data-toggle="popover"]').popover();
	cls();
	parse_milestones();	
	solidify();
}
);

function cls(){
	$("#main-bit").text("");
	full_text.contents = "";
};

function debug_func(){
	cls();
	toggle_comparison();
	parse_milestones();
	full_text.customize("Tinsin","Sugarsap");
	solidify();
};

function parse_input(){
	$('[data-toggle="popover"]').popover();
	
	cls();
	toggle_comparison();
	parse_milestones();
	userfunc = input_string.split("\n")[0].split("|");
	full_text.customize(userfunc[0], userfunc[1]);
	solidify();
};




function parse_milestones(){
	
	cls();
	
	var deck = milestones;
	
	var cardcount = Object.keys(deck.cards).length;
	
	if (compare == true){
			input_string = document.getElementById("input").value;
	};
	
	
		//adding title
		full_text.add("<h1 class='text-center'>[PLAYER] from [ISLAND]</h1>");
	
	
	for (var n=0; n<cardcount; n++){
		var current = deck.cards[n];
		console.log("Parsing " + current.name + "...");
		//adding header
		full_text.add("<h4 class='text-left'>" + current.name + "</h4>\n");
		//starting compare bar
		full_text.add('<div class="progress" style="height:25px">');
		
		//binary handler
		if (current.type == "b"){
			
			var slots = current.max;
			var slotwidth = 100/current.max;
			for (i = 0; i < slots; i++){
				if (i % 2 == 0){
				full_text.add('<div class="progress-bar bg-info" style="width:'+ slotwidth +'%">');
				}else{
				full_text.add('<div class="progress-bar bg-info progress-bar-striped" style="width:'+ slotwidth +'%">');
				};
				full_text.add("<a href='#' data-toggle='popover' data-trigger='hover' title='"+ current.milestones[i].requirement+"' data-content='" + current.milestones[i].modi + " / " + current.milestones[i].noun +  "'>");
				full_text.add(current.milestones[i].requirement);
				full_text.add('</a>');
				full_text.add("</div>");
			};
		};
		
		//progress handler
		if (current.type == "p"){
			var maximum = current.max;
			milestone_size = Object.keys(current.milestones).length;
			current_prog = 0;
			prev_prog = 0;
			for (i = 0; i < milestone_size; i++){
				//current milestone
				curmil = current.milestones[i];
				var slotwidth = (curmil.quantity - prev_prog)/maximum * 100;
				if (i % 2 == 0){
				full_text.add('<div class="progress-bar bg-info" style="width:'+ slotwidth +'%">');
				}else{
				full_text.add('<div class="progress-bar bg-info progress-bar-striped" style="width:'+ slotwidth +'%">');
				};
				var requirement = current.prefix + curmil.quantity + current.suffix;
				full_text.add("<a href='#' data-toggle='popover' data-trigger='hover' title='"+ requirement +"' data-content='" + curmil.modi + " / " + curmil.noun +  "'>");
				full_text.add(curmil.quantity);
				full_text.add('</a>');
				full_text.add("</div>");
				
				
				
				prev_prog = current.milestones[i].quantity;
			};
			
	
		};
		//ending compare bar
		full_text.add("</div>");
		
		
		
		//start user bar
		if (compare == true){
			if (current.type == "p"){
				full_text.add("<div id='personal' class='collapse show'>");
				full_text.add("<div class='progress'>");
				supplied_asset = input_string.split("\n");
				progress = parseInt(supplied_asset[n+1].split("|")[1]);
				finalnum = 0;
				finalnum = (progress / maximum) * 100;
				barcolor = " bg-success";
				if (finalnum >= 100){
					finalnum = 100;
					barcolor = barcolor + " progress-bar-striped progress-bar-animated";
				};
				echo(supplied_asset[n+1].split("|")[0]);
				full_text.add("<div class='progress-bar" + barcolor + "' style='width:"+ finalnum +"%'>");
				full_text.add(finalnum + "%");
				full_text.add("</div>");
				full_text.add("</div>");
				full_text.add("</div>");
				
			};
			if (current.type == "b"){
				full_text.add("<div id='personal' class='collapse show'>");
				full_text.add("<div class='progress'>");
				supplied_asset = input_string.split("\n");
				progress = supplied_asset[n+1].split("|")[1];
				var bin = progress.split("");
				var size = get_length(bin);
				var slotwidth = 100/size;
				var barcolor = "bg-success";
				for (i in bin){
					if (i % 2 == 0){
						barstripes = "";
					}else{
						barstripes = " progress-bar-striped";
					};
					if (bin[i] == "O"){
						full_text.add("<div class='progress-bar bg-success" + barstripes + "' style='width:"+ slotwidth +"%'>&check;</div>");
					}else{
						full_text.add("<div class='progress-bar bg-secondary" + barstripes + "'  style='width:"+ slotwidth +"%'>&cross;</div>");
					};
				};
				full_text.add("</div>");
				full_text.add("</div>");
			};
			
		};
	};
};

function solidify(){
	$("#main-bit").append(full_text.contents);
};

function toggle_comparison(){
	compare = true;
};

function get_length(x){
	return Object.keys(x).length;
}

function echo(x){
	console.log(x);
}