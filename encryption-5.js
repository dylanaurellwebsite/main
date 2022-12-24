function e (text, pin, ed) {
  var database = 'Iz)^xrc#!MGE}UaebmJy8TR"<.ug06_B=iNQ]qS1ZD~7[,n{+s4h@l(59KVop|`/Ldf&XtCA?;Ow:vkjWY* -%2H>$F3P'
  var dataOrder = [ '8403619257021' , '6810524937201' , '5108369724201' , '8672345019120' , '4659021378102' , '6012538974012' , '1489753620210' , '3208764915012' , '7286503149120' , '4615830279021' ]
  var dataCode = [ [ ] , [ ] , [ ] , [ ] , [ ] , [ ] , [ ] , [ ] , [ ] , [ ] ]
  for ( let i = 0 ; i < 10 ; i++ ) {
    for ( let j = 0 ; j < 9 ; j++ ) {
      for ( let k = 0 ; k < 10 ; k++ ) {
        var l = j * 10 + parseInt ( dataOrder [ i ] .substring ( k , k + 1 ) )
        dataCode [ i ] .push ( database .substring ( l , ++l ) )
      }
    }
    for ( let m = 10 ; m < 13 ; m++ ) {
      var n = 9 * 10 + parseInt ( dataOrder [ i ] .substring ( m , m + 1 ) )
      dataCode [ i ] .push ( database .substring ( n , ++n ) )
    }
  }
  var dataed = [ 1 , 0 ]
  if ( pin .length == 0 ) { pin = '0' }
  for ( let i = 0 ; i < pin .length ; i++ ) {
    var dataInv = [ 
      [ pin .length - i - 1 , pin .length - i ] ,
      [ i , ( i + 1 ) ]
    ]
    var getIndex = ( pin .length - 1 ) % 10
    var getNumber = dataCode [ getIndex ] .indexOf ( pin .substring ( dataInv [ ed ] [ 0 ] , dataInv [ ed ] [ 1 ] ) ) .toString ( )
    var dataAdd = [ [ ] , [ ] ]
    if ( getNumber .length == 1 ) {
      dataAdd [ 0 ] = dataAdd [ 1 ] = parseInt ( getNumber )
    } else {
      dataAdd [ 0 ] = parseInt ( getNumber .substring ( 0 , 1 ) )
      dataAdd [ 1 ] = parseInt ( getNumber .substring ( 1 , 2 ) )
    }
    var code = [ [ ] , [ ] ]
    var data = [ [ ] , [ ] ]
    code [ 0 ] = dataCode [ dataAdd [ 0 ] ]
    code [ 1 ] = dataCode [ dataAdd [ 1 ] ]
    for ( let i = 0 ; i < 93 ; i++ ) {
      data [ 0 ] .push ( code [ 0 ] [ ( i + dataAdd [ 0 ] ) % 93 ] )
      data [ 1 ] .push ( code [ 1 ] [ ( i + dataAdd [ 1 ] ) % 93 ] )
    }
    var textTemp = ''
    for ( let i = 0 ; i < text .length ; i++ ) {
      textTemp += data [ ed ] [ data [ dataed [ ed ] ] .indexOf ( text .substring ( i , i + 1 ) ) ]
    }
    text = textTemp    
  }
  return text
}