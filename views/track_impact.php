<style type="text/css">
/* track impact */
.donateContainer{
	width: 100%;
	height: auto;
	background: #000;
	color: #fff;
	padding:30px 10px;
}
.donateContainer h1{
	text-align: center;
	font-size: 40px;
}
.amount{
	background: #536728;
	width: 70%;
	margin: 0 auto;
	padding:10px;
	border-radius: 10px;
	text-align: center;
	position: relative;
}
.amount .dollar{
	font: 70px Arial,sans-serif;
	font-weight: bold;
	position: absolute;
	top: 20px;
	left: 40px;
	color: #dcebbd;
}
.amount .enterAmt{
	width: 250px;
	background: none;
	border: none;
	color: #dcebbd;
	border-bottom: 1px solid #dcebbd;
	font-size: 65px;
	margin-left: 50px;
	border-radius: 0;
	padding-bottom: 0;
}
.amount .enterAmt::-webkit-input-placeholder {
	color:    #3e5018;
}
.amount .enterAmt:-moz-placeholder {
	color:    #3e5018;
	opacity:  1;
}
.amount .enterAmt::-moz-placeholder {
	color:    #3e5018;
	opacity:  1;
}
.amount .enterAmt:-ms-input-placeholder {
	color:    #3e5018;
}
.txtTitle{
	text-align: center;
	font-size: 20px;
	padding: 30px 0;
}
.actions{
	margin: 30px auto;
	text-align: center;
}
.actions a{
	background: #ed8a09;
	text-decoration: none;
	padding: 10px 30px;
	border-radius: 10px;
	color: #fff;
	margin: 0 0px;
	font-weight: bold;
	font-size: 20px;
}
.actions a.buttons-1{
	padding: 10px 50px;
	margin-right: 20px;
}
.actions a.buttons-2{
	padding: 10px 20px;
}
.descr{
	padding: 10px 10px 0 10px;
	margin-bottom: 0;
	font-size: 11px;
	line-height: 13px;
	color: #e1e1df;
	margin-top: 30px;
}
.descr span{
	color: #ed8a09;
	margin-bottom: 10px;
	display: block;
}
/* end track impact */

/* show impact */
.impactContainer{
	width: 100%;
	height: auto;
}

/* end show impact */

</style>
<script src="wp-content/plugins/tlc-supporters/views/js/impacts.js"></script>
<div id="trackImpact">
	<div id="donation" class="donateContainer">
		<h1>TRACK YOUR IMPACT</h1>
		<div class="amount">
			<span class="dollar">$</span><input type="text" id="amount" class="enterAmt" placeholder="amount">
		</div>
		<div class="txtTitle">WHAT CAN YOUR MONEY DO?</div>
		<div class="actions">
			<!-- <a href="" class="buttons-1">LET'S DO IT!</a>
			<a href="" class="buttons-2">MAKE IT MONTHLY</a> -->

			 <a href="" class="buttons-1">SHOW ME</a>

		</div>
		<p class="descr">
		<span>HOW THIS WORKS?</span>
		Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus
		</p>
	</div>
	<div id="showImpact">
		<div class="impactContainer">

		</div>
	</div>
	<div id="cardOptions">
		
	</div>
</div>