//1.게임시작될때 welcome 글씨 반짝이는 효과 시작
function bling(){
  //h1 폰트 색깔
    if (flag === 0) {
      document.querySelector('h1').style.color = '#d6806e';
      flag ++;
    //플로그 상태에 따라 색깔변경
    } else if(flag === 1) {
      document.querySelector('h1').style.color = '#fbb666';
      flag ++;
    }else if(flag === 2){
      document.querySelector('h1').style.color = '#f9f871';
      flag ++;
    }else{
      document.querySelector('h1').style.color = '#f2ecff';
      //제목 반짝이는 설정 무한 반복 = 0으로 설정
      flag = 0;
    }
  }
setInterval(bling, 1000);
//글씨 반짝이는 효과 끝
 

//2.시작버튼으로 게임시작하기 시작
var startBtn = document.querySelector('.start-btn');
//클릭했을때 함수실행
startBtn.addEventListener('click', startMole);

function startMole(){
  startBtn.removeEventListener('click', startMole);
  //시작버튼 어둡게하기
  startBtn.style.color = '#3d3f43';
  //점수판과 게임횟수 체크를 위해 변수 0으로 초기화
  getPoint = 0;
  turn = 0;
  //메서드로 1초마다 어몽어스 보이게하기
  setTimeout(showingMole, 300);
}
//시작버튼으로 게임시작하기 끝


//3.어몽어스 랜덤하게 등장하기 시작
var moleNumber;
//랜덤한 숫자 함수
var randomNum;
//매번 생성된 랜덤변수 담기 => 변수생성될 때 preNum이랑 비교해서
//같을 경우 다시 실행, 같지 않을 경우 randNum 반환
var preNum;

//랜덤한 숫자 생성하는 함수
function randomHole(){
  randomNum = Math.floor(Math.random() * 10);
  if (preNum !== randomNum && randomNum > 0) {
    preNum = randomNum; 
    return randomNum;
  }
  return randomHole();
 }

function moleActive(num){
  //opacity:1 적용해서 어몽어스 등장할 수있게 함
    num.classList.add('active');
}
function moleHide(num){
  //opacity:0 적용해서 어몽어스 안보이게 함
    num.classList.remove('active');
}
var moleCatch = 0;

function showingMole(){
  if(turn < 10){
    moleNumber = document.getElementById(`${randomHole()}`);
    moleActive(moleNumber);
    moleNumber.addEventListener('click', catchMole);
    moleCatch = setTimeout(seeMOle, 400);
    turn++;
  }else{
    //시도횟수가 10회라면 모달이벤트 => 엔딩박스 보여줌, 시작버튼의 변경
    modalEvent();
    startBtn.addEventListener('click', startMole);
    startBtn.textContent = 'PRESS AGAIN';
    startBtn.style.color = '#f2ecff';
  }
}
//어몽어스 등장 랜덤하기 끝


//4.클릭으로 어몽이 잡기 시작
//#couny-mole 노란글자로 현재점수 보이는 부분
var cntBox = document.querySelector('#count-mole');
function seeMOle(){
  //어몽이 클릭했으면 사라지게 하기
  moleNumber.removeEventListener('click', catchMole);
  moleHide(moleNumber);
  clearTimeout(moleCatch);
  //0.3초 뒤에 다시 어몽이 등장하게 하기
  setTimeout(showingMole, 200);
}
//등장한 어몽이 클릭했을때 점수 증가시키기
//innerHTML에 업데이트하게 해주기
function catchMole(){
  seeMOle();
  clearTimeout(moleCatch);
  getPoint++;
  cntBox.innerHTML = getPoint;
}
//클릭으로 어몽어스 잡기 끝


// 5.게임 엔딩, 다시 게임하기 버튼 실행되기 시작
var endingBtn = document.querySelector('#ending-bg');
//display :block 선언해서 게임 끝날때 박스 등장하게 하기
var finalEnding = "finalEnding";

endingBtn.addEventListener('click', hideModal); 

function modalEvent(){
  //100점 기준으로 변수만들기
  let point = (getPoint / 10) * 100;
  //70점 이상일때 INPOST띄우기, 이하이면 Y띄우기
  if (point <= 70){
    ending.children[0].innerHTML = "<span>IMPOSTOR LOSE </span></br>YOUR KILL IS&nbsp;&nbsp;<span class='last'>" + point + '</span>!';
  }else{
    ending.children[0].innerHTML = "<span>IMPOSTOR WIN</span></br>YOUR KILL IS&nbsp;&nbsp;<span class='last'>" + point + '</span>!';
  }
  ending.classList.add(finalEnding);
  endingBtn.classList.add(finalEnding);
}
function hideModal(){
  ending.classList.remove(finalEnding);
  endingBtn.classList.remove(finalEnding);
}
//게임엔딩, 다시 게임하기 버튼 실행되기 끝



//마우스 커서 칼이미지 시작
const el = document.querySelector('.follow');
    let Kill = document.querySelectorAll('#mole');
    
    let mouseX = 0;
    let mouseY = 0;

    let currentX = 0;
    let currentY = 0;

    Kill.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    })

    tick();
    function tick(){  
        requestAnimationFrame(tick);
        currentX += (mouseX - currentX -20) * 0.1;
        currentY += (mouseY - currentY -20) * 0.1;

        el.style.transform = `translate(${currentX}px, ${currentY}px)`;
    }

//마우스 커서 칼이미지 끝