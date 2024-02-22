

//function printNumbers(from, to){
  
  setTimeout(function printNumbers() {
    console.log(from)
    
    if (from < to ) {
      setTimeout(printNumbers, 1000);
    }
    from++
  
  }, 1000);
//}

/*function printNumbers(from, to){

 let stopInterval = setInterval(() => {
  console.log(from)
  from++;
   if (from < to + 1) {
     clearInterval(stopInterval)
   }

  }, 1000);
}*/


//printNumbers(6,10)

/*printNumbers(1,10)*/

