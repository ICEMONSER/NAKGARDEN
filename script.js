const inputs = document.querySelectorAll(".pin-input");
const pinBox = document.getElementById("pinBox");
const error = document.getElementById("error");

const correctPIN = "2405"; // 🔒 เปลี่ยนรหัสตรงนี้

inputs.forEach((input, index) => {
  input.addEventListener("input", () => {
    // บังคับให้พิมพ์ได้แค่ 1 ตัว
    input.value = input.value.replace(/[^0-9]/g, "").slice(0, 1);

    // พอพิมพ์แล้วข้ามไปช่องถัดไปอัตโนมัติ
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }

    // รวมค่าทุกช่อง
    const pin = Array.from(inputs).map(i => i.value).join("");

    // ถ้ากรอกครบทุกช่อง
    if (pin.length === inputs.length) {
      if (pin === correctPIN) {
        goToPage(2);
        // ✔️ ถูก → ไปหน้าถัดไป
      } else {
        // ❌ ผิด → สั่น + ล้างค่า
        error.textContent = "รหัสไม่ถูกต้อง ลองใหม่อีกครั้ง";
        pinBox.classList.add("shake");

        setTimeout(() => {
          pinBox.classList.remove("shake");
          inputs.forEach(i => (i.value = ""));
          inputs[0].focus();
        }, 400);
      }
    }
  });
});


function goToPage(pageNumber){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("page"+pageNumber)?.classList.add("active");
  document.getElementById("submenu")?.classList.remove("active");
}

function checkPin(){
  const input = document.getElementById("pininput");
  if(input.value === correctPin){
    goToPage(2);
  }else{
    input.classList.add("shake");
    setTimeout(()=>input.classList.remove("shake"),300);
  }
}

function openMenu(type){
  goToPage(null);
  const sub = document.getElementById("submenu");
  sub.classList.add("active");
  const content = document.getElementById("submenuContent");

  if(type==="time"){
    const startDate = new Date("2025-05-24");
    const now = new Date();
    const days = Math.floor((now-startDate)/(1000*60*60*24));
    content.innerHTML = `
      <h2>เราคบกันมา ${days} วันแล้ว 💖</h2>
      <p>เราคบกันวันที่ 24/05/2025 นับเดือนเป็นเวลา8เดือน เป็นช่วงเวลามีทั้งทุกข์ทั้งสุขแต่ก็ร่วมผ่านก</p>
      <button onclick="goToPage(3)">กลับ</button>
    `;
  }

  if(type==="letter"){
    content.innerHTML = `
      <h2>💌 จดหมายถึงเธอ</h2>
      <button onclick="this.nextElementSibling.style.display='block'">เปิดซอง</button>
      <p style="display:none;"> KNOCK! KNOCK! หนุ่มแว่นของยู
      ขอบคุณที่ผ่านช่วงเวลา8เดือนมาด้วยกันนะคะ เนื่องในวันวาเลนไทน์ เป็นครั้งแรกที่มีคนอยู่ฉลองวันนี้ด้วยกัน รักเธอมากๆ ตั้งแต่คบมาขอโทษหลายๆอย่างที่ดื้อกับเธอบ่อยๆ ขอบคุณตัวเธอที่ใจเย็นกับเค้า ยังเข้าใจ และยังอยู่ด้วนถึงทุกวันนี้ อยากจะขออวยพรให้พวกเรามีความสุขในทุกๆวัน กินอิ่มนอนหลับ ไม่มีฝนตกในใจ รักเธอมากๆเกินที่จะบรรยายหมด จุ้บๆ และขอให้พวกเราอยู่ด้วยกันแบบนี้ไปเรื่อยๆเท่าที่จะทำได้ สิ่งนึงที่อยากให้เธอรู้ เค้าจะคอยให้กำลังใจเธออยู่เสมอ หวังดีเสมอ จะคอยซัพพอร์ตอยู่ข้างหลัง เมื่อไหร่ที่เธอไม่มีใครให้พึ่งจะยังสามารถหันหลังกลับมาหาเค้าได้เสมอนะคะ ถึงแม้จะไม่ค่อยพูดอะไรหวานหรือพูดแสดงความรู้สึกออกไปมากมายเพราะด้วยความเขินแต่เมื่อเธอต้องการเค้าพร้อมจะมอบให้ได้เสมอ 💕</p>
      <button onclick="goToPage(3)">กลับ</button>
    `;
  }

  if(type==="quiz"){
    content.innerHTML = `
      <h2>Quiz 💡</h2>
      <p>1. สีโปรดของเรา?</p>
      <button onclick="checkAnswer(true)">ชมพู</button>
      <button onclick="checkAnswer(false)">น้ำเงิน</button>
      <button onclick="checkAnswer(false)">เขียว</button>
      <button onclick="checkAnswer(false)">ดำ</button>
      <p id="score"></p>
      <button onclick="goToPage(3)">กลับ</button>
    `;
  }

  if(type==="memory"){
    content.innerHTML = `
      <h2>ความทรงจำ 📸</h2>
      <img src="memory1.jpg" width="150"><br>
      <p>วันแรกที่เราเจอกัน...</p>
      <button onclick="goToPage(3)">กลับ</button>
    `;
  }
}

let score = 0;
function checkAnswer(correct){
  if(correct) score++;
  document.getElementById("score").innerText="คุณตอบถูก "+score+" ข้อ 💖";
}

function playMusic(){
  document.getElementById("music").play();
}

function moveNo(){
  const btn = document.getElementById("noBtn");
  btn.style.position="absolute";
  btn.style.top=Math.random()*200+"px";
  btn.style.left=Math.random()*200+"px";
  alert("แน่ใจหรอ ไม่รักจริงหรอ โกรธนะ 😠");
}

function showLove(){
  document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));
  document.getElementById("finalPage").classList.add("active");
}
