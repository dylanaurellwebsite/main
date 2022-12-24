window.onload = function () {
 
  var data = [
    [ 'brandon', 'jelek' ]
  ]
  
  var datatemp = []
  for(let i=0; i<data.length; i++){
    datatemp.push(['',''])
    for(let j=0; j<2; j++){
      datatemp[i][j] = e(data[i][j],'forchat',0)
    }
  }
  
  datatemp = datatemp
  
  var questionExist = []
  var pos = -1
  var lengthNow = 0
  var answerDisplay = 0
  
  function id (idx) {
    return document.getElementById(idx)
  }
  
  function ev (evx, fx) {
    document.body.addEventListener(evx, fx)
  }
  
  function show (idx) {
    id(idx).style.display = 'block'
  }
  
  function hide (idx) {
    id(idx).style.display = 'none'
  }
  
  function clearing () {
    for (let i=0; i<questionExist.length; i++) {
      var getIDFor = 'q' + questionExist[i]
      id(getIDFor).style.backgroundColor = 'transparent'
    }
  }
  
  function doSelect () {
    var getID = 'q' + questionExist[pos]
    id(getID).style.backgroundColor = '#7162ff'
    lengthNow = questionExist.length
  }
  
  function fill (x) {
    id('a-q-q').innerHTML = data[x][0]
    id('a-q-a').innerHTML = data[x][1]
    show('answer-question')
    show('answer-question-close')
    answerDisplay = 1
    clearing()
  }
  
  function showAnswer (event) {
    var questionID = event.target.id
    if (questionID == 'qq') {
      /* go to result page */
    }
    else if (questionID.substring(0,1) == 'q') {
      var i = parseInt(questionID.substring(1,questionID.length))
      fill(i)
    }
  }
  
  function closeAnswer () {
    hide('answer-question')
    hide('answer-question-close')
    id('a-q-q').innerHTML = ''
    id('a-q-a').innerHTML = ''
    id('search-input').focus()
    answerDisplay = 0
  }
  
  function addclr (event) {
    clearing()
    var questionID = event.target.id
    if (questionID.substring(0,1) == 'q') {
      id(questionID).style.backgroundColor = '#7162ff'
      pos = -1
    }
  }
  
  function rmvclr (event) {
    clearing()
    var questionID = event.target.id
    if (questionID.substring(0,1) == 'q') {
      id(questionID).style.backgroundColor = 'transparent'
      pos = -1
    }
  }
  
  
  id('search-input').focus()
  
  id('search-input').oninput = function () {
    var getAsk0 = id('search-input').value
    var getAsk = getAsk0.toLowerCase().replaceAll(' ','')
    questionExist = []
    if (getAsk != '') {
      questionExist.push('q')
      for (let i=0; i<data.length; i++) {
        var question = data[i][0].toLowerCase().replaceAll(' ','')
        var answer = data[i][1].toLowerCase().replaceAll(' ','')
        if ((question.indexOf(getAsk) >= 0)||(answer.indexOf(getAsk) >= 0)) {
          questionExist.push(i)
        }
      }
      pos = -1
    }
    console.log(questionExist)
    var result = ''
    result += '<p class="search-result-box" id="qq">All result for ' + getAsk0 + '</p>'
    for (let i=0; i<questionExist.length-1; i++) {
      result += '<p class="search-result-box" id="q' + questionExist[i+1] + '">' + data[questionExist[i+1]][0] + '</p>'
    }
    if (result == '') {result = '<p class="search-result-box blank">No result</p>'}
    if (getAsk == '') {result = '<p class="search-result-box blank">Search result .....</p>'}
    id('search-result').innerHTML = result
  }
  
  ev('click', showAnswer)
  id('answer-question-close').onclick = function () {closeAnswer()}
  
  ev("mouseover", addclr)
  ev("mouseout", rmvclr)
  
  document.onkeydown = function (e) {
    var keyboardKey = e.which
    /* 
      27 is esc 
      37 is left  
      38 is up
      39 is right
      40 is down
      13 is enter
    */
    
    if (keyboardKey == 27) {closeAnswer()}
    
    if (keyboardKey == 40) {
      if ((questionExist.length >= 1)&&(answerDisplay == 0)) {
        clearing()
        if (pos == questionExist.length-1) {pos = -1} else {}
        if (lengthNow != questionExist.length) {pos = -1} else {}
        pos += 1
        doSelect()
      } else {}
    }
    
    if (keyboardKey == 38) {
      if ((questionExist.length >= 1)&&(answerDisplay == 0)) {
        clearing()
        if (lengthNow != questionExist.length) {pos = -1} else {}
        if (pos <= 0) {pos = questionExist.length} else {}
        pos -= 1
        doSelect()
        id('search-input').blur()
        setTimeout(function(){
          id('search-input').focus()
        },1)
      } else {}
    }
    
    if (keyboardKey == 13) {
      if (answerDisplay == 1) {
          closeAnswer()
          doSelect()
      } else {
        if (pos >= 0) {
          if (pos == 0) {
            /* go to result page */
          }
          else {
            fill(questionExist[pos])
          }
        }
      }
    }
  }
}
