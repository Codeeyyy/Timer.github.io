async function main() {
  let timer = document.getElementsByClassName("time")[0];
  let stop = document.getElementsByClassName("stop")[0];
  let resume = document.getElementsByClassName("resume")[0];
  let restart = document.getElementsByClassName("restart")[0];
  let b; // Global variable
  let value = document.getElementsByClassName("input")[0];
  let submit = document.getElementsByClassName("submit")[0];

  function interval(time) {
    b = setInterval(() => {
      time--;
      counter--;

      if (time < 0) {
        clearInterval(b);
      } else {
        timer.innerHTML = `Time left: ${time} sec`;
      }
    }, 1000);
  }
  function values() {
    return new Promise((resolve, reject) => {
      
      submit.addEventListener("click", () => {
        if(isNaN(value.value)){
            reject()
        }
        resolve(value.value); // Resolve the promise with the value of the input field
      })

    })
    // .then(null,()=>{
    //         alert(`Expected a number instead of ${value.value}`)
    //        throw TypeError(`Expected a number instead of ${value.value}`)
           
    // })
  }

  function Timer(time) {
    time = time + 1;
    resume.disabled = true;
    //event listeners
    stop.addEventListener("click", () => {
      stop.disabled = true;
      resume.disabled = false;
      clearInterval(b);
    });
    resume.addEventListener("click", () => {
      resume.disabled = true;
      stop.disabled = false;
      interval(counter);
    });

    restart.addEventListener("click", () => {
      resume.disabled = true;
      stop.disabled = false;
      clearInterval(b);
      counter = time;
      interval(time);
    });
    //Calling function
    interval(time);
  }
 try {
    let call = await values(); // Wait for the promise to resolve
    //A counter so the timer won't start again with resumed
     counter = parseInt(call) + 1;
    Timer(parseInt(call));
 } catch (error) {
    console.error(error)
    alert(`Expected a number instead of ${value.value}`)
 }
 
}

main();
