//# sourceMappingURL=now.js.map
function setCookie(b,d,a){var c=new Date;c.setTime(c.getTime()+864E5*a);a="expires="+c.toUTCString();document.cookie=b+"="+d+"; "+a}function getCookie(b){b+="=";for(var d=document.cookie.split(";"),a=0;a<d.length;a++){for(var c=d[a];" "==c.charAt(0);)c=c.substring(1);if(0==c.indexOf(b))return c.substring(b.length,c.length)}return""}
function httpGetAsync(b,d){var a=new XMLHttpRequest;a.onreadystatechange=function(){4==a.readyState&&200==a.status&&d(a.responseText)};a.open("GET",b,!0);a.send(null)}
function initNow(b,d){function a(a){f.send("/app/now",{},'{"derbyId":"'+d+'","clientId":"'+e+'",'+a+"}")}var c=angular.module("derby-now",[]),g=new SockJS(b),f=Stomp.over(g),e=getCookie("derby-now-"+d);c.run(["$rootScope",function(c){function b(){setCookie("derby-now-"+d,e,1)}function g(a){a=eval("("+a.body+")");var b=a.method;switch(b){case "grant":a=a.permission;switch(a){case "releaseCars":c.permissionReleaseCarsGranted();break;default:console.log("unexpected permission grant: "+a)}break;case "revoke":a=
a.permission;switch(a){case "releaseCars":c.permissionReleaseCarsRevoked();break;default:console.log("unexpected permission revoke: "+a)}break;case "exception":console.log("Server threw exception: "+a.code);break;default:console.log("unexpected method: "+b)}}function h(){f.subscribe("/topic/now/"+d+"/"+e,g);a('"method":"requestAll"')}f.connect({},function(){""==e?httpGetAsync("/now/"+d+"/init",function(a){e=a;b();h()}):(b(),h())})}]);c.controller("ReleaseCarsController",["$scope","$rootScope",function(b,
c){b.permissionReleaseCars=!1;c.permissionReleaseCarsGranted=function(){b.$apply(function(){b.permissionReleaseCars=!0})};c.permissionReleaseCarsRevoked=function(){b.$apply(function(){b.permissionReleaseCars=!1})};b.releaseCars=function(){a('"method":"releaseCars"')};b.requestPermissionReleaseCars=function(){a('"method":"requestPermission","permission":"releaseCars"')}}])};