


"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 13
   Tutorial Case

   Order Form Script
   
   Author: 
   Date:   
   
   Filename: co_order.js
   
   Function List
   =============
   
   calcOrder()
      Calculates the cost of the customer order
      
   formatNumber(val, decimals)
      Format a numeric value, val, using the local
      numeric format to the number of decimal
      places specified by decimals
      
   formatUSACurrency(val)
      Formats val as U.S.A. currency
   
*/

//Calculate the cost of order
calcOrder();

window.addEventListener("load", function(){
      var orderForm = document.forms.orderForm;
      orderForm.elements.orderDate.value =
      new Date().toDateString();
      orderForm.elements.model.focus();
      //Event handlers for the web form
      orderForm.elements.model.onchange = calcOrder;
      orderForm.elements.qty.onchange = calcOrder;

      var planOptions =
      document.querySelectorAll('input[name = "protection"]');
      for (var i = 0; i < planOptions.length; i++){
         planOptions[i].onclick = calcOrder;
      }
   }
);

function calcOrder(){
   var orderForm = document.forms.orderForm;

   //Calculate the initial cost of the order
   var mIndex = orderForm.elements.model.selectedIndex;
   var mCost = orderForm.elements.model.options[mIndex].value;
   var qIndex = orderForm.elements.qty.selectedIndex;
   var quantity = orderForm.elements.qty[qIndex].value;

   //Initial cost = cost x quantity
   var initialCost = mCost * quantity;
   orderForm.elements.initialCost.value = formatUSCurrency(initialCost);

   //Retrieve the cost of the user's protection plan
   var pCost = document.querySelector('inputp[name="protection"]:checked').value*quantity;
   orderForm.elements.protectionCost.value = formatNumber(pCost,2);

   //Calculate the order subtotal
   orderForm.elements.subtotal.value = formatNumber(initialCost + pCost, 2);

   //Calculate the sales tax
   var salesTax = 0.05*(initialCost + pCost);
   orderForm.elements.salesTax.value = formatNumber(salesTax, 2);

   //Calculate the the cost of the total order
   var totalCost = initialCost + pCost + salesTax;
   orderForm.elements.totalCost.value = formatUSCurrency(totalCost);

   //Store the order details
   orderForm.elements.modelName.value =
   orderForm.elements.model.options[mIndex].text;

   orderForm.elements.protectionName.value = 
      document.querySelector('input[name="protection"]:checked').nextSibling.nodeValue;
}

function formatNumber(val, decimals) {
      return val.toLocaleString(undefined,
         {minimumFractionDigits : decimals,
         maximumFractionDigits: decimals});
}

function formatUSCurrency(val){
   return val.toLocaleString('en-US',
   {style: "currency", currency: "USD"});
}