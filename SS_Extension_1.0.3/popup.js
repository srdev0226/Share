function message(val){
  $(".message").text(val);
}

// var _gaq = _gaq || [];
// _gaq.push(['_setAccount', 'UA-84918034-1']);
// _gaq.push(['_trackPageview']);

// (function() {
//   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
//   ga.src = 'https://ssl.google-analytics.com/ga.js';
//   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
// })();

$(document).ready(function(){
  //set input to previously saved value
  chrome.storage.local.get(
    ["pacUrl", "userId", "userPassword"], function(result){
    if(result.pacUrl!=undefined){
      $("#pacUrl").attr("value",result.pacUrl);
    } else{
      $("#pacUrl").attr("placeholder","enter url here...");
    }

    if(result.userId!=undefined){
      $("#userId").attr("value",result.userId);
    } else{
      $("#userId").attr("placeholder","enter value here...");
    }

    if(result.userPassword!=undefined){
      $("#userPassword").attr("value",result.userPassword);
    } else{
      $("#userPassword").attr("placeholder","enter value here...");
    }
  });

  //handle update
  $("#savebtn").click(function(){
    // $(".message").text($(".urlinput").val());
    chrome.storage.local.set({
      'pacUrl': $("#pacUrl").val(),
      'userId': $("#userId").val(),
      'userPassword': $("#userPassword").val(),
    }, function() {
          // Notify that we saved.
          message('Settings saved! ');
          // alert('#1');
          // pacProxy();
          chrome.extension.getBackgroundPage().pacProxy();
        });
  });

  //allow update when enter is pressed
  $('input').keypress(function (e) {
    if (e.which == 13) {
      $("#savebtn").click();
      return false;
    }
  });

  chrome.extension.getBackgroundPage().console.log('>>> document > ready() called');
});

