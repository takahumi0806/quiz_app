window.onload = () => {
  const answerCorrect = []
  function createQuiz(quiz, i){
    const question1 = document.getElementById('question');
    const probrem1 = document.getElementById('problem');
    // const questionNumber = document.createElement('h1');
    // questionNumber.textContent = `問題${i+1}`
    // document.body.appendChild(questionNumber)
    while (question1.firstChild){
      question1.removeChild(question1.firstChild);
    }
    while (probrem1.firstChild){
      probrem1.removeChild(probrem1.firstChild);
    }
    if(i < 10){
      const problems = []
      const h1 = document.createElement('h1');
      h1.textContent = quiz[i].question;
      question1.appendChild(h1);

      problems.push({status:quiz[i].correct_answer})
      quiz[i].incorrect_answers.forEach((problem) => {
        problems.push({status:problem})
      })
      console.log(problems.sort())
      problems.forEach((probrem) => {
        const p = document.createElement('button');
        p.textContent = probrem.status
        probrem1.appendChild(p)
        p.addEventListener('click', () => {
          if(quiz[i].correct_answer === probrem.status){
            answerCorrect.push(i)
          }
          createQuiz(quiz, i+1)
        })
      })
    }else{
      const p = document.createElement('div');
      p.textContent = `正解は${answerCorrect.length}問です！！`
      probrem1.appendChild(p)
    }
  }


  fetch("https://opentdb.com/api.php?amount=10")
  .then(response => {
    return response.json();
  })
  .then(data => {
    const i = 0
    createQuiz(data.results, i)
  })
  .catch(error => {
    alert("失敗しました");
  });

}

