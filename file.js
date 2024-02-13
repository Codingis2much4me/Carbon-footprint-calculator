document.addEventListener('DOMContentLoaded', function() {
  const prev = document.getElementById('prev-btn');
  const next = document.getElementById('next-btn');
  const submit = document.getElementById('submit-btn');
  const list = document.getElementById('item-list');
  const items = document.querySelectorAll('.item');
  const questionNumber = document.getElementById('question-number');
  const footprint = document.querySelector('.footprint');
  const summaryTableBody = document.querySelector('#summary-table tbody');
  let currentItemIndex = 0;

  // Update question number
  function updateQuestionNumber() {
    questionNumber.textContent = `Question ${currentItemIndex + 1}`;
  }

  // Update footprint width based on percentage of questions answered
  function updateFootprintWidth() {
    const percentComplete = (currentItemIndex + 1) / items.length * 100;
    footprint.style.width = percentComplete + '%';
  }

  // Function to display message when trying to navigate without filling input
  function displayInputMessage() {
    const input = items[currentItemIndex].querySelector('input');
    input.placeholder = "This field is required!";
    input.style.borderColor = "red";
  }

  prev.addEventListener('click', () => {
    if (currentItemIndex > 0) {
      currentItemIndex--;
      scrollToCurrentItem();
      updateQuestionNumber();
      updateFootprintWidth();
      submit.style.display = 'none';
    }
  });

  next.addEventListener('click', () => {
    const input = items[currentItemIndex].querySelector('input');
    if (input.value !== '') {
      if (currentItemIndex < items.length - 1) {
        currentItemIndex++;
        scrollToCurrentItem();
        updateQuestionNumber();
        updateFootprintWidth();
        checkSubmitVisibility();
      } else {
        checkSubmitVisibility();
      }
    } else {
      displayInputMessage();
    }
  });

  submit.addEventListener('click', () => {
    let totalCarbonFootprint = 0;
    let allInputsFilled = true;

    // Populate summary table with questions and answers
    summaryTableBody.innerHTML = ''; // Clear previous entries

    items.forEach((item, index) => {
      const input = item.querySelector('input');
      if (input.value === '') {
        allInputsFilled = false;
        displayInputMessage(index + 1);
      } else {
        // Add question and answer to the summary table
        const question = item.querySelector('label').textContent;
        const answer = input.value;
        const row = `<tr><td>${question}</td><td>${answer}</td></tr>`;
        summaryTableBody.innerHTML += row;
      }
      totalCarbonFootprint += parseFloat(input.value) || 0; // Handle empty input
    });

    if (allInputsFilled) {
      alert(`Your total carbon footprint is: ${totalCarbonFootprint}`);
    }
  });

  items.forEach((item, index) => {
    const input = item.querySelector('input');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        const input = items[currentItemIndex].querySelector('input');
        if (input.value !== '') {
          if (currentItemIndex < items.length - 1) {
            currentItemIndex++;
            scrollToCurrentItem();
            updateQuestionNumber();
            updateFootprintWidth();
            checkSubmitVisibility();
          } else {
            checkSubmitVisibility();
          }
        } else {
          displayInputMessage();
        }
      }
    });
  });

  function scrollToCurrentItem() {
    items[currentItemIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function checkSubmitVisibility() {
    if (currentItemIndex === items.length - 1) {
      submit.style.display = 'block';
    } else {
      submit.style.display = 'none';
    }
  }

  updateQuestionNumber();
  updateFootprintWidth();
  submit.style.display = 'none';
});
