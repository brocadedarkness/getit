(function(){

  // lägsta version av jquery som accepteras
  var v = "1.3.2";

  // kolla om jquery är laddat och vilken version
  if (window.jQuery === undefined || window.jQuery.fn.jquery < v) {
    var done = false;
    var script = document.createElement("script");
    script.src = "http://ajax.googleapis.com/ajax/libs/jquery/" + v + "/jquery.min.js";
    script.onload = script.onreadystatechange = function(){
      if (!done && (!this.readyState || this.readyState == "loaded" || this.readyState == "complete")) {
        done = true;
        initDeliveryBookmarklet();
      }
    };
    document.getElementsByTagName("head")[0].appendChild(script);
  } else {
    initDeliveryBookmarklet();
  }

  function initDeliveryBookmarklet() {
    (window.deliveryBookmarklet = function() {

  // skaffa info om sidan du befinner dig på
      var pageURL = location.href;
      var baseURL = location.hostname;
      var source = document.getElementsByTagName('html')[0].innerHTML;

  //Använd switch istf if
  // Adlibris
      if (baseURL.slice(-12) == "adlibris.com") {
          pageURL = pageURL.split('?')[0];
          var isbn = pageURL.slice(-13);
          void(location.href='http://link.sub.su.se/sfxsub?isbn='+isbn);

  // Bokus
      } else if (baseURL.slice(-9) == "bokus.com") {
          var isbn = pageURL.split('/')[4];
          void(location.href='http://link.sub.su.se/sfxsub?isbn='+isbn);

  // Amazon
      } else if (baseURL.slice(-10) == "amazon.com") {
          var isbn = pageURL.split('/')[5];
          void(location.href='http://link.sub.su.se/sfxsub?isbn='+isbn);

  // Libris
      } else if (baseURL.slice(-12) == "libris.kb.se") {
        var onLopac = source.search("http://www.sub.su.se/start/sok/l-opac-holdings/");
        var onHdig = source.search('<span class="libname">Stockholms universitetsbibliotek, Digitala resurser');
        if (onLopac == -1) {
          if (onHdig == -1) {
            var openURL = $('span.Z3988').attr('title');
            var lopacLink = 'http://www.sub.su.se/testarea/inkopsforslagtest?'+openURL;
            $(document).ready(function () { $.fancybox({ 'width': 759, 'height': 600, 'autoScale': false, 'transitionIn': 'none', 'transitionOut': 'none', 'hideOnOverlayClick': false, 'overlayOpacity': 0.6, 'overlayColor': '#EEE', 'enableEscapeButton': false, 'type': 'iframe', 'href': lopacLink }); });
          } else {
            var lopacLink = $('a[href^="http://link.sub.su.se"]').attr('href');
            $(document).ready(function () { $.fancybox({ 'width': 759, 'height': 500, 'autoScale': false, 'transitionIn': 'none', 'transitionOut': 'none', 'hideOnOverlayClick': false, 'overlayOpacity': 0.6, 'overlayColor': '#EEE', 'enableEscapeButton': false, 'type': 'iframe', 'href': lopacLink }); });
          };
        } else {
          pageURL = pageURL.split('?')[0];
          var bibid = pageURL.split('/')[4];
          var lopacLink = 'http://www.sub.su.se/start/sok/l-opac-holdings/?bibid='+bibid;
          $(document).ready(function () { $.fancybox({ 'width': 759, 'height': 400, 'autoScale': false, 'transitionIn': 'none', 'transitionOut': 'none', 'hideOnOverlayClick': false, 'overlayOpacity': 0.6, 'overlayColor': '#EEE', 'enableEscapeButton': false, 'type': 'iframe', 'href': lopacLink }); });

        };

  // SFX
      } else if (baseURL.slice(-32) == "sfxeu11.hosted.exlibrisgroup.com") {
        var openURL = $('span.Z3988').attr('title');
      	void(location.href='http://www.sub.su.se/testarea/inkopsforslagtest?'+openURL);

  // Alla andra sidor ger alert som talar om att det inte funkar
      } else {
          alert('Du befinner dig på '+location.hostname+'. Denna tjänst fungerar bara i Libris (http://libris.kb.se).');
      }
    })();
  }

})();

// Kolla om det finns COinS på sidan. Opålitlig, oklart varför.
// Funkar, testad på: Libris, SwePub, Citeulike
// Funkar inte på: WorldCat, pga angle brackets
// Problem finns också på sidor som innehåller flera COinS
// Problemet verkar handla om att plocka ut openURL:en, inte att identifera COinS
// När det inte funkar ges inget meddelande om att inget händer. Kan det lösas?
//		} else if (!! $('span.Z3988')) {
//		    var openURL = $('span.Z3988').attr('title');
//		    void(location.href='http://link.sub.su.se/sfxsub?'+openURL);

// Använd Zotero web translators för att fånga upp metadata på webbsidor, konvertera dessa till OpenURL
