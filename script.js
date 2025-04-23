// --- Sleep Helper ---
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// --- Generate Bars ---
function generateBars(array) {
  const container = document.getElementById('bars-container');
  container.innerHTML = '';
  for (let i = 0; i < array.length; i++) {
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.height = `${array[i]}px`;
    container.appendChild(bar);
  }
}

// --- Bubble Sort Visualizer ---
async function bubbleSortVisualizer(array) {
  const bars = document.querySelectorAll('.bar');
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array.length - i - 1; j++) {
      bars[j].style.backgroundColor = '#F4ACB7';
      bars[j + 1].style.backgroundColor = '#F4ACB7';
      await sleep(300);

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        bars[j].style.height = `${array[j]}px`;
        bars[j + 1].style.height = `${array[j + 1]}px`;
      }

      bars[j].style.backgroundColor = '#FFCAB4';
      bars[j + 1].style.backgroundColor = '#FFCAB4';
    }
  }
}

// --- Selection Sort Visualizer ---
async function selectionSortVisualizer(array) {
  const bars = document.querySelectorAll('.bar');
  const n = array.length;

  for (let i = 0; i < n; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = '#9D8189';

    for (let j = i + 1; j < n; j++) {
      bars[j].style.backgroundColor = '#F4ACB7';
      await sleep(200);

      if (array[j] < array[minIndex]) {
        if (minIndex !== i) bars[minIndex].style.backgroundColor = '#FFCAB4';
        minIndex = j;
        bars[minIndex].style.backgroundColor = '#9D8189';
      } else {
        bars[j].style.backgroundColor = '#FFCAB4';
      }
    }

    if (minIndex !== i) {
      [array[i], array[minIndex]] = [array[minIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[minIndex].style.height = `${array[minIndex]}px`;
    }

    bars[i].style.backgroundColor = '#D8E2DC';
  }
}

// --- Insertion Sort Visualizer ---
async function insertionSortVisualizer(array) {
  const bars = document.querySelectorAll('.bar');

  for (let i = 1; i < array.length; i++) {
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = '#9D8189';
    await sleep(300);

    while (j >= 0 && array[j] > key) {
      bars[j + 1].style.height = `${array[j]}px`;
      array[j + 1] = array[j];
      bars[j].style.backgroundColor = '#F4ACB7';
      j--;

      await sleep(300);
    }

    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;
    bars[i].style.backgroundColor = '#FFCAB4';
  }

  for (let i = 0; i < array.length; i++) {
    bars[i].style.backgroundColor = '#D8E2DC';
  }
}

// --- Get Custom Input Array ---
function getCustomArray() {
  const input = document.getElementById('array-input').value;
  const array = input
    .split(',')
    .map(num => parseInt(num.trim()))
    .filter(num => !isNaN(num));

  return array;
}

// --- Language Switcher ---
function switchCode(language) {
  const allCode = document.querySelectorAll('.code-snippet');
  allCode.forEach(block => block.style.display = 'none');
  const selected = document.getElementById(`code-${language}`);
  if (selected) selected.style.display = 'block';
}

// --- Footer Quote Rotation ---
const quotes = [
  '❤️ Powered by logic.',
  '❤️ Debugging is love.',
  '❤️ Sorting code, one logic at a time.',
  '❤️ Trust your intuition.',
  '❤️ Built by human hands and curious minds.'
];

function rotateFooterQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById('footer-quote').textContent = quote;
}

// --- Main App ---
document.addEventListener('DOMContentLoaded', () => {
  rotateFooterQuote();

  document.getElementById('custom-sort-button').addEventListener('click', () => {
    const array = getCustomArray();
    if (array.length === 0) {
      alert("Please enter a valid array.");
      return;
    }

    generateBars(array);
    const algorithm = document.getElementById('algorithm-selector').value;
    if (algorithm === 'bubble') bubbleSortVisualizer([...array]);
    else if (algorithm === 'selection') selectionSortVisualizer([...array]);
    else if (algorithm === 'insertion') insertionSortVisualizer([...array]);
  });

  const languageButtons = document.querySelectorAll('.lang-btn');
  languageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      switchCode(btn.dataset.lang);
    });
  });
});
async function quickSortVisualizer(array, start = 0, end = array.length - 1, bars = null) {
  if (!bars) bars = document.querySelectorAll('.bar');
  if (start >= end) return;

  let pivotIndex = await partition(array, start, end, bars);
  await quickSortVisualizer(array, start, pivotIndex - 1, bars);
  await quickSortVisualizer(array, pivotIndex + 1, end, bars);
}

async function partition(array, start, end, bars) {
  let pivotValue = array[end];
  let pivotIndex = start;

  bars[end].style.backgroundColor = '#9D8189'; // Highlight pivot

  for (let i = start; i < end; i++) {
    bars[i].style.backgroundColor = '#F4ACB7';
    await sleep(200);
    if (array[i] < pivotValue) {
      [array[i], array[pivotIndex]] = [array[pivotIndex], array[i]];
      bars[i].style.height = `${array[i]}px`;
      bars[pivotIndex].style.height = `${array[pivotIndex]}px`;
      pivotIndex++;
    }
    bars[i].style.backgroundColor = '#FFCAB4';
  }

  [array[pivotIndex], array[end]] = [array[end], array[pivotIndex]];
  bars[pivotIndex].style.height = `${array[pivotIndex]}px`;
  bars[end].style.height = `${array[end]}px`;

  bars[end].style.backgroundColor = '#FFCAB4';
  bars[pivotIndex].style.backgroundColor = '#D8E2DC';

  return pivotIndex;
}
async function mergeSortVisualizer(array, left = 0, right = array.length - 1, bars = null) {
  if (!bars) bars = document.querySelectorAll('.bar');
  if (left >= right) return;

  const mid = Math.floor((left + right) / 2);
  await mergeSortVisualizer(array, left, mid, bars);
  await mergeSortVisualizer(array, mid + 1, right, bars);
  await merge(array, left, mid, right, bars);
}

async function merge(array, left, mid, right, bars) {
  let leftArr = array.slice(left, mid + 1);
  let rightArr = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;

  while (i < leftArr.length && j < rightArr.length) {
    bars[k].style.backgroundColor = '#F4ACB7';
    await sleep(200);
    if (leftArr[i] <= rightArr[j]) {
      array[k] = leftArr[i];
      bars[k].style.height = `${leftArr[i]}px`;
      i++;
    } else {
      array[k] = rightArr[j];
      bars[k].style.height = `${rightArr[j]}px`;
      j++;
    }
    bars[k].style.backgroundColor = '#FFCAB4';
    k++;
  }

  while (i < leftArr.length) {
    bars[k].style.backgroundColor = '#F4ACB7';
    await sleep(150);
    array[k] = leftArr[i];
    bars[k].style.height = `${leftArr[i]}px`;
    bars[k].style.backgroundColor = '#FFCAB4';
    i++; k++;
  }

  while (j < rightArr.length) {
    bars[k].style.backgroundColor = '#F4ACB7';
    await sleep(150);
    array[k] = rightArr[j];
    bars[k].style.height = `${rightArr[j]}px`;
    bars[k].style.backgroundColor = '#FFCAB4';
    j++; k++;
  }

  for (let t = left; t <= right; t++) {
    bars[t].style.backgroundColor = '#D8E2DC';
  }
}
document.getElementById('custom-sort-button').addEventListener('click', () => {
  const array = getCustomArray();
  if (array.length === 0) {
    alert("Please enter a valid array.");
    return;
  }

  generateBars(array);
  const algorithm = document.getElementById('algorithm-selector').value;

  if (algorithm === 'bubble') bubbleSortVisualizer([...array]);
  else if (algorithm === 'selection') selectionSortVisualizer([...array]);
  else if (algorithm === 'insertion') insertionSortVisualizer([...array]);
  else if (algorithm === 'quick') quickSortVisualizer([...array]);
  else if (algorithm === 'merge') mergeSortVisualizer([...array]);
});
