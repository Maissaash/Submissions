
var d=document.createElement('div');
d.id="mydiv";
function myfunction(){
    d.innerText=document.getElementById('name').value;
    document.body.appendChild(d);
}