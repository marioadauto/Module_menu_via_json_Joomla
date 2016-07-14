jQuery(document).ready(function(){
    language = document.documentElement.lang;
    Callmenu();    
});
// Função de marcação do menu
function Abre() {
    jQuery('.menulateral').mmenu({
                extensions      : [ 'widescreen', 'theme-white', 'effect-menu-slide', 'pagedim-black' ],
                searchfield     : {
                    resultsPanel    : true
                },
                setSelected     : {
                    parent          : true
                }
        });
    if (language == "en-gb"){
                       var cache = jQuery.jStorage.get("menuen");
     }
    if(language == "pt-pt"){
                        var cache = jQuery.jStorage.get("menu-mobile");
     }      
    if(!cache){
        console.log("nao existe cache");
    }
    else{
        jQuery( ".mm-panel" ).removeClass( "mm-opened mm-current" );
        var pagsel =  jQuery(".menulateral").find( "#"+cache );
        var father = pagsel.parentsUntil(".mm-panels");
        jQuery(father).removeClass( "mm-hidden" );      
        jQuery(father).addClass( "mm-opened mm-current" );
        jQuery(pagsel.parent()).addClass( "mm-selected" );
    }   
    return false;
};
//Função que insere o conteúdo do menu
function Callmenu(){
    var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("get", url, true);
    xhr.responseType = "json";
    xhr.onload = function() {
    var status = xhr.status;
        if (status == 200) {
            callback(null, xhr.response);
        } else {
            callback(status);
            }
        };
    xhr.send();
    };
    getJSON(document.location.origin+ "/modules/mod_menujson/json/menu"+language+".json",
      function(err, data) {
          if (err != null) {
          alert("Something went wrong: " + err);
        } else {
           var dados = data;
           console.log(document.location.origin+ "/modules/mod_menujson/json/menu"+language+".json");
           Menu(dados);
           return dados;
        }
      }
    );
//Função de construção do menu
function Menu(dados){
    var builddata = function () {
    var source = [];
    var items = [];
    // build hierarchical source.
    for (i = 0; i < dados.length; i++) {
        var item = dados[i];
        var label = item["title"];
        var parentid = item["parent_id"];
        var id = item["id"];
        var link = item["link"];
		if (items[parentid] ) {
            var item = { parentid: parentid, label: label, item: item, link: link, id: id };
            if (!items[parentid].items) {
                items[parentid].items = [];
            }

            items[parentid].items[items[parentid].items.length] = item;
            items[id] = item;
        }
        else {
            items[id] = { parentid: parentid, label: label, item: item, link: link, id: id };
            source[id] = items[id];
        }
    }
    return source;
    }
    var source = builddata();
    var buildUL = function (parent, items) {
        jQuery.each(items, function () {
            if (this.label) {  

                if(this.link == "index.php?Itemid="){
                    var li = jQuery("<li ><span id="+this.id+" class='guardarficha'>"+ this.label +"</span></li>");
                }  
                else{
   
                     var li = jQuery("<li ><a href=" + this.link + " id="+this.id+" class='guardarficha'>"+ this.label +"</a></li>");
                }
                li.appendTo(parent);
                if (this.items && this.items.length > 0) {
                    var ul = jQuery("<ul></ul>");
                    ul.appendTo(li);
                    buildUL(ul, this.items);
                }
            }
        });
    }
    var ul = jQuery("<ul></ul>");
    ul.appendTo("#menu-mobile");
    buildUL(ul, source);
    jQuery('.guardarficha').on( 'click',
                function( e )
                {  var Btnselecionado = jQuery(this).attr("id"); 
                    jQuery.jStorage.flush();
                    if (language == "en-gb"){
                        jQuery.jStorage.set("menuen", Btnselecionado );
                    }
                    if(language == "pt-pt"){
                        jQuery.jStorage.set("menu-mobile", Btnselecionado );
                    }
     
                }
    );
    jQuery("#101").empty();
	jQuery("#101").append( "<a href='/'  class='guardarficha-home' style='color:#fff;'>Início</a>");
}


}
