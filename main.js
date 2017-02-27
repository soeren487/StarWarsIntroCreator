function createdIntros(){var t='{{#if intros.length}}<div id="box">{{#each intros}}<div><div class="circCont"><button data-id="{{@index}}" class="removeButton circle fromMiddle"><span></span></button></div><a href="#!/{{this.key}}" class="link">{{this.title}}</a></div>{{/each}}</div>{{/if}}';this.template=Handlebars.compile(t),this.element=$("#createdIntros"),this.remove=function(t){var e=this;swal({html:!0,title:'<h2 style="font-family: StarWars;">remove intro</h2>',text:'<p style="text-align: justify">This will not remove the intro from the database. Are you sure you want to remove the intro from this browser?<br></p>',showCancelButton:!0,confirmButtonText:"Yes",cancelButtonText:"No",animation:"slide-from-top"},function(o){if(o){var n=JSON.parse(localStorage.StarWarsIntros);n.splice(t,1),localStorage.StarWarsIntros=JSON.stringify(n),e.load()}})},this.load=function(){var t=localStorage.StarWarsIntros?JSON.parse(localStorage.StarWarsIntros):[],e=$(this.template({intros:t})),o=this;e.find(".removeButton").click(function(t){o.remove(t.target.dataset.id)}),this.element.html(e)};var e=function(t){for(var e=["title","episode","logo","text"],o=0;o<e.length;o++){var n=t[e[o]];if(""!==n.trim())return n.slice(0,50)}};this.save=function(t,o){var n=localStorage.StarWarsIntros?JSON.parse(localStorage.StarWarsIntros):[],a=e(o);n.push({title:a,key:t}),localStorage.StarWarsIntros=JSON.stringify(n)}}function getInternetExplorerVersion(){var t=-1;if("Microsoft Internet Explorer"==navigator.appName){var e=navigator.userAgent,o=new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");null!=o.exec(e)&&(t=parseFloat(RegExp.$1))}else if("Netscape"==navigator.appName){var e=navigator.userAgent,o=new RegExp("Trident/.*rv:([0-9]{1,}[.0-9]{0,})");null!=o.exec(e)&&(t=parseFloat(RegExp.$1))}return t}function validateEmail(t){var e=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return e.test(t)}function getOpeningFormValues(){return{intro:$("#f-intro").val(),logo:$("#f-logo").val(),episode:$("#f-episode").val(),title:$("#f-title").val(),text:$("#f-text").val(),center:$("#f-center").prop("checked")}}function isOpeningsDifferents(t,e){var o=[];return null===t||null==e||(o.push(t.intro!==e.intro),o.push(t.logo!==e.logo),o.push(t.episode!==e.episode),o.push(t.title!==e.title),o.push(t.text!==e.text),o.push(t.center!==e.center&&void 0!==e.center),o.reduce(function(t,e){return t||e},!1))}function parseSpecialKeys(t){switch(t){case"Episode7":return"AKcKeYMPogupSU_r1I_g";default:return t}}StarWarsOpening=function(){function t(t){this.el=$(t.el),this.audio=this.el.find("audio").get(0),this.audioDefer=$.Deferred();var e=this;this.audio.oncanplaythrough=function(){e.audioDefer.resolve()},this.start=this.el.find(".start"),this.animation=this.el.find(".animation"),this.reset(),$(this.audio).bind("ended",$.proxy(function(){this.audio.currentTime=0,this.reset();var t=this.opening;$("#f-intro").val(t.intro),$("#f-logo").val(t.logo||"Star\nwars"),$("#f-episode").val(t.episode),$("#f-title").val(t.title),$("#f-text").val(t.text),$("#f-center").prop("checked",t.center||!1),$("#f-text").css("text-align",t.center?"center":"initial"),setTimeout(function(){"block"===$(".start").css("display")&&$("body").removeClass("running")},1e4)},this))}return t.prototype.reset=function(){this.start.show(),$(".pageHide").show(),this.cloned=this.animation.clone(!0),this.animation.remove(),this.animation=this.cloned,$(window).trigger("resize")},t.prototype.resetAudio=function(){this.audio.pause(),this.audio.currentTime=0},t.prototype.play=function(){this.start.hide(),$(".pageHide").hide(),unsetLoading(),$("body").removeClass("running"),$("body").addClass("running"),$("body").scrollTop(0),this.audio.play(),this.el.append(this.animation);var t=$(".titles > div",this.animation)[0];if(t.offsetHeight>1977){for(var e,o=t.offsetHeight-1977,n=.04041570438799076,a=20-o*n,i=document.styleSheets,r=0;r<i.length;++r)for(var s=0;s<i[r].cssRules.length;++s){var l=i[r].cssRules[s];"titles"==l.name&&l.type==CSSRule.KEYFRAMES_RULE&&(e=l)}e&&e.appendRule("100% { top: "+a+"% }")}},t}();var StarWars=new StarWarsOpening({el:".starwars"});CreatedIntros=new createdIntros,CreatedIntros.load(),swal.setDefaults({customClass:"star-wars-alert"});var OpeningKey=null,defaultOpening=null,audio=document.getElementsByTagName("audio")[0],audioIsLoaded=!1,loadData=function(){audioIsLoaded||(audio.load(),audioIsLoaded=!0)};document.body.addEventListener("touchstart",loadData),window.addEventListener("keydown",function(t){var e=document.activeElement.type||"";e.startsWith("text")||[32,37,38,39,40].indexOf(t.keyCode)>-1&&t.preventDefault()},!1);var notPlayed=!0,showFooter=!0;window.setLoading=function(){$("#loader").show(),$("#form-starwars").hide()},window.unsetLoading=function(){$("#loader").hide(),$("#form-starwars").show()},setLoading(),$("#form-starwars").submit(function(t){t.preventDefault();var e=getOpeningFormValues(),o=StarWars.opening;if(!isOpeningsDifferents(e,o)){var n=location.hash,a="!/"+OpeningKey;return location.hash=a,void(n!==a&&window.dispatchEvent(new Event("hashchange")))}if(!isOpeningsDifferents(e,defaultOpening))return setLoading(),void(location.hash="!/Episode7");var i=e.logo.split("\n");if(i.length>2)return void sweetAlert("Oops...","Logo can't have more than 2 lines.","warning");var r=e.intro.split("\n");if(r.length>2)return void sweetAlert("Oops...","Intro text can't have more than 2 lines.","warning");for(var s in e)if("string"==e[s]&&e[s].indexOf("??")>-1)return void sweetAlert("Oops...",'Your text can\'t contain the sequence "??", please fix it and submit again.',"error");setLoading(),$.ajax({url:"https://starwarsopeninga.firebaseio.com/openings.json",method:"POST",data:JSON.stringify(e),dataType:"json",success:function(t){var o="A"+t.name.substring(1);CreatedIntros.save(o,e),location.hash="!/"+o}})}),$(window).on("hashchange",function(){var t=function(t){var e=t.charAt(0);return"A"===e?(t=t.substr(1),"https://starwarsopeninga.firebaseio.com/openings/-"+t+".json"):"https://starwarsopening.firebaseio.com/openings/-"+t+".json"};$("#playBut").remove();var e=location.hash.replace("#!/","").split("/"),o=e[0],n=!1;try{n="edit"===e[1]}catch(a){}if($("body").removeClass("running"),""!=o){$("[name=custom]").val(o);try{o=parseSpecialKeys(o);var i=t(o);$.ajax({url:i,success:function(t){if(null==t)return void sweetAlert("Oops...","Introduction not found!","error");StarWars.opening=t,OpeningKey=o,$("#videoButton").show();var e=t.intro.replace(/</g,"&lt;");e=e.replace(/>/g,"&gt;"),e=e.replace(/\n/g,"<br>"),StarWars.animation.find("#intro").html(e),StarWars.animation.find("#episode").text(t.episode),StarWars.animation.find("#title").text(t.title);var a=t.text.split("\n"),i=StarWars.animation.find("#text");i.text("");for(var r in a)i.append($("<p>").text(a[r]));i.css("text-align",t.center?"center":""),$("#logosvg",StarWars.animation).css("width",$(window).width()+"px"),$("#logoimg",StarWars.animation).css("width",$(window).width()+"px");var s=t.logo?t.logo:"star\nwars",l=s.split("\n"),u=l[0],d=l[1]||"";if("star\nwars"!=s.toLowerCase()){var h=$("#logosvg text",StarWars.animation);h[0].textContent=u,h[1].textContent=d;var c=u.length>d.length?u:d,f="0 0 "+200*c.length+" 500";$("#logosvg",StarWars.animation).each(function(){$(this)[0].setAttribute("viewBox",f)}),$("#logosvg",StarWars.animation).show(),$("#logoimg",StarWars.animation).hide()}else $("#logosvg",StarWars.animation).hide(),$("#logoimg",StarWars.animation).show();var p=function(){$.when(StarWars.audioDefer).then(function(){var t=StarWars.audio.buffered.end(StarWars.audio.buffered.length-1);0!=t||audioIsLoaded?(notPlayed=!1,StarWars.play()):(unsetLoading(),playbutton=$('<div class="verticalWrapper"><div class="playAudio"><button id="playBut" class="playButton" style="font-size: 80px">Play</button></div></div>'),$("body").append(playbutton),$("#playBut",playbutton).click(function(){setLoading(),playbutton.remove()}),StarWars.audio.oncanplaythrough=function(){notPlayed=!1,StarWars.play()}),n&&(StarWars.audio.currentTime=97,$("#form-starwars").show())})};document.hasFocus()?p():$(window).focus(function(){notPlayed&&p()})}})}catch(r){location.hash="",setLoading()}}else notPlayed?unsetLoading():(StarWars.reset(),StarWars.resetAudio());ga("send","pageview",{page:location.pathname+location.search+location.hash})}),$(document).ready(function(){return getInternetExplorerVersion()!==-1?(sweetAlert("Internet Explorer Detected","This website is not compatible with Internet Explorer, please use Chrome. Sorry for the inconvenience.","error"),void unsetLoading()):(defaultOpening=getOpeningFormValues(),window.dispatchEvent(new Event("hashchange")),void $("#f-center").change(function(){var t=$(this).is(":checked");$("#f-text").css("text-align",1==t?"center":"initial")}))});var calcTime=function(t){var e=30*(t+1),o=Math.floor(e/60),n=Math.floor(o/24),a="";return n>0&&(a+=n+" days"),n<3&&(o%=24,e%=60,o>0&&(a+=" "+o+" hours"),e>0&&(a+=" "+e+" minutes")),a},requestVideo=function(t,e){if(e===!1)return!1;if(!validateEmail(e))return swal.showInputError("You need to type an e-mail!"),!1;var o="https://endor.nihey.org/request?code="+OpeningKey+"&email="+e;$.ajax({url:o,type:"GET",crossDomain:!0,success:function(o){var n=o.queue;swal({html:!0,title:'<h2 style="font-family: StarWars;">video request sent</h2>',text:'<p style="text-align: justify">Your video has been queued. Your current position on the queue is <b>'+(n+1)+"</b>, which will take up to <b>"+calcTime(n)+'</b>.<br>The link to download the video will be sent to the e-mail:<br></p><span style="text-align: center; font-weight: bold">'+e+"</span>"+(t?'<p style="margin-top: 15px;text-align: justify">But as you donated, we will bump you up on the queue.  Thank you so much for supporting us! You should receive the confirmation email within a few minutes.</p>':"")+'<p style="text-align: justify;margin-top: 15px;">By using this website you are agreeing to our <a style="color: #ffd54e;text-decoration:none;font-weight:bold;" href="termsOfService.html" target="_blank">Terms of Service</a>.</p>'})}})};$("#videoButton").click(function(){var t=getOpeningFormValues(),e=StarWars.opening;return isOpeningsDifferents(t,e)?void swal({html:!0,title:'<h2 style="font-family: StarWars;">Text modified</h2>',text:'<p style="text-align: justify">You have changed some of the text inputs. You need to play the new intro to save and request a download.',showCancelButton:!0,confirmButtonText:"Ok, play it!",confirmButtonColor:"#807300",animation:"slide-from-top"},function(t){t&&$("#form-starwars").submit()}):void $.ajax({url:"https://endor.nihey.org/status?code="+OpeningKey,crossDomain:!0,success:function(t){var e=t.queue;t.url?swal({html:!0,title:'<h2 style="font-family: StarWars;">Download</h2>',text:'<p style="text-align: left">This video has already been generated, click the link below to download.<br><br><a style="color: #ffd54e;" href="'+t.url+'">'+t.url+"</a></p>"}):swal({html:!0,title:'<h2 style="font-family: StarWars;">Donate and Download</h2>',text:'<p style="text-align: left">We want to provide videos for free, but we have to use a server to render it, which costs money.<br>There are <b>'+(e+1)+" videos</b> in front of you and it will take <b>"+calcTime(e)+'</b> to be processed.<br><br>Can\'t wait for it? Donate at least <b>5 US Dollars</b>, you will jump the queue and your video will be ready in few hours.<br>The video will be rendered in HD quality and MP4 file. To see a sample video click <a style="color: #ffd54e;text-decoration:none;font-weight:bold;" href="https://www.youtube.com/watch?v=IQf8AN07T_E" target="_blank">here</a>.Donate at least <b>10 US Dollars</b> and you will get the video in <b>Full HD resolution (1920x1080)</b><br><br><b>Attention!</b> Make sure there are no typos in your text, there will be no correction after the video rendering.<br>By using this website you are agreeing to our <a style="color: #ffd54e;text-decoration:none;font-weight:bold;" href="termsOfService.html" target="_blank">Terms of Service</a>.</p><iframe src="./atat.html" height="200px"></iframe>',showCancelButton:!0,confirmButtonText:"Yes, donate!",confirmButtonColor:"#807300",cancelButtonText:"No, I'll get in the queue!",closeOnConfirm:!1,closeOnCancel:!1,animation:"slide-from-top"},function(t){var e={html:!0,title:'<h2 style="font-family: StarWars;">Generate video</h2>',text:'<p style="text-align: justify">Type your email bellow and you will receive a message with the URL to download your video when it\'s ready. We promise not to send spam!</p>'+(t?['<p style="text-align: justify">',"  Please, use the same email from you PayPal account.","  You'll be able to add as many e-mails as you want to","  <b>this video</b> without having to donate again. Just add","  your other emails after the first one, without donating.","  Attention! Make sure there are no typos in your text, you will need to request a new video download and donate again.",'  By using this website you are agreeing to our <a style="color: #ffd54e;text-decoration:none;font-weight:bold;" href="termsOfService.html" target="_blank">Terms of Service</a>.',"</p>"].join(""):""),type:"input",showCancelButton:!0,inputPlaceholder:"Your e-mail...",closeOnConfirm:!1,showLoaderOnConfirm:!0};t&&(e.title='<h2 style="font-family: StarWars;">Donate</h2>',e.text='Click on the button bellow:<br><iframe src="./donateButtons.html#!/'+OpeningKey+'" height="100"></iframe>'+e.text),swal(e,requestVideo.bind(window,t))})}})});