window.onload = () => {
  const answerCorrect = []
  function reflectTop(){
    deleteQuiz();
    appendCount('ようこそ');
    appendProblem('以下のボタンをクリックして下さい');
    createButton('開始');
  }

  function createQuiz(quiz, i){
    if(i < 10){
      const problems = []
      deleteQuiz();
      appendCount(`問題${i+1}`);
      appendGenre(`[ジャンル]${quiz[i].category}`);
      appendGenre(`[難易度]${quiz[i].difficulty}`);
      appendProblem(quiz[i].question);
      problems.push(quiz[i].correct_answer);
      quiz[i].incorrect_answers.forEach((problem) => {
        problems.push(problem);
      });
      problems.sort();
      problems.forEach((probrem) => {
        const questionPlobrem = document.createElement('div');
        const ancerButton = document.createElement('button');
        ancerButton.textContent = probrem
        document.body.appendChild(questionPlobrem);
        questionPlobrem.appendChild(ancerButton);
        ancerButton.addEventListener('click', () => {
          if(quiz[i].correct_answer === probrem){
            answerCorrect.push(i);
          }
          createQuiz(quiz, i+1);
        });
      });
    } else {
      deleteQuiz();
      appendCount(`正解は${answerCorrect.length}問です！！`);
      appendProblem('再度チャレンジする時は以下をクリック');
      createButton('ホームに戻る' );
      answerCorrect.length = 0;
    }
  }

  function deleteQuiz(){
    const parent = document.getElementById('body');
    while(parent.firstChild){
      parent.removeChild(parent.firstChild);
    }
  }

  function appendCount(comment){
    const questionNumber = document.createElement('h1');
    questionNumber.textContent = comment
    document.body.appendChild(questionNumber);
  }

  function appendProblem(comment){
    const questionPlobrem = document.createElement('p');
    questionPlobrem.id = 'question'
    questionPlobrem.textContent = comment
    document.body.appendChild(questionPlobrem);
  }

  function appendGenre(comment){
    const questionGenre = document.createElement('h3');
      questionGenre.textContent = comment
      document.body.appendChild(questionGenre);
  }

  function createButton(comment){
    const pushButton = document.createElement('button');
    pushButton.textContent = comment
    document.body.appendChild(pushButton);
    pushButton.addEventListener('click', async () => {
      if (pushButton.textContent === '開始') {
        deleteQuiz();
        appendCount('取得中');
        appendProblem('少々お待ちください');
        await getQuiz();
      } else if (pushButton.textContent === 'ホームに戻る') {
        reflectTop();
      }
    })
  }

  async function getQuiz() {
    try {
      const response = await fetch("https://opentdb.com/api.php?amount=10");
      if (response.ok) {
        const data = await response.json();
        createQuiz(data.results, 0);
      }
    } catch (e) {
      alert(`失敗しました ErrorMessage => ${e}`);
    }
  }
  
  reflectTop()
}

