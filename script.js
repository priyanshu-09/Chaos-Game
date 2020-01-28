//alert('Hello! Welcome to The Chaos Game\n First of All If you\'re viewing this on mobile, Please switch to PC or enable the Desktop Site mode on your browser.\n\n ')
let speed_dots=200
document.getElementsByClassName('speed')[1].style.backgroundColor='#240090'
let Array=[]
let function_work=true
let overlay=document.getElementById('overlay')
let count=0
let prob_val=[]
let angle=[]
let r=document.getElementById('r').value
function isRegular(){
    var shape=document.getElementsByClassName('shape')[0].style.backgroundColor
    if(shape!=''){
        irregular()
    }
    else{
        regular()
    }
}
function r_value(){
    function_work=false
    r=document.getElementById('r').value
    function_work=true
    setTimeout(game,speed_dots)
}
function start(){
    let num_dots=document.getElementById('num_dots').value
    Array=[]
    
    count++
    function_work=true
    let width=overlay.getBoundingClientRect().width
    let height=overlay.getBoundingClientRect().height
    overlay.innerHTML=''
	var radius_num=width/2-10
	var radius=width/2-30;
	var x = width/2;
	var y = height/2;
	
	console.log('hi')
	console.log(count)
 	for (var i = 0; i < num_dots; i++) {
        var x_new=x - radius*Math.cos((i * angle[i])+(Math.PI/2))    
        var y_new=y - radius*Math.sin((i * angle[i])+(Math.PI/2))

        var x_new_num=x - radius_num*Math.cos((i * angle[i])+(Math.PI/2))    
        var y_new_num=y - radius_num*Math.sin((i * angle[i])+(Math.PI/2))

        var div=document.createElement('div')
        var div_num=document.createElement('div')

        div.setAttribute('class','dots')
        div_num.setAttribute('class','num_dot')

        overlay.appendChild(div)
        overlay.appendChild(div_num)

        var new_div=document.getElementsByClassName('dots')[i-1]
        //console.log(x_new)-0.5
        //console.log(y_new)
        document.getElementsByClassName('dots')[i].style.left=x_new+'px'
        document.getElementsByClassName('dots')[i].style.top=y_new+'px'
        document.getElementsByClassName('num_dot')[i].style.left=x_new_num+'px'
        document.getElementsByClassName('num_dot')[i].style.top=y_new_num+'px'
        document.getElementsByClassName('num_dot')[i].innerHTML=(i+1).toString()
        Array.push(document.getElementsByClassName('dots')[i])
    }
    if(count>1){
        var random_left=Math.floor(Math.random()*width)
        var random_top=Math.floor(Math.random()*height)
        var small_div=document.createElement('div')
        small_div.setAttribute('class','small_dot')
        overlay.appendChild(small_div)
        document.getElementsByClassName('small_dot')[0].style.border='7px solid white'
        document.getElementsByClassName('small_dot')[0].style.left=random_left+'px'
        document.getElementsByClassName('small_dot')[0].style.top=random_top+'px'
        setTimeout(game,speed_dots)
    }
    
}
function game(){
    //console.log(speed_dots)
    
    
    //console.log(r)
    document.getElementsByClassName('small_dot')[document.getElementsByClassName('small_dot').length-1].style.border=''
    var len=Array.length
    var random=prob_values()
    console.log(prob_val)
    //console.log(random)
    var left_dot=document.getElementsByClassName('small_dot')[document.getElementsByClassName('small_dot').length-1].getBoundingClientRect().left-overlay.getBoundingClientRect().left
    var top_dot=document.getElementsByClassName('small_dot')[document.getElementsByClassName('small_dot').length-1].getBoundingClientRect().top-overlay.getBoundingClientRect().top
    var left_big=document.getElementsByClassName('dots')[random].getBoundingClientRect().left-overlay.getBoundingClientRect().left
    var top_big=document.getElementsByClassName('dots')[random].getBoundingClientRect().top-overlay.getBoundingClientRect().top
    //console.log(left_dot+' '+top_dot+' '+left_big+' '+top_big)
    var xi=Math.pow(left_dot-left_big,2)
    var yi=Math.pow(top_dot-top_big,2)
    var distance=Math.sqrt(xi+yi)
    //console.log(distance)
    var distance_to_travel=distance*r
    //console.log(distance_to_travel)
    var new_y=(Math.abs(top_big-top_dot)/distance)*distance_to_travel
    var new_top=(Math.sign(top_big-top_dot)*new_y)+top_dot
    var new_x=(Math.abs(left_big-left_dot)/distance)*distance_to_travel
    var new_left=(Math.sign(left_big-left_dot)*new_x)+left_dot
    var small_div=document.createElement('div')
    small_div.setAttribute('class','small_dot')
    overlay.appendChild(small_div)
    document.getElementsByClassName('small_dot')[document.getElementsByClassName('small_dot').length-1].style.border='7px solid white'
    document.getElementsByClassName('small_dot')[document.getElementsByClassName('small_dot').length-1].style.left=new_left+'px'
    document.getElementsByClassName('small_dot')[document.getElementsByClassName('small_dot').length-1].style.top=new_top+'px'
    if(function_work){setTimeout(game,speed_dots)}
}
function speed(inp){
    function_work=false
    speed_dots=inp
    if(inp==200){
        document.getElementsByClassName('speed')[0].style.backgroundColor=''
        document.getElementsByClassName('speed')[1].style.backgroundColor='#240090'
        document.getElementsByClassName('speed')[2].style.backgroundColor=''
    }
    else if(inp==1){
        document.getElementsByClassName('speed')[0].style.backgroundColor=''
        document.getElementsByClassName('speed')[2].style.backgroundColor='#240090'
        document.getElementsByClassName('speed')[1].style.backgroundColor=''
    }
    else{
        document.getElementsByClassName('speed')[1].style.backgroundColor=''
        document.getElementsByClassName('speed')[0].style.backgroundColor='#240090'
        document.getElementsByClassName('speed')[2].style.backgroundColor=''
    }
    function_work=true
    setTimeout(game,speed_dots)
    
    
}
function stop(){
    function_work=false
}
function prob(){
    prob_val=[]
    var num_dots=document.getElementById('num_dots').value
    var cont=document.getElementsByClassName('values')[0]
    cont.innerHTML=''
    for(var i=0;i<parseInt(num_dots);i++){
        var div=document.createElement('div')
        div.innerHTML='<div class="left">('+(i+1)+')</div> <input class="right prob_values" type="number" onchange="prob_change()" value="1.0">'
        cont.appendChild(div)
        prob_val.push(document.getElementsByClassName('prob_values')[i].value)
        
    }
}
function prob_values(){
    var length=document.getElementsByClassName('prob_values').length
    let total=0
    let weighted_sum=0
    for(var i=0;i<length;i++){
        //console.log(parseInt(document.getElementsByClassName('prob_values')[i].value))
        total=total+parseInt(document.getElementsByClassName('prob_values')[i].value)
    }
    var random=Math.random()*total
    //console.log(random)
    
    for(var i=0;i<length;i++){
        weighted_sum=weighted_sum+parseInt(prob_val[i])
        //console.log(weighted_sum)
        if(random<=weighted_sum){
            return i
        }
    }
}
function prob_change(){
    var length=document.getElementsByClassName('prob_values').length
    function_work=false
    prob_val=[]
    for(var i=0;i<length;i++){
        prob_val.push(document.getElementsByClassName('prob_values')[i].value)
    }
    function_work=true
    setTimeout(game,speed_dots)
    
}
function regular(){
    let num_dots=document.getElementById('num_dots').value
    stop()
    angle=[]
    document.getElementById('irregular').style.backgroundColor=''
    document.getElementById('regular').style.backgroundColor='#240090'
    var angle_val = 2*Math.PI/num_dots
    count=0
    for(var i=0;i<num_dots;i++){
        angle.push(angle_val)
    }
    
    function_work=false
   // console.log('reg')
   // console.log(count)
    start()
    

}
function irregular(){
    let num_dots=document.getElementById('num_dots').value
    stop()
    angle=[]
    document.getElementById('regular').style.backgroundColor=''
    document.getElementById('irregular').style.backgroundColor='#240090'
    let two_pie=2*Math.PI
    count=0
    for(var i=0;i<num_dots-1;i++){
        var random=Math.random()*0.9
        var new_val=two_pie*random
        angle.push(new_val)
        two_pie=two_pie-new_val
    }
    angle.push(two_pie)
    start()
}
regular()
count=0
start()
prob()