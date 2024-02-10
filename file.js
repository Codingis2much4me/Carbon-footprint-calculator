document.addEventListener('DOMContentLoaded', function() {
  const prev = document.getElementById('prev-btn');
  const next = document.getElementById('next-btn');
  const submit = document.getElementById('submit-btn'); // Reference to the submit button
  const list = document.getElementById('item-list');
  const items = document.querySelectorAll('.item');
  const questionNumber = document.getElementById('question-number'); // Reference to the question number div
  let currentItemIndex = 0;

  // Update question number
  function updateQuestionNumber() {
    questionNumber.textContent = `Question ${currentItemIndex + 1}`;
  }

  prev.addEventListener('click', () => {
    if (currentItemIndex > 0) {
      currentItemIndex--;
      scrollToCurrentItem();
      updateQuestionNumber(); // Update question number when moving to previous question
    }
  });

  next.addEventListener('click', () => {
    if (currentItemIndex < items.length - 1) {
      currentItemIndex++;
      scrollToCurrentItem();
      updateQuestionNumber(); // Update question number when moving to next question
    }
  });

  submit.addEventListener('click', () => {
    // Calculate total carbon footprint and display result
    let totalCarbonFootprint = 0;
    items.forEach((item) => {
      const input = item.querySelector('input');
      totalCarbonFootprint += parseFloat(input.value);
    });

    // Display result
    alert(`Your total carbon footprint is: ${totalCarbonFootprint}`);
  });

  items.forEach((item, index) => {
    const input = item.querySelector('input');
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        if (currentItemIndex < items.length - 1) {
          currentItemIndex++;
          scrollToCurrentItem();
          updateQuestionNumber(); // Update question number when moving to next question
        }
      }
    });
  });

  function scrollToCurrentItem() {
    items[currentItemIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Initial update of question number
  updateQuestionNumber();
});
