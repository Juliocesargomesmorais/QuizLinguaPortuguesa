
const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "Quem é considerado o maior poeta do Classicismo em Portugal? ",
    answers: [
      { text: "Camões ", correct: false },
      { text: "Gil Vicente ", correct: false },
      { text: "Sá de Miranda ", correct: false },
      { text: "Luís Vaz de Camões", correct: true }
    ]
  },
  {
    question: "O verbo no modo imperativo pode ter função de:",
    answers: [
      { text: "elogiar", correct: false },
      { text: "falar sobre fenômenos da natureza", correct: false },
      { text: "ordem", correct: true },
      { text: "justificar", correct: false }
    ]
  },
  {
    question: 'Quem foi o autor da primeira obra de quinhentismo da literatura brasileira? ',
    answers: [
      { text: 'Gregório de Matos ', correct: false },
      { text: 'Pedro Vaz de Caminha ', correct: true },
      { text: 'Padre Antônio Vieira ', correct: false },
      { text: "Tomás Antônio Gonzaga", correct: false }
    ]
  },
  {
    question: 'Qual verbo na 2° pessoa do singular está no modo subjuntivo do pretérito perfeito?',
    answers: [
      { text: 'vivesses', correct: true },
      { text: 'morrerias', correct: false },
      { text: 'andarás ', correct: false },
      { text: "cortastes", correct: false }
      
    ]
  },
  {
    question: 'Qual é a característica principal da poesia lírica do Classicismo? ',
    answers: [
      { text: ' Uso do soneto como forma poética ', correct: true},
      { text: 'Ênfase na exaltação dos feitos heróicos;', correct: false },
      { text: 'Abordagem de temas ligados à mitologia grega ', correct: false },
      { text: 'Crítica social e política', correct: false }
    ]
  },
  {
    question: 'Qual alternativa indica corretamente o tempo verbal da seguinte frase: "Ela estudará para a prova amanhã."? ',
    answers: [
      { text: 'Futuro do presente ', correct: true },
      { text: 'Futuro do pretérito ', correct: false },
      { text: 'Presente do indicativo ', correct: false },
      { text: 'Pretérito perfeito do indicativo', correct: false }
    ]
  },
  {
    question: 'Qual obra é considerada o principal marco do Classicismo em Portugal? ',
    answers: [
      { text: '"Auto da Barca do Inferno" de Gil Vicente ', correct: false },
      { text: '"Os Lusíadas" de Camões ', correct: true },
      { text: '"Sentimento do Mundo" de Carlos Drummond de Andrade', correct: false },
      { text: 'Memórias Póstumas de Brás Cubas" de Machado de Assis', correct: false },
    ]
  },
  {
    question: 'Em qual alternativa o verbo está conjugado no pretérito imperfeito do subjuntivo? ',
    answers: [
      { text: '"Se eu estudava mais, passaria no vestibular." ', correct: false },
      { text: '"Eu andei pela cidade durante a tarde." ', correct: false },
      { text: '"Que ele estude bastante para a prova." ', correct: true },
      { text: '"Quando você terminar, me avise."', correct: false },
    ]
  },
  {
    question: 'Qual o principal objetivo dos cronistas que registraram a chegada dos portugueses ao Brasil no Quinhentismo? ',
    answers: [
      { text: 'Exaltar os feitos dos navegadores portugueses ', correct: false },
      { text: 'Documentar a flora e fauna brasileiras ', correct: false },
      { text: 'Descrever os costumes e culturas dos povos nativos ', correct: true },
      { text: 'Criticar a política colonial portuguesa', correct: false },
    ]
  },
  {
    question: 'Qual é o tempo verbal da frase: "Eles teriam vindo se tivessem sido convidados."? ',
    answers: [
      { text: 'Pretérito perfeito do indicativo ', correct: false },
      { text: 'Pretérito mais-que-perfeito composto do indicativo ', correct: true },
      { text: 'Futuro do presente ', correct: false },
      { text: 'Futuro do pretérito', correct: false },
    ]
  },
  {
    question: 'Qual foi a principal forma de expressão literária no Quinhentismo brasileiro? ',
    answers: [
      { text: 'Romances de cavalaria ', correct: false },
      { text: 'Poesia épica ', correct: false },
      { text: 'Poesia lírica ', correct: false },
      { text: 'Crônicas de viagem', correct: true },
    ]
  },
  {
    question: 'Em qual alternativa o verbo está conjugado no presente do subjuntivo? ',
    answers: [
      { text: '"Se ele vier, avise-me." ', correct: true },
      { text: '"Eu vou falar com ele quando você chegar." ', correct: false },
      { text: '"Se eu tivesse dinheiro, compraria aquele carro." ', correct: false },
      { text: '"Ela dirá a verdade se você pedir."', correct: false },
    ]
  },
  {
    question: 'Qual é a característica marcante da poesia lírica do Classicismo? ',
    answers: [
      { text: 'Uso da sátira como forma de crítica social ', correct: false },
      { text: 'Ênfase na idealização amorosa e na natureza ', correct: true },
      { text: 'Abordagem de temas mitológicos greco-romanos ', correct: false },
      { text: 'Valorização dos costumes populares e da oralidade', correct: false },
    ]
  },
  {
    question: 'Complete o texto com a conjugação correta do verbo “haver” no pretérito mais-que-perfeito do indicativo:“Quando chegamos à festa, nós já __________ (haver) visto aquele filme.”',
    answers: [
      { text: 'havíamos', correct: false },
      { text: 'havemos', correct: false },
      { text: 'houvemos', correct: false },
      { text: 'houvéramos', correct: true },
    ]
  },
  {
    question: 'Qual é o tema central da obra "Os Lusíadas" de Luís de Camões? ',
    answers: [
      { text: 'A colonização do Brasil ', correct: false },
      { text: 'A descoberta do caminho marítimo para as Índias ', correct: false},
      { text: 'As navegações portuguesas ', correct: true },
      { text: 'A lenda do Rei Artur', correct: false },
    ]
  },
  {
    question: 'Qual é o tempo verbal da frase: "Ele havia terminado o trabalho antes do prazo."? ',
    answers: [
      { text: 'Pretérito perfeito do indicativo ', correct: false },
      { text: 'Pretérito mais-que-perfeito simples do indicativo ', correct: true },
      { text: 'Pretérito imperfeito do indicativo ', correct: false },
      { text: 'Futuro do presente', correct: false },
    ]
  },
  {
    question: 'Quais são as principais características formais da poesia de Camões, autor de "Os Lusíadas"? ',
    answers: [
      { text: 'Redondilha maior e poesia épica ', correct: false },
      { text: 'Verso decassílabo e soneto', correct: true },
      { text: 'Trovadorismo e verso livre ', correct: false },
      { text: 'Poesia lírica e verso hendecassílabo', correct: false },
    ]
  },
  {
    question: 'Qual alternativa apresenta corretamente uma forma no modo imperativo negativo? ',
    answers: [
      { text: '"Fala mais alto, por favor."', correct: false },
      { text: '"Não saia sem avisar."', correct: true },
      { text: '"Traga-me um café, por favor."', correct: false },
      { text: '"Corra para alcançar o ônibus!"', correct: false },
    ]
  },
  {
    question: 'Qual das alternativas abaixo apresenta uma característica predominante do Classicismo em relação à forma de expressão literária?',
    answers: [
      { text: 'Utilização de versos irregulares e livres.', correct: false },
      { text: 'Predomínio da sátira como principal recurso crítico.', correct: false },
      { text: 'Valorização da simplicidade e clareza na linguagem poética.', correct: true },
      { text: 'Ênfase na descrição exata de paisagens naturais.', correct: false },
    ]
  },
  {
    question: ') Complete a frase com o verbo “vir” no pretérito imperfeito do subjuntivo para a 2ª pessoa do plural:“Se vós ____ mais cedo, poderíamos ter começado a reunião.”',
    answers: [
      { text: 'viestes', correct: false },
      { text: 'víreis', correct: false },
      { text: 'viésseis ', correct: true },
      { text: 'viésseis ', correct: false },
    ]
  },
]
